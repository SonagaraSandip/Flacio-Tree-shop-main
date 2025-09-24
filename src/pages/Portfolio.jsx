import React, { useState } from "react";
import Pf1 from "../assets/portfolio/Untitled-1Artboard_8.webp";
import Pf2 from "../assets/portfolio/Untitled-1Artboard_6.webp";
import Pf3 from "../assets/portfolio/Untitled-1Artboard_7.webp";
import Pf4 from "../assets/portfolio/Untitled-1Artboard_5.webp";
import Pf5 from "../assets/portfolio/Untitled-1Artboard_3.webp";
import Pf6 from "../assets/portfolio/Untitled-1Artboard_4.webp";

const Portfolio = () => {
  const [selected, setSelected] = useState("All");
  const data = [
    {
      img: Pf1,
      title: "Books that open knowledge",
      tags: ["Baby Needs", "Cosmetic", "New"],
    },
    {
      img: Pf2,
      title: "Redesign Concept",
      tags: ["Baber", "Hot", "Organic", "Simple"],
    },
    {
      img: Pf3,
      title: "Web Design Development",
      tags: ["Beauty", "Hot", "New", "Simple"],
    },
    {
      img: Pf4,
      title: "Organic drinking water for you",
      tags: ["Beauty", "Cosmetic", "Hot", "Organic"],
    },
    {
      img: Pf5,
      title: "Music event 2022",
      tags: ["Baber", "Hot", "Simple"],
    },
    {
      img: Pf6,
      title: "Wine gift box every day",
      tags: ["Baber", "Baby Needs", "Beauty", "Simple"],
    },
  ];

  const AllTags = [
    "All",
    ...Array.from(new Set(data.flatMap((item) => item.tags))),
  ];

  const filtered =
    selected === "All"
      ? data
      : data.filter((item) => item.tags.includes(selected));

  return (
    <div className="container mt-[150px]">
      <div className="flex flex-col gap-2 pb-2 px-14 border-b border-gray-300">
        <h1 className="text-6xl font-librebaskerville ">Portfolio</h1>
        <div className="flex gap-6 my-4 pb-2">
          {AllTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelected(tag)}
              className={`text-poppins text-lg cursor-pointer pb-1 border-b-2 ${
                selected === tag
                  ? "border-black font-semibold"
                  : "border-transparent text-gray-500"
              } transition-colors duration-500`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* images */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 gap-10">
          {filtered.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.img}
                alt={item.title}
                className="rounded-lg w-full mb-4"
              />
              <h2 className="text-2xl font-librebaskerville text-gray-800 text-center">
                {item.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                {item.tags.map((tag) => (
                  <button
                    key={tag}
                    className="text-sm text-gray-400 font-poppins border border-gray-400 px-2 py-1  tracking-wider uppercase"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
