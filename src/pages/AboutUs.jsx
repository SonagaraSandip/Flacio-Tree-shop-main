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
        className="absolute inset-0 object-cover -z-10 -top-32"
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end h-[300px] pb-16 text-black">
        <h1 className="text-6xl font-librebaskerville">About Us</h1>
      </div>

      {/* content  */}
      <div className="w-full h-full bg-white ">
        {/* image + pot */}
        <div className="relative  p-4 md:p-6 lg:p-12">
          <img
            src={About}
            alt="about us"
            className="w-full h-full"
            loading="lazy"
          />
          <img
            src={PolicyPot}
            alt="polict pot"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -bottom-16 "
            loading="lazy"
          />
        </div>

        {/*text */}
        <div className="flex flex-col items-center  max-w-5xl mx-auto text-center gap-6 mt-20 my-4">
          <p className="uppercase text-lg font-poppins text-gray-500 ">
            FLACIO PHOTOSYNTHESIS STORIES
          </p>
          <h1 className="text-5xl font-librebaskerville text-green-950">
            We connect buyers and sellers with suitable, eco-friendly products
          </h1>
          <div className="flex items-center gap-2 text-green-950 ">
            <span className="h-1 w-20 rounded bg-green-950" />
            <Diamond size={20} fill="bg-green-950" />
            <span className="h-1 w-20 rounded bg-green-950" />
          </div>
          <p className="text-sm  text-gray-500 font-poppins">
            Nothing adds more beauty and comfort to our homes and offices than
            the lush flowers and foliage of indoor plants. Bedrooms, bathrooms,
            kitchens, cubicles… There really isn’t a space a houseplant can’t
            enliven. Just add light and water, and you’ve got a growing indoor
            oasis. Bringing plants into your home is aesthetically pleasing and
            – amazingly – plants can offer strong health benefits as well!
          </p>
        </div>
        {/* 3 images */}
        <div className="flex justify-between w-screen h-[72vh] mt-12">
          <img
            src={About2}
            alt="about us"
            className="w-96 h-96 hover:animate-zoom-in transition-all  transform duration-800 ease-in-out"
            loading="lazy"
          />
          <img
            src={About3}
            alt="about us"
            className="w-96 h-96 self-end items-end justify-end hover:animate-zoom-in transform duration-800 ease-in-out"
            loading="lazy"
          />
          <img
            src={About4}
            alt="about us"
            className="w-96 h-96 hover:animate-zoom-in transform duration-800 ease-in-out"
            loading="lazy"
          />
        </div>
        {/* how its work */}
        <div className=" bg-red-50 my-8 h-[52vh]">
          <div className="flex flex-col py-16 gap-6 max-w-7xl mx-auto items-center ">
            <h1 className="text-4xl font-librebaskerville">
              Here's How It{" "}
              <span className="font-librebaskervilleItalic"> Works</span>
            </h1>
            <div className="flex justify-between items-center gap-4 w-full my-12">
              {Policy.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <img
                    src={item.img}
                    alt="about us"
                    className="w-20 h-20 hover:animate-bounce transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  <h1 className="text-2xl font-librebaskerville text-zinc-700">
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="bg-cover bg-center relative w-full h-[550px] ">
          <div className="flex flex-col items-center justify-center gap-4 h-full max-w-4xl mx-auto transition-all duration-500 ease-in-out">
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

        <div className="h-px w-full bg-gray-200 my-4" />
        {/* brand */}
        <div className="flex justify-between items-center gap-4 w-full max-w-7xl mx-auto my-12">
          {Brand.map((item, index) => (
            <img
              src={item.img}
              alt={item.title}
              className="w-90 h-16 hover:animate-bounceX transition-transform duration-500 ease-in-out"
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
