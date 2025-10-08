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
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

const Blog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("news");
  const [commentCounts, setCommentCounts] = useState({});

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

  // load comment count from local Storage
  useEffect(() => {
    const counts = {};
    Object.keys(BlogData).forEach((tab) => {
      const tabData = BlogData[tab];
      if (Array.isArray(tabData)) {
        tabData.forEach((post) => {
          const savedComments = localStorage.getItem(`comment-${post.id}`);
          if (savedComments) {
            const comments = JSON.parse(savedComments);
            counts[post.id] = comments.length;
          } else {
            counts[post.id] = 0;
          }
        });
      }
    });
    setCommentCounts(counts);
  }, []);

  return (
    <Layout className="relative">
      <img
        src={BlogBG}
        alt="blog back background"
        className="absolute inset-0 object-cover -z-10 -top-32"
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end h-[200px] sm:h-[250px] lg:h-[300px] pb-8 sm:pb-12 lg:pb-16 text-black px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-librebaskerville text-center">
          Blogs
        </h1>
        <div className="flex items-center justify-center w-full overflow-x-auto gap-4 sm:gap-6 text-sm sm:text-lg lg:text-xl font-poppins text-gray-500 mt-4 sm:mt-6 transition-colors duration-500 pb-2">
          {Object.keys(BlogData).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`whitespace-nowrap flex-shrink-0 ${
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

           <div className="w-full h-full bg-white p-4 sm:p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left side content */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <div className="flex items-center w-full border border-gray-300 px-4 py-2">
              <input
                type="text"
                placeholder="Search Blog..."
                className="w-full font-poppins text-gray-500 text-sm sm:text-base"
                style={{ outline: "none" }}
              />
              <Search className="text-gray-400 cursor-pointer hover:text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <h1 className="font-librebaskerville text-lg mt-4 mb-2">
              Categories
            </h1>
            {Object.keys(BlogData).map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center font-poppins cursor-pointer text-sm ${
                  selectedTab === tab ? " text-black" : "text-gray-500"
                }`}
              >
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                <p className="truncate">
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
                      commentCounts={commentCounts[item.id] || 0}
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
                commentCounts={commentCounts[currentTabData.id] || 0}
              />
            )}

            {/* Tags */}
            <h1 className="font-librebaskerville text-lg mt-4 mb-2">Tags</h1>
            <div className="flex flex-wrap gap-3">
              {currentTabData.map((item) =>
                item.tags?.map((tag, index) => (
                  <button
                    key={index}
                   className="relative overflow-hidden border border-[#18181a] text-[#18181a] inline-block text-xs sm:text-[15px] leading-[15px] px-3 sm:px-[18px] py-2 sm:py-[15px] cursor-pointer bg-white select-none group flex-shrink-0"
                  >
                    <span className="relative z-10 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]">
                      {tag}
                    </span>

                    <span className="text-white block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[225%] opacity-0 h-[14px] leading-[13px] z-[100] transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100">
                      {tag}
                    </span>

                    <span className="absolute bottom-[-50%] left-0 w-full h-full bg-green-950 transform origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] skew-y-[9.3deg] scale-y-0 group-hover:scale-y-[2]"></span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-[75%]">
            {/* render based on selected tab */}
            {isArrayData ? (
              <div className="flex flex-col gap-6 lg:gap-4">
                {currentTabData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <BlogPost
                      data={item}
                      tab={selectedTab}
                      generateSlug={generateSlug}
                      commentCounts={commentCounts[item.id] || 0}
                    />
                    {index < currentTabData.length - 1 && (
                        <span className="h-px w-full my-4 lg:my-8 bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <BlogPost
                data={currentTabData}
                tab={selectedTab}
                generateSlug={generateSlug}
                commentCounts={commentCounts[currentTabData.id] || 0}
              />
            )}
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </Layout>
  );
};

const RelatedPost = ({ data, generateSlug, tab, commentCounts }) => (
   <div className="flex gap-3 sm:gap-4">
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
      <img
        src={data.previewImage}
        alt={data.title}
            className="cursor-pointer w-20 h-16 sm:w-28 sm:h-24 object-cover"
        loading="lazy"
      />
    </Link>
    <div className="flex flex-col gap-1 flex-1">
     <p className="font-poppins text-xs cursor-pointer text-gray-500 hover:text-black">
        {data.category.toUpperCase()}
      </p>
      <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
        <h1 className="text-sm font-poppins cursor-pointer line-clamp-1">{data.title}</h1>
      </Link>
     <p className="font-poppins cursor-pointer text-xs sm:text-sm text-gray-500 hover:text-black">
        {commentCounts} {commentCounts === 1 ? "comment" : "comments"}
      </p>
    </div>
  </div>
);

const BlogPost = ({ data, generateSlug, tab, commentCounts }) => (
  <div>
    <div className="relative">
      <p className="absolute top-3 sm:top-5 -left-2 sm:-left-3 text-xs sm:text-sm font-poppins text-white px-2 sm:px-4 py-1 sm:py-2 bg-zinc-800 z-10">
        {data.date}
      </p>
      <TiArrowSortedUp
        size={20}
        className="absolute top-8 sm:top-12 -left-3 sm:-left-4 rotate-45 text-zinc-800 z-10"
      />
      <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
        <img
          src={data.image}
          alt={data.title}
          className="cursor-pointer h-auto w-full"
          loading="lazy"
        />
      </Link>
    </div>
    
    <div className="flex flex-col sm:flex-row sm:items-center self-start mt-4 gap-2 font-poppins text-xs sm:text-sm">
      <div className="flex items-center gap-1">
        <User size={16} className="sm:w-5 sm:h-5" />
        <p className="text-gray-500">By: Tung Hoang</p>
      </div>
      <span className="hidden sm:inline"> / </span>
      <div className="flex items-center gap-1">
        <MessageSquare size={14} className="sm:w-4 sm:h-4" />
        <button className="text-gray-500 hover:text-black">
          {commentCounts} {commentCounts === 1 ? "comment" : "comments"}
        </button>
      </div>
      <span className="hidden sm:inline"> / </span>
      <div className="flex items-center gap-1">
        <Folder size={14} className="sm:w-4 sm:h-4" />
        <button className="text-gray-500 hover:text-black">
          {data.category}
        </button>
      </div>
    </div>
    
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
      <h1 className="font-librebaskerville text-xl sm:text-2xl lg:text-3xl mt-4 sm:mt-6 mb-3 sm:mb-4">
        {data.title}
      </h1>
    </Link>
    
    <p className="text-gray-500 text-xs sm:text-sm font-poppins leading-relaxed">
      {data.excerpt}
    </p>
    
    <Link to={`/blog/${tab}/${generateSlug(data.title)}`}>
      <button className="bg-green-950 px-4 py-2 mt-4 sm:mt-6 text-xs sm:text-sm font-poppins text-white hover:bg-zinc-900 transition-colors duration-300">
        READ MORE
      </button>
    </Link>
  </div>
);

export default Blog;
