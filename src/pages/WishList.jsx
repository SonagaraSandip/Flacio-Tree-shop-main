import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { toast } from "react-toastify";
import ProductCard from "../data/ProductCard";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

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
    <div className="container mx-auto pt-20 sm:pt-24 lg:pt-[120px]">
      <div className="flex flex-col gap-2 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-14 border-b border-gray-300">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-librebaskerville text-center lg:text-left">
          wishlist
        </h1>
        <div className="flex gap-2 font-poppins text-sm sm:text-md justify-center sm:justify-start">
          <Link to={"/"} className="underline ">
            Home
          </Link>
          /<span className="text-gray-600">wishlist</span>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 sm:px-6">
          <div className="text-lg sm:text-xl text-center font-poppins text-gray-500 mb-6 sm:mb-8 ">
            There are no products in wishlist
          </div>
          <Link
            to={"/collections/all"}
            className="border border-gray-500 px-4 sm:px-6 py-2 sm:py-3 font-poppins text-sm sm:text-lg bg-green-950 text-white hover:bg-gradient-to-r from-green-950 via-green-800 to-green-950 hover:animate-moveStripes-slow transition-all duration-300 text-center"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 mb-12 sm:mb-20 px-3 sm:px-4 lg:px-6">
          {wishlist.map((item) => (
            <div key={item.id} className="relative ">
              <ProductCard product={item.product} />
              <button
                onClick={(e) => handleRemoveWishlist(e, item.id)}
                className="hidden md:block absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-2 bg-white rounded-full p-1 sm:p-1.5 lg:p-1 shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110"
              >
                {/* <Tooltip text="Remove from wishlist" onMouseEnter={() => setShowToolTip("wishlist")} /> */}

                <div className="flex flex-col items-center gap-1 lg:gap-2 rounded-full transition-all duration-300">
                  <div className="group relative rounded-full">
                    <X />
                    <div className="bg-zinc-700 p-1 sm:p-2 rounded-md hidden lg:group-hover:flex absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full">
                      <span className="text-gray-200 whitespace-nowrap text-xs sm:text-sm">
                        Remove from wishlist
                      </span>
                      <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
              </button>

              {/* show this in mobile  */}
              <button
                onClick={(e) => handleRemoveWishlist(e, item.id)}
                className="md:hidden absolute top-4 left-3 sm:left-3 bg-white rounded-full p-1 sm:p-1.5 lg:p-1 shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110"
              >
                <div className="flex flex-col items-center gap-1 lg:gap-2 rounded-full transition-all duration-300">
                  <div className="group relative rounded-full">
                    <X size={16} />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WishList;
