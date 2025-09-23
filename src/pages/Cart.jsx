import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gift, Minus, Plus, Trash, Zap, Pencil } from "lucide-react";
import EditItem from "../other/EditItem";
import { useCart } from "../contexts/CartContext";
// import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isEditItem, setIsEditItem] = useState(null);
  const [agree, setAgree] = useState(false);

  // get total of cart
  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

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
    <div className="container mx-auto mt-[180px] ">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 max-w-xl mx-auto items-center justify-center mt-32 lg:mt-72">
          <h1 className="text-xl font-librebaskerville uppercase ">
            Your cart is currently empty.
          </h1>
          <p className="font-poppins text-sm text-gray-500 text-center">
            Before proceed to checkout you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            Website.
          </p>
          <Link
            to={"/collections/all"}
            className="font-poppins uppercase text-sm bg-zinc-900 text-white px-8 py-4 mt-4 hover:bg-green-950 transition-colors duration-300"
          >
            go to shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-librebaskerville text-center">
            Shopping Cart
          </h1>
          <div className="flex m-12 gap-8">
            {/* left side */}
            <div className=" w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className=" text-gray-500 font-poppins uppercase text-sm ">
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
                        {/* Product Column */}
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

                        {/* Quantity Column */}
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

                        {/* Total Column */}
                        <td className="border p-4 text-center font-librebaskerville text-gray-500">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </td>

                        {/* Action Column */}
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
              <div className="flex gap-1 items-center text-gray-500 font-poppins mt-8 text-sm">
                <Gift size={20} />
                <button> Add gift wrap</button>{" "}
                <p className="text-gray-700 font-normal">Only</p>
                <button className="font-poppins text-sm ml-2 px-4 py-2 border border-zinc-800 hover:bg-green-950 hover:text-white">
                  Add A Gift Wrap
                </button>
              </div>
              <div className="mt-8 font-poppins text-sm ">
                <p className="text-gray-800">
                  Speacial instructions for seller
                </p>
                <textarea
                  type="text"
                  rows={6}
                  placeholder="How can we help you ?"
                  className="border border-zinc-300 mt-4 p-2 text-gray-500 w-full rounded"
                />
              </div>
            </div>
            {/* right side*/}
            <div className="w-1/2 gap-4">
              <div className="flex flex-col h-36 gap-2 rounded bg-pink-100 p-8 font-poppins text-sm tracking-wide">
                <p className="uppercase flex items-center gap-1 text-xs font-poppins text-gray-700 font-semibold">
                  <Zap size={20} fill="yellow" />
                  Free shipping on orders $100.00
                </p>
                <p>
                  {total <= "100"
                    ? `Spend $ ${(100 - total).toFixed(
                        2
                      )} more and get free shipping!`
                    : "Congratulations , you've got free shipping!"}
                </p>
                <div
                  style={{ width: `${progressWidth}%` }}
                  className={`h-2 mt-4 w-full bg-gradient-to-r  animate-moveStripes ${
                    total < 100
                      ? " from-gray-900 via-gray-500 to-gray-900"
                      : " from-green-900 via-green-500 to-green-900 "
                  }`}
                ></div>
              </div>

              <div className="bg-gray-100 font-poppins text-sm rounded p-8 mt-8">
                <p>Get shipping estimates</p>
                <select className="w-full border rounded px-3 py-2 mb-3">
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full border rounded px-3 py-2 mb-3"
                />

                <button className="w-full group bg-zinc-700 text-white py-2 rounded mb-5  hover:bg-green-950">
                  <span className="group-hover:animate-bounceX transition-all duration-300">
                    ESTIMATE
                  </span>
                </button>

                {/* Coupon */}
                <h2 className="text-lg font-semibold mb-2">Coupon</h2>
                <p className="text-sm text-gray-500 mb-2">
                  * Discount will be calculated and applied at checkout
                </p>
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full border rounded px-3 py-2 mb-5"
                />

                {/* Subtotal */}
                <div className="mb-6">
                  <p className="font-semibold">
                    Subtotal:{" "}
                    <span className="text-black">$ {total.toFixed(2)}</span>
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  All charges are billed in{" "}
                  <strong className="font-bold text-black">USD</strong>. While
                  the content of your cart is currently displayed in , the
                  checkout will use{" "}
                  <strong className="font-bold text-black">USD</strong> at the
                  most current exchange rate.
                </p>

                {/* Terms and Conditions */}
                <label className="flex items-center gap-2 mb-4 text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="h-4 w-4"
                  />
                  I agree with the{" "}
                  <a href="#" className="text-zinc-900 underline">
                    terms and conditions
                  </a>
                </label>

                {/* Checkout button */}
                <button
                  //   onClick={handleCheckout}
                  className={`w-full bg-zinc-700 text-white py-2 rounded hover:bg-green-950 ${
                    agree ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>

          {isEditItem && <EditItem cartItem={isEditItem} onClose={() => setIsEditItem(null)} />}
        </>
      )}
    </div>
  );
};

export default Cart;
