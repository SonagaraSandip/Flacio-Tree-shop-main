import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import BlogData from "../data/Blog_Data";
import BlogBG from "../assets/Shop/bg-breadcrumb.webp";
import { TiArrowSortedUp } from "react-icons/ti";
import {
  Search,
  ChevronRight,
  User,
  MessageSquare,
  Folder,
} from "lucide-react";

const Blog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("news");

  useEffect(() => {
    if (blogId && BlogData[blogId]) {
      setSelectedTab(blogId);
    } else {
      //if invalid blogID set news as a default
      setSelectedTab("news");
      navigate("/blog/news", { replace: true });
    }
  }, [blogId, navigate]);

  //function to update tab change and update a URL
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/blog/${tab}`);
  };

  // function to genarte user friendly slug from title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\?/g, "").replace(/\s+/g, "-");
  };

  // get current tab data
  const currentTabData = BlogData[selectedTab] || [];

  // check if current tab data is a array
  const isArrayData = Array.isArray(currentTabData);

  return (
    <Layout className="relative">
      <img
        src={BlogBG}
        alt="blog back background"
        className="absolute inset-0 object-cover -z-10 -top-32"
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end h-[300px] pb-16 text-black">
        <h1 className="text-6xl font-librebaskerville">Blogs</h1>
        <div className="flex items-center justify-center gap-6 text-xl font-poppins text-gray-500 mt-6 transition-colors duration-500">
          {Object.keys(BlogData).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`${
                selectedTab === tab
                  ? "border-b-2 border-gray-900 text-black"
                  : ""
              }`}
            >
              {tab
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
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
            {Object.keys(BlogData).map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={` flex items-center font-poppins cursor-pointer text-sm  ${
                  selectedTab === tab ? " text-black" : "text-gray-500"
                }`}
              >
                <ChevronRight size={16} className="text-gray-400" />
                <p>
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              </div>
            ))}

            <h1 className="font-librebaskerville text-lg mt-4 mb-2">
              Related Posts
            </h1>
            {/* Related Posts */}
            {isArrayData ? (
              <div className="flex flex-col gap-4">
                {currentTabData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {" "}
                    {/* fragment is like same <> </> */}
                    <RelatedPost
                      data={item}
                      generateSlug={generateSlug}
                      tab={selectedTab}
                    />
                    {index < currentTabData.length - 1 && (
                      <span className="h-px w-full my-2 bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <RelatedPost
                data={currentTabData}
                generateSlug={generateSlug}
                tab={selectedTab}
              />
            )}

            <h1 className="font-librebaskerville text-lg mt-4 mb-2">Tags</h1>
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {currentTabData.map((item) => (
                item.tags?.map((tag, index) => (
                  <span key={`${item.id}-${index}`} className={`px-6 py-3 border border-gray-400 text-gray-500 font-poppins text-xs cursor-pointer hover:text-white hover:bg-gradient-to-r  from-green-500  via-green-950 to-green-500 transition-all duration-800  hover:rounded`} >
                    {tag}
                  </span>
                ))
              ))}
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-[75%]">
            {/* render based on selected tab */}
            {isArrayData ? (
              <div className="flex flex-col gap-4">
                {currentTabData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <BlogPost data={item} tab={selectedTab} generateSlug={generateSlug} />
                    {index < currentTabData.length - 1 && (
                      <span className="h-px w-full my-8 bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <BlogPost data={currentTabData} tab={selectedTab} generateSlug={generateSlug} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const RelatedPost = ({ data, generateSlug, tab }) => (
  <div className="flex gap-4 ">
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
      <img
        src={data.previewImage}
        alt={data.title}
        className="cursor-pointer w-28 h-24"
        loading="lazy"
      />
    </Link>
    <div className="flex flex-col gap-1">
      <p className="font-poppins text-xs cursor-pointer text-gray-500 hover:text-black">
        {data.category.toUpperCase()}
      </p>
      <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
      <h1 className="text-sm font-poppins cursor-pointer">{data.title}</h1>
      </Link>
      <p className="font-poppins cursor-pointer text-sm text-gray-500 hover:text-black">
        0 comments
      </p>
    </div>
  </div>
);

const BlogPost = ({ data, generateSlug , tab }) => (
  <div>
    {/* Date */}
    <div className="relative">
      <p className="absolute group top-5 -left-3 text-sm font-poppins text-white px-4 py-2 bg-zinc-800">
        {data.date}
      </p>
      <TiArrowSortedUp
        size={24}
        fill="bg-zinc-800"
        className="absolute group top-12 -left-4 rotate-45"
      />
      <Link to={`/blog/${tab}/${generateSlug(data.title)}`} >
      <img
        src={data.image}
        alt={data.title}
        className="cursor-pointer h-full w-full"
        loading="lazy"
        />
        </Link>
    </div>
    {/* user || comments || fashion */}
    <div className="flex self-start  mt-4 gap-2 font-poppins text-sm">
      <div className="flex items-center gap-1">
        <User size={20} />
        <p className="text-gray-500">By: Tung Hoang</p>
      </div>
      <span> / </span>
      <div className="flex items-center gap-1">
        <MessageSquare size={16} />
        <button className="text-gray-500 hover:text-black">0 comments</button>
      </div>
      <span> / </span>
      <div className="flex items-center gap-1">
        <Folder size={16} />
        <button className="text-gray-500 hover:text-black">
          {data.category}
        </button>
      </div>
    </div>
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
    <h1 className="font-librebaskerville text-3xl mt-6 mb-4">{data.title}</h1>
    </Link>
    <p className="text-gray-500 text-sm font-poppins">{data.excerpt}</p>
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
    <button className="bg-green-950 px-4 py-2 mt-6 text-sm font-poppins text-white hover:bg-zinc-900">
      READ MORE
    </button>
    </Link>
  </div>
);

export default Blog;
