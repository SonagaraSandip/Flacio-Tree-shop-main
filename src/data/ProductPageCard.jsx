import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductPageData from "./productsPageData";

const ProductPageCard = () => {
  const { productName } = useParams();
  const productpage = ProductPageData.find(
    (item) =>
      item.name.toLowerCase() === productName.replace(/-/g, " ").toLowerCase()
  );

  const [selectedVariant, setSelectedVariant] = useState(
    productpage.variants.length > 0 ? productpage.variants[0] : null
  );

  const isOutOfStock = productpage.variants.every(
    (variant) => !variant.inStock
  );

  if (!productpage) {
    return (
      <div className="text-2xl sm:text-3xl  md:text-5xl lg:text-8xl font-librebaskerville flex flex-col items-center justify-center text-gray-700 h-screen">
        Product not found
        <p className="mt-4 text-xs sm:text-2xl lg:text-xl bg-gray-600 text-white px-6 py-4 rounded-lg">
          <a
            href="/product/jade-succulent"
            className="hover:scale-105 transition-transform"
          >
            Back to product
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[180px]">
      <div key={productpage.id} className="flex gap-4 mx-8 ">
        {/* Product Images */}
        <div className="w-[60%] flex ">
          <div className="h-full w-full flex">
            <div className="px-4 ">
              {productpage.variants.map((variant) => (
                <div
                  className={`hover:border hover:border-gray-700 mb-6 ${
                    selectedVariant?.image === variant.image
                      ? "border border-black"
                      : ""
                  }`}
                >
                  <img
                    key={variant.image}
                    src={variant.image}
                    onClick={() => setSelectedVariant(variant)}
                    alt={`${productpage.name} - ${variant.color}`}
                    className={`h-36 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                      selectedVariant?.image === variant.image ? "scale-75" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Discount Badge */}
            <div className="absolute z-10 pt-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {isOutOfStock ? (
                <span className="bg-gray-400 text-white text-sm px-2 py-1 ">
                  Out of Stock
                </span>
              ) : ( productpage.discountPercent && (
                <div className="bg-red-600 text-white text-xs px-2 py-1 ">
                  - {productpage.discountPercent}% OFF
                </div>
              ))}
            </div>

            <img
              src={selectedVariant?.image}
              alt={productpage.name}
              className="w-3/4 h-auto object-cover "
            />
          </div>
        </div>
        {/* product details */}
        <div className="flex flex-col w-[40%] gap-1 ">
          <h2 className="text-3xl font-librebaskerville ">
            {productpage.name}
          </h2>
          <h2 className="text-2xl font-librebaskerville text-gray-500">
            $ {productpage.originalPrice.toFixed(2)}{" "}
            {productpage.priceRange
              ? ` - $ ${productpage.priceRange.toFixed(2)}`
              : ""}
          </h2>
          <div className="border border-gray-300 my-4" />
          <p className="text-md font-poppins text-gray-500">
            {productpage.description}
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ProductPageCard;
