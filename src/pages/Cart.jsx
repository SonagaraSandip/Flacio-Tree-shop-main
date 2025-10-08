import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
import ScrollToTop from "./ScrollToTop";
import { Gift, Minus, Plus, Trash, Zap, Pencil } from "lucide-react";
import EditItem from "../other/EditItem";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isEditItem, setIsEditItem] = useState(null);
  const [agree, setAgree] = useState(false);

  // get total of cart
  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (agree) {
      window.location.href = "/checkout";
    } else {
      toast.error("Please accept the terms and conditions to proceed.");
    }
  };

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

  const progressWidth = Math.min(100, (total / 100) * 100);

  return (
    // CHANGED: Adjusted padding for mobile and desktop
    <div className="container mx-auto pt-12 sm:pt-24 lg:pt-32 ">
      {cart.length === 0 ? (
        // CHANGED: Adjusted margins and text alignment for mobile
        <div className="flex flex-col gap-4 max-w-xl mx-auto items-center justify-center mt-8 lg:mt-16 px-4">
          <h1 className="text-lg lg:text-xl font-librebaskerville uppercase text-center">
            Your cart is currently empty.
          </h1>
          <p className="font-poppins text-sm text-gray-500 text-center">
            Before proceed to checkout you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            Website.
          </p>
          <Link
            to={"/collections/all"}
            className="font-poppins uppercase text-sm bg-zinc-900 text-white px-6 py-3 lg:px-8 lg:py-4 mt-4 hover:bg-green-950 transition-colors duration-300"
          >
            go to shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-librebaskerville text-center mb-6 lg:mb-8 px-4 mt-8 lg:mt-0 sm:px-6">
            Shopping Cart
          </h1>

          {/*  Changed to flex-col for mobile, adjusted gaps */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:m-12">
            {/* left side */}

            <div className="w-full lg:w-[60%]">
              {/*  Hide table on mobile, show card layout instead */}
              <div className="hidden lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-gray-500 font-poppins uppercase text-sm">
                      <th className="border p-4 text-left">Product</th>
                      <th className="border p-4 text-center">Quantity</th>
                      <th className="border p-4 text-center">Total</th>
                      <th className="border p-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      const itemPrice =
                        item.variant?.price ||
                        item.product.discountPrice ||
                        item.product.originalPrice;
                      return (
                        <tr key={index} className="border-b">
                          <td className="border p-4">
                            <div className="flex items-center gap-4">
                              <Link
                                to={`/products/${item.product.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                <img
                                  src={item.variant.image}
                                  alt={item.product.name}
                                  className="w-24 h-32 object-cover"
                                />
                              </Link>
                              <div className="flex flex-col gap-1">
                                <p className="font-poppins text-sm">
                                  {item.product.name}
                                </p>
                                <p className="text-gray-500 text-xs font-poppins">
                                  Color: {item.variant.color || "N/A"}
                                </p>
                                <p className="text-gray-500 text-xs font-poppins">
                                  ${itemPrice.toFixed(2)}
                                </p>
                                <button
                                  onClick={() => setIsEditItem(item)}
                                  className="text-xs font-poppins"
                                >
                                  <Pencil
                                    size={16}
                                    fill="gray"
                                    className="border-b-2 border-black"
                                  />
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="border p-4 text-center">
                            <div className="flex justify-center">
                              <div className="flex items-center gap-1 border border-gray-300 px-1 py-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="px-2"
                                  disabled={item.quantity === 1}
                                >
                                  <Minus size={16} />
                                </button>
                                <p className="px-3 border-x border-gray-500">
                                  {item.quantity}
                                </p>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="px-2"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="border p-4 text-center font-librebaskerville text-gray-500">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </td>

                          <td className="border p-4 text-center">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-600 cursor-pointer mx-auto"
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/*  Mobile card layout for cart items */}
              <div className="lg:hidden space-y-4">
                {cart.map((item, index) => {
                  const itemPrice =
                    item.variant?.price ||
                    item.product.discountPrice ||
                    item.product.originalPrice;
                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <div className="flex gap-4">
                        <Link
                          to={`/products/${item.product.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.variant.image}
                            alt={item.product.name}
                            className="w-24 h-28 object-cover"
                          />
                        </Link>
                        <div className="flex-1">
                          <p className="font-poppins text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500 text-xs font-poppins">
                            Color: {item.variant.color || "N/A"}
                          </p>
                          <p className="text-gray-500 text-xs font-poppins">
                            ${itemPrice.toFixed(2)}
                          </p>

                          <button
                            onClick={() => setIsEditItem(item)}
                            className="text-xs font-poppins mt-2 flex items-center gap-1"
                          >
                            <Pencil size={12} fill="gray" />
                            Edit
                          </button>
                        </div>
                      </div>
                      {/* Quantity controls for mobile */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 border border-gray-300 px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-1"
                            disabled={item.quantity === 1}
                          >
                            <Minus size={14} />
                          </button>
                          <p className="px-2 border-x border-gray-500 text-sm">
                            {item.quantity}
                          </p>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="font-librebaskerville text-gray-500 text-sm">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 font-poppins mt-6 lg:mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <Gift size={20} />
                  <span>Add gift wrap</span>
                </div>
                <p className="text-gray-700 font-normal hidden sm:block">
                  Only
                </p>
                <button className="font-poppins text-sm px-4 py-2 border border-zinc-800 hover:bg-green-950 hover:text-white w-full sm:w-auto">
                  Add A Gift Wrap
                </button>
              </div>

              <div className="mt-6 lg:mt-8 font-poppins text-sm">
                <p className="text-gray-800">Special instructions for seller</p>
                <textarea
                  type="text"
                  rows={4}
                  placeholder="How can we help you ?"
                  className="border border-zinc-300 mt-2 p-3 text-gray-500 w-full rounded text-sm"
                />
              </div>
            </div>

            {/* right side*/}

            <div className="w-full lg:w-[40%] gap-4 mt-6 lg:mt-0">
              <div className="flex flex-col h-auto lg:h-36 gap-2 rounded bg-pink-100 p-4 lg:p-8 font-poppins text-sm tracking-wide">
                <p className="uppercase flex items-center gap-1 text-xs font-poppins text-gray-700 font-semibold">
                  <Zap size={18} fill="yellow" />
                  Free shipping on orders $100.00
                </p>
                <p className="text-xs lg:text-sm">
                  {total <= "100"
                    ? `Spend $${(100 - total).toFixed(
                        2
                      )} more for free shipping!`
                    : "Congratulations, you've got free shipping!"}
                </p>
                <div
                  style={{ width: `${progressWidth}%` }}
                  className={`h-2 mt-2 lg:mt-4 w-full bg-gradient-to-r animate-moveStripes ${
                    total < 100
                      ? "from-gray-900 via-gray-500 to-gray-900"
                      : "from-green-900 via-green-500 to-green-900"
                  }`}
                ></div>
              </div>

              {/* options */}
              <div className="bg-gray-100 font-poppins text-sm rounded p-4 lg:p-8 mt-6 lg:mt-8">
                <p className="font-medium">Get shipping estimates</p>
                <select className="w-full border rounded px-3 py-2 mb-3 text-sm mt-2">
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full border rounded px-3 py-2 mb-3 text-sm"
                />

                <button className="w-full group bg-zinc-700 text-white py-2 rounded mb-4 text-sm hover:bg-green-950">
                  <span className="group-hover:animate-bounceX transition-all duration-300">
                    ESTIMATE
                  </span>
                </button>

                {/* Coupon */}
                <h2 className="text-base lg:text-lg font-semibold mb-2">
                  Coupon
                </h2>
                <p className="text-xs lg:text-sm text-gray-500 mb-2">
                  * Discount will be calculated and applied at checkout
                </p>
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm"
                />

                {/* Subtotal */}
                <div className="mb-4 lg:mb-6">
                  <p className="font-semibold text-base">
                    Subtotal:{" "}
                    <span className="text-black">${total.toFixed(2)}</span>
                  </p>
                  <p className="text-xs lg:text-sm mt-1 text-gray-500">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>

                {/* Adjusted text size for mobile */}
                <p className="text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6">
                  All charges are billed in{" "}
                  <strong className="font-bold text-black">USD</strong>. While
                  the content of your cart is currently displayed in, the
                  checkout will use{" "}
                  <strong className="font-bold text-black">USD</strong> at the
                  most current exchange rate.
                </p>

                {/* Terms and Conditions */}
                <label className="flex items-start gap-2 mb-4 text-xs lg:text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="h-4 w-4 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    I agree with the{" "}
                    <a href="#" className="text-zinc-900 underline">
                      terms and conditions
                    </a>
                  </span>
                </label>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className={`w-full bg-zinc-700 text-white py-3 rounded hover:bg-green-950 text-sm lg:text-base font-medium ${
                    !agree ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!agree}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>

          {isEditItem && (
            <EditItem
              cartItem={isEditItem}
              onClose={() => setIsEditItem(null)}
            />
          )}
        </>
      )}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Cart;
