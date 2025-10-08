import React, { useEffect, useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  CircleCheck,
  Minus,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const QuickViewModal = ({ product, onClose }) => {
  // get all images
  const images =
    product.variants?.length > 0
      ? product.variants.map((variant) => variant.image).filter(Boolean)
      : [product.frontImage, product.backImage].filter(Boolean);

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedVariantQv, setSelectedVariantQv] = useState(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [hoveredColorIndexQv, setHoveredColorIndexQv] = useState(null);
  const [quantityQv, setQuantityQv] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (selectedVariantQv) {
      const variantIndex = product.variants.findIndex(
        (variant) => variant.color === selectedVariantQv.color
      );

      if (variantIndex !== -1) {
        setImageIndex(variantIndex);
      }
    }
  }, [selectedVariantQv, product.variants]);

  const isOutOfStock = product.variants.every((variant) => !variant.inStock);

  const handleColorSelectQv = (e, variant) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariantQv(variant);
  };

  //handle add to cart logic here
  const handleAddToCartQv = () => {
    addToCart({
      product,
      selectedVariant: selectedVariantQv,
      quantity: quantityQv,
    });
    toast.success(`Added ${product.name} to cart`);
    onClose();
  };

  const displayImageQv = images[imageIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen p-2 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl mx-auto flex flex-col lg:flex-row animate-zoom-in shadow-xl max-h-[90vh] lg:max-h-[80vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 border border-gray-300 text-gray-500 hover:text-white hover:bg-black lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left side image section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-gray-50">
          {/* Mobile Image Counter */}
          <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs lg:hidden">
            {imageIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className={`absolute left-2 lg:left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white bg-opacity-80 hover:bg-green-950 hover:text-white rounded-full w-8 h-8 lg:w-10 lg:h-10 border border-gray-300 flex items-center justify-center ${
                  imageIndex === 0 ? "hidden" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={imageIndex === 0}
                type="button"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              <button
                className={`absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white bg-opacity-80 hover:bg-green-950 hover:text-white rounded-full w-8 h-8 lg:w-10 lg:h-10 border border-gray-300 flex items-center justify-center ${
                  imageIndex === images.length - 1 ? "hidden" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex((prev) =>
                    Math.min(images.length - 1, prev + 1)
                  );
                }}
                disabled={imageIndex === images.length - 1}
                type="button"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </>
          )}

          <img
            src={displayImageQv}
            alt={product.name}
            loading="lazy"
            className="object-contain w-full h-64 lg:h-96 lg:w-96"
          />
        </div>

        {/* Right information */}
        <div className="flex flex-col gap-2 py-4 px-4 lg:px-6 w-full lg:w-1/2 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="hidden lg:flex self-end border border-gray-300 text-gray-500 hover:text-white hover:bg-black p-1"
          >
            <X className="w-4 h-4 hover:rotate-90 transition-transform duration-300 hover:scale-90" />
          </button>

          <h1 className="text-xl lg:text-2xl font-librebaskerville pr-8 lg:pr-0">
            {product.name}
          </h1>

          <p className="text-gray-500 font-poppins text-sm lg:text-base">
            By{" "}
            <Link
              to={`/collections/${product.vendor
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="font-normal text-black hover:underline"
            >
              {product.vendor}
            </Link>
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            {product.discountPrice ? (
              <>
                <p className="text-gray-500 font-librebaskervilleItalic text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-gray-900 font-medium text-lg lg:text-xl">
                  ${product.discountPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-gray-800 font-medium text-lg lg:text-xl">
                $
                {selectedVariantQv
                  ? selectedVariantQv.price.toFixed(2)
                  : product.variants[0]?.price.toFixed(2)}
              </p>
            )}
          </div>

          <span className="h-px w-full bg-gray-300 my-2" />

          {/* Description - Collapsible on Mobile */}
          <div className="mb-2">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="flex items-center justify-between w-full lg:hidden"
            >
              <span className="font-poppins font-medium text-sm">
                Description
              </span>
              {showDescription ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            <div className={`${showDescription ? "block" : "hidden"} lg:block`}>
              <p className="font-poppins text-sm mt-2 text-justify text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-4">
            <p className="font-poppins text-sm font-medium mb-2">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.variants
                .filter((variant) => variant.color)
                .map((variant, index) => (
                  <div key={index} className="relative">
                    {product.id === 1 ||
                    product.id === 5 ||
                    product.id === 7 ? (
                      // Show image thumbnail if available
                      <button
                        className={`w-10 h-10 lg:w-8 lg:h-8 rounded-full border-2 shadow ${
                          isOutOfStock ? "cursor-not-allowed opacity-50" : ""
                        } ${
                          selectedVariantQv?.color === variant.color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        disabled={isOutOfStock}
                        onClick={(e) => handleColorSelectQv(e, variant)}
                        onMouseEnter={() => setHoveredColorIndexQv(index)}
                        onMouseLeave={() => setHoveredColorIndexQv(null)}
                        style={{
                          backgroundImage: `url(${variant.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></button>
                    ) : (
                      <button
                        className={`w-10 h-10 lg:w-8 lg:h-8 rounded-full border-2 ${
                          selectedVariantQv?.color === variant.color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        onClick={(e) => handleColorSelectQv(e, variant)}
                        onMouseEnter={() => setHoveredColorIndexQv(index)}
                        onMouseLeave={() => setHoveredColorIndexQv(null)}
                        style={{
                          backgroundColor: variant.hex,
                        }}
                        aria-label={`Select ${variant.color} color`}
                      />
                    )}

                    {/* Color name tooltip */}
                    {hoveredColorIndexQv === index && !isOutOfStock && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap z-50 hidden lg:block">
                        {variant.color || "Variant " + (index + 1)}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 transform rotate-45"></div>
                      </div>
                    )}

                    {/* Color name label for mobile */}
                    <div className="lg:hidden text-xs text-center mt-1 text-gray-600">
                      {selectedVariantQv?.color === variant.color &&
                        variant.color}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            {selectedVariantQv?.inStock ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <CircleCheck
                    size={20}
                    className="text-green-700 relative z-10"
                  />
                  <span className="absolute top-0 left-0 h-4 w-4 animate-ping rounded-full bg-green-700 opacity-50"></span>
                </div>
                <p className="text-sm lg:text-md font-poppins text-green-700 font-semibold">
                  In Stock
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <CircleCheck
                    size={20}
                    className="text-red-700 relative z-10"
                  />
                  <span className="absolute top-0 left-0 h-4 w-4 animate-ping rounded-full bg-red-700 opacity-50"></span>
                </div>
                <p className="text-sm lg:text-md font-poppins text-red-700">
                  Out of Stock
                </p>
              </div>
            )}
          </div>

          {/* Add to cart and quantity */}
          <div className="flex flex-col sm:flex-row w-full mt-6 gap-3">
            {!isOutOfStock ? (
              <>
                <div className="flex items-center justify-between sm:justify-center border border-gray-300 px-4 py-3 sm:py-2 sm:w-auto">
                  <button
                    onClick={() => setQuantityQv((q) => Math.max(1, q - 1))}
                    className="px-2 disabled:opacity-50"
                    disabled={quantityQv === 1}
                  >
                    <Minus size={18} />
                  </button>
                  <p className="mx-4 font-medium">{quantityQv}</p>
                  <button
                    onClick={() => setQuantityQv((q) => q + 1)}
                    className="px-2"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCartQv}
                  className="flex-1 flex items-center justify-center text-white px-4 py-3 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 hover:bg-gradient-to-r hover:from-green-950 hover:via-green-700 hover:to-green-950 transition-all duration-500 min-h-[50px]"
                >
                  <span className="text-sm lg:text-md font-poppins font-medium">
                    Add to Cart
                  </span>
                </button>
              </>
            ) : (
              <button
                className="w-full bg-gray-400 text-white px-4 py-3 cursor-not-allowed min-h-[50px]"
                disabled
              >
                <span className="text-sm lg:text-md font-poppins">
                  Out of Stock
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
