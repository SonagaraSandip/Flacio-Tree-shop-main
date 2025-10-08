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
    <div className="pt-20 sm:pt-24 lg:pt-[150px] ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 lg:mx-12">
        {CollectionData.map((collection, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={collection.img}
              alt={collection.title}
              loading="lazy"
              className="overflow-hidden h-[250px] sm:h-[280px] md:h-[300px] w-full object-cover"
            />
            {hoveredIndex === index && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center bg-black bg-opacity-25 transition-all duration-500">
                <Link
                  to={`/collections/${collection.link}`}
                  className="self-center bg-white mx-auto text-xs font-librebaskerville px-4 py-2 text-black hover:bg-green-900 hover:text-white cursor-pointer"
                >
                  VIEW ALL
                </Link>
              </div>
            )}

            <div className="flex flex-col text-center my-2">
              <p className="font-librebaskerville text-sm sm:text-md">
                {collection.title}
              </p>
              <p className="font-poppins text-xs sm:text-sm text-gray-500">
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