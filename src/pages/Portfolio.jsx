import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Layout from "./Layout";
import Data from "../data/Portfolio_Data";

const Portfolio = () => {
  const [selected, setSelected] = useState("All");

  const AllTags = [
    "All",
    ...Array.from(new Set(Data.flatMap((item) => item.tags))),
  ];

  const filtered =
    selected === "All"
      ? Data
      : Data.filter((item) => item.tags.includes(selected));

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\?/g, "").replace(/\s+/g, "-");
  };

  return (
    <Layout className="">
      <div className="flex flex-col pt-[150px] gap-2 pb-2 px-14 border-b border-gray-300">
        <h1 className="text-6xl font-librebaskerville ">Portfolio</h1>
        <div className="flex gap-6 my-4 pb-2">
          {AllTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelected(tag)}
              className={`text-poppins text-lg cursor-pointer pb-1 hover:text-zinc-900 border-b-2 ${
                selected === tag
                  ? "border-black font-semibold"
                  : "border-transparent text-gray-500"
              } transition-colors duration-300`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* images */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 gap-10">
          {filtered.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link to={`/blog/portfolio/${generateSlug(item.title)}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg w-full mb-4"
                />
              </Link>
              <h2 className="text-2xl font-librebaskerville text-gray-800 text-center">
                {item.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                {item.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelected(tag)}
                    className="text-sm text-gray-400 font-poppins border border-gray-400 px-2 py-1 hover:bg-green-950 hover:text-white transition-colors duration-300 tracking-wider uppercase"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </Layout>
  );
};

export default Portfolio;
