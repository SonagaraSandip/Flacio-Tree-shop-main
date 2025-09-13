import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ShopBG from "../assets/Shop/bg-breadcrumb.webp";
import { ChevronDown, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosStarOutline } from "react-icons/io";
import products from "../data/products";
import ProductListCard from "../data/ProductListCard";
import ProductCard from "../data/ProductCard";
import ScrollToTop from "./ScrollToTop";

import Footer from "./Footer";

import Floral from "../assets/Home/Beginner/Beginner-back_540x.webp";
import Geometric from "../assets/Home/Tiger-Aloe/Tiger-aloe-pink_600x.webp";
import Plaid from "../assets/Home/Pease-lily/Pease-lily-black-360x.webp";
import Striped from "../assets/Home/Philippine/Philippine-Back-540x.webp";

import Tiger from "../assets/Home/Tiger-Aloe/tiger-green-360x.png";
import Beginner from "../assets/Home/Beginner/Beginner-front_540x1.webp";
import Ruby from "../assets/Home/rubby-rubber/Rubby-rubber_540x.webp";

//grid icons
import { BiGridVertical, BiSolidGrid } from "react-icons/bi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

const Shop = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate(); // navigate function
  const [searchParams] = useSearchParams(); //hook to manage URL query parameters

  const filterSectionStyle = {
    // Subtract the header height

    top: "300px",
  };

  const MAX_PRICE = 153;
  const MIN_PRICE = 0;
  const productPerPage = 9;
  const [openCollection, setOpenCollection] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [openAvailability, setOpenAvailability] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [selectedSize, setSelectedSize] = useState([]);
  const [openColor, setOpenColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [openFeature, setOpenFeature] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("FeaturedFilter");

  //right side
  const [layout, setLayout] = useState("grid3");

  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [price, setPrice] = useState({
    min: 0,
    max: 153,
  });

  const collectionMapping = React.useMemo(
    () => ({
      "air-purifying": "Air Purifying",
      "ceramic-pots": "Ceramic Pots",
      "herbs-seeds": "Herb Seeds",
      "indoor-plants": "Indoor Plants",
      "low-maintainance": "Low Maintainance",
      "plant-bundle": "Plant Bundle",
      "wpbingo": "wpbingo",
      "se-store" : "SE Store",
      "akatsuki-store" : "Akatsuki Store",
      "akaza-store" : "Akaza Store",
      "lulu-store" : "Lulu Store",
      all: null, // no collection selected
    }),
    []
  );

  // reverse mapping for generating url from display name
  const reverseCollectionMapping = React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(collectionMapping).map(([key, value]) => [value, key])
      ),
    [collectionMapping]
  );

  //intialize state from URL
  useEffect(() => {
    // set collection from URL parameter
    if (collectionId && collectionMapping[collectionId]) {
      setSelectedCollection(collectionMapping[collectionId]);
    } else {
      setSelectedCollection(null);
    }

    //Set availability filter from URL query parameters
    const availabilityParam = searchParams.get("availability");
    if (availabilityParam) {
      const availabilityValues = availabilityParam.split(",");
      setAvailability({
        inStock: availabilityValues.includes("inStock"), // check if availabilityValue includes "inStock"
        outOfStock: availabilityValues.includes("outOfStock"),
      });
    }

    // set price filter from URL query parameters
    const minPrice = searchParams.get("min-price");
    const maxPrice = searchParams.get("max-price");
    if (minPrice || maxPrice) {
      setPrice({
        min: minPrice ? parseFloat(minPrice) : 0,
        max: maxPrice ? parseFloat(maxPrice) : 153, // convert a string to floating point number
      });
    }

    //set size filter from URL query parameters
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      setSelectedSize(sizeParam.split(","));
    }

    //set color filter from URL query parameters
    const colorParam = searchParams.get("color");
    if (colorParam) {
      setSelectedColor(colorParam.split(","));
    }

    // set sort filter from URL query parameters
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setFilter(sortParam);
    }
  }, [collectionId, searchParams , collectionMapping]);

  // Update URL when filter is change
  useEffect(() => {
    const params = new URLSearchParams(); // create a new URLSearchParams object

    //add availability filter to query parameters
    const availabilityValues = [];
    if (availability.inStock) {
      availabilityValues.push("inStock");
    }
    if (availability.outOfStock) {
      availabilityValues.push("outOfStock");
    }
    if (availabilityValues.length > 0) {
      params.set("availability", availabilityValues.join(","));
    }

    //add price filter to query parameter
    if (price.min !== 0 || price.max !== 153) {
      params.set("min-price", price.min);
      params.set("max-price", price.max);
    } // convert number to string

    //add size filter to query parameter
    if (selectedSize.length > 0) {
      params.set("size", selectedSize.join(","));
    }

    if (selectedColor.length > 0) {
      params.set("color", selectedColor.join(","));
    }

    if (filter !== "FeaturedFilter") {
      params.set("sort", filter);
    }

    //update a URL without causing navigationb
    const newSearch = params.toString(); // convert the URLSearchParams object to a string
    const collectionSlug = selectedCollection
      ? reverseCollectionMapping[selectedCollection] || "all"
      : "all";

    const newPath = `/collections/${collectionSlug}?${newSearch}`;

    // Use replace instead of navigate to avoid adding to history
    window.history.replaceState({}, "", newPath);
  }, [
    selectedCollection,
    availability,
    price,
    selectedSize,
    selectedColor,
    filter,
    reverseCollectionMapping,
  ]);

  //use refs to measure content height for smooth transition
  const collectionRef = useRef(null);
  const availabilityRef = useRef(null);
  const priceRef = useRef(null);
  const sizeRef = useRef(null);
  const colorRef = useRef(null);
  const featureRef = useRef(null);

  const [heights, setHeights] = useState({
    collection: "auto",
    availability: "auto",
    price: "auto",
    size: "auto",
    color: "auto",
    feature: "auto",
  });

  //update heights when sections open/close
  useEffect(() => {
    const updateHeights = () => {
      setHeights({
        collection: openCollection
          ? `${collectionRef.current?.scrollHeight}px`
          : "0px",
        availability: openAvailability
          ? `${availabilityRef.current?.scrollHeight}px`
          : "0px",
        price: openPrice ? `${priceRef.current?.scrollHeight}px` : "0px",
        size: openSize ? `${sizeRef.current?.scrollHeight}px` : "0px",
        color: openColor ? `${colorRef.current?.scrollHeight}px` : "0px",
        feature: openFeature ? `${featureRef.current?.scrollHeight}px` : "0px",
      });
    };
    updateHeights();
  }, [
    openCollection,
    openAvailability,
    openPrice,
    openSize,
    openColor,
    openFeature,
  ]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCollection,
    availability,
    price,
    selectedSize,
    selectedColor,
    filter,
  ]);

  const [activeThumb, setActiveThumb] = useState(null); // min or max

  const handleCollectionChange = (collection) => {
    const collectionSlug = reverseCollectionMapping[collection] || "all";
    navigate(`/collections/${collectionSlug}`);
  };

  const handleAvailabilityChange = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  //filter products is here
  const filteredProducts = products.filter((product) => {
    if (selectedCollection) {
      const collectionMatch =
        (selectedCollection === "Air Purifying" && product.AirPurifying) ||
        (selectedCollection === "Ceramic Pots" && product.CeramicPots) ||
        (selectedCollection === "Herb Seeds" && product.HerbSeeds) ||
        (selectedCollection === "Indoor Plants" && product.IndoorPlants) ||
        (selectedCollection === "Low Maintainance" &&
          product.LowMaintainance) ||
        (selectedCollection === "Plant Bundle" && product.PlantBundle) ||
        (selectedCollection === "wpbingo" && product.wpbingo) ||
        (selectedCollection === "SE Store" && product.SeStore) || 
        (selectedCollection === "Akatsuki Store" && product.AkatsukiStore) ||
        (selectedCollection === "Akaza Store" && product.AkazaStore) || 
        (selectedCollection === "Lulu Store" && product.LuluStore);

      if (!collectionMatch) return false;
    }

    //for stock filter
    if (availability.inStock && !availability.outOfStock && !product.inStock) {
      return false;
    }
    if (!availability.inStock && availability.outOfStock && product.inStock) {
      return false;
    }

    //for price filter
    const productPrice = product.DiscountPrice || product.originalPrice;
    if (productPrice < price.min || productPrice > price.max) {
      return false;
    }

    //for size filter
    if (selectedSize.length > 0) {
      if (
        !product.size ||
        !product.size.some((s) => selectedSize.includes(String(s)))
      ) {
        return false;
      }
    }

    //for color filter
    if (selectedColor.length > 0) {
      if (
        !product.variants ||
        !product.variants.some(
          (variant) => variant.color && selectedColor.includes(variant.color)
        )
      ) {
        return false;
      }
    }

    return true;
  });

  // selected filter logic here
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getPrice = (product) =>
      product.discountPrice || product.originalPrice;
    const priceA = getPrice(a);
    const priceB = getPrice(b);
    // Implement your custom sorting logic here
    switch (filter) {
      case "bestselling":
        return b.isBestSelling - a.isBestSelling;
      case "title-ascending":
        return a.name.localeCompare(b.name);
      case "title-descending":
        return b.name.localeCompare(a.name);
      case "price-ascending":
        return priceA - priceB;
      case "price-descending":
        return priceB - priceA;
      case "created-ascending":
        return a.id - b.id;
      case "created-descending":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const getAvailableSizes = () => {
    const availableSizes = new Set();

    filteredProducts.forEach((product) => {
      if (product.size) {
        product.size.forEach((size) => availableSizes.add(String(size)));
      }
    });
    return Array.from(availableSizes);
  };

  //calculate available sizes
  const availableSizes = getAvailableSizes();

  const resetCollection = () => {
    setSelectedCollection(null);
    navigate("/collections/all");
  };

  const resetAvailability = () => {
    setAvailability({ inStock: false, outOfStock: false });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: checked }));
  };

  const resetPrice = () => {
    setPrice({ min: 0, max: 153 });
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), price.max - 1);
    setPrice((prev) => ({ ...prev, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), price.min + 1);
    setPrice((prev) => ({ ...prev, max: value }));
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll to top
    });
  };

  const resetSize = (sizeToRemove) => {
    if (sizeToRemove) {
      setSelectedSize((prev) => prev.filter((s) => s !== sizeToRemove));
    } else {
      setSelectedSize([]);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll to top
    });
  };

  const resetColor = (colorToRemove) => {
    if (colorToRemove) {
      setSelectedColor((prev) => prev.filter((c) => c !== colorToRemove));
    } else {
      setSelectedColor([]);
    }
  };

  const colorMap = [
    { name: "Black", value: "#000000", count: 5 },
    { name: "Blue", value: "#0057FF", count: 3 },
    { name: "Floral", image: Floral, count: 2 },
    { name: "Geometric", image: Geometric, count: 1 },
    { name: "Gray", value: "#999999", count: 1 },
    { name: "Orange", value: "#FF7A00", count: 1 },
    { name: "Pink", value: "#FFB6C1", count: 5 },
    { name: "Plaid", image: Plaid, count: 2 },
    { name: "Red", value: "#FF0000", count: 2 },
    { name: "Striped", image: Striped, count: 1 },
    { name: "White", value: "#FFFFFF", count: 2 },
  ];

  const handleColorChange = (color) => {
    setSelectedColor((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    window.scrollTo({
      top: 300,
      behavior: "smooth", // smooth scroll to top
    });
  };

  // Get count of products for each color in filtered results
  const getColorCounts = () => {
    const colorCounts = {};

    //intialize with all colors from colormap
    colorMap.forEach((color) => {
      colorCounts[color.name] = 0;
    });

    filteredProducts.forEach((product) => {
      if (product.variants) {
        product.variants.forEach((variant) => {
          // eslint-disable-next-line no-prototype-builtins
          if (variant.color && colorCounts.hasOwnProperty(variant.color)) {
            colorCounts[variant.color]++;
          }
        });
      }
    });

    return colorCounts;
  };

  const colorCounts = getColorCounts();

  //create a color object for display
  const allColors = colorMap.map((color) => ({
    ...color,
    count: colorCounts[color.name] || 0,
  }));

  const feature = [
    {
      name: "Tiger Aloe",
      image: Tiger,
      price: 150,
      link: "/products/tiger-aloe",
    },
    {
      name: "The Beginner Set",
      image: Beginner,
      price: 130,
      link: "/products/the-beginner-set",
    },
    {
      name: "Ruby Rubber Tree",
      image: Ruby,
      price: 90,
      DiscountPrice: 51,
      link: "/products/ruby-rubber-tree",
    },
  ];

  const visibleColors = showAll ? allColors : allColors.slice(0, 5);

  //clear all filter
  const clearAllFilters = () => {
    resetCollection();
    resetAvailability();
    resetPrice();
    resetSize();
    resetColor();
    setFilter("FeaturedFilter");
    navigate("/collections/all");
  };

  // pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll to top
    });
  };
  const indexofLastProduct = currentPage * productPerPage;
  const indexofFirstProduct = indexofLastProduct - productPerPage;
  const currentProducts = sortedProducts.slice(
    indexofFirstProduct,
    indexofLastProduct
  );

  return (
    <Layout className="relative ">
      <img
        src={ShopBG}
        alt="Shop Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <h1 className="flex items-center justify-center h-[300px] font-librebaskerville text-6xl  text-black ">
        {<span>{selectedCollection || "Products"} </span>}
      </h1>

      {/* Left side product details */}
      <div className="container flex md:mx-auto ">
        <div
          className="w-[25%] bg-white px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8"
          style={filterSectionStyle}
        >
          {/*collection */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenCollection(!openCollection);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              Collections
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openCollection ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* reset collection button */}
            {openCollection && selectedCollection && (
              <button
                onClick={resetCollection}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}
            <div
              ref={collectionRef}
              style={{
                maxHeight: heights.collection,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openCollection && (
                <ul className="space-y-3 font-poppins pb-2 ">
                  <li
                    onClick={() => handleCollectionChange("Air Purifying")}
                    className={`flex justify-between items-center hover:text-green-900 ${
                      selectedCollection === "Air Purifying"
                        ? "text-black  "
                        : "text-gray-500"
                    }`}
                  >
                    <p className={` hover:text-green-800 `}>Air Purifying</p>
                    <p
                      className={`text-sm flex items-center justify-center w-6 h-6 rounded-full ${
                        selectedCollection === "Air Purifying"
                          ? "bg-green-950 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {products.filter((p) => p.AirPurifying).length}
                    </p>
                  </li>
                  <li
                    onClick={() => handleCollectionChange("Ceramic Pots")}
                    className={`flex justify-between items-center hover:text-green-900 ${
                      selectedCollection === "Ceramic Pots"
                        ? "text-black "
                        : "text-gray-500"
                    }`}
                  >
                    <p className={` hover:text-green-800 `}>Ceramic Pots</p>
                    <p
                      className={`text-sm flex items-center justify-center w-6 h-6 rounded-full ${
                        selectedCollection === "Ceramic Pots"
                          ? "bg-green-950 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {products.filter((p) => p.CeramicPots).length}
                    </p>
                  </li>
                  <li
                    onClick={() => handleCollectionChange("Herb Seeds")}
                    className={`flex justify-between items-center hover:text-green-900 ${
                      selectedCollection === "Herb Seeds"
                        ? "text-black "
                        : "text-gray-500"
                    }`}
                  >
                    <p className={` hover:text-green-800 `}>Herb Seeds</p>
                    <p
                      className={`text-sm flex items-center justify-center w-6 h-6 rounded-full ${
                        selectedCollection === "Herb Seeds"
                          ? "bg-green-950 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {products.filter((p) => p.HerbSeeds).length}
                    </p>
                  </li>
                  <li
                    onClick={() => handleCollectionChange("Indoor Plants")}
                    className={`flex justify-between items-center hover:text-green-900 ${
                      selectedCollection === "Indoor Plants"
                        ? "text-black "
                        : "text-gray-500"
                    }`}
                  >
                    <p className={` hover:text-green-800 `}>Indoor Plants</p>
                    <p
                      className={`text-sm flex items-center justify-center w-6 h-6 rounded-full ${
                        selectedCollection === "Indoor Plants"
                          ? "bg-green-950 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {products.filter((p) => p.IndoorPlants).length}
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Availability */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenAvailability(!openAvailability);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              <span className="flex">
                Availability{" "}
                {availability.inStock || availability.outOfStock ? (
                  <span className="ml-1 h-5 w-5  text-sm flex items-center justify-center text-white bg-green-900 rounded-full">
                    1
                  </span>
                ) : null}
              </span>
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openAvailability ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when checkbox is ticked */}
            {openAvailability &&
              (availability.inStock || availability.outOfStock) && (
                <button
                  onClick={resetAvailability}
                  className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
                >
                  Reset
                </button>
              )}

            <div
              ref={availabilityRef}
              style={{
                maxHeight: heights.availability,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openAvailability && (
                <ul className="space-y-3 font-poppins">
                  <li
                    onClick={(e) => {
                      const isStockCount = filteredProducts.filter(
                        (fp) => fp.inStock
                      ).length;

                      if (isStockCount > 0) {
                        handleAvailabilityChange("inStock");
                      } else {
                        e.stopPropagation();
                      }
                    }}
                    className={`flex items-center justify-between gap-2 ${
                      availability.inStock
                        ? " text-black  "
                        : filteredProducts.filter((fp) => fp.inStock).length > 0
                        ? "text-gray-500 hover:text-green-800 cursor-pointer"
                        : "line-through cursor-not-allowed text-gray-500"
                    }`}
                  >
                    <div className="flex items-center font-poppins gap-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        name="inStock"
                        onChange={(e) => {
                          if (
                            filteredProducts.filter((fp) => fp.inStock).length >
                            0
                          ) {
                            handleCheckBoxChange(e);
                          } else {
                            e.stopPropagation();
                          }
                        }}
                        checked={availability.inStock}
                        disabled={
                          filteredProducts.filter((fp) => fp.inStock).length ===
                          0
                        }
                        className="hover:text-black cursor-pointer"
                      />
                      <label
                        htmlFor="inStock"
                        onClick={() => {
                          filteredProducts.filter((fp) => fp.inStock).length >
                            0 && handleAvailabilityChange("inStock");
                        }}
                        className={` ${
                          filteredProducts.filter((fp) => fp.inStock).length ===
                          0
                            ? "line-through cursor-not-allowed click-none"
                            : "cursor-pointer"
                        }`}
                      >
                        In Stock
                      </label>
                    </div>
                    <div
                      className={`text-sm text-gray-500 flex items-center justify-center w-6 h-6 rounded-full ${
                        availability.inStock
                          ? "bg-green-900 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {filteredProducts.filter((p) => p.inStock).length}
                    </div>
                  </li>
                  <li
                    onClick={(e) => {
                      const outOfStockCount = filteredProducts.filter(
                        (fp) => fp.outOfStock
                      ).length;

                      if (outOfStockCount > 0) {
                        handleAvailabilityChange("outOfStock");
                      } else {
                        e.stopPropagation();
                      }
                    }}
                    className={`flex items-center justify-between gap-2 ${
                      availability.outOfStock
                        ? " text-black  "
                        : filteredProducts.filter((fp) => fp.outOfStock)
                            .length > 0
                        ? "text-gray-500 hover:text-green-800 cursor-pointer"
                        : "line-through cursor-not-allowed text-gray-500"
                    } `}
                  >
                    <div className="flex font-poppins gap-2 ">
                      <input
                        type="checkbox"
                        id="outOfStock"
                        name="outOfStock"
                        checked={availability.outOfStock}
                        onChange={(e) => {
                          if (
                            filteredProducts.filter((fp) => fp.outOfStock)
                              .length > 0
                          ) {
                            handleCheckBoxChange(e);
                          } else {
                            e.stopPropagation();
                          }
                        }}
                        disabled={
                          filteredProducts.filter((fp) => fp.outOfStock)
                            .length === 0
                        }
                        className={`cursor-pointer ${
                          filteredProducts.filter((fp) => fp.outOfStock)
                            .length === 0
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                      />
                      <label
                        htmlFor="outOfStock"
                        onClick={() => {
                          filteredProducts.filter((fp) => fp.outOfStock)
                            .length > 0 &&
                            handleAvailabilityChange("outOfStock");
                        }}
                        className=" cursor-pointer"
                      >
                        <span
                          className={`${
                            filteredProducts.filter((fp) => fp.outOfStock)
                              .length === 0
                              ? "line-through cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Out of Stock
                        </span>
                      </label>
                    </div>
                    <div
                      className={`text-sm text-gray-500 flex items-center justify-center w-6 h-6 rounded-full ${
                        availability.outOfStock
                          ? "bg-green-900 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {
                        products.filter(
                          (p) =>
                            p.outOfStock &&
                            filteredProducts.filter((fp) => fp.id === p.id)
                              .length
                        ).length
                      }
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Price */}
          <div className="flex flex-col my-8 cursor-pointer">
            <h2
              onClick={() => {
                setOpenPrice(!openPrice);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              <span className="flex">
                {" "}
                Price{" "}
                {price.max !== 153 && (
                  <span className="ml-1 h-2 w-2 bg-green-700 rounded-full"></span>
                )}
              </span>
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openPrice ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when price is change */}
            {openPrice && (price.min !== 0 || price.max !== 153) && (
              <button
                onClick={resetPrice}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={priceRef}
              style={{
                maxHeight: heights.price,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openPrice && (
                <div className="flex flex-col gap-4">
                  <label className=" text-gray-500 text-sm font-librebaskerville">
                    Price: ${price.min.toFixed(2)} — ${price.max.toFixed(2)}
                  </label>

                  <div className="w-full relative h-8">
                    {/* Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-300 rounded"></div>

                    {/* Active range */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded"
                      style={{
                        left: `${(price.min / MAX_PRICE) * 100}%`,
                        right: `${100 - (price.max / MAX_PRICE) * 100}%`,
                      }}
                    ></div>

                    {/* Min Thumb */}
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={price.min}
                      onChange={handleMinChange}
                      onMouseDown={() => setActiveThumb("min")}
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer "
                      style={{ zIndex: activeThumb === "min" ? 20 : 10 }}
                    />

                    {/* Visual Min Thumb */}
                    <div
                      className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 "
                      style={{ left: `${(price.min / MAX_PRICE) * 100}%` }}
                    ></div>

                    {/* Max Thumb */}
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={price.max}
                      onChange={handleMaxChange}
                      onMouseDown={() => setActiveThumb("max")}
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer "
                      style={{ zIndex: activeThumb === "max" ? 20 : 10 }}
                    />

                    {/* Visual Max Thumb */}
                    <div
                      className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 "
                      style={{ left: `${(price.max / MAX_PRICE) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Size */}
          <div className="flex flex-col my-8 cursor-pointer">
            <button
              onClick={() => {
                // Handle dropdown toggle
                setOpenSize(!openSize);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              <span className="flex">
                Size{" "}
                {selectedSize.length !== 0 ? (
                  <span className="ml-1 h-5 w-5  text-sm flex items-center justify-center text-white bg-green-700 rounded-full">
                    {selectedSize.length}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openSize ? "-rotate-180" : ""
                }`}
              />
            </button>

            {/* reset size button */}
            {openSize && selectedSize.length > 0 && (
              <button
                onClick={() => resetSize()}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={sizeRef}
              style={{
                maxHeight: heights.size,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openSize && (
                <div className="flex gap-4  mt-2">
                  {["30", "50", "60"].map((size) => {
                    const isAvailable = availableSizes.includes(size);
                    const isSelected = selectedSize.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (isAvailable) {
                            handleSizeChange(size);
                          }
                        }}
                        disabled={!isAvailable}
                        className={`py-2 px-4 border rounded-full ${
                          !isAvailable
                            ? "border-gray-300 text-gray-400 cursor-not-allowed line-through"
                            : isSelected
                            ? "border-black bg-gray-200 hover:bg-gray-300"
                            : "border-gray-400 hover:border-black"
                        }`}
                      >
                        {size}{" "}
                        <span className="text-gray-500 text-sm font-poppins items-center justify-center">
                          cm
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/* Color */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenColor(!openColor);
                setTimeout(() => {
                  setHeights((prev) => ({
                    ...prev,
                    color: openColor
                      ? "0px"
                      : `${colorRef.current?.scrollHeight}px`,
                  }));
                });
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              <span className="flex">
                Color{" "}
                {selectedColor.length !== 0 ? (
                  <span className="ml-1 h-5 w-5  text-sm flex items-center justify-center text-white bg-green-700 rounded-full">
                    {selectedColor.length}
                  </span>
                ) : null}
              </span>
              <span className="transition-transform duration-300">
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openColor ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when checkbox is ticked */}
            {openColor && selectedColor.length > 0 && (
              <button
                onClick={() => resetColor()}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={colorRef}
              style={{
                maxHeight: heights.color,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openColor && (
                <>
                  <div className="pb-2">
                    {visibleColors.map((color) => (
                      <div
                        key={color.name}
                        onClick={() => {
                          handleColorChange(color.name);
                        }}
                        className="flex items-center justify-between cursor-pointer group my-2"
                      >
                        <div className="flex items-center gap-2 ">
                          {color.image ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                              <img
                                src={color.image}
                                alt={color.name}
                                loading="lazy"
                                className="object-cover w-full h-full"
                              />
                              {selectedColor.includes(color.name) && (
                                <Check className="absolute inset-0 m-auto  bg-black opacity-50 text-white w-8 h-8" />
                              )}
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer group-hover:opacity-80"
                              style={{ backgroundColor: color.value }}
                            >
                              {/* selected color show tick */}
                              {selectedColor.includes(color.name) && (
                                <Check
                                  size={24}
                                  className={`${
                                    color.value === "#FFFFFF"
                                      ? "text-black"
                                      : "text-white"
                                  }`}
                                />
                              )}
                            </div>
                          )}
                          <span className="text-sm font-poppins text-gray-700 hover:text-gray-950">
                            {color.name}
                          </span>
                        </div>

                        {/* right side count */}
                        <span
                          className={`text-sm px-2 py-0.5 rounded-full ${
                            selectedColor.includes(color.name)
                              ? "bg-green-900 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {color.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/*view more  */}
                  {allColors.length > 5 && (
                    <button
                      onClick={() => {
                        setShowAll(!showAll);
                        setTimeout(() => {
                          setHeights((prev) => ({
                            ...prev,
                            color: `${colorRef.current?.scrollHeight}px`,
                          }));
                        }, 10);
                      }}
                      className="text-sm mt-1 text-black hover:text-gray-500 w-full"
                    >
                      {showAll ? "- View More" : "+ View More"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Feature Product */}
          <div className="flex flex-col my-8 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenFeature(!openFeature);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              Feature Product
              <span className="transition-transform duration-300">
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openFeature ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            <div
              ref={featureRef}
              style={{
                maxHeight: heights.feature,
                transition: "max-height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              {openFeature &&
                feature.map((item, index) => (
                  <div key={item.name} className="flex flex-col mt-4">
                    <div className="flex items-center ">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        onClick={() => navigate(item.link)}
                        className="w-20 h-24 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="ml-4 flex flex-col gap-2 ">
                        <div className="flex text-gray-400 ">
                          <IoIosStarOutline size={12} />
                          <IoIosStarOutline size={12} />
                          <IoIosStarOutline size={12} />
                          <IoIosStarOutline size={12} />
                          <IoIosStarOutline size={12} />
                        </div>
                        <h3
                          onClick={() => navigate(item.link)}
                          className="text-md font-librebaskerville cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-librebaskerville">
                          {item.DiscountPrice ? (
                            <>
                              <span className="line-through text-xs text-gray-500">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-gray-800 ml-1 text-sm">
                                ${item.DiscountPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-800 text-sm">
                                $ {item.price.toFixed(2)}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    {index !== feature.length - 1 && (
                      <div className="flex items-center justify-center h-px w-full mt-4 bg-gray-200" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right side product image */}
        <div className="w-[75%] bg-white px-6 py-8">
          <div className="flex flex-col px-6">
            <div className="flex items-center justify-between mb-6 ">
              <p className="text-sm text-gray-500">
                {filteredProducts.length === 0
                  ? "No products found."
                  : `You've viewed ${filteredProducts.length} of ${filteredProducts.length} products`}
              </p>
              <div className="flex items-center gap-2">
                <div className=" p-2 flex items-center justify-center gap-2 border border-gray-500">
                  <HiOutlineBars3
                    onClick={() => setLayout("list")}
                    className={`text-2xl cursor-pointer ${
                      layout === "list" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <BiGridVertical
                    onClick={() => setLayout("grid")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <BiSolidGrid
                    onClick={() => setLayout("grid3")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid3" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <TfiLayoutGrid4Alt
                    onClick={() => setLayout("grid4")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid4" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>

                {/* filter is here */}
                <div className=" h-full w-full flex items-center justify-center relative">
                  <select
                    onChange={handleFilterChange}
                    value={filter}
                    className="p-3  self-start border border-gray-500 items-center text-sm font-librebaskerville cursor-pointer"
                  >
                    <option value="FeaturedFilter">Featured</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
              </div>
            </div>
            {/* selected Filter show here */}
            <div className="mb-4 mt-0 md:-mt-3 text-gray-500 ">
              <div className="flex flex-wrap">
                {availability.inStock && (
                  <span
                    onClick={() => resetAvailability()}
                    className="flex group mr-2 text-xs font-poppins bg-gray-200 hover:bg-black group-hover:text-white hover:text-white px-2 py-1  text-gray-700 cursor-pointer transition-colors duration-300"
                  >
                    Availability : In Stock{" "}
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:text-white group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                )}
                {availability.outOfStock && (
                  <span
                    onClick={() => resetAvailability()}
                    className="flex group mr-2 text-xs font-poppins bg-gray-200 hover:bg-black group-hover:text-white hover:text-white px-2 py-1  text-gray-700 cursor-pointer transition-colors duration-300"
                  >
                    Availability : Out of Stock
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:text-white group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                )}
                {(price.min !== 0 || price.max !== 153) && (
                  <span
                    onClick={() => resetPrice()}
                    className="flex group mr-2 text-xs font-poppins bg-gray-200 hover:bg-black group-hover:text-white hover:text-white px-2 py-1  text-gray-700 cursor-pointer transition-colors duration-300"
                  >
                    Price: {price.min !== 0 ? `$${price.min}` : "$0"}{" "}
                    {price.max !== 153 ? `- $${price.max}` : ""}
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:text-white group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                )}
                {selectedSize.map((size) => (
                  <span
                    key={size}
                    onClick={() => resetSize(size)}
                    className="flex group mr-2 text-xs font-poppins bg-gray-200 hover:bg-black group-hover:text-white hover:text-white px-2 py-1  text-gray-700 cursor-pointer transition-colors duration-300"
                  >
                    size: {size}
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:text-white group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                ))}
                {selectedColor.map((color) => (
                  <span
                    key={color}
                    onClick={() => resetColor(color)}
                    className="flex group mr-2 text-xs font-poppins bg-gray-200 hover:bg-black group-hover:text-white hover:text-white px-2 py-1  text-gray-700 cursor-pointer transition-colors duration-300"
                  >
                    color: {color}
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:text-white group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                ))}
                {selectedSize.length > 0 ||
                selectedColor.length > 0 ||
                price.max !== 153 ||
                availability.inStock ||
                availability.outOfStock ? (
                  <span
                    onClick={clearAllFilters}
                    className="flex group mr-2 text-xs font-poppins  px-2 py-1  text-gray-700 cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    Clear all filters
                    <span>
                      <X
                        size={15}
                        className="ml-2 text-black group-hover:rotate-180 group-hover:scale-90 transition duration-500"
                      />
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* product images */}
            <div
              className={
                layout === "list"
                  ? "flex flex-col gap-6"
                  : layout === "grid"
                  ? "grid grid-cols-2 gap-6"
                  : layout === "grid3"
                  ? "grid grid-cols-3 gap-6"
                  : "grid grid-cols-4 gap-6"
              }
            >
              {currentProducts.length === 0 && (
                <div className="col-span-4 text-center">
                  <p className="text-gray-500 text-4xl flex items-center justify-center  font-librebaskerville mt-4">
                    No products found.
                    <br />
                    Use fewer filters or
                    <span
                      onClick={clearAllFilters}
                      className="text-gray-800 underline hover:text-black font-librebaskervilleItalic cursor-pointer"
                    >
                      Clear all
                    </span>
                  </p>
                </div>
              )}

              {currentProducts.map((product) => (
                <div key={product.id}>
                  {/* Render product based on layout */}
                  {layout === "list" ? (
                    <div>
                      <ProductListCard product={product} />
                    </div>
                  ) : (
                    <ProductCard product={product} />
                  )}
                </div>
              ))}
            </div>

            {/* pagination */}
            {filteredProducts.length > productPerPage && (
              <div className="col-span-4 my-6 text-center">
                <p className="text-gray-500 text-4xl flex gap-2 items-center justify-center  font-librebaskerville mt-4">
                  <button
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className={`px-1 py-2 border border-black  text-gray-700 hover:bg-black hover:text-white hover:border-white font-poppins transition duration-300 ${
                      currentPage === 1 ? "hidden" : ""
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`border border-black px-3 py-2 text-sm font-poppins  ${
                        currentPage === index + 1
                          ? "bg-black text-white"
                          : " hover:bg-black hover:text-white hover:border-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className={`border border-black text-gray-700 hover:bg-black hover:text-white hover:border-white font-poppins px-1 py-2 transition duration-300 ${
                      currentPage === totalPages ? "hidden" : ""
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </Layout>
  );
};

export default Shop;
