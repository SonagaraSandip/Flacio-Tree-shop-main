import React, { Suspense, useRef, useEffect, useState } from "react";
import Layout from "../pages/Layout.jsx";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { ChevronRight, ChevronLeft, Star, MoveRight } from "lucide-react";
import products from "../data/products.js";
const ProductCard = React.lazy(() => import("../data/ProductCard.jsx"));
const Footer = React.lazy(() => import("../pages/Footer.jsx"));
import ScrollToTop from "../pages/ScrollToTop.jsx";

import Slider1 from "../assets/Home/slider-1-1.jpg";
import Slider2 from "../assets/Home/slider-1-2.jpg";
import Slider3 from "../assets/Home/slider-1-3.jpg";

//images
import banner1 from "../assets/Home/banner-1.jpg";
import banner2 from "../assets/Home/banner-2.jpg";
import banner3 from "../assets/Home/banner-3.jpg";
//policy
import PolicyIcon1 from "../assets/Home/policy-1.png";
import PolicyIcon2 from "../assets/Home/policy-2.png";
import PolicyIcon3 from "../assets/Home/policy-3.png";
import PolicyPot from "../assets/Home/policy-image-1_540x.png";
import Ring1 from "../assets/Home/policy-image-2_540x.png";
import Ring2 from "../assets/Home/policy-image-3_540x.png";

//quata
import QuataBG from "../assets/Home/bg-1.jpg";
import Smith from "../assets/Home/smith.jpg";
import Sara from "../assets/Home/sara.jpg";
import Saitama from "../assets/Home/saitama.jpg";
import Shetty from "../assets/Home/shetty.jpg";

//plant for office
import PlantOffice from "../assets/Home/plantoffice.jpg";
import TextRotate from "../assets/Home/text-rotate.png";
import SetStyle from "../assets/Home/banner-5_540x.jpg";

//Bring lidein
import Ig1 from "../assets/Home/ig-1_540x.png";
import Ig2 from "../assets/Home/ig-2_540x.png";
import Ig3 from "../assets/Home/ig-3_540x.png";
import Ig4 from "../assets/Home/ig-4_540x.png";
import Ig5 from "../assets/Home/ig-5_540x.png";

import Delivery from "../assets/Home/policy-4.png";
import Payment from "../assets/Home/policy-5.png";
import Support from "../assets/Home/policy-6.png";
import Return from "../assets/Home/policy-7.png";

const slides = [
  {
    image: Slider1,
    title: "Plants made easy",
  },
  {
    image: Slider2,
    title: "Make People Merry",
  },
  {
    image: Slider3,
    title: "Gifts We Love",
  },
];

export default function HomeModern() {
  const scrollRef = useRef();
  const [index, setIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("top");

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 200);
  };

  // testimonial side
  const nextTestimonial = () => {
    setTimeout(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonial.length);
    });
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    const testimonialInterval = setInterval(nextTestimonial, 5000);
    return () => {
      clearInterval(slideInterval), clearInterval(testimonialInterval);
    };
  });
  // TOP RATTING / BEST SELLING SECTION
  const isTop = activeTab === "top";
  // get only top rated or best selling products
  const filteredProducts = isTop
    ? products.filter((p) => p.isTopRated)
    : products.filter((p) => p.isBestSelling);

  const goToSlide = (i) => {
    setFade(false);
    setTimeout(() => {
      setIndex(i);
      setFade(true);
    }, 200);
  };

  const goToTestimonial = (i) => {
    setTestimonialIndex(i);
  };

  const testimonial = [
    {
      star: [<IoStar />, <IoStar />, <IoStar />, <IoStar />, <IoStarOutline />],
      quote:
        " Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! ",
      name: "Ann Smith",
      image: Smith,
    },
    {
      star: [<IoStar />, <IoStar />, <IoStar />, <IoStar />, <IoStar />],
      quote:
        " Green thumb, black thumb, doesn’t matter thanks to Modern Sprout! ",
      name: "Saitama One",
      image: Saitama,
    },
    {
      star: [<IoStar />, <IoStar />, <IoStar />, <IoStar />, <IoStar />],
      quote:
        " Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! ",
      name: "Sara Coliton",
      image: Sara,
    },
    {
      star: [<IoStar />, <IoStar />, <IoStar />, <IoStar />, <IoStar />],
      quote:
        " Green thumb, black thumb, doesn’t matter thanks to Modern  Sprout! ",
      name: "Shetty jamie",
      image: Shetty,
    },
  ];

  const IgImages = [
    {
      image: Ig1,
    },
    {
      image: Ig2,
    },
    {
      image: Ig3,
    },
    {
      image: Ig4,
    },
    {
      image: Ig5,
    },
  ];

  const visiableImage = IgImages.slice(startIndex, startIndex + 4);

  const handleNext = () => {
    if (startIndex + 4 < IgImages.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  //combine handler
  const handleLeftClick = () => {
    handlePrev();
    scrollLeft();
  };
  const handleRightClick = () => {
    handleNext();
    scrollRight();
  };

  const Services = [
    {
      icon: Delivery,
      title: "Free delivery",
      desc: "For all orders above $45",
    },
    {
      icon: Payment,
      title: "Secure payments",
      desc: "Confidence on all your devices",
    },
    {
      icon: Support,
      title: "Top-notch Support",
      desc: "sayhello&flacio.com",
    },
    {
      icon: Return,
      title: "180 Days Return",
      desc: "180 Days Return",
    },
  ];

  return (
    <Layout>
      {/* homepage background */}
      <div className="relative w-full h-[140vh]  ">
        <div
          className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
            fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <img
            src={slides[index].image}
            alt="slider"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="uppercase font-poppins text-xl mb-4 tracking-widest">
              SALE UP TO 30% OFF
            </p>
            <h1 className="text-4xl md:text-8xl font-semibold mb-4 font-librebaskerville">
              {slides[index].title.split(" ")[0]}{" "}
              <span className="italic font-librebaskervilleItalic">
                {slides[index].title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="max-w-xl mb-6 text-sm md:text-base font-poppins">
              Patch helps you discover the best plants for your space, delivers
              them to your door and helps you look after them.
            </p>
            <div className="flex gap-4 mt-12">
              <button className="bg-white text-xl text-black px-6 py-2   font-librebaskerville hover:bg-green-900 hover:text-white transition-colors duration-500">
                Shop indoor
              </button>
              <button className="bg-white text-xl text-black px-6 py-2 font-librebaskerville hover:bg-green-900 hover:text-white transition-colors duration-500">
                Shop outdoor
              </button>
            </div>
          </div>
        </div>

        {/*for slides Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={`slide-dot-${i}`}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full border-2 ${
                i === index ? "bg-white" : "bg-transparent"
              }`}
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
            />
          ))}
        </div>
      </div>

      {/*images */}
      <div className="absolute z-10 -mt-40 items-center justify-center text-center w-full   ">
        <div className="flex justify-center gap-4  ">
          {/* banner 1 */}
          <div className="group relative overflow-hidden">
            <img
              src={banner1}
              alt="new Arrivals"
              loading="lazy"
              className="transition-transform duration-500 hover:scale-125"
            />
            <div className="absolute text-start bottom-12 left-6 ">
              <h3 className="font-librebaskerville text-4xl text-gray-900">
                New Arrivals
              </h3>
              <button className="text-gray-500 text-md font-poppins border-b-2 border-black hover:text-green-800  transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
          {/*  banner 2*/}
          <div className="group relative flex items-center justify-center overflow-hidden">
            <img
              src={banner2}
              alt="Green plant"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-125"
            />
            <div className="absolute text-center  bottom-12 ">
              <h3 className="font-librebaskerville text-4xl text-gray-900">
                Gift Green
              </h3>
              <button className="text-gray-500 text-md font-poppins border-b-2 border-black hover:px-[-2px]  transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>

          {/*banner 3 */}
          <div className="group relative overflow-hidden">
            <img
              src={banner3}
              alt="new Arrivals"
              loading="lazy"
              className="transition-transform duration-500 hover:scale-125"
            />
            <div className="absolute text-start bottom-12 left-6 ">
              <h3 className="font-librebaskerville text-4xl text-gray-900">
                Home Grown
              </h3>
              <button className="text-gray-500 text-md font-poppins border-b-2 border-black hover:text-green-800  transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy section */}
      <div className="bg-pink-100  flex">
        {/* text content */}
        <div className="flex gap-16 mt-[36vh] mx-12">
          <div className="flex flex-col w-1/2 gap-6 ">
            <h1 className="text-6xl font-librebaskerville">
              Decorate your <br /> home{" "}
              <span className="font-librebaskervilleItalic ">with plants</span>
            </h1>
            <p className="text-gray-500 text-sm font-poppins">
              Praesent egestas tristique nibh. Sed mollis, eros et ultrices
              tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
              orci. Fusce convallis metus id felis luctus adipiscing. Integer
              tincidunt. Etiam imperdiet imperdiet orci
            </p>
            <div className="flex flex-col gap-12 mt-12">
              <div className="flex gap-6 bg-white shadow-lg ">
                <img
                  src={PolicyIcon1}
                  alt="quality"
                  loading="lazy"
                  className="transition-transform duration-300 will-change-transform hover:animate-bounceX"
                />
                <div className="flex flex-col justify-center  ">
                  <h2 className="text-3xl font-librebaskerville">
                    Unbeatable Quality
                  </h2>
                  <p className="text-gray-500 text-sm font-poppins">
                    Greater productivity and relaxation
                  </p>
                </div>
              </div>
              <div className="flex gap-6 bg-white shadow-lg ">
                <img
                  src={PolicyIcon2}
                  alt="quality"
                  loading="lazy"
                  className="transition-transform duration-100 will-change-transform hover:animate-bounceX"
                />
                <div className="flex flex-col justify-center  ">
                  <h2 className="text-3xl font-librebaskerville">
                    Delivery to your door
                  </h2>
                  <p className="text-gray-500 text-sm font-poppins">
                    Better mental wellbeing and happiness
                  </p>
                </div>
              </div>
              <div className="flex gap-6 bg-white shadow-lg">
                <img
                  src={PolicyIcon3}
                  alt="quality"
                  loading="lazy"
                  className="transition-transform duration-500  hover:animate-bounceX"
                />
                <div className="flex flex-col justify-center  ">
                  <h2 className="text-3xl font-librebaskerville">
                    Bring nature into your life
                  </h2>
                  <p className="text-gray-500 text-sm font-poppins">
                    Greater productivity and relaxation
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*Image content */}
          <div className="relative w-[600px] h-[650px] flex items-center justify-center">
            {/* Ring 1 - Back Ring */}
            <img
              src={Ring1}
              alt="ring 1"
              loading="lazy"
              className="absolute w-[530px] rotate-[25deg] animate-scalePulse z-10 pointer-events-none"
            />

            {/* Ring 2 - Front Ring */}
            <img
              src={Ring2}
              alt="ring 2"
              loading="lazy"
              className="absolute w-[530px] animate-scalePulse   z-10 pointer-events-none"
            />

            {/* Pot in front */}
            <img
              src={PolicyPot}
              alt="policy pot"
              loading="lazy"
              className="relative z-0 w-[500px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Top Ratign / Best Selling  */}

      <div className="relative flex flex-col mx-12 my-16">
        {/* tabs button */}
        <div className="text-center flex items-center justify-center gap-6">
          <button
            onClick={() => setActiveTab("top")}
            className={`text-4xl font-librebaskerville transition dureation-300 ${
              isTop ? "text-black" : "text-gray-400 hover:text-gray-900"
            }`}
          >
            Top <span className="italic">Rating</span>
          </button>{" "}
          <span className="text-5xl">/</span>{" "}
          <button
            onClick={() => setActiveTab("best")}
            className={`text-4xl font-librebaskerville transition dureation-300 ${
              !isTop ? "text-black " : "text-gray-400 hover:text-gray-900"
            }`}
          >
            Best <span className="italic">Selling</span>
          </button>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className=" flex items-center justify-center pb-24 group  hover:text-green-600">
        <span className="border border-black p-10 mr-24 rounded-full  group-hover:animate-bounceX cursor-pointer">
          {" "}
        </span>
        <div className="absolute flex  items-center justify-center bg-white group-hover:animate-bounceX cursor-pointer ">
          <span className="text-lg">View More</span>
          <MoveRight />
        </div>
      </div>

      {/* Quata BG */}
      <div
        style={{ backgroundImage: `url(${QuataBG})` }}
        className="bg-cover bg-center relative w-full h-[550px]  bg-indigo-500"
      >
        <div className="flex flex-col  items-center justify-center gap-4 h-full max-w-4xl mx-auto  transition-all duration-500 ease-in-out">
          <div className="flex gap-2 text-green-800">
            {testimonial[testimonialIndex].star}
          </div>
          <h1 className="text-[30px] font-librebaskervilleItalic text-center ">
            &#10077;{testimonial[testimonialIndex].quote}&#10078;
          </h1>
          <img
            src={testimonial[testimonialIndex].image}
            alt={testimonial[testimonialIndex].name}
            loading="lazy"
            className="rounded-full mt-8 w-40 h-40 shadow-md"
          />
          <p className="text-lg font-poppins">
            {testimonial[testimonialIndex].name}
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {testimonial.map((_, i) => (
            <button
              key={`testimonial-dot-${i}`}
              onClick={() => goToTestimonial(i)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                i === testimonialIndex ? "bg-black p-2" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Plant for office */}
      <div className="flex px-12 my-20  justify-between ">
        <div className=" relative w-[50%]  ">
          <img
            src={TextRotate}
            alt="textRotation_image"
            loading="lazy"
            className="absolute z-10 -top-12 left-20 animate-spin-slow "
          />
          <img
            src={PlantOffice}
            loading="lazy"
            alt="Plant for office"
            className="relative w-full h-full"
          />
        </div>
        {/* text */}
        <div className="flex flex-col px-20 w-[50%] gap-6  justify-center">
          <h1 className="text-6xl font-librebaskerville ">
            Plants For{" "}
            <span className="font-librebaskervilleItalic ">office</span>
          </h1>
          <p className="font-poppins text-md text-gray-500">
            Praesent egestas tristique nibh. Sed mollis, eros et ultrices
            tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
            orci. Fusce convallis metus id felis luctus adipiscing. Integer
            tincidunt. Etiam imperdiet imperdiet orc
          </p>
          <button className="font-poppins text-center self-start bg-green-900 hover:bg-green-950 text-white px-6 py-3">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Sets for all style */}
      <div className="flex px-12 justify-between ">
        {/* text */}
        <div className="flex flex-col pr-20 w-[50%] gap-6 justify-center">
          <h1 className="text-6xl font-librebaskerville ">
            Sets for all{" "}
            <span className="font-librebaskervilleItalic ">styles</span>
          </h1>
          <p className="font-poppins text-md text-gray-500">
            Praesent egestas tristique nibh. Sed mollis, eros et ultrices
            tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
            orci. Fusce convallis metus id felis luctus adipiscing. Integer
            tincidunt. Etiam imperdiet imperdiet orci
          </p>
          <button className="font-poppins text-center self-start bg-green-900 hover:bg-green-950 text-white px-6 py-3">
            Shop Collection
          </button>
        </div>
        <div className=" relative w-[50%]  ">
          <img
            src={TextRotate}
            alt="textRotation_image"
            loading="lazy"
            className="absolute z-10 -top-12 right-20 animate-spin-slow will-change-transform "
          />
          <img
            src={SetStyle}
            alt="SetStyle for all"
            loading="lazy"
            className="relative w-full h-full"
          />
        </div>
      </div>

      {/* News latter */}
      <div className="bg-[#e7e2ea] h-[400px] my-16 gap-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-librebaskerville ">
          Sign Up To Our{" "}
          <span className="font-librebaskervilleItalic">Newsletter</span>
        </h1>
        <p className="font-poppins text-xm mb-8 mt-2 text-gray-500">
          Stay up to date on the latest news with our carefully curated
          newsletters.
        </p>

        <div className="flex ">
          <input
            type="email"
            placeholder="Email adress...."
            className="px-4 py-4 w-[600px] font-extralight text-sm rounded-l-md font-poppins border-none"
          />
          <button className="text-white font-poppins rounded-r-md bg-black hover:bg-green-950 px-6 py-4">
            Submit
          </button>
        </div>
      </div>

      {/*Bring life in  */}
      <div className="flex flex-col mx-12 my-16">
        <div className="items-center justify-center py-12 gap-4 ">
          <h1 className="font-librebaskerville text-[32px] text-center">
            #bring<span className="font-librebaskervilleItalic">lifein</span>
          </h1>
          <p className="font-poppins text-center text-md text-gray-500">
            Our community has a thing for plant styling. Get inspired.
          </p>
        </div>
        {/* images */}
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div ref={scrollRef} className=" flex gap-6 overflow-x-hidden">
            {visiableImage.map((image) => (
              <div key={image.image} className="relative overflow-hidden ">
                <img
                  src={image.image}
                  alt="igImages"
                  className="h-[350px] w-full transition-transform duration-500 hover:scale-110 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Left-Right Hover button */}
          {hovered && (
            <>
              <button
                onClick={handleLeftClick}
                disabled={startIndex === 0}
                className={`absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2 ${
                  startIndex === 0 ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleRightClick}
                disabled={startIndex >= IgImages.length - 4}
                className={`absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2 ${
                  startIndex >= IgImages.length - 4
                    ? "opacity-90 cursor-not-allowed "
                    : ""
                }`}
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="h-px w-full my-12 bg-gray-200"></div>

      {/* services */}
      <div className="flex gap-20 px-12  my-16">
        <div className="flex justify-between items-center w-full bg-cyan">
          {Services.map((service) => (
            <div
              key={`service-${service.title}`}
              className="flex  gap-4  w-full "
            >
              <img
                src={service.icon}
                alt={service.title}
                loading="lazy"
                className="h-12 justify-center "
              />
              <div className="flex flex-col">
                <h3 className="font-librebaskerville text-[24px]">
                  {service.title}
                </h3>
                <p className="font-poppins text-gray-500 text-md">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>

      <ScrollToTop />
    </Layout>
  );
}
