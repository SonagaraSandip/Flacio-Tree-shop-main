//Single product item with logic for image, hover, etc.
import React, { useState } from "react";
import { ShoppingBag, Heart, ArrowDownUp, Search, Star } from "lucide-react";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import QuickViewModal from "../other/QuickViewModal";
import CompareModel from "../other/CompareModel";
import AddToCartModal from "../other/AddToCartModal";
import { useWishlist } from "../contexts/WishlistContext";
import { useCompare } from "../contexts/CompareContext";
import { useCart } from "../contexts/CartContext";
import LoadingEffect from "../components/LoadingEffect";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare, compare } =
    useCompare();
  const { addToCart, cart, updateQuantity } = useCart();
  useCompare();
  // state to keep track of selected variant initial first
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showTooltip, setShowToolTip] = useState(null); // 'cart' | 'wishlist' | 'compare' | 'search' | null
  const [quickView, setQuickView] = useState(false);
  const [compareView, setCompareView] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [loading, setLoading] = useState({
    quickView: false,
    addToCart: false,
    wishlist: false,
    compare: false,
  });

  //color tooltip
  const [hoveredColorIndex, setHoveredColorIndex] = useState(null);

  // check is product is in wishlist
  const isProductInWishlist = isInWishlist(product, selectedVariant);
  const isProductInCompare = isInCompare(product, selectedVariant);

  //logic to decide which image to show
  //if hovered -> show back image if avalable else show front image
  // if not hovered -> show front image

  const displayImage =
    isHovered && product.backImage
      ? product.backImage
      : selectedVariant?.image || product.frontImage;

  const isOutOfStock = product.variants.every((variant) => !variant.inStock);

  //Quantity handlers
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  //prevent click even from bubbling to the link
  const handleActionClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();

    if (action === "cart") {
      setLoading((prev) => ({ ...prev, addToCart: true }));

      setTimeout(() => {
        setLoading((prev) => ({ ...prev, addToCart: false }));
      }, 1000); // Simulate loading for 1 second

      addToCart({ product, selectedVariant, quantity });
      setIsAddToCart(true);
      toast.success(`Added ${product.name} to cart`);
    }

    // action for Wishlist
    if (action === "Wishlist") {
      setLoading((prev) => ({ ...prev, wishlist: true }));

      setTimeout(() => {
        setLoading((prev) => ({ ...prev, wishlist: false }));
      }, 1000); // Simulate loading for 1 second

      if (isProductInWishlist) {
        removeFromWishlist(
          `${product.id}`,
          toast.success(`Removed ${product.name} from Wishlist`)
        );
      } else {
        addToWishlist({ product, selectedVariant });
        toast.success(`Added ${product.name} to wishlist`);
      }
    }

    if (action === "compare") {
      setLoading((prev) => ({ ...prev, compare: true }));

      setTimeout(() => {
        setLoading((prev) => ({ ...prev, compare: false }));
        // setCompareView(true);
      }, 1000);

      if (isProductInCompare) {
        removeFromCompare(
          `${product.id}-${selectedVariant?.color || "default"}`,
          toast.success(`Removed ${product.name} from CompareList`)
        );
      } else {
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, compare: false }));
        }, 1000);
        addToCompare({ product, selectedVariant });
        setCompareView(true);
        toast.success(`Added ${product.name} to CompareList`);
      }
    }

    // action for Quick view
    if (action === "QuickView") {
      setLoading((prev) => ({ ...prev, quickView: true }));

      setTimeout(() => {
        setLoading((prev) => ({ ...prev, quickView: false }));
        setQuickView(true);
      }, 1000); // Simulate loading for 1 second
    }
  };

  //handle color selection
  const handleColorSelect = (e, variant) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(variant);
  };

  //resuable tooltip
  const Tooltip = ({ text, show }) => (
    <div
      className={`hidden md:flex absolute right-full top-1/2 -translate-y-1/2 mr-2  items-center transition-all duration-300 pointer-events-none ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } ${showQuantity ? "translate-x-[-70px]" : "translate-x-0"} `}
    >
      <span className="flex whitespace-nowrap text-center justify-center items-center h-[28px] bg-gray-700 text-white text-xs px-3 rounded">
        {text}
      </span>
      <MdPlayArrow size={28} className="text-gray-700 -ml-1" />
    </div>
  );

  // get total of cart
  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  // star calculation
  const renderStar = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={12} fill={index < rating ? "black" : "none"} />
    ));
  };

  return (
    <>
      <div
        className="relative overflow-hidden group transition p-3 sm:p-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false), setShowQuantity(false), setShowToolTip(null);
        }}
      >
        <Link
          to={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="block"
        >
          {/* Discount badge otherwise out of stock*/}
          <div className="absolute z-10 text-[10px] sm:text-xs top-6 sm:top-6 left-4 sm:left-2 px-2 text-white ">
            {isOutOfStock ? (
              <div className="bg-gray-500 px-2 py-0.5 sm:px-3 sm:py-1">
                Out of Stock
              </div>
            ) : product.discountPercent ? (
              <div className="bg-red-700 px-2 py-0.5 sm:px-3 sm:py-1">
                - {product.discountPercent}%
              </div>
            ) : null}
          </div>

          <div className="lg:hidden absolute top-6 sm:top-6 right-4 sm:right-2 flex flex-col gap-2 z-10">
            <button
              onClick={(e) => handleActionClick(e, "Wishlist")}
              className={`p-1 sm:p-2 border border-gray-200 ${
                isProductInWishlist ? "bg-green-950 text-white" : "bg-white"
              }`}
              disabled={loading.wishlist}
              aria-label="Wishlist"
            >
              {loading.wishlist ? (
                <LoadingEffect size="small" />
              ) : (
                <Heart size={16} />
              )}
            </button>

            <button
              onClick={(e) => handleActionClick(e, "QuickView")}
              className="p-1 sm:p-2 border border-gray-200 bg-white"
              disabled={loading.quickView}
              aria-label="Quick view"
            >
              {loading.quickView ? (
                <LoadingEffect size="small" />
              ) : (
                <Search size={16} />
              )}
            </button>
          </div>

          {/* Product image */}
          <div className="relative mt-1 sm:mt-2">
            <div className="overflow-hidden ">
              <img
                src={displayImage}
                alt={product.name}
                loading="lazy"
                className="w-full h-full aspect-[4/5] object-cover max-w-full cursor-pointer transition-transform duration-500  hover:scale-110"
                style={{
                  transitionDelay: isHovered ? "0.5s" : "0s",
                }}
              />
            </div>

            {/* name + price */}
            <div className="mt-3 sm:mt-4 ">
              <div className="flex gap-1 my-0.5 sm:my-1 opacity-70">
                {renderStar(product.rating)}
              </div>
              <h2 className="text-sm sm:text-base font-normal font-librebaskerville line-clamp-1">
                {product.name}
              </h2>
              <div className="flex sm:items-center gap-1 sm:gap-2 mt-1">
                {product.discountPrice ? (
                  <>
                    <p className="text-gray-500 font-librebaskervilleItalic text-sm sm:text-base line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                    <p className="text-red-600 font-librebaskerville text-sm sm:text-base">
                      ${product.discountPrice.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 font-librebaskerville text-sm sm:text-md">
                    $
                    {selectedVariant
                      ? selectedVariant.price.toFixed(2)
                      : product.variants[0].price.toFixed(2)}
                  </p>
                )}

                {product.PreOrder && (
                  <p className="hidden md:block text-green-500 font-librebaskerville text-xs sm:text-md">
                    ( Pre-order )
                  </p>
                )}
              </div>
            </div>

            {/* Color dots */}
            {!isOutOfStock && (
              <div className="flex space-x-2 mt-2 ">
                {product.variants
                  .filter((variant) => variant.color)
                  .map((variant, index) => (
                    <div key={index} className="relative overflow-x-visible">
                      {product.id === 1 || product.id === 5 ? (
                        //show image thumbnail if available
                        <button
                          className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2 shadow   ${
                            selectedVariant?.color === variant.color
                              ? "border-black"
                              : "border-transparent"
                          }`}
                          onClick={(e) => handleColorSelect(e, variant)}
                          onMouseEnter={() => setHoveredColorIndex(index)}
                          onMouseLeave={() => setHoveredColorIndex(null)}
                          style={{
                            backgroundImage: `url(${variant.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></button>
                      ) : (
                        <button
                          className={`w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2   ${
                            selectedVariant?.color === variant.color
                              ? "border-black"
                              : "border-gray-200"
                          }`}
                          onClick={(e) => handleColorSelect(e, variant)}
                          onMouseEnter={() => setHoveredColorIndex(index)}
                          onMouseLeave={() => setHoveredColorIndex(null)}
                          style={{
                            backgroundColor: variant.hex,
                          }}
                          aria-label={`Select ${variant.color} color`}
                        />
                      )}
                      {hoveredColorIndex === index && (
                        <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap z-80">
                          {variant.color || "Variant " + (index + 1)}
                          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 transform rotate-45"></div>
                        </div>
                      )}
                    </div>
                  ))}

                  
                {product.PreOrder && (
                  <p className="md:hidden text-green-500 font-librebaskerville text-sm">
                    ( Pre-order )
                  </p>
                )}
              </div>
            )}
          </div>
        </Link>

        {/* show only in mobile view */}
        <div className="md:hidden mt-3 flex items-center w-full">
          {/* quantity and add to cart bottom control */}
          <div className="flex items-center border border-gray-300  overflow-hidden">
            <button
              className="w-9 h-9 flex items-center justify-center text-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(-1);
              }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 text-sm">{quantity}</span>
            <button
              className="w-9 h-9 flex items-center justify-center text-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(1);
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* whishlist */}
          <div className="flex items-center w-full gap-2">
            <button
              onClick={(e) => handleActionClick(e, "cart")}
              className="px-3 py-2 w-full border border-gray-300 text-gray-800 text-sm"
              disabled={loading.addToCart || !selectedVariant?.inStock}
              aria-label="Add to cart"
            >
              {loading.addToCart ? (
                <LoadingEffect size="small" />
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <ShoppingBag size={20} />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Hovered icons - Placed OUTSIDE the Link to prevent navigation */}
        <div className="hidden lg:block">
          {isHovered && (
            <div className=" absolute top-6 right-2 flex flex-col gap-2 z-20 transition-all duration-300 animate-fade-in-up">
              {selectedVariant?.inStock && (
                <div className="relative transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
                  {/* Add to Cart tooltip */}
                  <Tooltip text="Add to Cart" show={showTooltip === "cart"} />

                  {/* Shopping bag button */}
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => {
                      setShowQuantity(true);
                      setShowToolTip("cart");
                    }}
                    onMouseLeave={() => {
                      setShowQuantity(false);
                      setShowToolTip(null);
                    }}
                  >
                    <button
                      onClick={(e) => handleActionClick(e, "cart")}
                      className={`relative z-10 bg-white p-3 hover:bg-green-950 hover:text-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                        showQuantity ? "translate-x-[-100px]" : "translate-x-0"
                      }`}
                      disabled={loading.addToCart}
                    >
                      {loading.addToCart ? (
                        <LoadingEffect size="medium" />
                      ) : (
                        <ShoppingBag size={24} />
                      )}
                    </button>
                    {showQuantity && (
                      <div
                        onMouseEnter={() => setShowQuantity(true)}
                        className={`absolute -left-24 pl-12 flex items-center bg-white rounded-full shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
                          showQuantity
                            ? "opacity-100 w-auto px-2 py-2"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(-1);
                          }}
                        >
                          -
                        </button>{" "}
                        <span className="mx-2 text-sm">{quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Whishlist */}
              <div className="translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
                <Tooltip
                  text={
                    isProductInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  show={showTooltip === "wishlist"}
                />
                <button
                  onClick={(e) => handleActionClick(e, "Wishlist")}
                  className={`p-3 rounded-full shadow hover:bg-green-950 hover:text-white transition hover:scale-110 hover:opacity-100 ${
                    isProductInWishlist
                      ? "bg-green-950 text-white"
                      : "bg-white text-black"
                  }`}
                  onMouseEnter={() => setShowToolTip("wishlist")}
                  onMouseLeave={() => setShowToolTip(null)}
                  disabled={loading.wishlist}
                >
                  {loading.wishlist ? (
                    <LoadingEffect size="medium" />
                  ) : (
                    <Heart size={24} />
                  )}
                </button>
              </div>

              {/* compare */}
              <div className=" translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
                <Tooltip
                  text={
                    isProductInCompare
                      ? "Remove from compare"
                      : "Add to compare"
                  }
                  show={showTooltip === "compare"}
                />
                <button
                  onClick={(e) => handleActionClick(e, "compare")}
                  className={`p-3 rounded-full shadow hover:bg-green-950 hover:text-white transition-colors duration-300 ${
                    isProductInCompare
                      ? "bg-green-950 text-white"
                      : "bg-white text-black"
                  }`}
                  onMouseEnter={() => setShowToolTip("compare")}
                  onMouseLeave={() => setShowToolTip(null)}
                  disabled={loading.compare}
                >
                  {loading.compare ? (
                    <LoadingEffect size="medium" />
                  ) : (
                    <ArrowDownUp size={24} />
                  )}
                </button>
              </div>
              {/* Quick view */}
              <div className="translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
                <Tooltip
                  text="Quick View"
                  show={showTooltip === "Quick View"}
                />
                <button
                  onClick={(e) => handleActionClick(e, "QuickView")}
                  className="bg-white  p-3 rounded-full shadow hover:bg-green-900 hover:text-white transition hover:scale-110 hover:opacity-100"
                  onMouseEnter={() => setShowToolTip("Quick View")}
                  onMouseLeave={() => setShowToolTip(null)}
                  disabled={loading.quickView}
                >
                  {loading.quickView ? (
                    <LoadingEffect size="medium" />
                  ) : (
                    <Search size={24} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* if Quick view is open */}
      {quickView && (
        <QuickViewModal
          product={product}
          intialVariant={selectedVariant}
          onClose={() => setQuickView(false)}
        />
      )}

      {/* if compare view is open */}
      {compareView && compare.length > 0 && (
        <CompareModel product={product} onClose={() => setCompareView(false)} />
      )}

      {/*if Add to cart is open */}
      {isAddToCart && (
        <AddToCartModal
          product={product}
          selectedVariant={selectedVariant}
          onClose={() => setIsAddToCart(false)}
          cart={cart}
          total={total}
          updateQuantity={updateQuantity}
        />
      )}
    </>
  );
};

export default React.memo(ProductCard);
