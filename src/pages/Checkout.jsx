import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Handbag, Truck, Info, StoreIcon } from "lucide-react";
import { CiCreditCardOff } from "react-icons/ci";
import { BiSolidUser } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Checkout = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [country, setCountry] = useState("Vietnam");
  const [email, setEmail] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");

  useEffect(() => {
    if(user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user])

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const shipping = subtotal >= 100 ? 0 : 20; // Example: free if >=100
  const estimatedTaxes = subtotal * 0.1; // Example: 10% tax
  const total = subtotal + shipping + estimatedTaxes;

  const countries = [
    "---",
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Czechia",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Hong Kong SAR",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Malaysia",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Singapore",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Vietnam",
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b  border-gray-200 shadow-sm">
        <div className="flex justify-between items-center py-3 max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-librebaskerville">
            Flacio – Plants Shopify Theme OS 2.0
          </h1>
          <Link to={"/collections/all"}>
            <Handbag className="text-blue-600" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row max-w-5xl mx-auto px-4 py-10 gap-10">
        {/* Left: Contact + Delivery */}
        <div className="flex-1 sticky top-0 ">
          {/* Contact */}
          <div className="flex justify-between items-center mb-4">
            {user ? (
              <div className="flex items-center justify-between border-b border-gray-200 w-full pb-4">
                <div className="flex items-center gap-2">
                  <p className="bg-gray-200 rounded-full p-2">
                    <BiSolidUser size={20} />
                  </p>
                  {user.email}
                </div>
                <button
                  className="relative"
                  onClick={() => setShowMenu((v) => !v)}
                >
                  <HiOutlineDotsVertical size={24} />
                </button>
                {showMenu && (
                  <>
                    {/* Transparent Overlay */}
                    <div
                      className="fixed top-0 left-0 w-screen h-screen z-40 bg-transparent"
                      onClick={() => setShowMenu(false)}
                    />
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-16 w-32 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          logout();
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold ">Contact</h2>
                  <Link to="/account/login" className="text-blue-600 text-md">
                    Sign in
                  </Link>
                </div>

                <input
                  type="email"
                  placeholder="Email or mobile phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-2 rounded mb-3"
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 mb-6 text-sm">
            <input
              type="checkbox"


              
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
              className="h-4 w-4"
            />
            Email me with news and offers
          </label>

          {/* Delivery */}
          <h2 className="text-sm mb-4">Delivery</h2>
          <div className="mb-6 font-poppins">
            <label
              className={`flex items-center justify-between gap-2 border rounded px-4 py-3 cursor-pointer ${
                deliveryMethod === "ship" ? "border-blue-600" : ""
              }`}
            >
              <div className="flex items-center text-sm gap-2">
                <input
                  type="radio"
                  checked={deliveryMethod === "ship"}
                  onChange={() => setDeliveryMethod("ship")}
                />
                Ship
              </div>

              <Truck
                size={20}
                className={`transition-colors duration-300 ${
                  deliveryMethod === "ship" ? "text-blue-600" : "text-gray-500"
                }`}
              />
            </label>
            <label
              className={`flex items-center justify-between gap-2 text-sm border rounded px-4 py-3 cursor-pointer transition-colors duration-300 ${
                deliveryMethod === "pickup" ? "border-blue-600" : ""
              }`}
            >
              <div className="flex items-center text-sm gap-2">
                <input
                  type="radio"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                />
                Pick up
              </div>
              <StoreIcon
                size={20}
                className={`transition-colors duration-300 ${
                  deliveryMethod === "pickup"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
            </label>
          </div>

          {deliveryMethod === "ship" ? (
            <div className="space-y-4">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="flex gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  className="w-1/2 border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 border px-3 py-2 rounded"
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Postal code (optional)"
                  className="w-1/2 border px-3 py-2 rounded"
                />
              </div>
              <label className="flex items-center gap-2 mb-6 text-sm">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={() => setSaveAddress(!saveAddress)}
                  className="h-4 w-4"
                />
                Save this information for next time
              </label>

              <div className="flex flex-col pt-4 gap-2">
                <h1 className="text-md font-poppins text-black forn-semibold">
                  Shipping method
                </h1>
                <div className="flex items-center justify-between font-poppins bg-green-50 px-4 py-3 rounded-md text-sm border border-blue-700">
                  <p>Standard</p>
                  <p className="uppercase">Free</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-2 text-sm">
              <div className="flex items-center justify-between text-sm  font-poppins">
                <p className="">Pickup location</p>
                <button className="text-blue-600 underline">
                  Change Location
                </button>
              </div>
              <div className="flex gap-2 bg-red-50 border border-red-300 p-3 rounded-md">
                <Info size={20} className="text-red-600" />
                <div className="flex flex-col justify-center gap-2">
                  <p className="text-gray-800 text-md">
                    No stores available with your items
                  </p>
                  <button
                    onClick={() => setDeliveryMethod("ship")}
                    className="flex underline"
                  >
                    Ship to address{" "}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-8">
            <h1 className="text-lg font-poppins">Payment</h1>
            <p className="text-gray-500 text-sm font-poppins">
              All transactions are secure and encrypted.
            </p>
            <div className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-2 mt-2 text-gray-500 text-sm border ">
              <CiCreditCardOff size={60} className="mt-4" />
              <p className="font-poppins">
                This store can’t accept payments right now.
              </p>
            </div>
            <p className="text-md font-poppins mt-2 text-gray-500 cursor-select-none bg-gray-100 px-4 py-3 text-center border border-gray-300">
              Pay now
            </p>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="w-full sticky top-10 self-start lg:w-1/2 p-6 rounded-lg ">
          <div className="max-h-64 overflow-y-auto mb-6 space-y-4">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center gap-3">
                <div className="relative">
                  <img
                    src={item.variant.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded border-2 border-gray-400 shadow-lg"
                  />
                  <span className="absolute -top-1 -right-2 bg-gray-800 text-white text-xs px-2 font-poppins rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-librebaskerville ">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.variant.color || "Default"}
                  </p>
                </div>
                <p className="text-sm font-librebaskerville text-gray-500">
                  ${(item.variant.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated taxes</span>
              <span>${estimatedTaxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>USD ${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
