import React from "react";
import WhiteLogo from "../assets/Home/logo-white.png";
import Payment from "../assets/Home/payment.avif";

import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-green-950 min-h-[60vh] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 align-middle mx-12 pt-12">
        <div className="flex flex-col gap-2 text-md">
          <img src={WhiteLogo} alt="Ehite-logo " className=" w-[120px] pb-8 " />
          <p className="text-md font-poppins py-1">8331 Indian Spring Street</p>
          <p className="text-md font-poppins py-1">Ames, IA 30010</p>
          <p className="text-md font-poppins py-1">
            Email: greenhousematt@gmail.com
          </p>
          <p className="text-md font-poppins py-1">Call Us: 330-239-0506</p>
        </div>

        {/* about */}
        <div className="flex flex-col gap-2 text-md">
          <h1 className="text-xl font-bold font-poppins pb-8 tracking-widest">
            COMPANY
          </h1>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            About
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Careers
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Press
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Corporate Orders
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Refer a Friend
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            About
          </p>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2 text-md">
          <h1 className="  text-xl font-bold font-poppins pb-8 tracking-widest">
            SUPPORT
          </h1>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Help + FAQs
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Track Your Order
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Shipping
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Returns
          </p>
          <p className="text-md font-poppins py-1 cursor-pointer hover:text-gray-400 ">
            Contact Support
          </p>
        </div>

        {/* Fowllow us */}
        <div className="flex flex-col gap-2 text-md">
          <h1 className=" text-xl font-bold font-poppins pb-8 tracking-widest">
            FOLLOW US
          </h1>
          <div className="flex gap-4">
            <button className="text-3xl cursor-pointer border border-white p-3 rounded-full hover:bg-gray-900 hover:border-blue-600 hover:text-blue-600">
              <FaFacebookF size={24} />
            </button>
            <button className="text-3xl cursor-pointer border border-white p-3 rounded-full hover:bg-gray-900 hover:border-white hover:text-white">
              <FaXTwitter size={24} />
            </button>
            <button className="text-3xl cursor-pointer border border-white p-3 rounded-full hover:bg-gray-900 hover:border-green-500 hover:text-green-500">
              <FaWhatsapp size={24} />
            </button>
            <button className="text-3xl cursor-pointer border border-white p-3 rounded-full hover:bg-gray-900 hover:border-pink-500 hover:text-pink-500">
              <FaTiktok size={24} />
            </button>
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
