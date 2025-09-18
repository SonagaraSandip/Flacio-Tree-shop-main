import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Info, X } from "lucide-react";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import { toast } from "react-toastify";

const Account = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };
  return (
    <div className="container mx-auto mt-[150px]">
      <div className="flex flex-col gap-4 h-full items-center mb-28 max-w-6xl mx-auto ">
        <h1 className="text-6xl font-librebaskerville my-12">My Account</h1>
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
                  <p className="text-green-700 underline text-sm">
                    CREATE YOUR FIRST ORDER
                  </p>
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
                    You want to create a new address?{" "}
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
                      Add a New Address
                    </h2>
                    <button
                      className="self-end text-gray-400 bg-white border border-gray-800 hover:bg-black hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
                    </button>
                  </div>

                  {/* Form */}
                  <form className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
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
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address1
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address2
                      </label>
                      <input
                        type="text"
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
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country/Region
                        </label>
                        <select className="w-full border rounded px-3 py-2">
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
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="default" />
                      <label htmlFor="default" className="text-sm">
                        Set as default address
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-800 text-white px-4 py-2 rounded"
                    >
                      ADD ADDRESS
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
