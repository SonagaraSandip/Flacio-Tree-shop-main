import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimatedNumbers from "react-animated-numbers";
import ProductPageData from "./productsPageData";
import { IoIosEye } from "react-icons/io";
import { FaGripfire } from "react-icons/fa";
import {
  CircleCheck,
  Heart,
  Minus,
  Plus,
  Shuffle,
  Package,
  Truck,
  CircleQuestionMark,
  Link,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import TigerAloe from "../assets/Home/Tiger-Aloe/tiger-black-360x.png";
import PeaseLily from "../assets/Home/Pease-lily/Pease-lily-360x.webp";
import Visa from "../assets/product/visa.avif";

const ProductPageCard = () => {
  const { productName } = useParams();
  const productpage = ProductPageData.find(
    (item) =>
      item.name.toLowerCase() === productName.replace(/-/g, " ").toLowerCase()
  );

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState({
    tigerAloe: 1,
    peaceLily: 1,
  });
  const [currentProductQuantity, setCurrentProductQuantity] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [viewer, setViewer] = useState(30);
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isShare, setIsShare] = useState(false);

  //set current product quantitywhen ever productpage is change
  useEffect(() => {
    setCurrentProductQuantity(1);
    setCurrentImageIndex(0);
  }, [productpage]);

  useEffect(() => {
    if (productpage && productpage.variants.length > 0) {
      const firstInStockVariant = productpage.variants.find(
        (variant) => variant.inStock || productpage.variants[0]
      );
      setSelectedVariant(firstInStockVariant);
    }
  }, [productpage]);

  const randomNumber = Math.floor(Math.random() * (40 - 30 + 1)) + 30;

  //auto increment viewer
  useEffect(() => {
    const interval = setInterval(() => {
      setViewer(() => randomNumber);
    }, 2000);

    return () => clearInterval(interval);
  });

  //handle next image
  const handleNextImage = () => {
    if (productpage && productpage.variants.length > 0) {
      const nextIndex = (currentImageIndex + 1) % productpage.variants.length;
      setCurrentImageIndex(nextIndex);
      setSelectedVariant(productpage.variants[nextIndex]);
    }
  };

  //handle prev image
  const handlePrevImage = () => {
    if (productpage && productpage.variants.length > 0) {
      const PrevIndex =
        (currentImageIndex - 1 + productpage.variants.length) %
        productpage.variants.length;
      setCurrentImageIndex(PrevIndex);
      setSelectedVariant(productpage.variants[PrevIndex]);
    }
  };

  //update quantity
  const handleQuantityChange = (product, amount) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [product]: Math.max(0, prevQuantity[product] + amount),
    }));
  };

  //handle color select
  const handleColorSelect = (variant, index) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(index);
  };

  const handleCurrentProductQuantityChange = (amount) => {
    setCurrentProductQuantity((prevQuantity) =>
      Math.max(0, prevQuantity + amount)
    );
  };

  //test addtoCart button
  const handleAddToCart = () => {
    if (productpage.name.toLowerCase().replace(" ", "-") == "jade-succulent") {
      console.log("Adding bundle to cart");
      console.log("Tiger Aloe:", quantity.tigerAloe, "units");
      console.log("Pease Liliy:", quantity.peaceLily, "units");
    } else {
      console.log("Adding to Cart", productpage.name);
      console.log("Color: ", selectedVariant?.color);
      console.log("Quantity: ", currentProductQuantity);
      console.log(
        "price: $",
        selectedVariant?.discountPrice || productpage.originalPrice
      );
    }
  };

  //handle terms acceptance
  const handleTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const isOutOfStock = productpage.variants.every(
    (variant) => !variant.inStock
  );

  if (!productpage) {
    return (
      <div className="text-2xl sm:text-3xl md:text-5xl lg:text-8xl font-librebaskerville flex flex-col items-center justify-center text-gray-700 h-screen bg-red-600">
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
    <div className="mt-[130px]">
      <div key={productpage.id} className="flex gap-4 mx-8 items-stretch">
        {/* Product Images */}
        <div className="w-full lg:w-[60%] flex h-full sticky top-0 self-start">
          <div className="h-full w-full flex">
            <div className="px-4 ">
              {productpage.variants.map((variant, index) => (
                <div
                  key={`${variant.color} - ${index}`}
                  onClick={() => handleColorSelect(variant, index)}
                  className={`hover:border hover:border-gray-700 mb-6 ${
                    currentImageIndex === index ? "border border-black" : ""
                  }`}
                >
                  <img
                    key={variant.image}
                    src={variant.image}
                    loading="lazy"
                    alt={`${productpage.name} - ${variant.color}`}
                    className={`h-32 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                      currentImageIndex === index ? "scale-75" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Discount Badge */}
            <div className="absolute z-10 pt-16 left-3/4 xl:left-[750px] transform -translate-x-1/2 -translate-y-1/2">
              {isOutOfStock ? (
                <span className="bg-gray-400 text-white text-sm px-2 py-1 ">
                  Out of Stock
                </span>
              ) : (
                productpage.discountPercent && (
                  <div className="bg-red-600 text-white text-xs px-2 py-1 ">
                    - {productpage.discountPercent}% OFF
                  </div>
                )
              )}
            </div>

            <div
              className="relative h-full w-full"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={selectedVariant?.image}
                alt={productpage.name}
                loading="lazy"
                onClick={() => setIsOpen(true)}
                style={{ cursor: hovered ? <Plus /> : "pointer" }}
                className={`w-full h-auto pr-8 object-cover ${
                  hovered ? " " : "cursor-pointer"
                } `}
              />

              {hovered && productpage.variants.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    disabled={currentImageIndex === 0}
                    className={`absolute z-10 top-1/2 left-4 border border-gray-500 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2  ${
                      currentImageIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } `}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    disabled={
                      currentImageIndex === productpage.variants.length - 1
                    }
                    className={`absolute z-10 top-1/2 border border-gray-500 right-12 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2 ${
                      currentImageIndex === productpage.variants.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } `}
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* product details */}
        <div className="flex flex-col w-full lg:w-[40%] gap-1 h-full sticky top-0 max-h-full ">
          <h2 className="text-3xl font-librebaskerville mb-1">
            {productpage.name}
          </h2>
          {/* price */}
          <h2 className="text-2xl font-librebaskerville text-gray-500">
            {/*  is price range is available*/}
            {productpage.priceRange && !productpage.discountPrice
              ? `$ ${productpage.originalPrice.toFixed(
                  2
                )} - $ ${productpage.priceRange.toFixed(2)}`
              : ""}
            {/* if discount price is available */}
            {productpage.discountPrice ? (
              <span className="flex gap-2 text-gray-500 ">
                <>
                  <p className="line-through text-gray-400">
                    $ {productpage.originalPrice.toFixed(2)}
                  </p>
                  <p>$ {productpage.discountPrice.toFixed(2)}</p>
                </>
              </span>
            ) : (
              ""
            )}
            {/*for normal price display */}
            {!productpage.priceRange && !productpage.discountPrice ? (
              <span className="text-gray-500">
                $ {productpage.originalPrice.toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </h2>
          <div className="border border-gray-100 my-3" />

          <div className="flex mb-2">
            <IoIosEye
              size={24}
              className="mr-2 flex items-center animate-pulse"
            />
            {viewer}
            <span className="ml-1 font-poppins text-md ">
              people are viewing this right now
            </span>
          </div>

          {/* outofstock text */}
          {isOutOfStock ? (
            <div className="flex items-center mt-2 gap-2">
              <CircleCheck
                size={20}
                className="text-red-700 border border-dotted border-red-500 rounded-full shadow-3xl "
              />
              <p className="text-md font-poppins text-red-700 ">
                Out of Stock{" "}
              </p>
            </div>
          ) : (
            <div className="flex my-2  ">
              <FaGripfire
                fill="red"
                size={24}
                className="mr-2 flex items-center animate-pulse"
              />

              <span className="font-poppins text-md text-red-500 font-semibold">
                {productpage.sellOrder}
              </span>
            </div>
          )}

          {/* instock & out of stock text */}
          {!isOutOfStock ? (
            <div className="flex items-center mt-2 gap-1">
              <CircleCheck
                size={20}
                className="text-green-700 border border-dotted rounded-full border-green-500 shadow-3xl mr-2"
              />
              <p className=" text-md font-poppins text-green-700 font-semibold">
                In Stock
              </p>
            </div>
          ) : (
            ""
          )}

          {/* Description */}
          <p className="text-md mt-4 font-poppins text-gray-500">
            {productpage.description}
          </p>

          {/*show color || if jade-succulent ==== show two other product */}
          {productpage.name.toLowerCase().replace(" ", "-") ===
            "jade-succulent" && !isOutOfStock ? (
            <div className="flex flex-col mt-4">
              <div className="flex justify-between border border-gray-300 p-2">
                <span className="flex">
                  <img
                    src={TigerAloe}
                    alt="Tiger Aloe"
                    loading="lazy"
                    className="h-24 w-20 object-cover mr-4"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-md font-poppins text-gray-600">
                      Tiger Aloe
                    </p>
                    <select className="text-xs py-1 border font-poppins border-gray-300 mt-2">
                      <option value="jade-black">Black - $153.00 USD</option>
                      <option value="jade-pink">Pink - $152.00 USD</option>
                      <option value="jade-blue">Blue - $150.00 USD</option>
                    </select>
                  </div>
                </span>
                <div className="flex items-center self-center gap-2 border border-gray-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange("tigerAloe", -1);
                    }}
                    className=" px-3 py-2"
                  >
                    <Minus size={12} />
                  </button>
                  <div>{quantity.tigerAloe}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange("tigerAloe", 1);
                    }}
                    className="px-3 py-2"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between border border-gray-300 p-2">
                <span className="flex">
                  <img
                    src={PeaseLily}
                    alt="Pease-lily"
                    loading="lazy"
                    className="h-24 w-20 object-cover mr-4"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-md font-poppins text-gray-600">
                      Pease-lily
                    </p>
                    <select className="text-xs py-1 border font-poppins border-gray-300 mt-2">
                      <option value="pease-black">Black - $60.00 USD</option>
                      <option value="pease-white">White - $68.00 USD</option>
                      <option value="pease-pink">Pink - $61.00 USD</option>
                    </select>
                  </div>
                </span>
                <div className="flex items-center self-center gap-2 border border-gray-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange("peaceLily", -1);
                    }}
                    className=" px-3 py-2"
                  >
                    <Minus size={12} />
                  </button>
                  <div>{quantity.peaceLily}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange("peaceLily", 1);
                    }}
                    className="px-3 py-2"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-poppins mt-2 text-gray-600">
                Color :{" "}
                <span className="text-sm font-librebaskerville text-black">
                  {selectedVariant?.color}
                </span>
              </h1>
              <div className="flex gap-2 mt-2">
                {productpage.variants.map((variant, index) => (
                  <div key={index} className="relative">
                    {productpage.id === 1 ||
                    productpage.id === 5 ||
                    isOutOfStock ? (
                      <button
                        className={`flex w-6 h-6 rounded-full border-2 ${
                          selectedVariant?.color === variant.color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        onClick={() => handleColorSelect(variant)}
                        style={{
                          backgroundImage: `url(${variant.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    ) : (
                      <button
                        className={`flex w-6 h-6 rounded-full border-2 ${
                          selectedVariant?.color === variant.color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        onClick={() => handleColorSelect(variant)}
                        style={{
                          backgroundColor: variant.hex,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Add to Cart Button */}
          <div className="flex mt-6 items-center">
            {!isOutOfStock ? (
              productpage.name.toLowerCase().replace(" ", "-") ===
              "jade-succulent" ? (
                <button
                  onClick={() => handleAddToCart()}
                  className="w-full flex items-center justify-center group text-white bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-3 hover:bg-gradient-to-r hover:from-green-600 hover:via-green-900 hover:to-green-600 transition-all duration-500"
                >
                  <span className="text-md font-poppins group-hover:animate-bounceX transition-transform duration-300">
                    Add to Cart
                  </span>
                </button>
              ) : (
                <div className="flex w-full gap-2">
                  <div className="flex items-center self-center gap-2 border border-gray-300  px-4 py-3">
                    <button
                      onClick={() => handleCurrentProductQuantityChange(-1)}
                      className=" px-3 "
                    >
                      <Minus size={20} />
                    </button>
                    <AnimatedNumbers
                      animateToNumber={currentProductQuantity}
                      fontStyle={{
                        fontFamily: "Poppins",
                        fontSize: 16,
                        color: "black",
                      }}
                      transitions={(index) => ({
                        type: "tween",
                        duration: index * 0.3,
                      })}
                    >
                      {currentProductQuantity}
                    </AnimatedNumbers>

                    <button
                      onClick={() => handleCurrentProductQuantityChange(1)}
                      className="px-3 "
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(productpage.name)}
                    className="w-full flex items-center justify-center group text-white  px-4 py-3 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 hover:bg-gradient-to-r hover:from-green-500 hover:via-green-900 hover:to-green-500 transition-all duration-500 "
                  >
                    <span className="text-md font-poppins group-hover:animate-bounceX transition-transform duration-300">
                      Add to Cart
                    </span>
                  </button>
                </div>
              )
            ) : (
              <button
                className="w-full bg-gray-400 text-white px-4 py-3 cursor-not-allowed"
                disabled
              >
                <span className="text-md font-poppins">Out of Stock</span>
              </button>
            )}
            <button className="flex text-center ml-2 border border-gray-300 px-4 py-3 hover:bg-green-600 hover:text-white hover:border-gray-300 hover:animate-pulse transition-opacity duration-300">
              <Heart />
            </button>
          </div>

          {/* Notify me if out of stock */}
          {isOutOfStock && (
            <button className="text-sm font-librebaskerville border border-black text-gray-800 hover:bg-gray-800 hover:text-white hover:border-white px-4 py-2 my-2 transition-colors duration-300">
              NOTIFY ME WHEN AVAILABLE
            </button>
          )}

          {/* Buy it now only show in product !== jade-succulent && isOutofStock */}
          {productpage.name.toLowerCase().replace(" ", "-") !==
            "jade-succulent" &&
            !isOutOfStock && (
              <div className="my-4">
                <div className="flex gap-2 ">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onClick={handleTermsChange}
                    className="w-4 h-4 mt-1 cursor-pointer"
                  />{" "}
                  <p className="text-gray-500 ">
                    I agree with the{" "}
                    <span className="text-gray-950 border-b font-poppins border-black hover:border-none cursor-pointer hover:font-semibold">
                      Terms and conditions
                    </span>
                  </p>
                </div>
                <button
                  className={`w-full font-poppins text-md flex items-center justify-center group  px-4 py-3  border  mt-2 transition-opacity duration-1000 ${
                    acceptTerms
                      ? "cursor-pointer bg-gradient-to-r from-green-900 via-green-600 to-green-900 text-white border-white rounded-md"
                      : "cursor-not-allowed border-gray-400"
                  }`}
                >
                  Buy It Now
                </button>
              </div>
            )}

          {/* compare | shipping | share | icons */}
          <div className="flex  sm:gap-4 md:gap-6 lg:gap-8 items-center mt-4 text-gray-500 ">
            <div className="group flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-900 group-hover:text-white transition-colors duration-300 mr-2">
                <Shuffle
                  size={20}
                  className=" flex items-center justify-center"
                />
              </div>
              <span className="text-sm font-librebaskerville">Compare</span>
            </div>
            <div
              onClick={() => setIsOpenQuestion(true)}
              className="group flex items-center cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-900 group-hover:text-white transition-colors duration-300 mr-2">
                <CircleQuestionMark
                  size={20}
                  className=" flex items-center justify-center"
                />
              </div>
              <span className="text-sm font-librebaskerville">Quetions</span>
            </div>
            <div
              onClick={() => setIsShipping(true)}
              className="group flex items-center cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-900 group-hover:text-white transition-colors duration-300 mr-2">
                <Package
                  size={20}
                  className=" flex items-center justify-center"
                />
              </div>
              <span className="text-sm font-librebaskerville">
                Shipping Info
              </span>
            </div>
            <div
              onClick={() => setIsShare(true)}
              className="group flex items-center cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-green-900 group-hover:text-white transition-colors duration-300 mr-2">
                <Link size={20} className=" flex items-center justify-center" />
              </div>
              <span className="text-sm font-librebaskerville">Share</span>
            </div>
          </div>

          {/* order in next 12 hours*/}
          {!isOutOfStock && (
            <div className="flex items-center border-y border-gray-200 mt-4 gap-2 p-6">
              <Truck size={28} className="text-gray-700 rounded-full " />
              <div className="h-10 w-px bg-gray-300 mx-2" />
              <p className="font-poppins text-gray-500 ">
                Order within the next 12 hours 22 minutes to get it <br />
                between{" "}
                <span className="border-b border-black text-black">
                  Monday, Sep 1
                </span>{" "}
                and{" "}
                <span className="border-b border-black text-black">
                  Friday, Sep 5
                </span>
              </p>
            </div>
          )}

          {/* buy more save more */}
          <div className="flex flex-col w-full bg-gray-100 mt-8 p-6 ">
            <h1 className="font-poppins flex items-center justify-center text-black mb-6">
              Buy more save more!
            </h1>
            <div className="flex justify-between px-2">
              <div className="flex flex-col">
                <h2 className="font-poppins text-black">
                  5 item (s) get{" "}
                  <span className="text-sm text-red-600 font-semibold">
                    10% off
                  </span>
                </h2>
                <p className=" text-gray-500 text-xs">on each product</p>
              </div>
              <button className="text-sm font-poppins border border-black px-6 bg-gradient-to-r from-green-100 via-white  to-green-100 hover:bg-gradient-to-r hover:from-green-500 hover:via-green-700 hover:to-green-500 hover:text-white transition-colors duration-300">
                ADD
              </button>
            </div>
          </div>

          {/* Guarantee checkout */}
          <div className="flex flex-col w-full bg-gray-100 mt-4 p-6">
            <h1 className="font-poppins flex items-center justify-center text-black mb-6">
              Guaranteed Checkout
            </h1>
            <img src={Visa} alt="visa-checkout" loading="lazy" />
          </div>
        </div>

        {/*  image open in full screen*/}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white max-w-screen"
          >
            <img
              src={selectedVariant?.image}
              alt={productpage.name}
              loading="lazy"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-auto max-h-screen object-contain py-8"
            ></img>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-4 absolute bottom-12 items-center justify-center"
            >
              <button
                onClick={handlePrevImage}
                // disabled={currentImageIndex === 0}
                className={`  bg-white text-gray-500 w-10 h-10 rounded-full items-center justify-center flex hover:bg-green-900 hover:text-white transition-colors duration-300 shadow-lg `}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className=" bg-white text-gray-800 w-14 h-14 rounded-full items-center justify-center flex  hover:bg-green-900 hover:text-white transition-colors duration-300 shadow-lg "
              >
                <X />
              </button>
              <button
                onClick={handleNextImage}
                // disabled={currentImageIndex === productpage.variants.length - 1}
                className={`bg-white text-gray-500 w-10 h-10 rounded-full items-center justify-center flex  hover:bg-green-900 hover:text-white transition-colors duration-300 shadow-lg
                  `}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* open Question pop-up */}
        {isOpenQuestion && (
          <div
            onClick={() => setIsOpenQuestion(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60  w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg mx-auto p-8 flex flex-col items-center justify-center  "
            >
              <button
                onClick={() => setIsOpenQuestion(false)}
                className=" w-full flex items-center justify-end"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black" />
              </button>
              <h1 className="text-2xl text-black w-full font-librebaskerville ">
                Quetion
              </h1>
              <form className="w-full">
                <div className="flex flex-col my-4 gap-6 text-md font-poppins w-full">
                  <div className="flex gap-6 w-full">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="bg-zinc-100 text-black p-2 w-full "
                    />
                    <input
                      type="email"
                      name="name"
                      required
                      placeholder="Your Email"
                      className="bg-zinc-100 text-black p-2 w-full"
                    />
                  </div>
                  <input
                    type="number"
                    name="tel"
                    allow="tel"
                    placeholder="Your phone Number"
                    minLength={8}
                    maxLength={10}
                    required
                    className="bg-zinc-100 text-black p-2 w-full"
                  />
                  <textarea
                    type="text"
                    rows={8}
                    name="name"
                    placeholder="Your messasge..."
                    className="bg-zinc-100 text-black p-2 w-full"
                  />
                  <button
                    type="submit"
                    className="border border-black bg-white hover:bg-green-900 text-black hover:text-white p-2 w-full font-poppins"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* open shipping pop-up */}
        {isShipping && (
          <div
            onClick={() => setIsShipping(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60  w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col items-center justify-center  "
            >
              <button
                onClick={() => setIsShipping(false)}
                className=" w-full flex items-center justify-end"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black" />
              </button>
              <h1 className="text-2xl text-black w-full font-librebaskerville ">
                Shipping Info
              </h1>
              <div className="flex flex-col my-4 gap-4 text-md font-poppins w-full ">
                <h1 className="">
                  <span className="font-semibold">Return Policy :</span><span className="text-gray-500"> We will
                  gladly accept returns for any reason within 30 days of receipt
                  of delivery.</span>
                </h1>
                <h1 >
                  <span className="font-semibold">Availability :</span> <span className="text-gray-500">Ships anywhere in the United States.</span>
                </h1>
                <h1 >
                  <span className="font-semibold">Processing Time :</span><span className="text-gray-500">Allow 3-4 business days processing time for your order to ship.</span>
                </h1>
              </div>
            </div>
          </div>
        )}

        
        {/* open share pop-up */}
        {isShare && (
          <div
            onClick={() => setIsShare(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60  w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg mx-auto p-8 flex flex-col items-center justify-center  "
            >
              <button
                onClick={() => setIsShare(false)}
                className=" w-full flex items-center justify-end"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black" />
              </button>
              <h1 className="text-xl text-black w-full font-librebaskerville ">
                copy link
              </h1>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageCard;
