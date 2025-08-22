//Single product item with logic for image, hover, etc.

import React, { useState,  } from "react";
import { ShoppingBag, Heart, ArrowDownUp, Search } from "lucide-react";
import { MdPlayArrow } from "react-icons/md";

const ProductCard = ({ product }) => {
  // state to keep track of selected variant  initial first
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showTooltip, setShowToolTip] = useState(null); // 'cart' | 'wishlist' | 'compare' | 'search' | null

  //color tooltip
  const [hoveredColorIndex, setHoveredColorIndex] = useState(null);

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

  //resuable tooltip
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

  return (
    <div
      className="relative overflow-hidden group transition "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false), setShowQuantity(false), setShowToolTip(null);
      }}
    >
      {/* Discount badge otherwise out of stock*/}
      <div className="absolute z-10 text-xs top-3 left-2 px-2  text-white ">
        {isOutOfStock ? (
          <div className="bg-gray-500 px-3 py-1">Out of Stock</div>
        ) : product.discountPercent ? (
          <div className="bg-red-700 px-3 py-1">
            - {product.discountPercent}%
          </div>
        ) : null}
      </div>

      {/* Product image */}
      <div className="relative">
        <div className="overflow-hidden ">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover max-w-full max-h-full  cursor-pointer transition-transform duration-500  hover:scale-110"
            style={{
              transitionDelay: isHovered ? "0.5s" : "0s",
            }}
          />
        </div>

        {/* Hovered icons */}
        {isHovered && (
          <div className=" absolute  top-2 right-2 flex flex-col gap-2 z-20 transition-transform duration-500 ease-out-in">
            {selectedVariant?.inStock && (
              <div className="relative transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
                {/* Add to Cart tooltip */}
                <Tooltip text="Add to Cart" show={showTooltip === "cart"} />

                {/* Shopping bag button */}
                <div
                  className="relative group"
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
                    onClick={() => {
                      console.log(`Added ${quantity} ${product.name} to cart`);
                    }}
                    className={`bg-white p-3 rounded-full shadow-md transition-all duration-300 ease-in-out ${
                      isHovered ? "-translate-x-0" : ""
                    } hover:bg-green-500 hover:text-white`}
                  >
                    <ShoppingBag size={24} />
                  </button>
                  {showQuantity && (
                    <div
                      onMouseEnter={() => setShowQuantity(true)}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-full shadow-lg p-1 z-20"
                    >
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(-1);
                        }}
                      >
                        -
                      </button>{" "}
                      <span className="mx-2 text-sm">{quantity}</span>
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
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
            <div className=" translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
              <Tooltip
                text="add to wishlist"
                show={showTooltip === "wishlist"}
              />
              <button
                className="bg-white  p-3 rounded-full shadow hover:bg-green-500 transition hover:scale-110 hover:animate-pulse   hover:opacity-100"
                onMouseEnter={() => setShowToolTip("wishlist")}
                onMouseLeave={() => setShowToolTip(null)}
              >
                <Heart size={24} />
              </button>
            </div>

            <div className=" translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
              <Tooltip text="Compare" show={showTooltip === "compare"} />
              <button
                className="bg-white  p-3 rounded-full shadow hover:bg-green-500 transition hover:scale-110 hover:animate-pulse  hover:opacity-100 "
                onMouseEnter={() => setShowToolTip("compare")}
                onMouseLeave={() => setShowToolTip(null)}
              >
                <ArrowDownUp size={24} />
              </button>
            </div>

            <div className=" translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 delay-100">
              <Tooltip text="Search" show={showTooltip === "search"} />
              <button
                className="bg-white  p-3 rounded-full shadow hover:bg-green-500 transition hover:scale-110 hover:animate-pulse  hover:opacity-100"
                onMouseEnter={() => setShowToolTip("search")}
                onMouseLeave={() => setShowToolTip(null)}
              >
                <Search size={24} />
              </button>
            </div>
          </div>
        )}

        {/* name + price */}
        <div className="mt-2 ">
          <h2 className="text-md font-librebaskerville ">{product.name}</h2>
          <div className="flex items-center gap-2">
            {product.discountPercent ? (
              <>
                <p className="text-gray-500 font-librebaskervilleItalic text-md line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-red-600 font-librebaskerville text-md">
                  $
                  {(
                    product.originalPrice *
                    (1 - product.discountPercent / 100)
                  ).toFixed(1)}
                </p>
              </>
            ) : (
              <p className="text-gray-500 font-librebaskerville text-md">
                $
                {selectedVariant
                  ? selectedVariant.price.toFixed(2)
                  : product.variants[0].price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Color dots */}
        {!isOutOfStock && (
          <div className="flex space-x-2  mt-2 ">
            {product.variants.map((variant, index) => (
              <div key={index} className="relative overflow-x-visible">
                {product.id === 1 || product.id === 5 ? (
                  //show image thumbnail if available
                  <button
                    className={`w-5 h-5 rounded-full border-2 shadow   ${
                      selectedVariant?.color === variant.color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
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
                    className={`w-5 h-5 rounded-full border-2   ${
                      selectedVariant?.color === variant.color
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                    onMouseEnter={() => setHoveredColorIndex(index)}
                    onMouseLeave={() => setHoveredColorIndex(null)}
                    style={{
                      backgroundColor: variant.hex,
                    }}
                    aria-label={`Select ${variant.color} color`}
                  />
                )}
                {hoveredColorIndex === index && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap z-80">
                    {variant.color || "Variant " + (index + 1)}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 transform rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
