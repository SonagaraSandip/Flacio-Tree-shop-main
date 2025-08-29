import React, { useState, useEffect, useRef, useMemo } from "react";
import ProductPageCard from "../data/ProductPageCard";
import products from "../data/products";
import ProductCard from "../data/ProductCard";
import Footer from "../pages/Footer";
import ScrollToTop from "../pages/ScrollToTop";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { User, CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";

const Product = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [titleCharCount, setTitleCharCount] = useState(100);
  const [reviewTitle, setReviewTitle] = useState("");
  const [commentCharCount, setCommentCharCount] = useState(5000);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState([
    {
      name: "d.",
      date: "08/27/2025",
      rating: 3,
      title: "hello",
      comment: "how are you you okkk",
    },
  ]); // this for default review in product
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("most-recent");
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  //featuredProducts
  const relatedProducts = useMemo(
    () =>
      products.filter((products) => [1, 5, 8, 6, 3, 10].includes(products.id)),
    []
  );

  //get visiable products for the carousal
  const getVisibleProducts = () => {
    const products = [];
    const count = Math.min(4, relatedProducts.length); //show 4 product or less

    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % relatedProducts.length;
      products.push(relatedProducts[index]);
    }
    return products;
  };

  const visibleProducts = getVisibleProducts();

  // get random 4 id for recently view products
  const randomIds = new Set();
  //generate random interger form 1 t 10
  while (randomIds.size < 4) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    randomIds.add(randomNumber);
  }

  //convert set to arry format
  const randomIdsArray = Array.from(randomIds);

  //random 4 products ids
  const randomProducts = randomIdsArray.map((id) =>
    products.find((product) => product.id === id)
  );

  //update title char count
  useEffect(() => {
    setTitleCharCount(100 - reviewTitle.length);
  }, [reviewTitle]);

  const handleTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  //update comment char count
  useEffect(() => {
    setCommentCharCount(5000 - comment.length);
  }, [comment]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  //handle image upload
  const handleImageupload = (e) => {
    const files = Array.from(e.target.files);

    //limit to uplaod max 5 image
    if (images.length + files.length > 5) {
      alert("you can only upload up to 5 images");
      return;
    }

    const newImage = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImage]);
  };

  //handle remove image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  //handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  //add sorting function
  const sortReviews = (review, filterType) => {
    switch (filterType) {
      case "highest-rating":
        return [...review].sort((a, b) => b.rating - a.rating);
      case "lowest-rating":
        return [...review].sort((a, b) => a.rating - b.rating);
      case "most-helpful":
        return [...review].sort((a, b) => b.helpful - a.helpful);
      case "piture-first":
        return [...review].sort((a, b) => b.images.length - a.images.length);
      case "picture-only":
        return [...review].filter((r) => r.images.length > 0);
      case "most-recent":
      default:
        return review.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  //get sorted review
  const sortedReviews = sortReviews(review, filter);

  //useEffect when i have saved review them get that review in display
  useEffect(() => {
    const savedReview = localStorage.getItem("reviews");
    if (savedReview) {
      setReview(JSON.parse(savedReview));
    }
  }, []);

  //handle submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating before submitting the review");
      return;
    }
    const newReview = {
      name: name,
      date: new Date().toDateString(),
      rating: rating,
      title: reviewTitle,
      comment: comment,
    };

    const updatedReview = [...review, newReview];
    setReview(updatedReview);

    //saved in localstorage
    localStorage.setItem("reviews", JSON.stringify(updatedReview));

    setSubmitted(true); //show submmited message
    setWriteReview(false); //close write review
    setName("");
    setRating(0);
    setReviewTitle("");
    setComment("");
    setImages([]);
  };

  //handle next
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === relatedProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  //handle prev button
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? relatedProducts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <ProductPageCard productpageCard={ProductPageCard} />

      <div className="flex flex-col mx-8">
        <div className="my-16 text-3xl text-gray-500 font-librebaskerville flex items-center justify-center gap-8">
          <button
            value={"description"}
            onClick={() => setActiveTab("description")}
            className={`${
              activeTab === "description"
                ? "text-black pb-2 border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            value={"review"}
            onClick={() => setActiveTab("review")}
            className={`${
              activeTab === "review"
                ? "text-black pb-2 border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Review
          </button>
          <button
            value={"shipping"}
            onClick={() => setActiveTab("shipping")}
            className={`${
              activeTab === "shipping"
                ? "text-black pb-2 border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Shipping
          </button>
          <button
            value={"returns"}
            onClick={() => setActiveTab("returns")}
            className={`${
              activeTab === "returns"
                ? "text-black pb-2 border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Returns
          </button>
        </div>

        {activeTab === "description" && (
          <div className="flex flex-col mx-4 md:mx-8 lg:mx-12 mb-12 sm:mb-16 md:mb-20 lg:mb-28 text-md text-gray-500 font-normal font-poppins gap-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Don’t ever play yourself. The weather is amazing, walk with me
              through the pathway of more success. Take this journey with me,
              Lion! The other day the grass was brown, now it’s green because I
              ain’t give up. Never surrender
            </p>
            <ul className="list-disc pl-10 ">
              <li className="my-1">Claritas est etiam processus dynamicus.</li>
              <li className="my-1">
                Qui sequitur mutationem consuetudium lectorum.{" "}
              </li>
              <li className="my-1">
                Mirum est notare quam littera gothica, quam nunc.
              </li>
              <li className="my-1">
                Investigationes demonstraverunt lectores.
              </li>
              <li className="my-1">Quis autem vel eum iure reprehenderir.</li>
              <li className="my-1">Neque porro quisquam est, qui dolorem.</li>
            </ul>
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release.
            </p>
          </div>
        )}

        {activeTab === "review" && (
          <div className="relative mx-4 md:mx-8 lg:mx-12 sm:mb-16 md:mb-20 lg:mb-28">
            <div className="flex gap-6 items-center justify-center ">
              <div className="flex flex-col items-center justify-center font-poppins py-8">
                <div className="flex gap-1">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarOutline />
                  <IoStarOutline />
                  <span className="text-sm text-gray-500">3.00 out of 5</span>
                </div>
                <p className="flex gap-1 text-sm text-gray-500">
                  Based on 1 review
                </p>
              </div>
              <div className="h-24 w-px bg-gray-300 mx-8 sm:mx-12 md:mx-20 lg:mx-28" />
              <div className="flex flex-col ">
                <h2 className="text-gray-900 font-poppins text-xl flex items-center justify-center">
                  Customer Reviews
                </h2>
                <div className="flex flex-col gap-1 my-2">
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1">
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                    </div>
                    <div className="h-3 bg-gray-400 w-32" />
                    <p className="justify-center text-gray-600">0</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1">
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                    </div>
                    <div className="h-3 bg-gray-400 w-32" />
                    <p className="justify-center text-gray-600">0</p>
                  </div>
                  <div className="flex gap-4 items-center cursor-pointer hover:text-gray-700">
                    <div className="flex gap-1">
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                    </div>
                    <div className="h-3 bg-gray-600 hover:bg-gray-500 w-32" />
                    <p className="justify-center text-gray-600 ">1</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1">
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                    </div>
                    <div className="h-3 bg-gray-400 w-32" />
                    <p className="justify-center text-gray-600">0</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1">
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                    </div>
                    <div className="h-3 bg-gray-400 w-32" />
                    <p className="justify-center text-gray-600">0</p>
                  </div>
                </div>
              </div>
              <div className="h-24 w-px bg-gray-300 mx-8 sm:mx-12 md:mx-20 lg:mx-28" />
              {!submitted ? (
                <button
                  onClick={() => setWriteReview(!writeReview)}
                  className="font-poppins bg-black hover:bg-zinc-900 text-white px-12 py-2 "
                >
                  {writeReview ? "Cancel Review" : "Write a Review"}
                </button>
              ) : (
                <button
                  onClick={() => window.location.reload()}
                  className="font-poppins bg-black hover:bg-zinc-900 text-white px-12 py-2 "
                >
                  Refresh Page
                </button>
              )}
            </div>

            {/* if user click on write review */}
            {writeReview && !submitted && (
              <form
                onSubmit={handleSubmitReview}
                className="flex flex-col items-center justify-center gap-4 my-6 mb-12 border-t border-gray-300 text-sm text-gray-500 font-poppins max-w-6xl mx-auto"
              >
                <h1 className="text-2xl text-gray-600 font-bold font-poppins mt-4">
                  Write a review
                </h1>
                <p className="text-sm text-gray-500">Rating</p>
                {/* rating star */}
                <div id="rating" required className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className="cursor-pointer"
                    >
                      {star <= rating ? (
                        <IoStar size={24} className="text-yellow-500" />
                      ) : (
                        <IoStarOutline size={24} className="text-gray-500 " />
                      )}
                    </span>
                  ))}
                </div>
                <label className="mt-4">
                  Review Title (
                  <span id="titleCharCount">{titleCharCount}</span>)
                </label>
                <input
                  type="text"
                  id="title"
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Give your review a title"
                  maxLength={100}
                  value={reviewTitle}
                  onChange={handleTitleChange}
                />

                <label className="mt-4">
                  Review (<span>{commentCharCount}</span>)
                </label>
                <textarea
                  type="text"
                  id="review"
                  rows={4}
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Write your comments here.."
                  maxLength={5000}
                  value={comment}
                  onChange={handleCommentChange}
                  required
                />
                {/* image upload */}
                <label className="mt-4">Picture/Video (optional)</label>
                <div className="flex gap-3 ">
                  {images.length < 5 && (
                    <label className="w-32 h-32 group border border-gray-300 hover:border-zinc-300 flex items-center justify-center cursor-pointer">
                      <FaCloudUploadAlt
                        size={60}
                        className="text-gray-500 group-hover:scale-110 group-hover:text-blue-500 transition-transform duration-500"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageupload}
                      />
                    </label>
                  )}
                  {/* preview images */}
                  {images.map((image, index) => (
                    <div key={index} className="relative w-32 h-32">
                      <img
                        src={image.preview}
                        alt="preview"
                        className="w-full h-full object-cover border border-gray-300"
                      />
                      <button>
                        <MdDeleteForever
                          size={16}
                          className="absolute top-2 right-2 cursor-pointer w-6 h-6 bg-gray-100 rounded-full text-red-600 hover:bg-black hover:text-white shadow-md transition-colors duration-300"
                          onClick={() => handleRemoveImage(index)}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  Name (displayed publicly like{" "}
                  <span className="text-black">
                    <select>
                      <option value="most-recent">John Smith</option>
                      <option value="last_initial">John S.</option>
                      <option value="only_name">John</option>
                      <option value="all_initial">J. S.</option>
                      <option value="annonymous">Anonymous</option>
                    </select>
                  </span>
                  )
                </p>
                {/* name */}
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Enter your name ( publicly displayed )"
                  required
                />
                <label className="mt-4">Email</label>
                <input
                  type="email"
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Enter your email ( will not be published )"
                  required
                />
                <p className="mt-4 w-1/2 text-center text-md">
                  How we use your data: We’ll only contact you about the review
                  you left, and only if necessary. By submitting your review,
                  you agree to Judge.me’s{" "}
                  <span className="text-black cursor-pointer">terms</span>,{" "}
                  <span className="text-black cursor-pointer">privacy</span> and{" "}
                  <span className="text-black cursor-pointer">content </span>
                  policies.
                </p>
                <div className="flex gap-4 text-base">
                  <button
                    onClick={() => setWriteReview(false)}
                    className="font-poppins bg-white hover:bg-gradient-to-br from-white to-red-200 border border-black text-black px-12 py-2 "
                  >
                    cancel Review
                  </button>
                  <button
                    type="submit"
                    className="font-poppins bg-black hover:bg-zinc-900 text-white px-12 py-2 "
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {/* if summit show this message */}
            {submitted && (
              <div className="flex flex-col items-center justify-center gap-4 my-6 mb-12 text-gray-500 font-poppins ">
                <CheckCheck
                  size={36}
                  className="rounded-full text-green-600 "
                />
                <h1 className="text-2xl text-green-600 font-semibold">
                  Review submitted successfully!
                </h1>
                <p>Thank you! for your review.</p>
              </div>
            )}

            {/* filter selector */}
            <div className="border-y border-gray-400">
              <select
                onChange={handleFilterChange}
                value={filter}
                className="my-4"
              >
                <option value="most-recent">Most Recent</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-rating">Lowest Rating</option>
                <option value="only-pictures">Only Pictures</option>
                <option value="pictures-first">Pictures First</option>
                <option value="most-helpful">Most Helpful</option>
              </select>
            </div>

            {/* show all comment here */}
            {sortedReviews.map((rev, index) => (
              <div key={index} className="my-4">
                <div className="flex justify-between my-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= rev.rating ? (
                        <IoStar size={16} className="text-yellow-400" />
                      ) : (
                        <IoStarOutline size={16} className="text-gray-400" />
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{rev.date}</div>
                </div>

                <div className="flex flex-col gap-3 my-2 font-poppins text-gray-500">
                  <div className="flex gap-2">
                    <User className="h-8 w-8 bg-gray-200 text-black" />
                    <p className="text-md ">Name: {rev.name}</p>
                  </div>
                  <p className="text-gray-900">Title : {rev.title}</p>
                  <p className="text-md">Comment: {rev.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="flex flex-col mx-4 md:mx-8 lg:mx-12 sm:mb-16 md:mb-20 lg:mb-28 text-md text-gray-500 font-normal font-poppins gap-6 lg:gap-12">
            <p>
              For orders placed before 7am AEDT, we endeavour to process the
              same business day. Orders placed after 11am AEDT will be processed
              the next business day.
            </p>
            <p>
              During sale events and new collection launches, there may be a
              slighly longer processing time.
            </p>
            <p>
              All Auguste orders are hand-picked and packed with love from Byron
              Bay, Australie.
            </p>
          </div>
        )}
        {activeTab === "returns" && (
          <div className="flex flex-col mx-4 md:mx-8 lg:mx-12 sm:mb-16 md:mb-20 lg:mb-28 text-md text-gray-500 font-normal font-poppins gap-6">
            <p>
              You can choose between a refund or a credit note on full priced
              items.
            </p>
            <ul className="list-disc pl-10 ">
              <li className="my-1">
                Item(s) must be returned in their original condition and
                packaging: unworn, unwashed and with all tags attached.
              </li>
              <li className="my-1">
                Earrings cannot be returned due to health and safety reasons.
              </li>
              <li className="my-1">
                Return shipping methods and associated costs are the
                responsibility of the customer.
              </li>
              <li className="my-1">
                Sale items can not be refunded for change of mind.
              </li>
            </ul>
          </div>
        )}

        {/*  Related products*/}
        <div className="relative mx-8 mb-[100px]">
          <h1 className="text-3xl font-librebaskerville flex items-center justify-center">
            Related Products
          </h1>
          <div className="mx-auto w-24 h-[3px] bg-black mb-4 mt-2" />

          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={carouselRef}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-12">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/*left -right button show if mouse hover */}
            {hovered && relatedProducts.length > 4 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute z-10 top-1/2 -left-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2 
                    
                  `}
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute z-10 top-1/2 -right-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-2`}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
        {/* Recently Viewed Products */}
        <div className=" mx-8 mb-[100px]">
          <h1 className="text-3xl font-librebaskerville flex items-center justify-center">
            Recently Viewed Products
          </h1>
          <div className="mx-auto w-32 h-[3px] bg-black mb-4 mt-2" />

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-12">
              {randomProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Product;
