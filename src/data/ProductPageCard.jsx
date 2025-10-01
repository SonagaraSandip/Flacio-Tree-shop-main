import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimatedNumbers from "react-animated-numbers";
import Product from "../data/products";
import Layout from "../pages/Layout";
import { useWishlist } from "../contexts/WishlistContext";
import { useCompare } from "../contexts/CompareContext";
import { useCart } from "../contexts/CartContext";
import CompareModel from "../other/CompareModel";
import AddToCartModal from "../other/AddToCartModal";
import Tree360Viewer from "../other/Tree360Viewer";
import Tree3DViewer from "../other/Tree3DViewer";
import { IoIosEye } from "react-icons/io";
import { FaGripfire } from "react-icons/fa";
import LoadingEffect from "../components/loadingEffect";
import { toast } from "react-toastify";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
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
  Check,
  Phone,
  X,
  Map,
  MapPin,
  Play,
  Pause,
  Box,
} from "lucide-react";
import TigerAloe from "../assets/Home/Tiger-Aloe/tiger-black-360x.png";
import PeaseLily from "../assets/Home/Pease-lily/Pease-lily-360x.webp";
import BoughtRed from "../assets/Home/Bought-together/Bought-together-back_540x.webp";
import BoughtGrey from "../assets/Home/Bought-together/Bought-together-front_540x.webp";
import BegginerPink from "../assets/Home/Beginner/Beginner-front_540xpink.webp";
import BegginerOrange from "../assets/Home/Beginner/Beginner-back_540x.webp";
import BegginerBlack from "../assets/Home/Beginner/Beginner-front_540x1.webp";
import Dragon from "../assets/Home/Dragon/Dragon-front_540x.webp";
import Visa from "../assets/product/visa.avif";
import { FaXTwitter } from "react-icons/fa6";

const ProductPageCard = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const productpage = Product.find(
    (item) =>
      item.name.toLowerCase() === productName.replace(/-/g, " ").toLowerCase()
  );

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare, compare } =
    useCompare();
  const { addToCart, cart, updateQuantity } = useCart();
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
  const [viewStore, setViewStore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [boughtTogetherColor, setBoughtTogetherColor] = useState("Red");
  const [beginnerSetColor, setBegginerSetColor] = useState("Pink / 30 cm");
  const [isBegginerInclude, setIsBegginerInclude] = useState(true);
  const [selectSize, setSelectSize] = useState(30);
  const [compareView, setCompareView] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notifyMe, setNotifyMe] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState({
    quickView: false,
    addToCart: false,
    wishlist: false,
    compare: false,
  });

  const url = window.location.href;

  const today = new Date();

  // get total of cart
  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  // check is product is in wishlist
  const isProductInWishlist = isInWishlist(productpage, selectedVariant);
  const isProductInCompare = isInCompare(productpage, selectedVariant);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + 3);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 5);
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  //set current product quantity whenever productpage is change
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

  //test addtoCart jade succulent button
  const handleAddToCartJade = () => {
    setLoading((prev) => ({ ...prev, addToCart: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, addToCart: false }));
    }, 1000);

    //1. add jade succulent
    addToCart({
      product: productpage,
      selectedVariant,
      quantity: currentProductQuantity,
    });

    // add tiger aloe (find from product list)

    const tigerAloeProduct = Product.find(
      (p) => p.name.toLowerCase() === "tiger aloe"
    );
    if (tigerAloeProduct) {
      const tigerAloeVariant = tigerAloeProduct.variants.find(
        (v) => v.color === selectedVariant?.color
      );
      addToCart({
        product: tigerAloeProduct,
        selectedVariant: tigerAloeVariant,
        quantity: quantity.tigerAloe,
      });
    }

    // 3. Add Peace Lily
    const peaceLilyProduct = Product.find(
      (p) => p.name.toLowerCase() === "pease lily"
    );
    if (peaceLilyProduct) {
      const peaceLilyVariant = peaceLilyProduct.variants.find(
        (v) => v.color === selectedVariant?.color
      ); // change for selected color/option
      addToCart(
        {
          product: peaceLilyProduct,
          selectedVariant: peaceLilyVariant,
          quantity: quantity.peaceLily,
        },
        true
      );
    }

    setIsAddToCart(true);
    toast.success(`Bundle added to cart successfully`);
  };

  // handle bought toogher
  const handleAddToCartBoughtTogether = () => {
    setLoading((prev) => ({ ...prev, addToCart: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, addToCart: false }));
    }, 1000);

    const selectedMainVariant =
      productpage.variants.find((v) => v.color === boughtTogetherColor) ||
      productpage.variants[0];

    // Add main "Bought Together" product
    addToCart({
      product: productpage,
      selectedVariant: selectedMainVariant,
      quantity: 1,
      selectedColor: selectedMainVariant.color,
    });

    // Add Beginner Set if included
    if (isBegginerInclude) {
      const beginnerSetProduct = Product.find(
        (p) => p.name.toLowerCase() === "the beginner set"
      );
      if (beginnerSetProduct) {
        // Optionally, select correct color/variant
        const beginnerSetVariant =
          beginnerSetProduct.variants.find(
            (v) => `${v.color} / ${v.size}` === beginnerSetColor
          ) || beginnerSetProduct.variants[0];
        addToCart({
          product: beginnerSetProduct,
          selectedVariant: beginnerSetVariant,
          quantity: 1,
          selectedColor: beginnerSetVariant.color,
        });
      }
    }

    setIsAddToCart(true);
    toast.success(`Selected items added to cart successfully`);
  };

  // handle add to cart toggle
  const handleAddToCart = () => {
    setLoading((prev) => ({ ...prev, addToCart: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, addToCart: false }));
    }, 1000); // Simulate loading for 1 second

    addToCart({
      product: productpage,
      selectedVariant,
      quantity: currentProductQuantity,
    });
    setIsAddToCart(true);
    toast.success(`Added ${productpage.name} to cart`);
  };

  //handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading((prev) => ({ ...prev, wishlist: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, wishlist: false }));
    }, 1000); // Simulate loading for 1 second

    if (!productpage) {
      console.error("Product page is not defined");
      return;
    }

    if (isProductInWishlist) {
      removeFromWishlist(
        `${productpage.id}-${selectedVariant?.color || "default"}`,
        toast.success(`${productpage.name} removed from Wishlist`)
      );
    } else {
      addToWishlist({ product: productpage, selectedVariant });
      toast.success(`${productpage.name} added to wishlist`);
    }
  };

  //handle compare toggle
  const handleCompareToggle = () => {
    // setCompareView((prev) => !prev);
    setLoading((prev) => ({ ...prev, compare: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, compare: false }));
    }, 1000);

    if (isProductInCompare) {
      removeFromCompare(
        `${productpage.id}-${selectedVariant?.color || "default"}`,
        toast.success(`Removed ${productpage.name} from CompareList`)
      );
    } else {
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, compare: false }));
      }, 1000);
      addToCompare({ product: productpage, selectedVariant });
      setCompareView(true);
      toast.success(`Added ${productpage.name} to CompareList`);
    }
  };

  //handle terms acceptance
  const handleTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  //handle copy to clipboard button
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  //add this for maapping
  const boughtTogetherPrices = {
    Red: 52,
    Grey: 51,
  };

  const begginerSetPrices = {
    "Pink / 30 cm": 130,
    "Pink / 50 cm": 130,
    "Pink / 60 cm": 130,
    "Orange / 30 cm": 138,
    "Orange / 50 cm": 138,
    "Orange / 60 cm": 138,
    "Black / 30 cm": 130,
    "Black / 50 cm": 130,
    "Black / 60 cm": 130,
  };

  //images for each product
  const boughtTogetherImages = {
    Red: BoughtRed,
    Grey: BoughtGrey,
  };

  const begginerSetImages = {
    "Pink / 30 cm": BegginerPink,
    "Pink / 50 cm": BegginerPink,
    "Pink / 60 cm": BegginerPink,
    "Orange / 30 cm": BegginerOrange,
    "Orange / 50 cm": BegginerOrange,
    "Orange / 60 cm": BegginerOrange,
    "Black / 30 cm": BegginerBlack,
    "Black / 50 cm": BegginerBlack,
    "Black / 60 cm": BegginerBlack,
  };

  //calculate total price
  const totalPrice =
    boughtTogetherPrices[boughtTogetherColor] +
    (isBegginerInclude ? begginerSetPrices[beginnerSetColor] : 0);

  //handle play pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };
  const handleVideoPause = () => {
    setIsPlaying(false);
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

  //validation for email address
  const validateEmail = (email) => {
    // A simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitted) return;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    if (!number.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter your comment");
      return;
    }

    toast.success("Submitted successfully");
    setSubmitted(true);
    setName("");
    setEmail("");
    setNumber("");
    setMessage("");

    //reset subbimition after 3 second
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="pt-[120px] ">
      <div className="mx-12 font-librebaskerville text-sm text-black pb-4">
        <span
          onClick={() => navigate("/")}
          className="hover:border-b-2 hover:border-black hover:text-black cursor-pointer"
        >
          Home
        </span>{" "}
        / {productpage.name}{" "}
      </div>

      <div key={productpage.id} className="flex gap-4 mx-8 items-stretch">
        {/* Product Images */}
        <div className="w-full lg:w-[60%] flex h-full  sticky top-0 self-start">
          <div className="h-full w-full flex">
            <div className="px-4">
              {productpage.variants.map((variant, index) => {
                const hasVideo = variant.video;
                const is360View = variant.type === "360";
                const is3DProduct = variant.type === "3D";

                return (
                  <div
                    key={`${variant.color || "video-360"} - ${index}`}
                    onClick={() => handleColorSelect(variant, index)}
                    className={`hover:border hover:border-gray-700 mb-6 ${
                      currentImageIndex === index ? "border border-black" : ""
                    }`}
                  >
                    {variant.image && !is360View && (
                      <img
                        key={variant.image}
                        src={variant.image || !hasVideo ? variant.image : ""}
                        loading="lazy"
                        alt={`${productpage.name} - ${variant.color}`}
                        className={`h-32 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                          currentImageIndex === index ? "scale-75" : ""
                        }`}
                      />
                    )}

                    {hasVideo && (
                      <div className="relative">
                        <img
                          src={variant.imagePreview || variant.image}
                          loading="lazy"
                          alt={`${productpage.name} - ${variant.color}`}
                          className={`h-32 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                            currentImageIndex === index ? "scale-75" : ""
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center ">
                          <Play
                            size={40}
                            className="bg-gray-200 bg-opacity-45 rounded-full p-2"
                          />
                        </div>
                      </div>
                    )}

                    {/* if 360 available show this*/}
                    {is360View && (
                      <div className="relative ">
                        <img
                          src={variant.imagePreview || variant.image}
                          alt="360"
                          // style={{cursor: 'pointer'}}
                          className={`h-32 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                            currentImageIndex === index ? "scale-75" : ""
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                          <p
                            className={`bg-green-900  flex items-center justify-center rounded-full text-white transition-all duration-500 ${
                              currentImageIndex === index
                                ? "h-7 w-7 text-xs opacity-95"
                                : "h-10 w-10 opacity-80"
                            }`}
                          >
                            360°
                          </p>
                        </div>
                      </div>
                    )}

                    {/* if 3D product available show this */}
                    {is3DProduct && (
                      <div className="relative">
                        <img
                          src={variant.imagePreview || variant.image}
                          alt="3D image preview"
                          className={`h-32 w-28 flex object-cover cursor-pointer hover:scale-75 transition-transform duration-300 ${
                            currentImageIndex === index ? "scale-75" : ""
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Box
                            size={40}
                            className="bg-green-900 text-white bg-opacity-75 rounded-full p-2"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
              className="relative flex h-full w-full"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {selectedVariant?.type === "360" ? (
                <Tree360Viewer image={selectedVariant.image} />
              ) : selectedVariant?.type === "3D" ? (
                <div
                  className="h-full w-full "
                  style={{ height: "700px", minHeight: "700px" }}
                >
                  <Tree3DViewer glbFile={selectedVariant.glbFile} />
                </div>
              ) : selectedVariant?.image ? (
                <img
                  src={selectedVariant?.image}
                  alt={productpage.name}
                  loading="lazy"
                  onClick={() => setIsOpen(true)}
                  style={{ cursor: hovered ? "move " : "default" }}
                  className={`w-full h-auto pr-8 object-cover ${
                    hovered ? " " : "cursor-pointer"
                  } `}
                />
              ) : selectedVariant?.video ? (
                <div className="relative">
                  <video
                    src={selectedVariant?.video}
                    ref={videoRef}
                    controls
                    controlsList="nodownload"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  />
                  {!isPlaying && (
                    <button
                      onClick={handlePlayPause}
                      className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 w-12 h-12 rounded-full "
                    >
                      {isPlaying ? <Pause /> : <Play />}
                    </button>
                  )}
                </div>
              ) : null}

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
        <div className="flex flex-col w-full lg:w-[40%]  gap-1 h-full sticky top-0 max-h-full ">
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
            <div className="relative flex items-center mt-2 gap-2">
              <span className="absolute inline-flex left-[2px] h-4 w-4 animate-ping rounded-full bg-red-700 opacity-70 "></span>
              <CircleCheck
                size={20}
                className="relative inline-flex text-red-700 rounded-full shadow-3xl "
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
            <div className="relative flex items-center mt-2 gap-1">
              <CircleCheck
                size={20}
                className="relative inline-flex text-green-700  rounded-full shadow-3xl mr-2"
              />
              <span className="absolute inline-flex left-[2px] h-4 w-4 animate-ping rounded-full bg-green-700 opacity-50"></span>
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
                {productpage.variants
                  .filter((variant) => variant.color)
                  .map((variant, index) => (
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
                          onClick={() => handleColorSelect(variant, index)}
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
                              : "border-zinc-300 shadow-lg"
                          }`}
                          onClick={() => handleColorSelect(variant, index)}
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

          {/* if product is peace-lily then show this only 90 items left */}
          {productpage.name.toLowerCase().replace(" ", "-") ===
            "peace-lily" && (
            <div className="flex flex-col w-ful">
              <h1 className="font-poppins text-sm mt-4 text-gray-900">
                Only <span className="text-red-600">90 item(s)</span> left in
                stock
              </h1>
              <div className="w-full bg-gray-300 h-2 my-4 rounded">
                <div
                  style={{ width: "40%" }}
                  className="h-2 w-full rounded bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 animate-moveStripes"
                ></div>
              </div>
            </div>
          )}

          {/* if product is the-beginner-set then show size selection also */}
          {productpage.name.toLowerCase().replace(/\s+/g, "-") ===
            "the-beginner-set" && (
            <div className="flex flex-col gap-2 my-4">
              <div className="flex gap-2 font-poppins ">
                <h1 className="text-md ">Size :</h1>
                <p className="text-md">{selectSize} cm</p>
              </div>
              <div className="flex gap-2">
                {[30, 50, 60].map((size, index) => (
                  <div key={index} className="relative">
                    <button
                      className={`flex font-poppins px-5 py-2 border transition-transform duration-500 ${
                        selectSize === size
                          ? "border-black bg-black text-white"
                          : "hover:bg-zinc-900 hover:text-white text-gray-500 border-gray-500"
                      }`}
                      onClick={() => setSelectSize(size)}
                    >
                      {size} cm
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="flex mt-6 items-center">
            {!isOutOfStock ? (
              productpage.name.toLowerCase().replace(" ", "-") ===
              "jade-succulent" ? (
                <button
                  onClick={() => handleAddToCartJade()}
                  className="w-full flex items-center justify-center group text-white bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-3 hover:bg-gradient-to-r hover:from-green-700 hover:via-green-950 hover:to-green-700 transition-all duration-500"
                >
                  <span className="text-md font-poppins group-hover:animate-bounceX transition-transform duration-300">
                    {loading.addToCart ? (
                      <LoadingEffect size="small" />
                    ) : (
                      "ADD TO CART"
                    )}
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
                    className="w-full flex items-center justify-center group text-white  px-4 py-3 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 hover:bg-gradient-to-r hover:from-green-700 hover:via-green-950 hover:to-green-700 transition-all duration-500 "
                  >
                    <span className="text-sm font-poppins group-hover:animate-bounceX transition-transform duration-300">
                      {loading.addToCart ? (
                        <LoadingEffect size="small" />
                      ) : (
                        "ADD TO CART"
                      )}
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
            <button
              onClick={handleWishlistToggle}
              className={`flex text-center ml-2 border border-gray-300 px-4 py-3 hover:bg-green-950 hover:text-white hover:border-gray-300 transition-opacity duration-300 ${
                isProductInWishlist
                  ? "bg-green-950 text-white"
                  : "bg-white text-black"
              }`}
              disabled={loading.wishlist}
            >
              {loading.wishlist ? <LoadingEffect size="medium" /> : <Heart />}
            </button>
          </div>

          {/* Notify me if out of stock */}
          {isOutOfStock && (
            <button
              onClick={() => setNotifyMe(true)}
              className="text-sm font-librebaskerville border border-black text-gray-800 hover:bg-gray-800 hover:text-white hover:border-white px-4 py-2 my-2 transition-colors duration-300"
            >
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
                      ? "cursor-pointer bg-gradient-to-l from-green-900 via-green-600 to-green-900 text-white border-white animate-moveStripes rounded-md"
                      : "cursor-not-allowed border-gray-400"
                  }`}
                  style={{
                    width: "100%",
                  }}
                >
                  Buy It Now
                </button>
              </div>
            )}

          {/* compare | shipping | share | icons */}
          <div className="flex  sm:gap-4 md:gap-6 lg:gap-8 items-center mt-4 text-gray-500 ">
            <button
              onClick={handleCompareToggle}
              className="group flex items-center cursor-pointer"
            >
              <div
                className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-900 group-hover:text-white transition-colors duration-300 mr-2`}
              >
                {isProductInCompare ? (
                  loading.compare ? (
                    <LoadingEffect size="small" />
                  ) : (
                    <Check
                      size={20}
                      className=" flex items-center justify-center"
                    />
                  )
                ) : loading.compare ? (
                  <LoadingEffect size="small" />
                ) : (
                  <Shuffle
                    size={20}
                    className=" flex items-center justify-center"
                  />
                )}
              </div>
              <span className="text-sm font-librebaskerville">Compare</span>
            </button>
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
                  {formattedStartDate}
                </span>{" "}
                to{" "}
                <span className="border-b border-black text-black">
                  {formattedEndDate}
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

          {/* if product === a-philippine-upsell the show tiger aloe product here  */}
          {productpage.name.toLowerCase().replace(/\s+/g, "-") ===
            "a-philippine-upsell" &&
            !isOutOfStock && (
              <div className="flex items-center justify-between my-4">
                <div className="flex flex-col font-poppins text-md">
                  <h1 className="text-black justify-start text-xl font-librebaskerville mb-4">
                    Buy It With
                  </h1>
                  <p className="text-gray-500 text-md">TIGER ALOE</p>
                  <p className="text-gray-500 text-md ">$ 150.00</p>

                  <button
                    onClick={() => navigate("/product/tiger-aloe")}
                    className="text-xs font-normal border border-gray-500 hover:bg-green-900 hover:text-white transition-colors duration-300 mt-4 px-4 py-2"
                  >
                    VIEW PRODUCT
                  </button>
                </div>
                <img
                  src={TigerAloe}
                  onClick={() => navigate("/product/tiger-aloe")}
                  alt="tiger aloe"
                  loading="lazy"
                  className="w-1/4 hover:scale-110 transition-all duration-300 cursor-pointer"
                />
              </div>
            )}

          {/* if product is peace-lily then show this pick up store available */}
          {productpage.name.toLowerCase().replace(" ", "-") ===
            "peace-lily" && (
            <div className="flex w-ful border border-grey-300 mt-4 px-6 py-4">
              <Check className="text-green-700" />
              <div className="flex flex-col ml-4 font-poppins">
                <p className="text-sm text-gray-500">
                  Pickup available at{" "}
                  <strong className="text-black">Akaze store</strong>
                </p>
                <p className="text-gray-500 text-xs">
                  Usually ready in 24 hours
                </p>

                <p
                  onClick={() => setViewStore(true)}
                  className="text-green-900 mt-4 text-xs underline hover:no-underline transition-all duration-700 cursor-pointer"
                >
                  View store information
                </p>
              </div>
            </div>
          )}

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
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 animate-zoom-in w-screen"
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
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 animate-zoom-in w-screen"
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
              <div className="flex flex-col mt-8 mb-4 gap-4 text-md font-poppins w-full ">
                <h1 className="">
                  <span className="font-semibold">Return Policy :</span>
                  <span className="text-gray-500">
                    {" "}
                    We will gladly accept returns for any reason within 30 days
                    of receipt of delivery.
                  </span>
                </h1>
                <h1>
                  <span className="font-semibold">Availability :</span>{" "}
                  <span className="text-gray-500">
                    Ships anywhere in the United States.
                  </span>
                </h1>
                <h1>
                  <span className="font-semibold">Processing Time :</span>
                  <span className="text-gray-500">
                    Allow 3-4 business days processing time for your order to
                    ship.
                  </span>
                </h1>
              </div>
            </div>
          </div>
        )}
        {/* NOTIFY ME WHEN AVAILABLE */}
        {notifyMe && (
          <div
            onClick={() => setNotifyMe(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 animate-zoom-in w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl mx-auto p-6 flex flex-col items-center justify-center  "
            >
              <button
                onClick={() => setNotifyMe(false)}
                className="w-full flex items-center justify-end"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black" />
              </button>
              <div className="flex  gap-6">
                {/* left side image */}
                <div className="flex flex-col w-full gap-4">
                  <img src={Dragon} alt="dragon image" className="w-76 h-96" />
                  <div className="gap-1 mt-4">
                    <p className="uppercase font-librebaskerville text-sm ">
                      Pink Dragon Tree
                    </p>
                    <p className="font-poppins  text-gray-500">$80.00</p>
                  </div>
                </div>
                {/* right side form  */}
                <div className="flex flex-col w-full gap-2">
                  <h1 className="text-2xl font-librebaskerville">
                    Back in stock alert
                  </h1>
                  <p className="font-poppins text-sm text-gray-500">
                    We will send you a notification as soon as this product is
                    available again.
                  </p>
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                  >
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        style={{ outline: "none" }}
                        className="bg-zinc-100 text-black p-3 w-full"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ outline: "none" }}
                        className="bg-zinc-100 text-black p-3 w-full"
                      />
                    </div>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Your phone"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      required
                      style={{ outline: "none" }}
                      className="bg-zinc-100 text-black p-3 w-full"
                    />
                    <textarea
                      type="text"
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ outline: "none" }}
                      rows="6"
                      className="bg-zinc-100 text-gray-500 p-3 w-full"
                    />
                    <button
                      type="submit"
                      className="border-2 border-zinc-800 mt-2  hover:bg-green-950 uppercase hover:text-white px-6 py-4 transition-colors duration-300 font-poppins"
                    >
                      submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* open share pop-up */}
        {isShare && (
          <div
            onClick={() => setIsShare(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 animate-zoom-in w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg mx-auto p-6 flex flex-col items-center justify-center  "
            >
              <button
                onClick={() => setIsShare(false)}
                className=" w-full flex items-center justify-end"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black" />
              </button>
              <h1 className="text-sm text-black w-full font-librebaskerville ">
                COPY LINK
              </h1>
              <div className="flex font-poppins w-full mt-4 mb-2">
                <span className="flex-1 border border-black p-2 text-sm text-wrap items-center justify-center">
                  {url}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="bg-black px-3 py-2 text-white hover:bg-green-950 "
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-700 w-full font-librebaskerville">
                  Link copied to clipboard 👍.
                </p>
              )}
              <h1 className="text-sm text-black w-full font-librebaskerville mt-8">
                SHARE
              </h1>
              <div className="flex gap-2 w-full my-2">
                <FaWhatsapp
                  size={28}
                  fill="#25D366"
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                />
                <FaFacebook
                  size={28}
                  fill="#4267B2"
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                />
                <FaXTwitter
                  size={28}
                  fill="#000000"
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        )}
        {/* open share pop-up */}
        {viewStore && (
          <div
            onClick={() => setViewStore(false)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg mx-auto flex flex-col "
            >
              <div className="bg-zinc-100 w-full animate-zoom-in">
                <div className="flex justify-between p-4">
                  <div className="flex gap-4">
                    <img src={PeaseLily} className="w-24 h-24" />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-librebaskerville">Peace Lily</h1>
                      <p className="text-sm text-gray-500">Black</p>
                      <p className="flex gap-1 font-poppins text-sm">
                        {" "}
                        <span className="line-through text-gray-500">
                          $90.00
                        </span>
                        <span className=" text-red-600">$60.00</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewStore(false)}
                    className="flex justify-end "
                  >
                    <X className="text-base font-normal text-gray-500 hover:text-black hover:rotate-90 hover:scale-75 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4  w-full my-6">
                <h1 className="text-xl font-librebaskerville ml-6 mt-6">
                  Akaze store
                </h1>
                <div className="ml-6 flex  gap-2 items-center text-gray-500">
                  <Check size={20} />
                  <p className="text-xs">
                    Pickup available, Usually ready in 24 hours
                  </p>
                </div>
                <div className="ml-6 flex gap-2  text-gray-500">
                  <MapPin size={20} />
                  <p className="text-sm">
                    548 North Blackstone Avenue <br /> Fresno CA 93701 <br />
                    United States
                  </p>
                </div>
                <div className="ml-6 flex  gap-2 items-center text-gray-500">
                  <Phone size={16} />
                  <p className="text-sm">+ 10123555444</p>
                </div>
                <a
                  href="https://www.google.com/maps?daddr=548+North+Blackstone+Avenue+Fresno+California+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-6 flex gap-2 items-center text-green-800 underline hover:no-underline cursor-pointer"
                >
                  <Map size={20} />
                  <p className="text-sm">Check this on google map</p>
                </a>
              </div>
            </div>
          </div>
        )}
        {/* if compare view is open */}
        {compareView && compare.length > 0 && (
          <CompareModel onClose={() => setCompareView(false)} />
        )}
        {/*if Add to cart is open */}
        {isAddToCart && (
          <AddToCartModal
            product={productpage}
            selectedVariant={selectedVariant}
            onClose={() => setIsAddToCart(false)}
            cart={cart}
            total={total}
            updateQuantity={updateQuantity}
          />
        )}
      </div>

      {/* if product Bougth together then show this frequently bougth together  */}
      {productpage.name.toLowerCase().replace(" ", "-") ===
        "bought-together" && (
        <div className="relative flex justify-between m-8 border border-gray-300">
          <h1 className="absolute -top-4 left-8 text-2xl bg-white px-4 font-librebaskerville">
            Frequently Bought Together
          </h1>
          <div className="flex flex-col m-8">
            <div className="flex items-center">
              <img
                src={boughtTogetherImages[boughtTogetherColor]}
                alt="bought-together"
                className="w-40 h-50 cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <Plus className="flex mx-2" />
              <img
                src={begginerSetImages[beginnerSetColor]}
                alt="bought-together"
                className={`w-40 h-50 cursor-pointer  transition-transform duration-300 ${
                  !isBegginerInclude
                    ? "opacity-30  cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              />
            </div>
            <div className="flex gap-1 items-center justify-center mt-8">
              <input
                type="checkbox"
                style={{
                  accentColor: "green",
                  width: "15px",
                  height: "15px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                checked
              />

              <h3 className="text-xs font-librebaskerville text-black ">
                THIS PRODUCT :
              </h3>
              <p className="text-xs font-normal text-gray-500">
                BOUGHT TOGETHER
              </p>
              <select
                value={boughtTogetherColor}
                onChange={(e) => setBoughtTogetherColor(e.target.value)}
                className="text-sm font-poppins border border-gray-500 text-gray-800"
              >
                <option value="Red">Red</option>
                <option value="Grey">Grey</option>
              </select>
              <p className="text-sm font-poppins text-gray-900">
                ${boughtTogetherPrices[boughtTogetherColor].toFixed(2)}
              </p>
            </div>
            <div className="flex gap-1 items-center justify-start mt-4 ">
              <input
                type="checkbox"
                style={{
                  accentColor: "green",
                  width: "15px",
                  height: "15px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                checked={isBegginerInclude}
                onChange={(e) => setIsBegginerInclude(e.target.checked)}
              />
              <p className="text-xs font-normal text-gray-500">
                THE BEGINNER SET
              </p>
              <select
                value={beginnerSetColor}
                onChange={(e) => setBegginerSetColor(e.target.value)}
                className="text-sm font-poppins border border-gray-500 text-gray-800"
              >
                <option value="Pink / 30 cm">Pink / 30 cm</option>
                <option value="Pink / 50 cm">Pink / 50 cm</option>
                <option value="Pink / 60 cm">Pink / 60 cm</option>
                <option value="Orange / 30 cm">Orange / 30 cm</option>
                <option value="Orange / 50 cm">Orange / 50 cm</option>
                <option value="Orange / 60 cm">Orange / 60 cm</option>
                <option value="Black / 30 cm">Black / 30 cm</option>
                <option value="Black / 50 cm">Black / 50 cm</option>
                <option value="Black / 60 cm">Black / 60 cm</option>
              </select>
              <p className="text-sm font-poppins text-gray-900">
                ${begginerSetPrices[beginnerSetColor].toFixed(2)}
              </p>
            </div>
          </div>

          {/* price is here */}
          <div className="flex flex-col self-start m-8 mr-8 sm:mr-24 md:mr-36 lg:mr-48">
            <div className="flex gap-2">
              <h1 className="text-md font-poppins">TOTAL PRICE : </h1>
              <p className="text-xl font-semibold font-librebaskerville">
                {totalPrice.toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-poppins text-gray-500 my-2">
              For 2 item(s)
            </p>
            <button
              onClick={handleAddToCartBoughtTogether}
              className="bg-zinc-800 text-white hover:bg-green-800  px-4 py-2"
            >
              {loading.addToCart ? (
                <LoadingEffect size="small" />
              ) : (
                "ADD SELECTED ITEM (S)"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPageCard;
