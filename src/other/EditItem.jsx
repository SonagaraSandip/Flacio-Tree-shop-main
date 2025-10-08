import React, { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const EditItem = ({ cartItem, onClose }) => {
  const { updateQuantity, removeFromCart, addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(cartItem.variant);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [hoveredColorIndexQv, setHoveredColorIndexQv] = useState(null);

  // Handle quantity change with validation
  const handleQuantityChange = (newQuantity) => {
    // Ensure quantity is at least 1
    setQuantity(Math.max(1, newQuantity));
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  //handle replace item
  const handleReplaceItem = () => {
    //if the variant is change, we need to remove the old item and the new one
    if (selectedVariant.color !== cartItem.variant.color) {
      removeFromCart(cartItem.id);
      addToCart({
        product: cartItem.product,
        selectedVariant: selectedVariant,
        quantity: quantity,
      });
    } else {
      // if only quntity change just update it
      updateQuantity(cartItem.id, quantity);
    }

    onClose();
  };

  const imageProductIds = [1, 2, 5, 7]; // Added ID 2 for Tiger Aloe

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl mx-auto flex flex-col sm:flex-row animate-zoom-in shadow-xl max-h-[90vh] sm:max-h-[400px] overflow-hidden"
      >
        <button
          className="absolute top-2 right-2 cursor-pointer bg-white border border-gray-800 hover:bg-black hover:text-white z-10"
          onClick={onClose}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>

        {/* product image */}
        <div className="w-full sm:w-1/2 h-52 sm:h-auto">
          <img
            src={selectedVariant?.image}
            alt={cartItem.product?.name}
            className="w-1/2 h-52 sm:w-full sm:h-full object-cover"
          />
        </div>

        {/* product details */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-1/2 p-4 sm:p-6 overflow-y-auto">
          <p className="font-librebaskerville text-xl sm:text-2xl">
            {cartItem.product.name}
          </p>

          <div className="flex gap-1">
            <p className="text-gray-500 text-xs font-poppins">
              Color : {selectedVariant.color}
            </p>
          </div>

          {/* color dots */}
          <div className="flex flex-wrap gap-2 mt-2">
            {cartItem.product.variants
              .filter((variant) => variant.color)
              .map((variant, index) => (
                <div key={index} className="relative">
                  {imageProductIds.includes(cartItem.product.id) ? (
                    //show image thumbnail if available
                    <button
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 shadow ${
                        selectedVariant?.color === variant.color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleVariantChange(variant)}
                      onMouseEnter={() => setHoveredColorIndexQv(index)}
                      onMouseLeave={() => setHoveredColorIndexQv(null)}
                      aria-label={`Select ${variant.color} color`}
                      style={{
                        backgroundImage: `url(${variant.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></button>
                  ) : (
                    <button
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
                        selectedVariant?.color === variant.color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleVariantChange(variant)}
                      onMouseEnter={() => setHoveredColorIndexQv(index)}
                      onMouseLeave={() => setHoveredColorIndexQv(null)}
                      style={{
                        backgroundColor: variant.hex,
                      }}
                      aria-label={`Select ${variant.color} color`}
                    />
                  )}
                  {hoveredColorIndexQv === index && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap z-50">
                      {variant.color || "Variant " + (index + 1)}
                      <div className="absolute  left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Price display */}
          <p className="text-gray-700 font-poppins text-sm sm:text-base">
            ${selectedVariant.price.toFixed(2)}
          </p>

          {/* Quantity selection and button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            <div className="flex items-center gap-1 border border-gray-300 px-1 py-1 w-fit">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity === 1}
              >
                <Minus size={14} className="sm:w-4 sm:h-4" />
              </button>
              <p className="px-3 border-x border-gray-300 py-1 text-sm sm:text-base">
                {quantity}
              </p>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <Plus size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
            <button
              onClick={handleReplaceItem}
              className="uppercase border border-gray-700 px-4 py-2 text-xs font-poppins bg-zinc-700 text-white hover:bg-green-950 transition-colors duration-300 w-full sm:w-auto text-center"
            >
              replace item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;