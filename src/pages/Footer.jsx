import React, { useEffect, useState } from "react";
import Payment from "../assets/Home/payment.avif";
import { Mail } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = () => {
    setSubscribe(true);
    setTimeout(() => {
      setSubscribe(false);
    }, 2000);
  };

  return (
    <div className="bg-green-950 min-h-[60vh] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 align-middle mx-12 pt-12">
        {/* about */}
        <div className="flex flex-col gap-2 text-md">
          <h1
            onClick={handleScrollTop}
            className="text-sm font-librebaskerville pb-8 tracking-widest"
          >
            COMPANY
          </h1>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            About
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Careers
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Press
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Corporate Orders
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Refer a Friend
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            About
          </p>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2 text-md">
          <h1
            onClick={handleScrollTop}
            className="text-sm font-librebaskerville pb-8 tracking-widest"
          >
            SUPPORT
          </h1>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Help + FAQs
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Track Your Order
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Shipping
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Returns
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Contact Support
          </p>
        </div>

        {/* Plant quistions */}
        <div className="flex flex-col font-librebaskerville gap-2 text-md">
          <h1 className="pb-8 text-sm tracking-widest">PLANT QUESTIONS ?</h1>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Plant Care Tips
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Plant Life Blog
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Vera Plant Care App
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Meet Plant Mom
          </p>
          <p
            onClick={handleScrollTop}
            className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 "
          >
            Conatact the Grow-How Team
          </p>
        </div>

        {/* Follow us */}
        <div className="flex flex-col gap-2 text-md">
          <h1 className=" text-sm font-librebaskerville pb-8 tracking-widest">
            STAY IN THE LOOP
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-poppins tracking-wide">
              Stay in the loop with special offers,plant-parenting tips, and
              more.
            </p>

            {subscribe && (
              <div className="bg-gray-50 bg-opacity-85 rounded border border-blue-700  px-4 py-2">
                <p className="text-sm font-poppins text-blue-600 tracking-wide">
                  You have successfully subscribed to our newsletter.
                </p>
              </div>
            )}
            <div className="flex justify-between border-b-2 border-white">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 bg-green-950"
                style={{ outline: "none" }}
              />
              <button
                onClick={handleSubscribe}
                className="p-2 rounded-tr-md rounded-br-md hover:scale-110 transition-transform duration-300 "
              >
                <Mail color="white" size={20} />
              </button>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="text-3xl cursor-pointer border border-white p-2 rounded-full hover:bg-gray-900 hover:border-blue-600 hover:text-blue-600">
                <FaFacebookF size={20} />
              </button>
              <button className="text-3xl cursor-pointer border border-white p-2 rounded-full hover:bg-gray-900 hover:border-white hover:text-white">
                <FaXTwitter size={20} />
              </button>
              <button className="text-3xl cursor-pointer border border-white p-2 rounded-full hover:bg-gray-900 hover:border-green-500 hover:text-green-500">
                <FaWhatsapp size={20} />
              </button>
              <button className="text-3xl cursor-pointer border border-white p-2 rounded-full hover:bg-gray-900 hover:border-pink-500 hover:text-pink-500">
                <FaTiktok size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <img src={Payment} alt="payment" className="px-12 mt-6 cursor-pointer" />

      <div className="w-full h-0.5 bg-gray-700 mt-6" />

      <div className="flex items-center justify-between px-12 p-8">
        <p className="text-md font-poppins  cursor-pointer hover:text-gray-400 ">
          © 2024 Flacio Store. All Rights Reserved
        </p>
        <div className="flex gap-8 font-poppins ">
          <p className="cursor-pointer hover:text-gray-500">Terms of Use</p>
          <p className="cursor-pointer hover:text-gray-500">
            Copyright & Trademark
          </p>
          <p className="cursor-pointer hover:text-gray-500">Policy</p>
          <p className="cursor-pointer hover:text-gray-500">Sitemap</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
