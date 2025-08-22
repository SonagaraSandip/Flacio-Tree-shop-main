import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Whitelogo from "../assets/Home/logo-white.png";
import BlackLogo from "../assets/Home/logo.avif";
import { ChevronDown, Search, User, Heart, ShoppingBag } from "lucide-react";

//homepage navbar
import Home1 from "../assets/Home/HomeNavbar/home-1.webp";
import Home2 from "../assets/Home/HomeNavbar/home-2.webp";
import Home3 from "../assets/Home/HomeNavbar/home-3.webp";
import Home4 from "../assets/Home/HomeNavbar/home-4.webp";
import Home5 from "../assets/Home/HomeNavbar/home-5.webp";
import Home6 from "../assets/Home/HomeNavbar/home-6.webp";

//shop navbar
import Dog from "../assets/Home/ig-2_540x.png";
import Plant from "../assets/Home/ig-4_540x.png";

export default function Navbar({ setLayout, transparentUntilScroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!transparentUntilScroll) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentUntilScroll]);

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredMenu(null);
    }, 3000); //300 ms delay

    setHoverTimeout(timeout);
  };

  //when entring the drop down
  const handleDropDownEnter = () => {
    //clear closing timeout
    if (hoverTimeout) {
      setHoverTimeout(null);
    }
  };

  //when leaving the dropdown
  const handleDropDownLeave = () => {
    setHoveredMenu(null);
  };

  //Homepage navbar
  const HomePages = [
    { name: "Home Modern", img: Home1, layout: "modern" },
    { name: "Home Flate", img: Home2, layout: "flate" },
    { name: "Home Collection", img: Home3, layout: "collection" },
    { name: "Home Classic", img: Home4, layout: "classic" },
    { name: "Home Clean", img: Home5, layout: "clean" },
    { name: "Home Stylish", img: Home6, layout: "stylish" },
  ];

  const ShopLayout = [
    { name: "Standard" },
    { name: "Standard With Banner" },
    { name: "Categories Image 1" },
    { name: "Categories Image 2" },
    { name: "FullWidth" },
    { name: "List View" },
    { name: "Simple" },
    { name: "Mansonry", tag: "Hot" },
    { name: "Overlay Header" },
    { name: "Collection List" },
    { name: "Collection LIst 2" },
    { name: "Collection Slider", tag: "New" },
  ];
  const ShopFilter = [
    { name: "On top" },
    { name: "Dropdown" },
    { name: "Side out" },
    { name: "Drawer" },
    { name: "Sidebar Style 1" },
    { name: "Sidebar Style 2", tag: "Hot" },
    { name: "Sidebar Style 3" },
    { name: "Sidebar Style 4", tag: "Hot" },
    { name: "Filter Scroll" },
  ];
  const ShopLoader = [
    { name: "Shop Paggination" },
    { name: "Shop Load more button" },
    { name: "Shop Infinite scrolling" },
    { name: "Cart Side Out" },
    { name: "Cart Page" },
  ];

  const productMenu = [
    {
      title: "Product Layout",
      items: [
        { name: "Grid 1 columns" },
        { name: "Grid 2 columns" },
        { name: "Grid modern" },
        { name: "Grid sticky" },
        { name: "Slider full-width" },
        { name: "Bottom Thumbnails" },
        { name: "Left Thumbnails" },
        { name: "Right Thumbnails" },
        { name: "Without Thumbnails" },
        { name: "Left Sidebar" },
        { name: "Right Sidebar" },
        { name: "Group Product" },
        { name: "Tab information" },
        { name: "Collapsible tabs information" },
        { name: "Full Content information" },
        { name: "Vertical information" },
      ],
    },
    {
      title: "Featured",
      items: [
        { name: "Pre-order product", tag: "Hot" },
        { name: "Sticky add to cart" },
        { name: "Video" },
        { name: "3D, AR models" },
        { name: "Product 360" },
        { name: "Countdown Timer" },
        { name: "Frequently Bought Together v1", tag: "New" },
        { name: "Frequently Bought Together v2" },
        { name: "Buy more save more" },
        { name: "Real-time visitors" },
        { name: "Stock countdown", tag: "New" },
        { name: "Back in stock notification" },
        { name: "Dynamic checkout button" },
        { name: "Trust badge" },
        { name: "Delivery information" },
      ],
    },
    {
      title: "Featured",
      items: [
        { name: "Product Upsell Features", tag: "New" },
        { name: "Product pickup" },
        { name: "Shipping info" },
        { name: "Ask a Question" },
        { name: "Product Variable Image" },
        { name: "Product Variable Color", tag: "New" },
        { name: "Product Variable Color and Check Box" },
        { name: "Product Variable Dropdown" },
        { name: "Product Variable Color and Dropdown", tag: "New" },
        { name: "Product Variable Box" },
        { name: "Product Variable Check Box" },
      ],
    },
    {
      title: "Product Cart",
      items: [
        { name: "Scale hover" },
        { name: "Slider hover" },
        { name: "Fadein hover" },
        { name: "Zoom hover" },
        { name: "Icons on hover" },
        { name: "Icon & add to cart" },
        { name: "Quick view button" },
        { name: "Add to cart button" },
        { name: "Wishlist on the bottom" },
        { name: "Dual Button" },
        { name: "Slider up" },
        { name: "Info on hover", tag: "Hot" },
        { name: "Quick shop button" },
      ],
    },
  ];

  return (
    <div
      className={` top-0 left-0 w-full z-50 transition-all duration-1000 ease-in-out ${
        scrolled
          ? "bg-white text-black fixed "
          : "bg-transparent text-white absolute"
      } `}
    >
      <div
        className={`max-w-8xl mx-auto flex items-center justify-between px-6 py-4`}
      >
        {/*left menu icons */}
        <div className="flex group gap-6 text-sm font-light">
          {/* Home link hover */}

          <div
            className="relative group"
            onMouseEnter={() => setHoveredMenu("home")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/"
              className="flex items-center font-poppins gap-1 cursor-pointer"
            >
              <span className="hover:underline">HOME</span>
              <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />{" "}
            </Link>

            {/* Hovered indicator for home page */}

            {hoveredMenu === "home" && (
              <div
                onMouseEnter={handleDropDownEnter}
                onMouseLeave={handleDropDownLeave}
                className="absolute -left-6 top-4 mt-4 z-50 bg-white shadow-xl p-5 w-[750px] max-h-[90vh] overflow-y-auto "
              >
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {HomePages.map((page) => (
                    <div
                      key={page.name}
                      onClick={() => {
                        setLayout(page.layout);
                        navigate("/");
                      }}
                      className="group flex flex-col items-center justify-center hover:border hover:border-gray-400 hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 "
                    >
                      <img
                        src={page.img}
                        alt={page.name}
                        className=" w-full h-auto"
                        loading="lazy"
                      />
                      <span className="mt-2 font-poppins text-md text-gray-500 ">
                        {page.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop link hover */}
          <div className="flex group gap-6 text-sm font-light">
            <div
              onMouseEnter={() => setHoveredMenu("shop")}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative group "
            >
              <Link
                to="/shop"
                className="cursor-pointer font-poppins flex items-center  gap-1"
              >
                <span className="hover:underline">SHOP</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </Link>

              {/* Hover for shop */}
              {hoveredMenu === "shop" && (
                <div className="absolute -left-28 top-6 mt-4 z-50  bg-white text-black shadow-xl w-screen h-[65vh] ">
                  <div className="flex ">
                    <div className="gruop relative  pl-12">
                      <img
                        src={Dog}
                        alt="Dog images"
                        className="p-6 w-[350px] h-[350px] transition-transform duration-300 ease-in-out  hover:-translate-y-4"
                      />
                      <button className=" px-8 py-2 text-xs bg-white text-black hover:bg-green-700 absolute top-[270px] lg:left-[220px] transform -translate-x-1/2 -translate-y-1/2 font-librebaskerville tracking-widest  ">
                        NEW ARRIVAL
                      </button>
                    </div>
                    <img
                      src={Plant}
                      alt="Dog images"
                      className="p-6 w-[350px] h-[350px] transition-transform duration-300 ease-in-out  hover:-translate-y-4 "
                    />
                    <button className=" px-8 py-2 text-xs bg-white text-black hover:bg-green-700 absolute top-[270px] lg:left-[565px] transform -translate-x-1/2 -translate-y-1/2 font-librebaskerville tracking-widest  ">
                      BEST SELLERS
                    </button>

                    {/* text links */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8 ">
                      {/* Layout */}
                      <div className="flex flex-col gap-3 my-6 ">
                        <h1 className="text-xl font-librebaskerville tracking-widest font-semibold">
                          Layout
                        </h1>
                        <div className="h-px w-full bg-gray-800 mb-4"></div>
                        {ShopLayout.map((layout) => (
                          <div key={layout.name} className="flex items-center">
                            <Link
                              key={layout.name}
                              to={layout.link}
                              className="text-md font-librebaskerville text-gray-500 hover:text-gray-800"
                            >
                              {layout.name}
                            </Link>
                            {layout.tag && (
                              <span
                                className={` text-xs font-librebaskerville py-0.5 px-1.5 transform -translate-y-2 cursor-pointer ${
                                  layout.tag === "Hot"
                                    ? "bg-red-100 text-red-600"
                                    : " bg-gray-200 text-grey-600"
                                }`}
                              >
                                {layout.tag}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Filter */}
                      <div className="flex flex-col gap-3 my-6 ">
                        <h1 className="text-xl font-librebaskerville tracking-widest font-semibold">
                          Filter
                        </h1>
                        <div className="h-px w-full bg-gray-800 mb-4"></div>
                        {ShopFilter.map((layout) => (
                          <div key={layout.name} className="flex items-center">
                            <Link
                              key={layout.name}
                              to={layout.link}
                              className="text-md font-librebaskerville text-gray-500 hover:text-gray-800"
                            >
                              {layout.name}
                            </Link>
                            {layout.tag && (
                              <span
                                className={` text-xs font-librebaskerville py-0.5 px-1.5 transform -translate-y-2 cursor-pointer ${
                                  layout.tag === "Hot"
                                    ? "bg-red-100 text-red-600"
                                    : " bg-gray-200 text-grey-600"
                                }`}
                              >
                                {layout.tag}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Loader & Cart */}
                      <div className="flex flex-col gap-3 my-6 ">
                        <h1 className="text-xl font-librebaskerville tracking-widest font-semibold">
                          Loader & Cart
                        </h1>
                        <div className="h-px w-full bg-gray-800 mb-4"></div>
                        {ShopLoader.map((layout) => (
                          <Link
                            key={layout.name}
                            to={layout.link}
                            className="text-md font-librebaskerville text-gray-500 hover:text-gray-800"
                          >
                            {layout.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product link hover */}
          <div className="flex group gap-6 text-sm">
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("product")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/product"
                className="cursor-pointer flex items-center font-poppins gap-1"
              >
                <span className="hover:underline">PRODUCT</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </Link>
              {hoveredMenu === "product" && (
                <div className="absolute top-6 mt-4 -left-[200px] z-50 bg-white shadow-xl p-5 w-screen max-h-[100vh] ">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8 ">
                    {productMenu.map((section) => (
                      <div key={section.title}>
                        <h1 className="text-xl font-librebaskerville font-semibold border-b pb-1 mb-6 tracking-widest text-black">
                          {section.title}
                        </h1>
                        <ul className="mt-2 space-y-1">
                          {section.items.map((item) => (
                            <li key={item.name} className="flex  items-center ">
                              <span className="text-sm mb-2  font-librebaskerville text-gray-500 hover:text-gray-800 cursor-pointer ">
                                {item.name}
                              </span>
                              {item.tag && (
                                <span
                                  className={` text-xs font-librebaskerville py-0.5 px-1.5 transform -translate-y-2 cursor-pointer ${
                                    item.tag === "Hot"
                                      ? "bg-red-100 text-red-600"
                                      : " bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {item.tag}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link to="/blog" className="relative group cursor-pointer">
            <div className="flex items-center font-poppins gap-1">
              <span className="hover:underline">BLOG</span>
              <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
            </div>
          </Link>

          <Link to="/featured" className="relative group cursor-pointer">
            <div className="flex items-center font-poppins gap-1">
              <span className="hover:underline">FEATURED</span>
              <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
            </div>
          </Link>
        </div>

        {/* logo */}
        <Link to="/" className=" ml-40 w-full items-center justify-center">
          <img
            src={scrolled ? BlackLogo : Whitelogo}
            alt="logo"
            className="w-32 cursor-pointer transition-opacity duration-1000"
          />
        </Link>

        {/* Right icons */}

        <div
          className={`flex items-center md:gap-6 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          <Search className="w-6 h-6 cursor-pointer hover:scale-110" />
          <User className="w-6 h-6 cursor-pointer hover:scale-110" />
          <div className="relative">
            <Heart className="w-6 h-6 cursor-pointer hover:scale-110 " />
            <span className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-green-800 text-white rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <div className="relative">
            <ShoppingBag className="w-6 h-6 cursor-pointer hover:scale-110" />
            <span className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-green-800 text-white rounded-full flex items-center justify-center ">
              0
            </span>
          </div>
        </div>
      </div>

      <div
        className={`h-px w-full transition-all duration-1000 ${
          scrolled ? " shadow-md " : "bg-white opacity-20"
        }`}
      ></div>
    </div>
  );
}
