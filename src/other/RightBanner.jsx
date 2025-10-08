import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Heart, Star, ShoppingCart } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import LoadingEffect from "../components/loadingEffect";
import Products from "../data/products";
import Leave from "../assets/Banner/leave.avif";
import { toast } from "react-toastify";

export default function RightBanner() {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [show, setShow] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState({});

  useEffect(() => {
    const shown = sessionStorage.getItem("rightAdShown");
    if (!shown) {
      setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("rightAdShown", "true");
      }, 9000); // show after 9s
    }
  }, []);

  const handleWishlist = (product) => {
    setLoadingWishlist((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setLoadingWishlist((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({ product });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (product) => {
    const selectedVariant =
      product.variants && product.variants.length > 0
        ? product.variants[0]
        : null;

    addToCart({
      product,
      selectedVariant,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  const recommendedProduct = Products.filter(
    (product) => product.id === 3 || product.id === 4 || product.id === 7
  );

  //star
  const renderStar = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={16} fill={index < rating ? "black" : "none"} />
    ));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        onClick={() => setShow(false)}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>

      {/* Modal Content */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 lg:w-[52vh] bg-white overflow-y-auto animate-fadeInRight">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 border border-gray-400 hover:bg-black hover:text-white transition-colors duration-300"
          onClick={() => setShow(false)}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex flex-col gap-4 w-full h-full pb-8">
          {/* Banner */}
          <div
            className="min-h-40 sm:min-h-52 w-full relative"
            style={{
              backgroundImage: `url(${Leave})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="absolute bottom-4 left-4 text-xl sm:text-2xl uppercase text-white font-semibold font-librebaskerville">
              before you <br /> leave ...
            </p>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-4 px-4 sm:px-6 text-center">
            <p className="text-lg sm:text-xl font-poppins text-gray-500">
              Take{" "}
              <span className="text-xl sm:text-2xl font-librebaskerville text-black">
                15% off
              </span>{" "}
              your first order
            </p>
            <p className="text-gray-500 font-poppins text-sm sm:text-base">
              Enter the code:{" "}
              <span className="border-b border-gray-800 text-black font-medium">
                FIRST15
              </span>
            </p>
            <button
              onClick={() => {
                navigate("/collections/all");
                setShow(false);
              }}
              className="text-sm sm:text-md bg-zinc-800 mt-2 text-white px-4 py-3 sm:py-2 uppercase font-poppins hover:bg-green-950 transition-colors duration-300 mx-4 sm:mx-8"
            >
              Continue Shopping
            </button>
          </div>

          {/* Recommended Products */}
          <div className="flex flex-col gap-4 px-4 sm:px-6">
            <p className="text-md font-poppins pb-4 border-b border-gray-300">
              Recommended
            </p>

            {recommendedProduct.map((product) => {
              const isProductInWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="flex gap-3 sm:gap-4 py-3 border-b border-gray-100"
                >
                  {/* Product Image */}
                  <button
                    onClick={() => {
                      navigate(
                        `/products/${product.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      );
                      setShow(false);
                    }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={product.frontImage}
                      alt={product.name}
                      className="w-20 h-24 sm:w-28 sm:h-36 object-cover rounded-md"
                    />
                  </button>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {/* Stars */}
                    <div className="flex text-gray-500">
                      {renderStar(product.rating)}
                    </div>

                    {/* Product Name */}
                    <p className="text-sm font-librebaskerville mt-1 text-gray-800 line-clamp-2">
                      {product.name}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-1 mt-1">
                      {product.discountPrice ? (
                        <div className="flex gap-2 font-poppins text-sm">
                          <p className="line-through text-gray-500">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                          <p className="text-green-600 font-semibold">
                            ${product.discountPrice.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p className="font-poppins text-sm font-semibold">
                          ${product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Color Options */}
                    {product.id !== 7 && (
                      <div className="flex gap-2 mt-2">
                        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full border-2 border-gray-300" />
                        <button
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 ${
                            product.id === 3 ? "bg-pink-400" : "bg-white"
                          }`}
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      {product.id === 7 ? (
                        // Single wishlist button for product 7
                        <button
                          onClick={() => handleWishlist(product)}
                          disabled={loadingWishlist[product.id]}
                          className={`flex items-center justify-center w-10 h-10 border border-gray-300 hover:bg-green-950 hover:text-white transition-colors duration-300 ${
                            isProductInWishlist
                              ? "bg-green-950 text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {loadingWishlist[product.id] ? (
                            <LoadingEffect size="small" />
                          ) : (
                            <Heart size={18} />
                          )}
                        </button>
                      ) : (
                        <>
                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm font-poppins hover:bg-green-950 hover:text-white transition-all duration-300 min-h-[40px]"
                          >
                            <ShoppingCart size={16} className="sm:mr-1" />
                            <span className="hidden sm:inline">
                              Add to cart
                            </span>
                            <span className="sm:hidden">Cart</span>
                          </button>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => handleWishlist(product)}
                            disabled={loadingWishlist[product.id]}
                            className={`flex items-center justify-center w-10 h-10 border border-gray-300 hover:bg-green-950 hover:text-white transition-colors duration-300 ${
                              isProductInWishlist
                                ? "bg-green-950 text-white"
                                : "text-gray-600"
                            }`}
                          >
                            {loadingWishlist[product.id] ? (
                              <LoadingEffect size="small" />
                            ) : (
                              <Heart size={18} />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
