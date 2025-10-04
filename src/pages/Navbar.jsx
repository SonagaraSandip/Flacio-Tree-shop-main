import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Whitelogo from "../assets/Home/logo-white.png";
import BlackLogo from "../assets/Home/logo.avif";
import {
  ChevronDown,
  Search,
  User,
  Heart,
  ShoppingBag,
  X,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Trash,
  Gift,
  Pencil,
  Zap,
  CircleUser,
  ShoppingCart,
  Store,
  Menu,
  Home,
  ChevronRight,
} from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useWishlist } from "../contexts/WishlistContext";
import EditItem from "../other/EditItem";
import SearchModal from "../other/SearchModal";
import { toast } from "react-toastify";

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

//blog navbar
import BlogNav1 from "../assets/blog/BlogNavbar1.webp";
import BlogNav2 from "../assets/blog/BlogNavbar2.webp";

export default function Navbar({ setLayout, transparentUntilScroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [submitEmail, setSubmitEmail] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  // mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { wishlist } = useWishlist();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user, login, logout } = useAuth();

  // get total of cart
  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

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

  // Determine hover color based on navbar state
  const getHoverColor = () => {
    return scrolled
      ? "before:bg-gray-800 after:bg-gray-800"
      : "before:bg-white after:bg-white";
  };

  const validateEmail = (email) => {
    // A simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    // validate login
    const res = login(email, password);
    if (res.error) {
      if (res.error === "Create an Account!") {
        toast.error("Please create an account first!");
        navigate("/account/register");
        return;
      }
      toast.error(res.error);
      return;
    }
    toast.success("Logged in successfully!");
    navigate("/");

    setEmail("");
    setPassword("");
    setTimeout(() => {
      setOpenSignIn(false);
    }, 2000);
  };

  // handle checkout
  const handleCheckout = () => {
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions to proceed.");
      return;
    }

    navigate("/checkout");
  };

  //handle reset password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      toast.error("Please enter a email address");
      return;
    }
    if (!validateEmail(resetEmail)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    toast.success(
      "We've sent you an email with a link to update your password."
    );
    setSubmitEmail(true);
    setTimeout(() => {
      setSubmitEmail(false);
      setResetEmail("");
    }, 3000);
  };

  // handle drop down and signin both
  const onUserIconClick = () => {
    if (user) {
      // Toggle profile dropdown if signed in
      setOpenProfile(!openProfile);
      setOpenSignIn(false); // Make sure sign in is closed
    } else {
      setOpenSignIn(true);
      setOpenProfile(false);
    }
  };

  // handle logout
  const handleLogout = () => {
    logout();
    setOpenProfile(false);
  };

  //handle terms acceptance
  const handleTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const progressWidth = Math.min(100, (total / 100) * 100);

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

  const BlogMenu = [
    { name: "Blog Standard" },
    { name: "Blog Grid" },
    { name: "Blog Grid Mix" },
    { name: "List" },
    { name: "Post Sidebar" },
    { name: "Post One Column" },
    { name: "Post Prallax" },
    { name: "Post Sticky" },
    { name: "Post Simple Title" },
  ];

  const featureMenu = [
    {
      title: "Page",
      items: [
        { name: "About Us", link: "/pages/about" },
        { name: "Contact US", link: "/pages/contact" },
        { name: "Faqs", link: "/pages/faqs" },
        { name: "Faqs 2", link: "/pages/faqs2" },
        { name: "Wishlist", link: "/wishlist" },
        { name: "404 Error", link: "/error" },
      ],
    },
    {
      title: "Portfolio",
      items: [
        { name: "2 Columns", link: "/blog/portfolio" },
        { name: "3 Columns", link: "/blog/portfolio" },
        { name: "4 Columns", link: "/blog/portfolio" },
        { name: "Mansonry Layout", tag: "New" },
      ],
    },
    {
      title: "Featured",
      items: [
        { name: "Announcement bar" },
        { name: "Popup Newsletter" },
        { name: "Popup Compare", tag: "New" },
        { name: "Cookies law info" },
        { name: "RTL Layout" },
      ],
    },
    {
      title: "Lookbook",
      items: [
        { name: "Lookbook Single" },
        { name: "Lookbook in Page" },
        { name: "Lookbook Simple" },
      ],
    },
    {
      title: "Instagram Shop",
      items: [
        { name: "Instagram Shop Slider" },
        { name: "Instagram Shop Grid Modern" },
        { name: "Instagram Shop in Page" },
      ],
    },
  ];

  // data for mobile menu
  const mobileMenuData = [
    {
      id: "home",
      title: "HOME",
      items: HomePages,
      type: "layout",
      navigateTo: "/",
    },
    {
      id: "shop",
      title: "SHOP",
      items: [
        {
          title: "Layout",
          items: ShopLayout,
          type: "section",
        },
        {
          title: "Filter",
          items: ShopFilter,
          type: "section",
        },
        {
          title: "Loader & Cart",
          items: ShopLoader,
          type: "section",
        },
      ],
      type: "nested",
      navigateTo: "/collections/all",
    },
    {
      id: "product",
      title: "PRODUCT",
      items: productMenu,
      type: "sections",
      navigateTo: "/products/jade-succulent",
    },
    {
      id: "blog",
      title: "BLOG",
      items: BlogMenu,
      type: "links",
      navigateTo: "/blog/news",
    },
    {
      id: "featured",
      title: "FEATURED",
      items: featureMenu,
      type: "sections",
    },
  ];

  // function handle main menu item click
  const handleMainMenuItemClick = (item) => {
    if (item.navigateTo) {
      navigate(item.navigateTo);
      setIsMobileMenuOpen(false);
    } else {
      setMobileSubMenu(mobileSubMenu === item.id ? null : item.id);
    }
  };

  //handle sun menu item click
  const handelSubMenuItemClick = (link) => {
    if (link) {
      navigate(link);
      setIsMobileMenuOpen(false);
    }
  };
  return (
    <>
      <div
        className={`fixed left-0 w-full z-50 transition-all duration-1000 ease-in-out ${
          scrolled
            ? "bg-white text-black fixed border-b border-gray-300 shadow-sm"
            : "bg-transparent text-white absolute"
        } `}
      >
        <div
          className={`max-w-8xl mx-auto flex items-center justify-between pl-2 pr-4 sm:px-6 py-4`}
        >
          {/* mobile menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Menu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
            <Search onClick={() => setOpenSearch(true)} />
            {openSearch && <SearchModal setOpenSearch={setOpenSearch} />}
          </div>
          {/*left menu icons */}
          <div className="hidden lg:flex group gap-6 text-sm font-light">
            {/* Home link hover */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("home")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/"
                className={`cursor-pointer font-poppins flex items-center gap-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute  before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute  after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ${getHoverColor()} ${
                  location.pathname === "/" ? "border-b-2 " : ""
                }  ${scrolled ? "border-black" : "border-white"}
              `}
              >
                <span className={` `}>HOME</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />{" "}
              </Link>

              {/* Hovered indicator for home page */}
              {hoveredMenu === "home" && (
                <div className="absolute -left-6 top-4 mt-4 z-50 bg-white shadow-xl p-5 w-[750px] max-h-[90vh] overflow-y-auto ">
                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {HomePages.map((page) => (
                      <div
                        key={page.name}
                        onClick={() => {
                          setLayout(page.layout);
                          navigate("/");
                          // setHoveredMenu(null);
                        }}
                        className="group flex flex-col items-center justify-center cursor-pointer hover:border hover:border-gray-400 hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 "
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
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("shop")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/collections/all"
                className={`cursor-pointer font-poppins flex items-center gap-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-800 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-800 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ${getHoverColor()} ${
                  location.pathname.startsWith("/collections")
                    ? "border-b-2 border-black"
                    : ""
                } `}
              >
                <span>SHOP</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </Link>

              {/* Hover for shop */}
              {hoveredMenu === "shop" && (
                <div className="absolute -left-28 top-6 mt-2 z-50  bg-white text-black shadow-xl w-screen h-[65vh]">
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

            {/* Product link hover */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("product")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/products/jade-succulent"
                className={`cursor-pointer flex items-center font-poppins gap-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-800 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-800 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ${getHoverColor()} ${
                  location.pathname.startsWith("/product")
                    ? "border-b-2 border-black"
                    : ""
                } `}
              >
                <span>PRODUCT</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </Link>
              {hoveredMenu === "product" && (
                <div className="absolute top-6 mt-2 -left-[200px] z-50 bg-white shadow-xl p-5 w-screen max-h-[100vh] ">
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

            {/* Blog link hover */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("blog")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/blog/news"
                className={`cursor-pointer flex items-center font-poppins gap-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-800 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-800 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ${getHoverColor()} ${
                  location.pathname.startsWith("/blog") &&
                  !location.pathname.startsWith("/blog/portfolio")
                    ? "border-b-2 border-black"
                    : ""
                } `}
              >
                <span>Blog</span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </Link>

              {hoveredMenu === "blog" && (
                <div className="absolute flex gap-6 top-6 mt-2 z-50 bg-white shadow-xl p-5 w-3xl min-w-[600px] max-h-[100vh] ">
                  <div className="flex flex-col gap-2 w-full ">
                    <h1 className="text-lg font-librebaskerville  border-b pb-1 mb-6 tracking-widest text-black">
                      Layout & Post
                    </h1>

                    {BlogMenu.map((item) => (
                      <div className="text-sm font-librebaskerville text-gray-500 hover:text-gray-800 cursor-pointer">
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <img
                        src={BlogNav1}
                        alt="blog navbar 1"
                        style={{ width: "600px", height: "160px" }}
                      />
                      <div className="absolute h-full w-full top-0 bg-black  bg-opacity-25" />
                      <div className="absolute  bottom-4  flex flex-col items-start ml-4 gap-4 text-xs text-white  font-librebaskerville">
                        <button className="hover:text-black  ">NEWS</button>
                        <button className="hover:text-black  ">
                          Traveling Solo Is Awesome
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={BlogNav2}
                        alt="blog navbar 1"
                        style={{ width: "600px", height: "150px" }}
                      />
                      <div className="absolute h-full w-full top-0 bg-black  bg-opacity-25" />
                      <div className="absolute  bottom-4  flex flex-col items-start ml-4 gap-4 text-xs text-white  font-librebaskerville">
                        <button className="hover:text-black  ">NEWS</button>
                        <button className="hover:text-black  ">
                          Indoor Plants Are Good For Health
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* featured link hover */}
            <div
              onMouseEnter={() => setHoveredMenu("featured")}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative"
            >
              <div className="flex items-center font-poppins gap-1">
                <span
                  className={`transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-800 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-800 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ${getHoverColor()}`}
                >
                  FEATURED
                </span>
                <ChevronDown size={15} className="w-4 h-4 mt-[2px]" />
              </div>
              {hoveredMenu === "featured" && (
                <div className="absolute mt-2 -left-96 z-50 bg-white shadow-xl p-5 w-screen max-h-[100vh] ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-8">
                    {featureMenu.map((section) => (
                      <div key={section.title}>
                        <h1 className="text-xl font-librebaskerville font-semibold border-b pb-1 mb-6 tracking-widest text-black">
                          {section.title}
                        </h1>
                        <ui className=" space-y-1">
                          {section.items.map((item) => (
                            <li key={item.name} className="flex items-center">
                              <span
                                onClick={() => {
                                  navigate(item.link);
                                  setHoveredMenu(null);
                                }}
                                className="text-sm mb-2  font-librebaskerville text-gray-500 hover:text-gray-800 cursor-pointer"
                              >
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
                        </ui>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* logo */}
          <Link
            to="/"
            className="lg:ml-40 w-full items-center justify-center flex lg:block"
          >
            <img
              src={scrolled ? BlackLogo : Whitelogo}
              alt="logo"
              className="w-24 lg:w-32 cursor-pointer transition-opacity duration-1000"
            />
          </Link>

          {/* Right icons */}
          <div
            className={`flex items-center gap-4 md:gap-6 ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            <div className="hidden sm:block">
              <Search
                onClick={() => setOpenSearch(true)}
                className="w-6 h-6 cursor-pointer hover:scale-110"
              />

              {openSearch && <SearchModal setOpenSearch={setOpenSearch} />}
            </div>
            {/* user */}
            <div
              onClick={onUserIconClick}
              className="hidden sm:flex group items-center"
            >
              <User className="w-6 h-6 cursor-pointer group-hover:scale-110" />
              {user && (
                <FaCaretDown
                  size={20}
                  className="cursor-pointer group-hover:scale-110"
                />
              )}
            </div>

            {openProfile && user && (
              <div className="absolute -bottom-28 right-28 mt-2 bg-white shadow-lg text-black border border-zinc-600 rounded p-4 min-w-[160px] z-50">
                <div className="mb-2 text-gray-700 font-poppins text-sm">
                  Hello{" "}
                  <span
                    onClick={() => {
                      navigate("/account");
                      setOpenProfile(false);
                    }}
                    className="font-bold font-librebaskerville hover:text-black cursor-pointer"
                  >
                    {user.firstName} <br /> {user.lastName}
                  </span>
                </div>
                <div className="h-px w-full my-4 bg-gray-300" />
                <div
                  className="cursor-pointer text-gray-600 hover:text-black font-poppins"
                  onClick={handleLogout}
                >
                  Sign out
                </div>
              </div>
            )}

            {openSignIn && (
              <div className="fixed inset-0 z-50">
                <div
                  onClick={() => setOpenSignIn(false)}
                  className="absolute inset-0 bg-black bg-opacity-50"
                ></div>
                <div className="absolute right-0 top-0 bg-black bg-opacity-50 flex w-[60vh] h-screen animate-fadeInRight">
                  <div className="flex flex-col gap-4 bg-white w-full h-full p-6">
                    <button
                      className="self-end text-gray-400 bg-white border border-gray-800 hover:bg-black hover:text-white"
                      onClick={() => setOpenSignIn(false)}
                    >
                      <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
                    </button>
                    <h2 className="text-xs font-librebaskerville mt-12 text-black">
                      SIGN IN
                    </h2>
                    {resetPassword ? (
                      <div className="flex flex-col text-center gap-4">
                        {submitEmail && (
                          <p className="bg-cyan-50 text-green-700 font-poppins text-sm self-start py-2">
                            We've sent you an email with a link to update your
                            password.
                          </p>
                        )}
                        <h1 className="text-sm font-librebaskerville text-zinc-900">
                          RESET YOUR PASSWORD
                        </h1>
                        <p className="text-gray-500 font-poppins text-sm">
                          We will send you an email to reset your password
                        </p>
                        <span className="h-px w-24 bg-gray-500 self-center" />

                        <form
                          onSubmit={handleResetPassword}
                          noValidate
                          className="text-black flex flex-col mt-4"
                        >
                          <input
                            type="email"
                            alt="email"
                            placeholder="Email*"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2"
                            style={{ outline: "none" }}
                          />

                          <button
                            type="submit"
                            onClick={handleResetPassword}
                            className="self-start w-1/2 bg-zinc-900 text-white text-sm font-poppins mt-4 py-3 hover:bg-green-950"
                          >
                            SUBMIT
                          </button>
                        </form>

                        <button
                          onClick={() => {
                            setResetPassword(false);
                            setResetEmail("");
                          }}
                          className="hover:underline-offset-1 text-black hover:text-zinc-900 font-poppins text-md underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="text-black"
                      >
                        <input
                          type="email"
                          alt="email"
                          placeholder="Email*"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2"
                          style={{ outline: "none" }}
                        />
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            alt="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2 mt-4"
                            style={{ outline: "none" }}
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex items-center justify-center "
                          >
                            {showPassword ? (
                              <Eye className="absolute right-3 top-7 w-5 h-5 text-gray-400 cursor-pointer hover:text-black" />
                            ) : (
                              <EyeOff className="absolute right-3 top-7 w-5 h-5 text-gray-400 cursor-pointer hover:text-black" />
                            )}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            setResetPassword(true);
                            e.preventDefault();
                          }}
                          className="text-xs font-poppins mt-4 text-zinc-700 hover:text-zinc-950 cursor-pointer border-b border-zinc-500"
                        >
                          Lost your password?
                        </button>
                        <div className="flex items-center gap-2 mt-4">
                          <button
                            type="submit"
                            className="w-full bg-black text-white text-sm font-poppins py-2  hover:bg-green-950"
                          >
                            SIGN IN
                          </button>
                          <button
                            onClick={() => {
                              navigate("/account/register");
                              setOpenSignIn(false);
                            }}
                            className="w-full border border-zinc-700 text-sm font-poppins py-2  hover:bg-green-950 hover:text-white"
                          >
                            CREATE YOUR ACCOUNT
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* wishlist */}
            <div className="relative">
              <Link to={"/wishlist"}>
                <div
                  onMouseEnter={() => setHoveredMenu("wishlist")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Heart className="w-6 h-6 cursor-pointer hover:scale-110 " />

                  <span className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-green-800 text-white rounded-full flex items-center justify-center">
                    {wishlist.length > 0 ? wishlist.length : 0}
                  </span>
                </div>
              </Link>

              {wishlist.length === 0 && hoveredMenu === "wishlist" && (
                <div>
                  <span className="absolute -bottom-9 border border-zinc-300 px-4 py-1 -right-2 whitespace-nowrap font-poppins italic bg-white text-gray-500">
                    Your wishlist is currently empty.
                  </span>
                </div>
              )}
            </div>
            {/* cart */}
            <div
              onMouseEnter={() => setHoveredMenu("cart")}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative"
            >
              <div>
                <ShoppingBag className="w-6 h-6 cursor-pointer hover:scale-110" />
                <span className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-green-800 text-white rounded-full flex items-center justify-center ">
                  {cart.length > 0 ? cart.length : 0}
                </span>
              </div>

              {cart.length === 0 && hoveredMenu === "cart" && (
                <div>
                  <span className="absolute -bottom-9 border border-zinc-300 px-4 py-1 -right-2 whitespace-nowrap font-poppins italic bg-white text-gray-500">
                    Your cart is currently empty.
                  </span>
                </div>
              )}
              {/* if any product is in cart  */}
              {cart.length > 0 && hoveredMenu === "cart" && (
                <div className="absolute -right-6 top-3 mt-4 z-50 bg-white text-black border border-gray-200 w-[350px] shadow-xl h-[80vh]">
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex flex-col gap-4 h-[40vh] border-b  overflow-y-scroll">
                      <div className="flex flex-col h-30 gap-2 bg-gray-100 p-4 font-poppins tracking-wide">
                        <p className="uppercase flex items-center gap-1 text-xs font-poppins text-gray-700 font-semibold">
                          <Zap size={20} fill="yellow" />
                          Free shipping on orders $100.00
                        </p>
                        <p className="text-xs">
                          {total <= "100"
                            ? `Spend $ ${(100 - total).toFixed(
                                2
                              )} more and get free shipping!`
                            : "Congratulations , you've got free shipping!"}
                        </p>
                        <div
                          style={{ width: `${progressWidth}%` }}
                          className={`h-2 mt-2 w-full bg-gradient-to-r  animate-moveStripes ${
                            total < 100
                              ? " from-gray-900 via-gray-500 to-gray-900"
                              : " from-green-900 via-green-500 to-green-900 "
                          }`}
                        ></div>
                      </div>
                      {/* images */}
                      <div className="flex flex-col gap-2 ">
                        {cart.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img
                              src={item.variant.image}
                              alt={item.product.name}
                              className="w-24 h-32 object-cover"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="font-poppins text-sm">
                                {item.product.name}
                              </p>
                              <div className="flex gap-1">
                                <p className="text-gray-500 text-xs font-poppins">
                                  Color : {item.variant.color}
                                </p>
                                <button
                                  onClick={() => setIsEditItem(item)}
                                  className="text-xs font-poppins"
                                >
                                  <Pencil
                                    size={12}
                                    fill="gray"
                                    className="border-b-2 border-black"
                                  />
                                </button>
                              </div>
                              <p className="text-gray-500 text-xs font-poppins">
                                ${" "}
                                {(
                                  item.variant?.price ??
                                  item.product.discountPrice ??
                                  item.product.originalPrice
                                ).toFixed(2) * item.quantity}
                              </p>
                              {/* quantity button*/}
                              <div className="flex gap-2 items-center">
                                <div className="flex items-center self-center gap-1 border border-gray-300 my-1 px-1 py-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className=" px-2"
                                    disabled={item.quantity === 1}
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <p className="px-3 border-x border-gray-500">
                                    {item.quantity}
                                  </p>

                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="px-2 "
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>

                                <p
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-gray-500 hover:text-red-600 cursor-pointer"
                                >
                                  <Trash size={16} />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-b pb-3">
                      <div className="flex gap-1 items-center text-gray-500 font-poppins text-sm">
                        <Gift size={16} />
                        <button> Add gift wrap</button>{" "}
                        <p className="text-black">Only</p>
                      </div>
                      <div className="flex justify-between font-poppins text-md">
                        <p>Subtotal:</p>
                        <p>$ {total.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-poppins text-gray-500 py-2 border-b text-sm border-gray-300 border-dashed">
                      {" "}
                      Texas and shipping calculated at checkout
                    </p>
                    {/*animation marquee  */}
                    <div className=" font-poppins text-sm text-gray-500 py-2 border-b border-gray-300 border-dashed overflow-hidden">
                      <p className="whitespace-nowrap animate-marquee transition-all duration-1000 ">
                        All charges are billed in{" "}
                        <strong className="text-black">USD</strong>. While the
                        content of your cart is currently displayed in{" "}
                        <strong className="text-black">USD</strong>, the
                        checkout will use{" "}
                        <strong className="text-black">USD</strong> at the most
                        current exchange rate.
                        <t />
                      </p>
                    </div>
                    {/* add to cart and view cart */}
                    <div className="my-2">
                      <div className="flex gap-2 ">
                        <input
                          type="checkbox"
                          id="checkbox"
                          onClick={handleTermsChange}
                          className="w-4 h-4 mt-1 cursor-pointer"
                        />{" "}
                        <p className="text-gray-500 ">
                          I agree with the{" "}
                          <span
                            onClick={() => setIsTermOpen(true)}
                            className="text-gray-950 border-b font-poppins border-black hover:border-none cursor-pointer hover:font-baseline transition-all duration-300"
                          >
                            Terms and conditions
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleCheckout}
                          className={`w-full font-poppins uppercase text-sm flex items-center justify-center group px-4 py-3 border mt-2 transition-all duration-300 ${
                            acceptTerms
                              ? "cursor-pointer bg-green-950 text-white "
                              : "cursor-not-allowed border-gray-400 bg-zinc-700 text-white opacity-70"
                          }`}
                          style={{
                            width: "100%",
                          }}
                        >
                          Buy It Now
                        </button>
                        <button
                          onClick={() => navigate("/cart")}
                          className="w-full font-poppins text-sm flex items-center justify-center px-4 py-3 border border-gray-500 hover:bg-green-950 hover:text-white mt-2 transition-color duration-300"
                        >
                          VIEW CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`h-px w-full transition-all duration-500 ${
            scrolled ? " shadow-md " : "bg-white opacity-20"
          }`}
        ></div>
      </div>

      {/* mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black bg-opacity-50"
          ></div>

          {/* menu panel*/}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <img src={BlackLogo} alt="logo" className="w-24" />
              <X
                className="w-6 h-6 cursor-pointer text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            {/* mobile menu */}
            <div className="py-4">
              {mobileMenuData.map((section) => (
                <div key={section.id} className="border-b border-gray-200">
                  <div className="flex justify-between items-center p-4 cursor-pointer">
                    <span
                      onClick={() => handleMainMenuItemClick(section)}
                      className="font-librebaskerville text-sm text-black font-medium"
                    >
                      {section.title}
                    </span>

                    <ChevronDown
                      size={16}
                      onClick={() =>
                        setMobileSubMenu(
                          mobileSubMenu === section.id ? null : section.id
                        )
                      }
                      className={`w-6 h-6 text-black transition-transform ${
                        mobileSubMenu === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* submenu */}
                  {mobileSubMenu === section.id && (
                    <div className="bg-gray-50 px-4 py-2">
                      {/* Home layout */}
                      {section.type === "layout" && (
                        <div className="flex flex-col gap-4">
                          {section.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setLayout(item.layout);
                                navigate("/");
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex flex-col gap-2 text-center cursor-pointer p-2"
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-auto object-cover shadow-lg mb-1"
                              />
                              <span className="text-sm text-gray-700 font-librebaskerville">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* shop nested section */}
                      {section.type === "nested" && (
                        <div className="space-y-4">
                          <div className="flex flex-col gap-4 mb-4">
                            <div className="relative group">
                              <img
                                src={Dog}
                                alt="New Arrivals"
                                className="w-full h-40 object-cover rounded"
                              />
                              <button
                                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 hover:bg-green-700 hover:text-white transition-colors"
                                onClick={() => {
                                  navigate("/collections/new-arrivals");
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                NEW ARRIVAL
                              </button>
                            </div>
                            <div className="relative group">
                              <img
                                src={Plant}
                                alt="Best Sellers"
                                className="w-full h-40 object-cover rounded"
                              />
                              <button
                                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 hover:bg-green-700 hover:text-white transition-colors"
                                onClick={() => {
                                  navigate("/collections/best-sellers");
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                BEST SELLERS
                              </button>
                            </div>
                          </div>
                          {section.items.map((subSection, index) => (
                            <div key={index}>
                              <h3 className="font-librebaskerville text-md text-gray-700 mb-2">
                                {subSection.title}
                              </h3>
                              <div className="space-y-1 ml-2">
                                {subSection.items.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    onClick={() =>
                                      handelSubMenuItemClick(item.link)
                                    }
                                    className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
                                  >
                                    <span className="text-sm text-gray-500 font-poppins">
                                      {item.name}
                                    </span>
                                    {item.tag && (
                                      <span
                                        className={`text-xs px-2 py-0.5 ml-2 rounded  ${
                                          item.tag === "Hot"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                      >
                                        {item.tag}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* product section */}
                      {section.type === "sections" &&
                        section.id === "product" && (
                          <div className="space-y-4">
                            {section.items.map((subSection, index) => (
                              <div key={index}>
                                <h3 className="font-librebaskerville text-md text-gray-700 mb-2">
                                  {subSection.title}
                                </h3>
                                <div className="space-y-1 ml-2">
                                  {subSection.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      onClick={() =>
                                        handelSubMenuItemClick(item.link)
                                      }
                                      className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
                                    >
                                      <span className="text-sm text-gray-500 font-poppins">
                                        {item.name}
                                      </span>
                                      {item.tag && (
                                        <span
                                          className={`text-xs px-2 py-0.5 ml-2 rounded  ${
                                            item.tag === "Hot"
                                              ? "bg-red-100 text-red-600"
                                              : "bg-gray-200 text-gray-700"
                                          }`}
                                        >
                                          {item.tag}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* featured section */}
                      {section.type === "sections" &&
                        section.id === "featured" && (
                          <div className="space-y-4">
                            {section.items.map((subSection, index) => (
                              <div key={index}>
                                <h3 className="font-librebaskerville text-md text-gray-700 mb-2">
                                  {subSection.title}
                                </h3>
                                <div className="space-y-1 ml-2">
                                  {subSection.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      onClick={() =>
                                        handelSubMenuItemClick(item.link)
                                      }
                                      className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
                                    >
                                      <span className="text-sm text-gray-500 font-poppins">
                                        {item.name}
                                      </span>
                                      {item.tag && (
                                        <span
                                          className={`text-xs px-2 py-0.5 ml-2 rounded  ${
                                            item.tag === "Hot"
                                              ? "bg-red-100 text-red-600"
                                              : "bg-gray-200 text-gray-700"
                                          }`}
                                        >
                                          {item.tag}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/*blog section*/}
                      {section.type === "links" && (
                        <div className="space-y-2">
                          <div className="flex flex-col gap-4 mb-4">
                            <div className="relative group">
                              <img
                                src={BlogNav1}
                                alt="New Arrivals"
                                className="w-full h-40 object-cover rounded"
                              />
                              <button
                                className="absolute bottom-2 font-librebaskerville text-black text-md px-2 py-1 hover:text-white transition-colors duration-300"
                                onClick={() => {
                                  navigate("/collections/new-arrivals");
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Traveling Solo Is Awesome
                              </button>
                            </div>
                            <div className="relative group">
                              <img
                                src={BlogNav2}
                                alt="Best Sellers"
                                className="w-full h-40 object-cover rounded"
                              />
                              <button
                                className="absolute bottom-2 font-librebaskerville text-black text-md px-2 py-1 hover:text-white transition-colors duration-300"
                                onClick={() => {
                                  navigate("/collections/best-sellers");
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Indoor Plants Are Good For Health
                              </button>
                            </div>
                          </div>
                          {section.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-200 rounded cursor-pointer"
                              onClick={() => handelSubMenuItemClick(item.link)}
                            >
                              <span className="text-sm text-gray-700 font-poppins">
                                {item.name}
                              </span>
                              {item.tag && (
                                <span
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    item.tag === "Hot"
                                      ? "bg-red-100 text-red-600"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {item.tag}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40 lg:hidden">
        <div className="flex justify-around items-center py-3">
          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-gray-600 hover:text-green-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1 font-poppins">Home</span>
          </button>
          <button
            onClick={() => navigate("/collections/all")}
            className="flex flex-col items-center text-gray-600 hover:text-green-800 transition-colors"
          >
            <Store className="w-5 h-5" />
            <span className="text-xs mt-1 font-poppins">Shop</span>
          </button>
          <button
            onClick={() => navigate("/account")}
            className="flex flex-col items-center text-gray-600 hover:text-green-800 transition-colors"
          >
            <CircleUser className="w-5 h-5" />
            <span className="text-xs mt-1 font-poppins">Account</span>
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="flex flex-col items-center text-gray-600 hover:text-green-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1 font-poppins">Cart</span>
          </button>
        </div>
      </div>

      {/* open shipping pop-up */}
      {isTermOpen && (
        <div
          onClick={() => setIsTermOpen(false)}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 animate-zoom-in w-screen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col items-center justify-center  "
          >
            <button
              onClick={() => setIsTermOpen(false)}
              className=" w-full flex items-center justify-end"
            >
              <X className="text-base font-normal text-gray-500 hover:text-black" />
            </button>
            <h1 className="text-2xl text-black w-full font-librebaskerville ">
              Terms & Conditions
            </h1>
            <div className="flex flex-col mt-4 mb-4 gap-4 text-md text-sm text-gray-500 font-poppins w-full ">
              <p>
                Yodie supplies products listed on the Yodie, and Yodie websites,
                and in our stores under the following Terms and Conditions.
                Please read these Terms and Conditions, and our Privacy and
                Cookie Policies carefully before using any of our websites, or
                ordering from us.
              </p>
              <p>
                The Terms and Conditions apply to your use of any Yodie website
                and to any products you purchase from them; regardless of how
                you access the website, including any technologies or devices
                where our website is available to you at home, on the move or in
                store
              </p>
              <p>
                We reserve the right to update these Terms and Conditions at any
                time, and any updates affecting you or your purchases will be
                notified to you, by us in writing (via email), and on this page.
              </p>
              <p>
                The headings in these Conditions are for convenience only and
                shall not affect their interpretation.
              </p>
              <p>
                We recommend that you print and keep a copy of these Terms and
                Conditions for your future reference...
              </p>
            </div>
          </div>
        </div>
      )}

      {isEditItem && (
        <EditItem cartItem={isEditItem} onClose={() => setIsEditItem(null)} />
      )}
    </>
  );
}
