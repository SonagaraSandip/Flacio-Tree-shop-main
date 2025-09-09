import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
import ScrollToTop from "../pages/ScrollToTop";
import LowMaintainance from "../assets/collection/Low-maintainance.avif";
import AirPurifying from "../assets/collection/Air-Purifying.avif";
import HerbsSeeds from "../assets/collection/Herb-Seeds.avif";
import IndoorPlants from "../assets/collection/Indoor-Plants.avif";
import PlantBundle from "../assets/collection/Plant-Bundle.avif";

const Collections = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const CollectionData = [
    {
      img: LowMaintainance,
      title: "Low Maintainance",
      link: "low-maintainance",
      count: 9,
    },
    {
      img: AirPurifying,
      title: "Air Purifying",
      link: "air-purifying",
      count: 6,
    },
    {
      img: HerbsSeeds,
      title: "Herbs Seeds",
      link: "herbs-seeds",
      count: 6,
    },
    {
      img: IndoorPlants,
      title: "Indoor Plants",
      link: "indoor-plants",
      count: 5,
    },
    {
      img: PlantBundle,
      title: "Plant Bundle",
      link: "plant-bundle",
      count: 4,
    },
  ];

  return (
    <div className="mt-[130px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-12">
        {CollectionData.map((collection, index) => (
          <div
            key={index}
            className=" mx-4 mb-4 relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={collection.img}
              alt={collection.title}
              loading="lazy"
              className="overflow-hidden h-[300px] w-full"
            />
            {hoveredIndex === index &&  (
              <div className="absolute top-0 left-0 right-0 bottom-16 flex items-center bg-black bg-opacity-25 transition-all duration-500">
                <Link to={`/collections/${collection.link}`} className=" self-end mb-8 bg-white mx-auto text-xs font-librebaskerville px-4 py-2 text-black hover:bg-green-900 hover:text-white cursor-pointer">
                  {" "}
                  VIEW ALL
                </Link>
              </div>
            )}

            <div className="flex flex-col text-center my-2 ">
              <p className="font-librebaskerville text-md ">
                {collection.title}
              </p>
              <p className="font-poppins text-sm text-gray-500">
                {collection.count} Products
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Collections;
