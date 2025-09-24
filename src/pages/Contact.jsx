import React, { useState } from "react";
import BlogBG from "../assets/Shop/bg-breadcrumb.webp";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { toast } from "react-toastify";

import Brand1 from "../assets/about/brand-1.avif";
import Brand2 from "../assets/about/brand-2.avif";
import Brand3 from "../assets/about/brand-3.avif";
import Brand4 from "../assets/about/brand-4.avif";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // Google Maps embed URL for Golden Gate Park
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12616.037107779313!2d-122.4670096!3d37.7680222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858772572a32e3:0x87937661d69c0bc0!2sGolden%20Gate%20Park%20San%20Francisco%2C%20California%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2sus!4v1678887654321!5m2!1svi!2sus";

  const contactDetails = [
    { label: "Address", value: "8331 Indian Spring Street Ames, IA 30010" },
    { label: "Phone", value: "(+84) 123 567 712" },
    {
      label: "Email",
      value: "support@flacio.com",
    },
    { label: "Opening Time", value: "8:00Am – 10:00Pm, Sunday Close" },
  ];

  const Brand = [
    { img: Brand1, title: "Pick your plant" },
    { img: Brand2, title: "Choose a pot color" },
    { img: Brand3, title: "Have it shipped" },
    { img: Brand4, title: "Watch it grow" },
  ];

  //validation for email address
  const validateEmail = (email) => {
    // A simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //handle submit
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

    if (!message.trim()) {
      toast.error("Please enter your comment");
      return;
    }

    toast.success("Submitted successfully");
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    //reset subbimition after 3 second
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="relative">
      <img
        src={BlogBG}
        alt="blog back background"
        className="absolute inset-0 object-cover -z-10 -top-32"
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end h-[300px] pb-16 text-black">
        <h1 className="text-6xl font-librebaskerville">Contact Us</h1>
      </div>

      {/* content  */}
      <div className="w-full h-full bg-white ">
        {/* contact details */}
        <div className="flex justify-between gap-8 w-full px-12  py-12">
          <div className="flex flex-col  gap-4 w-[25%]">
            <h1 className="text-3xl font-librebaskerville">Contact Details</h1>
            {contactDetails.map((item, idx) => (
              <div key={idx} className="flex flex-col mt-4 gap-2 ">
                <h3 className="text-xl font-librebaskerville">{item.label}</h3>
                <p className="text-gray-500 text-sm font-poppins">
                  {item.value}
                </p>
                <span className="h-px w-full my-2 bg-gray-300" />
              </div>
            ))}
            <div className="flex flex-col mt-2 gap-2 ">
              <h3 className="text-xl font-librebaskerville">Follow Us On</h3>
              <div className="flex gap-4 mt-6">
                <button className="text-3xl cursor-pointer border border-black p-2 rounded-full hover:bg-gray-900 hover:border-blue-600 hover:text-blue-600">
                  <FaFacebookF size={20} />
                </button>
                <button className="text-3xl cursor-pointer border border-black p-2 rounded-full hover:bg-gray-900 hover:border-white hover:text-white">
                  <FaXTwitter size={20} />
                </button>
                <button className="text-3xl cursor-pointer border border-black p-2 rounded-full hover:bg-gray-900 hover:border-green-500 hover:text-green-500">
                  <FaWhatsapp size={20} />
                </button>
                <button className="text-3xl cursor-pointer border border-black p-2 rounded-full hover:bg-gray-900 hover:border-pink-500 hover:text-pink-500">
                  <FaTiktok size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-[75%] flex flex-col">
            {" "}
            {/* Added flex-col to stack map and button */}
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%" // Adjust height to make space for the button
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Golden Gate Park Map" // Important for accessibility and React errors
            ></iframe>
          </div>
        </div>

        {/* contact form */}
        <div className="flex flex-col text-center max-w-5xl mx-auto gap-4 mt-12 mb-6">
          <h1 className="text-3xl font-librebaskerville">
            Send Us Your Questions!
          </h1>
          <p className="font-poppins text-sm text-gray-500">
            We’ll get back to you within two hours.
          </p>

          {submitted && (
            <p className="font-poppins text-md text-green-600 bg-green-100 border border-green-900 px-4 py-2">
              Thanks for contacting us. We'll get back to you as soon as
              possible.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 my-8 w-full"
            noValidate
          >
            <div className="flex  w-full gap-8">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="border border-black w-full px-4 py-4"
                style={{ outline: "none" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-black w-full px-4 py-4"
                style={{ outline: "none" }}
              />
            </div>
            <textarea
              type="text"
              rows={8}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              required
              className="border border-black w-full px-4 py-4"
              style={{ outline: "none" }}
            />

            <button
              type="submit"
              className="border border-gray-800 uppercase self-center px-8 py-3 bg-zinc-800 text-white font-poppins text-sm hover:bg-gradient-to-r from-green-950 via-green-500 to-green-950 hover:text-white hover:animate-moveStripes-slow"
            >
              submit
            </button>
          </form>
        </div>

        <div className="h-px w-full bg-gray-200 mt-8 my-4" />
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

export default Contact;
