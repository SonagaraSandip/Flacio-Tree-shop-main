import React, { useState } from "react";
import ProductPageCard from "../data/ProductPageCard";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { User } from "lucide-react";

const Product = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [writeReview, setWriteReview] = useState(false);
  return (
    <div>
      <ProductPageCard productpageCard={ProductPageCard} />

      <div className="flex flex-col">
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
              <div className="h-24 w-px bg-gray-300 mx-28" />
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
              <div className="h-24 w-px bg-gray-300 mx-28" />
              <button
                onClick={() => setWriteReview(!writeReview)}
                className="font-poppins bg-black hover:bg-zinc-900 text-white px-12 py-2 "
              >
                {writeReview ? "Cancel Review" : "Write a Review"}
              </button>
            </div>

            {/* if user click on write review */}
            {writeReview && (
              <form className="flex flex-col items-center justify-center gap-4 my-6 mb-12 border-t border-gray-300 text-sm text-gray-500 font-poppins max-w-6xl mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold font-poppins mt-4">
                  Write a review
                </h1>
                <p className="text-sm text-gray-500">Rating</p>
                <div className="flex gap-1">
                  <IoStar size={20} />
                  <IoStar size={20} />
                  <IoStar size={20} />
                  <IoStarOutline size={20} />
                  <IoStarOutline size={20} />
                </div>
                <lable className="mt-4">Review Title (100)</lable>
                <input
                  type="text"
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Give your review a title"
                  maxLength={100}
                />
                <lable className="mt-4">Review (5000)</lable>
                <textarea
                  type="text"
                  rows={4}
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Write your comments here.."
                  maxLength={5000}
                  required
                />
                <lable className="mt-4">Picture/Video (optional)</lable>
                <input
                  type="file"
                  className="border border-gray-400 px-4 py-2"
                />
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
                <input
                  type="text"
                  id="name"
                  className="border border-gray-400 px-4 py-2 w-1/2"
                  placeholder="Enter your name ( publicly displayed )"
                  required
                />
                <lable className="mt-4">Email</lable>
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
                  <button type="submit" className="font-poppins bg-black hover:bg-zinc-900 text-white px-12 py-2 ">
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            <div className="border-y border-gray-400">
              <select className="my-4">
                <option value="most-recent">Most Recent</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-rating">Lowest Rating</option>
                <option value="only-pictures">Only Pictures</option>
                <option value="pictures-first">Pictures First</option>
                <option value="most-helpful">Most Helpful</option>
              </select>
            </div>
            <div className="flex justify-between my-2">
              <div className="flex gap-1">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStarOutline />
                <IoStarOutline />
              </div>
              <p className="text-sm text-gray-500">08/27/2025</p>
            </div>
            <div className="flex flex-col gap-3 my-2 font-poppins text-gray-500">
              <div className="flex gap-2">
                <User className="h-8 w-8 bg-gray-200 text-black" />
                <p className="text-md ">d.</p>
              </div>
              <p className="text-gray-900">hello</p>
              <p className="text-md">how are you you okkk</p>
            </div>
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
      </div>
    </div>
  );
};

export default Product;
