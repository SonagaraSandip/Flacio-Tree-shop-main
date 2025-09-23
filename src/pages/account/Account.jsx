import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Info, X } from "lucide-react";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import { toast } from "react-toastify";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  // load saved addresses
  useEffect(() => {
    if (user?.email) {
      const stored = localStorage.getItem(`addresses_${user.email}`);

      if (stored) {
        try {
          setAddresses(JSON.parse(stored));
        } catch (error) {
          console.error("Error parsing saved addresses:", error);
          setAddresses([]);
        }
      } else {
        setAddresses([]);
      }
    }
  }, [user?.email]);

  //save when ever addresses change
  useEffect(() => {
    if (user?.email) {
      // prevent saving under wrong key
      localStorage.setItem(
        `addresses_${user.email}`,
        JSON.stringify(addresses)
      );
    }
  }, [addresses, user?.email]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // add new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      id: editingAddress ? editingAddress.id : Date.now(), // Keep same ID when editing
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      city: formData.get("city"),
      country: formData.get("country"),
      postal: formData.get("postal"),
      pincode: formData.get("pincode"),
      phone: formData.get("phone"),
      isDefault: formData.get("isDefault") ? true : false,
    };

    if (editingAddress) {
      // update
      setAddresses(
        addresses.map((a) => (a.id === editingAddress.id ? newAddress : a))
      );
      toast.success("Address updated successfully!");
    } else {
      // add new
      let updated = [...addresses];
      if (newAddress.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(newAddress);
      setAddresses(updated);
      toast.success("Address added successfully!");
    }
    setIsOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.info("Address deleted successfully!");
  };

  // Set Default
  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((a) =>
        a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }
      )
    );
  };
  return (
    <div className="container mx-auto mt-[150px]">
      <div className="flex flex-col gap-4 h-full items-center mb-28 max-w-6xl mx-auto ">
        <h1 className="text-6xl font-librebaskerville my-12">My Account</h1>
        <p>count {addresses.length}</p>
        <div className="flex gap-4 mt-4 w-full">
          {/* left side */}
          <div className="flex flex-col w-[25%] text-sm">
            <button
              onClick={() => setSelectedTab("dashboard")}
              className={`px-4 py-3 text-start border-b border-gray-200 ${
                selectedTab === "dashboard"
                  ? "bg-green-950 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setSelectedTab("addresses")}
              className={`px-4 py-3 font-poppins text-start border-y border-gray-200 ${
                selectedTab === "addresses"
                  ? "bg-green-950 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Addresses
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 bg-gray-200 text-start"
            >
              Logout
            </button>
          </div>
          {/* Right side */}
          <div className="w-[75%] ml-8">
            {selectedTab === "dashboard" && (
              <div className="flex flex-col gap-4 font-poppins text-sm ">
                <p>
                  <span className="text-gray-500">Hello</span>{" "}
                  <strong className="font-bold font-librebaskerville">
                    {user.firstName} {user.lastName}
                  </strong>{" "}
                  ( <span className="text-gray-500 font-poppins">not </span>{" "}
                  <strong className="font-bold font-librebaskerville">
                    {user.firstName} {user.lastName}
                  </strong>{" "}
                  ?{" "}
                  <span
                    onClick={handleLogout}
                    className="text-red-600 hover:text-green-800 cursor-pointer"
                  >
                    Log Out
                  </span>{" "}
                  )
                </p>
                <p>
                  <span className="text-gray-500">Email</span> :{" "}
                  <strong className="font-bold">{user.email}</strong>
                </p>
                <p className="text-xl font-medium">Order History</p>
                <div className="flex gap-2 cursor-pointer items-center">
                  <Info size={20} color="green" />
                  <button
                    onClick={() => navigate("/collections/all")}
                    className="text-green-700 underline text-sm"
                  >
                    CREATE YOUR FIRST ORDER
                  </button>
                  <p className="font-poppins text-gray-500 cursor-auto">
                    You haven't placed any orders yet.
                  </p>
                </div>
              </div>
            )}

            {selectedTab === "addresses" && (
              <div className="flex flex-col gap-4 font-poppins">
                <div className="flex gap-2">
                  <p className="text-gray-500">
                    You want to create a new address?
                  </p>
                  <p
                    onClick={() => setIsOpen(true)}
                    className="text-green-700 cursor-pointer underline"
                  >
                    Add a New Address
                  </p>
                </div>
                <h1 className="text-3xl my-2 font-librebaskerville">
                  Your Addresses
                </h1>

                {addresses.length === 0 ? (
                  <p className="text-center bg-gray-100 p-4 border">
                    No saved addresses yet.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border p-4 relative">
                        {addr.isDefault && (
                          <span className="absolute top-0 right-0 bg-blue-600 text-white px-3 text-xs font-bold">
                            DEFAULT
                          </span>
                        )}
                        <p>
                          {addr.firstName} {addr.lastName}
                        </p>
                        <p>{addr.company}</p>
                        <p>{addr.address1}</p>
                        <p>{addr.address2}</p>
                        <p>{addr.city}</p>
                        <p>{addr.country}</p>
                        <p>{addr.postal}</p>
                        <p>{addr.phone}</p>

                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSetDefault(addr.id)}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                          >
                            Set Default
                          </button>
                          <button
                            onClick={() => {
                              setEditingAddress(addr);
                              setIsOpen(true);
                            }}
                            className="px-6 py-1 bg-green-100 text-green-800 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(addr.id)}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Overlay */}
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                {/* Modal Content */}
                <div className="bg-white w-full max-w-2xl rounded shadow-lg relative ">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-2xl font-librebaskerville font-semibold">
                      {editingAddress ? "Edit Address" : "Add a New Address"}
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex justify-end "
                    >
                      <X className="text-base font-normal text-gray-500 hover:text-black hover:rotate-90 hover:scale-75 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleAddAddress}
                    className="p-6 font-poppins space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          defaultValue={editingAddress?.firstName || ""}
                          required
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          defaultValue={editingAddress?.lastName || ""}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        defaultValue={editingAddress?.company || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address1
                      </label>
                      <input
                        type="text"
                        name="address1"
                        defaultValue={editingAddress?.address1 || ""}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address2
                      </label>
                      <input
                        type="text"
                        name="address2"
                        defaultValue={editingAddress?.address2 || ""}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          defaultValue={editingAddress?.city || ""}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country/Region
                        </label>
                        <select
                          name="country"
                          defaultValue={editingAddress?.country || ""}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option>---</option>
                          <option>India</option>
                          <option>USA</option>
                          <option>UK</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Postal/Zip Code
                        </label>
                        <input
                          type="text"
                          name="postal"
                          defaultValue={editingAddress?.postal || ""}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={editingAddress?.phone || ""}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="default" name="isDefault" />
                      <label className="text-sm">Set as default address</label>
                    </div>

                    <button
                      type="submit"
                      // onClick={handleAddAddress}
                      className="bg-green-800 text-white px-4 py-2 rounded"
                    >
                      {editingAddress ? "UPDATE ADDRESS" : "ADD ADDRESS"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Account;
