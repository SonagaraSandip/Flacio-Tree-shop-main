import React, { useState, useEffect } from "react";
import BlogBG from "../assets/Shop/bg-breadcrumb.webp";
import { Diamond } from "lucide-react";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import About from "../assets/about/about-1.webp";
import PolicyPot from "../assets/Home/policy-image-1_540x.png";
import About2 from "../assets/about/about-2_540x.webp";
import About3 from "../assets/about/about-3_540x.webp";
import About4 from "../assets/about/about-4_540x.webp";
import Policy8 from "../assets/about/policy-8.svg";
import Policy9 from "../assets/about/policy-9.svg";
import Policy10 from "../assets/about/policy-10.svg";
import Policy11 from "../assets/about/policy-11.svg";
import Brand1 from "../assets/about/brand-1.avif";
import Brand2 from "../assets/about/brand-2.avif";
import Brand3 from "../assets/about/brand-3.avif";
import Brand4 from "../assets/about/brand-4.avif";

import { IoStar, IoStarOutline } from "react-icons/io5";
import Smith from "../assets/Home/smith.jpg";
import Sara from "../assets/Home/sara.jpg";
import Saitama from "../assets/Home/saitama.jpg";
import Shetty from "../assets/Home/shetty.jpg";

const AboutUs = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    // const slideInterval = setInterval(nextSlide, 5000);
    const testimonialInterval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(testimonialInterval);
  });

  // testimonial side
  const nextTestimonial = () => {
    setTimeout(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonial.length);
    });
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
  const Policy = [
    { img: Policy8, title: "Pick your plant" },
    { img: Policy9, title: "Choose a pot color" },
    { img: Policy10, title: "Have it shipped" },
    { img: Policy11, title: "Watch it grow" },
  ];
  const Brand = [
    { img: Brand1, title: "Pick your plant" },
    { img: Brand2, title: "Choose a pot color" },
    { img: Brand3, title: "Have it shipped" },
    { img: Brand4, title: "Watch it grow" },
  ];
  return (
    <div className="relative">
      <img
        src={BlogBG}
        alt="blog back background"
        className="absolute inset-0 object-cover -z-10 -top-2 sm:-top-24 lg:-top-32 h-[200px] sm:h-[250px] lg:h-auto"
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end h-[200px] sm:h-[220px] lg:h-[300px] text-black">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl top-1/2 lg:top-0  font-librebaskerville pb-4 sm:pb-6 lg:pb-12">
          About Us
        </h1>
      </div>

      {/* content  */}
      <div className="w-full h-full bg-white ">
        {/* image + pot */}
        <div className="relative p-4 md:p-6 lg:p-12">
          <img
            src={About}
            alt="about us"
            className="w-full h-auto"
            loading="lazy"
          />
          <img
            src={PolicyPot}
            alt="polict pot"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -bottom-8 sm:-bottom-12 lg:-bottom-16 w-32 sm:w-48 lg:w-auto"
            loading="lazy"
          />
        </div>

        {/*text */}
        <div className="flex flex-col items-center  max-w-5xl mx-auto text-center gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-20 my-4 px-4 sm:px-6">
          <p className="uppercase text-sm sm:text-base lg:text-lg font-poppins text-gray-500 ">
            FLACIO PHOTOSYNTHESIS STORIES
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-librebaskerville text-green-950">
            We connect buyers and sellers with suitable, eco-friendly products
          </h1>
          <div className="flex items-center gap-2 text-green-950 ">
            <span className="h-1 w-12 sm:w-16 lg:w-20 rounded bg-green-950" />
            <Diamond
              size={16}
              className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              fill="currentColor"
            />
            <span className="h-1 w-12 sm:w-16 lg:w-20 rounded bg-green-950" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-poppins">
            Nothing adds more beauty and comfort to our homes and offices than
            the lush flowers and foliage of indoor plants. Bedrooms, bathrooms,
            kitchens, cubicles… There really isn’t a space a houseplant can’t
            enliven. Just add light and water, and you’ve got a growing indoor
            oasis. Bringing plants into your home is aesthetically pleasing and
            – amazingly – plants can offer strong health benefits as well!
          </p>
        </div>
        {/* 3 images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-16  h-auto sm:h-[50vh] lg:h-[72vh] mt-8 sm:mt-12 px-4 sm:px-0 mx-0 lg:mx-12">
          <img
            src={About2}
            alt="about us"
            className="w-full sm:w-96 h-64 sm:h-72 lg:h-96 hover:animate-zoom-in transition-all  transform duration-800 ease-in-out"
            loading="lazy"
          />
          <img
            src={About3}
            alt="about us"
            className="w-full h-64 sm:h-72 lg:h-96 self-end items-end justify-end hover:animate-zoom-in transform duration-800 ease-in-out"
            loading="lazy"
          />
          <img
            src={About4}
            alt="about us"
            className="w-full lg:w-96 h-64 sm:h-72 lg:h-96 hover:animate-zoom-in transform duration-800 ease-in-out"
            loading="lazy"
          />
        </div>
        {/* how its work */}
        <div className=" bg-red-50 my-6 sm:my-8 h-auto sm:h-[40vh] lg:h-[52vh]">
          <div className="flex flex-col y-8 sm:py-12 lg:py-16 gap-4 sm:gap-6 max-w-7xl mx-auto items-center px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-librebaskerville text-center">
              Here's How It{" "}
              <span className="font-librebaskervilleItalic"> Works</span>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full my-6 sm:my-8 lg:my-12">
              {Policy.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 sm:gap-4 p-2"
                >
                  <img
                    src={item.img}
                    alt="about us"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 hover:animate-bounce transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  <h1 className="text-sm sm:text-base lg:text-2xl font-librebaskerville text-zinc-700">
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="bg-cover bg-center relative w-full h-[350px] sm:h-[450px] lg:h-[550px]">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 h-full max-w-4xl mx-auto px-4 transition-all duration-500 ease-in-out">
            <div className="flex gap-1 sm:gap-2 text-green-800">
              {testimonial[testimonialIndex].star}
            </div>
            <h1 className="text-lg sm:text-xl lg:text-[30px] font-librebaskervilleItalic text-center ">
              &#10077;{testimonial[testimonialIndex].quote}&#10078;
            </h1>
            <img
              src={testimonial[testimonialIndex].image}
              alt={testimonial[testimonialIndex].name}
              loading="lazy"
              className="rounded-full mt-4 sm:mt-6 lg:mt-8 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 shadow-md"
            />
            <p className="text-base sm:text-lg font-poppins">
              {testimonial[testimonialIndex].name}
            </p>
          </div>
          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20">
            {testimonial.map((_, i) => (
              <button
                key={`testimonial-dot-${i}`}
                onClick={() => goToTestimonial(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-300 ${
                  i === testimonialIndex ? "bg-black p-2" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gray-200 my-4" />
        {/* brand */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl mx-auto my-8 sm:my-12 px-4 sm:px-6">
          {Brand.map((item, index) => (
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-8 sm:h-12 lg:h-16 object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
              loading="lazy"
              key={index}
            />
          ))}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
