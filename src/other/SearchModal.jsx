import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { Search, X } from "lucide-react";

const SearchModal = ({ setOpenSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // filter product by name
  const filterProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // fake blog/journal results (replace with API or data)
  const journal = [
    {
      title: "The Best Plant For You?",
      link: "/blog/lifeStyle/the-best-tree-care-tips-for-you",
    },
    {
      title: "The Best Tree Care Tips For You",
      link: "/blog/shorts/the-best-plant-for-you",
    },
    {
      title: "What Is The Best Plant For You?",
      link: "/blog/news/what-is-the-best-plant-for-you",
    },
    {
      title: "Traveling solo is awesome",
      link: "/blog/news/traveling-solo-is-awesome",
    },
    {
      title: "Indoor Plants Are Good For Health",
      link: "/blog/news/indoor-plants-are-good-for-health",
    },
    {
      title: "Tips On How To Select The Right Tree",
      link: "/blog/fashion/tips-on-how-to-select-the-right-tree",
    },
    {
      title: "Books that open knowledge",
      link: "/blog/portfolio/books-that-open-knowledge",
    },
    {
      title: "Web Design Development",
      link: "/blog/portfolio/web-design-development",
    },
    { title: "Redesign Concept", link: "/blog/portfolio/redesign-concept" },
    {
      title: "Organic drinking water for you",
      link: "/blog/portfolio/organic-drinking-water-for-you",
    },
    { title: "Music event 2022", link: "/blog/portfolio/music-event-2022" },
    {
      title: "Wine gift box every day",
      link: "/blog/portfolio/wine-gift-box-every-day",
    },
  ];

  const filteredJournal = journal.filter((j) =>
    j.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={() => setOpenSearch(false)}
      className="fixed inset-0 z-40  bg-zinc-900 bg-opacity-20 animate-zoom-in w-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-16 right-1/2 translate-x-1/2 bg-white shadow-2xl max-h-[600px] w-full max-w-6xl mx-auto overflow-y-auto  px-4 py-6 sm:px-6 lg:px-16 lg:py-10"
      >
        <button
          className="absolute top-4 right-4 cursor-pointe text-zinc-800"
          onClick={() => setOpenSearch(false)}
        >
          <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>
        <div className="w-full border border-gray-400 px-4 py-2 flex items-center text-gray-500 ">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            style={{ outline: "none" }}
            className="w-full ml-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query && (
          <div className="flex  gap-10">
            {/*products  */}
            <div className="flex-1">
              <div className="text-md flex justify-between text-gray-500 border-b border-gray-300 pb-2 mt-10 mb-4">
                <p>{filterProducts.length} results</p>
                <button
                  onClick={() => {
                    navigate("/collections/all");
                    setOpenSearch(false);
                  }}
                  className="font-poppins cursor-pointer hover:text-black"
                >
                  view all
                </button>
              </div>

              {filterProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filterProducts.map((p) => (
                    <div className="" key={p.id}>
                      <button
                        onClick={() => {
                          navigate(
                            `/products/${p.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          );
                          setOpenSearch(false);
                        }}
                      >
                        <img
                          src={p.frontImage}
                          alt={p.name}
                          className="w-52 h-60 object-cover rounded"
                        />
                      </button>
                      <p className="mt-2 text-sm text-black font-librebaskerville font-medium">
                        {p.name}
                      </p>
                      {p.discountPrice ? (
                        <p className="font-poppins">
                          <span className="line-through font-poppins  text-gray-500 text-sm">
                            ${p.originalPrice.toFixed(2)}
                          </span>{" "}
                          <span className="text-black ">
                            ${p.discountPrice.toFixed(2)}
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm font-poppins text-gray-500">
                          ${p.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4">
                  No results found for{" "}
                  <span className="font-semibold text-black">"{query}"</span> in
                  products.
                </p>
              )}
            </div>

            {/* Journal */}
            <div className="w-1/3">
              <div className="text-md flex justify-between text-gray-500 border-b border-gray-300 pb-2 mt-10 mb-4">
                <p>Journals</p>
                <button
                  onClick={() => {
                    navigate("/collections/all");
                    setOpenSearch(false);
                  }}
                  className="font-poppins cursor-pointer hover:text-black"
                >
                  view all
                </button>
              </div>
              {filteredJournal.length > 0 ? (
                <ul className="space-y-2 font-poppins  text-gray-600 text-md">
                  {filteredJournal.map((j, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        navigate(j.link);
                        setOpenSearch(false);
                      }}
                      className="hover:text-green-700 cursor-pointer"
                    >
                      {j.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-4">
                  No results found for{" "}
                  <span className="font-semibold text-black">"{query}"</span> in
                  journal.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
