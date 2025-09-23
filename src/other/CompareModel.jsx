import React, { useState } from "react";
import { CircleCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import AddToCartModal from "../other/AddToCartModal";
import { useCompare } from "../contexts/CompareContext";
import { toast } from "react-toastify";

const CompareModel = ({ onClose }) => {
  const { compare, removeFromCompare } = useCompare();

  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const initial = {};
    compare.forEach((item) => {
      initial[item.id] = item.product.variants[0]; // default to first variant
    });
    return initial;
  });

  //handle variant select
  const handleVariantSelect = (productId, variant) => {
    setSelectedVariant((prev) => ({ ...prev, [productId]: variant }));
  };

  // Handle Add to Cart button click
  const handleAddToCartClick = (product) => {
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex  bg-zinc-900 bg-opacity-60 w-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative animate-zoom-in max-w-8xl mx-auto p-6 w-full"
      >
        <button
          className="absolute top-10 right-14 cursor-pointer bg-white border border-gray-800 p-1 hover:bg-black hover:text-white"
          onClick={onClose}
        >
          <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>

        <div className="overflow-x-auto mx-4 h-[650px] bg-white border">
          <table className="min-w-max border-collapse ">
            <thead>
              <tr>
                <td className="w-1/6 z-10 p-4 bg-gray-100 sticky left-0"></td>
                {compare.map((item) => (
                  <td key={item.product.id} className="border p-4 ">
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="flex group items-center justify-center w-full gap-1 font-normal text-md text-gray-500"
                    >
                      <X
                        size={20}
                        className="group-hover:rotate-90 transition-transform duration-300 hover:scale-90"
                      />
                      <span>Remove</span>
                    </button>
                  </td>
                ))}
              </tr>
              {/* product row */}
              <tr>
                <th className="w-1/6 z-10 border p-4 font-poppins sticky left-0 text-start font-normal bg-gray-100">
                  Product
                </th>
                {compare.map((item) => {
                  const variant = selectedVariant[item.id];
                  return (
                    <td key={item.id} className="border p-4 text-center">
                      <h2 className="text-sm font-poppins mb-2">
                        {item.product.name}
                      </h2>
                      <Link
                        to={`/products/${item.product.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <img
                          src={variant?.image || item.product.frontImage}
                          alt={item.product.name}
                          className="w-60 h-80 object-cover mx-auto"
                        />
                      </Link>
                    </td>
                  );
                })}
              </tr>

              {/* Variant Row */}
              <tr>
                <td className="w-1/6 z-10 border p-4 font-poppins font-normal sticky left-0 bg-gray-100">
                  Variant
                </td>
                {compare.map((item) => {
                  const variantImage = selectedVariant[item.id];
                  const currentProduct = item.product;
                  return (
                    <td key={item.id} className="border p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-2">
                        {currentProduct.variants
                          .filter((variant) => variant.color)
                          .map((variant, idx) =>
                            variant.hex ? (
                              <button
                                key={idx}
                                className={`w-6 h-6 rounded-full border-2 shadow ${
                                  variantImage?.color === variant.color
                                    ? "border-black"
                                    : "border-gray-200"
                                }`}
                                onClick={() =>
                                  handleVariantSelect(item.id, variant)
                                }
                                style={{ backgroundColor: variant.hex }}
                              />
                            ) : (
                              !currentProduct.outOfStock && (
                                <button
                                  key={idx}
                                  className={`w-6 h-6 rounded-full border-2 shadow ${
                                    variantImage?.color === variant.color
                                      ? "border-black"
                                      : "border-gray-200"
                                  }`}
                                  onClick={() =>
                                    handleVariantSelect(item.id, variant)
                                  }
                                  style={{
                                    backgroundImage: `url(${variant.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                />
                              )
                            )
                          )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Availability row */}
              <tr>
                <td className="w-1/6 z-10 border p-4 font-poppins font-normal sticky left-0 bg-gray-100">
                  Availability
                </td>
                {compare.map((item) => {
                  const variant = selectedVariant[item.id];
                  return (
                    <td key={item.id} className="border p-4 text-center">
                      {variant?.inStock ? (
                        <div className="relative flex items-center justify-center text-center mt-2 gap-1">
                          <CircleCheck
                            size={20}
                            className="relative inline-flex text-green-700 rounded-full shadow-3xl mr-2"
                          />
                          {/* <span className="absolute inline-flex lg:left-[75px] h-4 w-4 animate-ping rounded-full bg-green-700 opacity-50"></span> */}
                          <p className=" text-md font-poppins text-green-700 font-semibold">
                            In Stock
                          </p>
                        </div>
                      ) : (
                        <div className="relative flex items-center justify-center text-center mt-2 gap-2">
                          {/* <span className="absolute inline-flex left-0 lg:left-[60px] h-4 w-4 animate-ping rounded-full bg-red-700 opacity-70 "></span> */}
                          <CircleCheck
                            size={20}
                            className="relative inline-flex text-red-700 rounded-full shadow-3xl "
                          />

                          <p className="text-md font-poppins text-red-700 ">
                            Out of Stock{" "}
                          </p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Price row */}
              <tr>
                <td className="w-1/6 z-10 border p-4 font-poppins font-normal sticky left-0 bg-gray-100">
                  Price
                </td>
                {compare.map((item) => {
                  const variant = selectedVariant[item.id];
                  const currentProduct = item.product;
                  return (
                    <td key={item.id} className="border p-4 text-center">
                      <div className="flex items-center justify-center text-center gap-2">
                        {currentProduct.discountPrice ? (
                          <>
                            <p className="text-gray-500 font-librebaskervilleItalic text-xl line-through">
                              ${currentProduct.originalPrice.toFixed(2)}
                            </p>
                            <p className="text-gray-900 font-librebaskerville text-xl">
                              ${currentProduct.discountPrice.toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-800 text-center self-center font-librebaskerville text-xl">
                            $
                            {variant
                              ? variant.price.toFixed(2)
                              : currentProduct.variants[0]?.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Add to Cart row */}
              <tr>
                <td className="w-1/6 z-10 border p-4 font-poppins font-normal sticky left-0 bg-gray-100"></td>
                {compare.map((item) => {
                  const variant = selectedVariant[item.id];
                  const currentProduct = item.product;
                  return (
                    <td key={item.id} className="border p-4 text-center">
                      {!currentProduct.outOfStock && (
                        <button
                          onClick={() => handleAddToCartClick(currentProduct)}
                          disabled={!variant?.inStock}
                          className={`px-16 py-3 text-sm items-center justify-center text-center text-white font-poppins transition-colors duration-300 ${
                            variant?.inStock
                              ? "bg-zinc-700 hover:bg-green-950"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {variant?.inStock ? "Add to Cart" : ""}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/*if Add to cart is open */}
      {/* {isAddToCart && selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          selectedVariant={selectedVariant[selectedProduct.id]}
          onClose={() => setIsAddToCart(false)}
          cart={cart}
          total={total}
          updateQuantity={updateQuantity}
        />
      )} */}
    </div>
  );
};

export default CompareModel;
