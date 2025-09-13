import React, { useEffect, useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  CircleCheck,
  Minus,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
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
    toast.success(`Added ${quantityQv} ${product.name} to cart successfully`);
  };

  const displayImageQv = images[imageIndex];
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white w-full max-w-3xl mx-auto flex animate-zoom-in shadow-xl"
      >
        {/*left side image section*/}
        <div className="w-1/2 flex items-center relative transition-all duration-300">
          <button
            className={`absolute top-1/2 left-2 cursor-pointer bg-gray-200 hover:bg-green-950 hover:text-white rounded-full w-10 h-10 border border-black flex items-center justify-center ${
              imageIndex === 0 ? "hidden" : ""
            }`}
            onClick={() => setImageIndex((prev) => Math.max(0, prev - 1))}
            disabled={imageIndex === 0}
            type="button"
          >
            <ChevronLeft />
          </button>
          <img
            src={displayImageQv}
            alt={product.name}
            loading="lazy"
            className="object-cover w-96"
          />
          <button
            className={`absolute top-1/2 right-6 cursor-pointer bg-gray-100 rounded-full w-10 h-10 hover:bg-green-950 hover:text-white border border-black flex items-center justify-center ${
              imageIndex === images.length - 1 ? "hidden" : ""
            }`}
            onClick={() =>
              setImageIndex((prev) => Math.min(images.length - 1, prev + 1))
            }
            disabled={imageIndex === images.length - 1}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>

        {/*Right information */}
        <div className="flex flex-col gap-2 py-2 px-4 w-1/2">
          <button
            onClick={onClose}
            className=" flex self-end border border-gray-300 text-gray-500 hover:text-white hover:bg-black "
          >
            <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
          </button>
          <h1 className="text-2xl font-librebaskerville">{product.name}</h1>
          <p className="text-gray-500 font-poppins">
            By{" "}
            <Link
              to={`/collections/${(product.vendor).toLowerCase().replace(/\s+/g, "-")}`}
              className="font-normal text-black"
            >
              {product.vendor}
            </Link>
          </p>
          {/* price */}
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <p className="text-gray-500 font-librebaskervilleItalic text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-gray-900 font-medium text-lg">
                  ${product.discountPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-gray-800 font-medium  text-lg">
                $
                {selectedVariantQv
                  ? selectedVariantQv.price.toFixed(2)
                  : product.variants[0].price.toFixed(2)}
              </p>
            )}
          </div>

          <span className="h-px w-full bg-gray-300" />

          <p className="font-poppins text-sm mt-2 pr-6 text-justify text-gray-500">
            {product.description}
          </p>

          {/* color dots */}
          <div className="flex space-x-2 mt-2 ">
            {product.variants
              .filter((variant) => variant.color)
              .map((variant, index) => (
                <div key={index} className="relative overflow-x-visible">
                  {product.id === 1 || product.id === 5 || product.id === 7 ? (
                    //show image thumbnail if available
                    <button
                      className={`w-8 h-8 rounded-full border-2 shadow ${
                        isOutOfStock ? "cursor-not-allowed" : ""
                      }  ${
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
                      className={`w-8 h-8 rounded-full border-2   ${
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
                  {hoveredColorIndexQv === index && !isOutOfStock && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap z-80">
                      {variant.color || "Variant " + (index + 1)}
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* In stock status */}
          {selectedVariantQv?.inStock ? (
            <div className="relative flex items-center mt-2 gap-1">
              <CircleCheck
                size={20}
                className="relative inline-flex text-green-700 rounded-full shadow-3xl mr-2"
              />
              <span className="absolute inline-flex left-[2px] h-4 w-4 animate-ping rounded-full bg-green-700 opacity-50"></span>
              <p className=" text-md font-poppins text-green-700 font-semibold">
                In Stock
              </p>
            </div>
          ) : (
            <div className="relative flex items-center mt-2 gap-2">
              <span class="absolute inline-flex left-[2px] h-4 w-4 animate-ping rounded-full bg-red-700 opacity-70 "></span>
              <CircleCheck
                size={20}
                className="relative inline-flex text-red-700 rounded-full shadow-3xl "
              />

              <p className="text-md font-poppins text-red-700 ">
                Out of Stock{" "}
              </p>
            </div>
          )}

          {/*Add to cart and counte button*/}
          <div className="flex w-full mt-4 gap-2">
            {!isOutOfStock ? (
              <>
                <div className="flex items-center self-center gap-2 border border-gray-300 px-4 py-3">
                  <button
                    onClick={() => setQuantityQv((q) => Math.max(1, q - 1))}
                    className=" px-3 "
                    disabled={quantityQv === 1}
                  >
                    <Minus size={20} />
                  </button>
                  <p>{quantityQv}</p>

                  <button
                    onClick={() => setQuantityQv((q) => q + 1)}
                    className="px-3 "
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCartQv(selectedVariantQv)}
                  className="w-full flex items-center justify-center text-white  px-4 py-3 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 hover:bg-gradient-to-r hover:from-green-950 hover:via-green-700 hover:to-green-950 hover:animate-moveStripes-slow transition-all duration-500 "
                >
                  <span className="text-md font-poppins transition-transform duration-300">
                    Add to Cart
                  </span>
                </button>
              </>
            ) : (
              <button
                className="w-full bg-gray-400 text-white px-4 py-3 cursor-not-allowed"
                disabled
              >
                <span className="text-md font-poppins">Out of Stock</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
