import React, { useState } from "react";
import Layout from "./Layout";
import BlogBG from "../assets/Shop/bg-breadcrumb.webp";
import { TiArrowSortedUp } from "react-icons/ti";
import { Search, ChevronRight ,User , MessageSquare , Folder} from "lucide-react";

//fashion
import Fashion from "../assets/blog/fashion/1_1296x.webp";

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState("news");
  return (
    <Layout className="relative">
      <img
        src={BlogBG}
        alt="blog back background"
        className="absolute inset-0 object-cover -z-10 -top-32 "
      />

      <div className="flex flex-col items-center justify-end h-[300px] pb-16 text-black">
        <h1 className="text-6xl  font-librebaskerville">Blogs</h1>
        <div className="flex items-center justify-center gap-6 text-xl font-poppins text-gray-500 mt-6 transition-colors duration-500">
          <button
            onClick={() => setSelectedTab("fashion")}
            className={`  ${
              selectedTab === "fashion"
                ? "border-b-2 border-gray-900 text-black"
                : ""
            }`}
          >
            Fashion
          </button>
          <button
            onClick={() => setSelectedTab("life-style")}
            className={`  ${
              selectedTab === "life-style"
                ? "border-b-2 border-gray-900 text-black"
                : ""
            }`}
          >
            Life Style
          </button>
          <button
            onClick={() => setSelectedTab("news")}
            className={`  ${
              selectedTab === "news"
                ? "border-b-2 border-gray-900 text-black"
                : ""
            }`}
          >
            News
          </button>
          <button
            onClick={() => setSelectedTab("shorts")}
            className={`  ${
              selectedTab === "shorts"
                ? "border-b-2 border-gray-900 text-black"
                : ""
            }`}
          >
            Shorts
          </button>
        </div>
      </div>

      <div className="w-full h-full bg-white p-4 md:p-6 lg:p-12 ">
        <div className="flex gap-12">
          {/* Left side content */}
          <div className="w-full flex flex-col gap-4 lg:w-[25%]">
            <div className="flex items-center w-full border border-gray-300 px-4 py-2">
              <input
                type="text"
                placeholder="Search Blog..."
                className="w-full font-poppins text-gray-500"
                style={{ outline: "none" }}
              />
              <Search className=" justify-self-end text-gray-400 cursor-pointer hover:text-gray-700" />
            </div>
            <h1 className="font-librebaskerville text-lg mt-4 mb-2">
              Categories
            </h1>
            <div
              onClick={() => setSelectedTab("fashion")}
              className={`flex  items-center font-poppins text-sm ${
                selectedTab === "fashion" ? "text-black" : "text-gray-500"
              }`}
            >
              <ChevronRight size={16} />
              <p className="cursor-pointer hover:text-gray-800">Fashion</p>
            </div>
            <div
              onClick={() => setSelectedTab("life-style")}
              className={`flex  items-center font-poppins text-sm ${
                selectedTab === "life-style" ? "text-black" : "text-gray-500"
              }`}
            >
              <ChevronRight size={16} />
              <p className="cursor-pointer hover:text-gray-800">Life Style</p>
            </div>
            <div
              onClick={() => setSelectedTab("news")}
              className={`flex  items-center font-poppins text-sm ${
                selectedTab === "news" ? "text-black" : "text-gray-500"
              }`}
            >
              <ChevronRight size={16} />
              <p className="cursor-pointer hover:text-gray-800">News</p>
            </div>
            <div
              onClick={() => setSelectedTab("shorts")}
              className={`flex  items-center font-poppins text-sm ${
                selectedTab === "shorts" ? "text-black" : "text-gray-500"
              }`}
            >
              <ChevronRight size={16} />
              <p className="cursor-pointer hover:text-gray-800">Shorts</p>
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-[75%]">
            <div className="relative">
              <p className="absolute group top-5 -left-3 text-sm font-poppins text-white px-4 py-2 bg-zinc-800">
                September 05, 2025
              </p>
              <TiArrowSortedUp
                size={24}
                fill="bg-zinc-800"
                className="absolute group top-12 -left-4 rotate-45"
              />
              <img src={Fashion} alt="fashion" />
            </div>
            <div className="flex items-end self-start text-gray-500 mt-4 gap-2 font-poppins text-xs">
              <div className="flex items-end gap-1">
                <User />
                <p>By: Tung Hoang</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
