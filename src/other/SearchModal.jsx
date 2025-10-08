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
      className="fixed inset-0 z-40 bg-zinc-900 bg-opacity-20 animate-zoom-in w-screen p-2 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 sm:top-8 lg:top-16 right-1/2 translate-x-1/2 bg-white shadow-2xl max-h-[90vh] sm:max-h-[80vh] w-full max-w-6xl mx-auto overflow-y-auto rounded-lg sm:rounded-none px-4 py-4 sm:px-6 lg:px-16 lg:py-10"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer text-zinc-800 bg-white rounded-full p-1 border border-gray-300 hover:bg-black hover:text-white transition-colors duration-300"
          onClick={() => setOpenSearch(false)}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>

        {/* Search Input */}
        <div className="w-full border border-gray-400 px-3 sm:px-4 py-2 sm:py-3 flex items-center text-gray-500 rounded-lg sm:rounded-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search products, journals..."
            style={{ outline: "none" }}
            className="w-full ml-2 sm:ml-3 text-sm sm:text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {query && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-6">
            {/* Products Section */}
            <div className="flex-1">
              <div className="text-sm sm:text-md flex justify-between items-center text-gray-500 border-b border-gray-300 pb-2 mb-4">
                <p>{filterProducts.length} product results</p>
                {filterProducts.length > 0 && (
                  <button
                    onClick={() => {
                      navigate("/collections/all");
                      setOpenSearch(false);
                    }}
                    className="font-poppins cursor-pointer hover:text-black text-xs sm:text-sm"
                  >
                    View all products
                  </button>
                )}
              </div>

              {filterProducts.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filterProducts.slice(0, 6).map((p) => (
                    <div key={p.id} className="group">
                      <button
                        onClick={() => {
                          navigate(
                            `/products/${p.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          );
                          setOpenSearch(false);
                        }}
                        className="w-full text-left"
                      >
                        <img
                          src={p.frontImage}
                          alt={p.name}
                          className="w-full h-40 sm:h-48 lg:h-60 object-cover rounded group-hover:opacity-90 transition-opacity duration-300"
                        />
                        <p className="mt-2 text-xs sm:text-sm text-black font-librebaskerville font-medium line-clamp-2">
                          {p.name}
                        </p>
                        {p.discountPrice ? (
                          <p className="font-poppins text-xs sm:text-sm">
                            <span className="line-through font-poppins text-gray-500">
                              ${p.originalPrice.toFixed(2)}
                            </span>{" "}
                            <span className="text-black font-semibold">
                              ${p.discountPrice.toFixed(2)}
                            </span>
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm font-poppins text-gray-500 font-semibold">
                            ${p.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No products found for{" "}
                    <span className="font-semibold text-black">"{query}"</span>
                  </p>
                  <button
                    onClick={() => {
                      navigate("/collections/all");
                      setOpenSearch(false);
                    }}
                    className="mt-2 text-green-700 font-poppins text-sm hover:underline"
                  >
                    Browse all products
                  </button>
                </div>
              )}
            </div>

            {/* Journal Section */}
            <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6">
              <div className="text-sm sm:text-md flex justify-between items-center text-gray-500 border-b border-gray-300 pb-2 mb-4">
                <p>Journals ({filteredJournal.length})</p>
                {filteredJournal.length > 0 && (
                  <button
                    onClick={() => {
                      navigate("/blog/news");
                      setOpenSearch(false);
                    }}
                    className="font-poppins cursor-pointer hover:text-black text-xs sm:text-sm"
                  >
                    View all journals
                  </button>
                )}
              </div>

              {filteredJournal.length > 0 ? (
                <ul className="space-y-3 font-poppins text-gray-600 text-sm sm:text-md max-h-80 overflow-y-auto">
                  {filteredJournal.slice(0, 8).map((j, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        navigate(j.link);
                        setOpenSearch(false);
                      }}
                      className="hover:text-green-700 cursor-pointer py-2 border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-start">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:bg-green-700"></div>
                        <span className="line-clamp-2 group-hover:underline">
                          {j.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No journals found for{" "}
                    <span className="font-semibold text-black">"{query}"</span>
                  </p>
                  <button
                    onClick={() => {
                      navigate("/blog/news");
                      setOpenSearch(false);
                    }}
                    className="mt-2 text-green-700 font-poppins text-sm hover:underline"
                  >
                    Browse all journals
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-8 sm:py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-poppins text-sm sm:text-base">
              Search for products or journals...
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="font-poppins text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Popular Searches
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-gray-500">
                  <li className="hover:text-green-700 cursor-pointer">
                    Succulents
                  </li>
                  <li className="hover:text-green-700 cursor-pointer">
                    Indoor Plants
                  </li>
                  <li className="hover:text-green-700 cursor-pointer">
                    Flowers
                  </li>
                  <li className="hover:text-green-700 cursor-pointer">
                    Plant Care
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
