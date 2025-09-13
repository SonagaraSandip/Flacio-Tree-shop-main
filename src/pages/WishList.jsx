import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../data/ProductCard";
import { MdPlayArrow } from "react-icons/md";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const Tooltip = ({ text, show }) => (
    <div
      className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 flex items-center  transition-all duration-300 pointer-events-none ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } `}
    >
      <span className="flex whitespace-nowrap text-center justify-center items-center h-[28px] bg-gray-700 text-white text-xs px-3 rounded">
        {text}
      </span>
      <MdPlayArrow size={28} className="text-gray-700 -ml-1" />
    </div>
  );

  const handleRemoveWishlist = (e, itemId) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(itemId);
    toast.success(
      `${
        wishlist.find((item) => item.id === itemId).product.name
      } removed from wishlist`
    );
  };

  return (
    <div className="container mx-auto mt-[150px] my-8 px-1">
      <div className="flex flex-col gap-2 pb-8 px-14 border-b border-gray-300">
        <h1 className="text-6xl font-librebaskerville ">wishlist</h1>
        <div className="flex gap-2 font-poppins text-md">
          <Link to={"/"} className="underline ">
            Home
          </Link>
          /<span>wishlist</span>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center text-pop
       text-xl text-gray-500 "
          >
            There are no products in wishlist
          </div>
          <Link
            to={"/collections/all"}
            className="border border-gray-500 px-6 py-2 mt-4 font-poppins text-lg bg-green-950 text-white hover:bg-gradient-to-r from-green-950 via-green-800 to-green-950 hover:animate-moveStripes-slow transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 px-4 ">
          {wishlist.map((item) => (
            <div key={item.id} className="relative ">
              <ProductCard product={item.product} />
              <button
                onClick={(e) => handleRemoveWishlist(e, item.id)}
                className="absolute top-4 right-2 bg-white  rounded-full p-1 shadow transition-all duration-300 z-10"
              >
                {/* <Tooltip text="Remove from wishlist" onMouseEnter={() => setShowToolTip("wishlist")} /> */}
              

                <div className="flex flex-col items-center gap-2 rounded-full p-1 transition-all duration-300">
                  <div className="group relative rounded-full">
                    <X />
                    <div className="bg-zinc-700 p-1 rounded-md group-hover:flex hidden absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full">
                      <span className="text-gray-200 whitespace-nowrap text-sm">Remove from wishlist</span>
                      <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
