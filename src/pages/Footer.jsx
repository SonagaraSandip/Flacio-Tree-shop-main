/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Payment from "../assets/Home/payment.avif";
import { Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleSubscribe = () => {
    setSubscribe(true);
    setTimeout(() => setSubscribe(false), 2000);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "company",
      title: "COMPANY",
      links: [
        "About",
        "Careers",
        "Press",
        "Corporate Orders",
        "Refer a Friend",
        "About",
      ],
    },
    {
      id: "support",
      title: "SUPPORT",
      links: [
        "Help + FAQs",
        "Track Your Order",
        "Shipping",
        "Returns",
        "Contact Support",
      ],
    },
    {
      id: "plant",
      title: "PLANT QUESTIONS ?",
      links: [
        "Plant Care Tips",
        "Plant Life Blog",
        "Vera Plant Care App",
        "Meet Plant Mom",
        "Contact the Grow-How Team",
      ],
    },
    {
      id: "newsletter",
      title: "STAY IN THE LOOP",
      isNewsletter: true,
    },
  ];

  const socialIcons = [
    { Icon: FaFacebookF, color: "blue-600" },
    { Icon: FaXTwitter, color: "white" },
    { Icon: FaWhatsapp, color: "green-500" },
    { Icon: FaTiktok, color: "pink-500" },
  ];

  const bottomLinks = [
    "Terms of Use",
    "Copyright & Trademark",
    "Policy",
    "Sitemap",
  ];

  const renderNewsletterSection = () => (
    <div className="flex flex-col gap-4">
      <p className="text-xs sm:text-sm font-poppins tracking-wide">
        Stay in the loop with special offers, plant-parenting tips, and more.
      </p>

      {subscribe && (
        <div className="bg-gray-50 bg-opacity-85 rounded border border-blue-700 px-3 sm:px-4 py-2">
          <p className="text-xs sm:text-sm font-poppins text-blue-600 tracking-wide">
            Successfully subscribed to newsletter.
          </p>
        </div>
      )}

      <div className="flex justify-between border-b-2 border-white">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-2 bg-green-950 w-full text-sm sm:text-base outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="p-2 hover:scale-110 transition-transform duration-300"
        >
          <Mail color="white" size={20} />
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center sm:justify-start">
        {socialIcons.map(({ Icon, color }, index) => (
          <button
            key={index}
            className={`border border-white p-2 rounded-full hover:bg-gray-900 hover:border-${color} hover:text-${color} transition-colors duration-300`}
          >
            <Icon size={16} className="sm:w-5 sm:h-5" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-green-950 min-h-[60vh] text-white">
      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-6 px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        {/* Dynamic Sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-gray-700 lg:border-none"
          >
            {/* Section Header with Dropdown Toggle */}
            <div
              className="flex justify-between items-center py-4 lg:py-0 lg:pb-4 sm:pb-8 cursor-pointer lg:cursor-auto"
              onClick={() => toggleSection(section.id)}
            >
              <h1 className="text-sm font-librebaskerville tracking-widest">
                {section.title}
              </h1>
              {/* Dropdown Arrow - Show only on mobile */}
              <div className="lg:hidden">
                {openSection === section.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {/* Section Content */}
            <div
              className={`
              ${openSection === section.id ? "block" : "hidden"} 
              lg:block transition-all duration-300 pb-4 lg:pb-0
            `}
            >
              {section.isNewsletter ? (
                renderNewsletterSection()
              ) : (
                <div className="flex flex-col gap-2">
                  {section.links.map((link, i) => (
                    <p
                      key={i}
                      onClick={handleScrollTop}
                      className="text-sm sm:text-md font-poppins py-1 cursor-pointer hover:text-gray-400"
                    >
                      {link}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Image */}
      <img
        src={Payment}
        alt="payment"
        className="px-4 sm:px-8 lg:px-12 mt-6 cursor-pointer w-full max-w-4xl mx-auto"
      />

      <div className="w-full h-0.5 bg-gray-700 mt-6" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 py-6 sm:py-8 gap-4 sm:gap-0">
        <p className="text-sm sm:text-md font-poppins cursor-pointer hover:text-gray-400 text-center sm:text-left order-2 sm:order-1">
          © 2024 Flacio Store. All Rights Reserved
        </p>

        <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8 font-poppins order-1 sm:order-2 text-center">
          {bottomLinks.map((link, index) => (
            <p
              key={index}
              className="text-sm sm:text-md cursor-pointer hover:text-gray-500 whitespace-nowrap"
            >
              {link}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
