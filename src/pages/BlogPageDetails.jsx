import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BlogData from "../data/Blog_Data";

const BlogPageDetails = () => {
  const { tab, id } = useParams();
  const navigate = useNavigate();

  //Find the blof post based on tab and id
  const findBlogPost = () => {
    //convert URL parameter back to readable format
    const title = id.replace(/-/g, " ").toLowerCase();

    // get data of current tab
    const tabData = BlogData[tab];
    if (!tabData) return null;

    // handle both and single objects
    if (Array.isArray(tabData)) {
      return tabData.find((post) =>
        post.title.toLowerCase().includes(title.toLowerCase())
      );
    } else {
      return tabData.title.toLowerCase().includes(title.toLowerCase())
        ? tabData
        : null;
    }
  };

  const BlogPost = findBlogPost();

  if (!BlogPost) {
    return (
      <div className="text-6xl flex flex-col items-center justify-center text-black h-screen">
        Blog post not found
        <h1
          onClick={() => navigate(`/blog/${tab}`)}
          className="text-2xl my-4 font-librebaskerville bg-green-900 px-4 py-2 text-white "
        >
          Back to blog
        </h1>
      </div>
    );
  }

  return (
    <div className=" mx-12 mt-[100px]  ">
      <div className="flex gap-2 font-poppins text-sm text-gray-500">
        <Link to={`/`} className="border-b border-gray-500 hover:text-black">
          Home
        </Link>{" "}
        /
        <Link
          to={`/blog/${tab}`}
          className="border-b border-gray-500 hover:text-black"
        >
          {tab
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Link>{" "}
        / {BlogPost.title}
      </div>

      <div className="flex flex-col gap-6 my-2 text-center">
        <img
          src={BlogPost.image}
          className="h-full w-full my-4"
          alt={BlogPost.title}
        />
        <button onClick={() => navigate(`/blog/${tab}`)} className="bg-white border text-sm font-poppins border-gray-700 px-6 py-1 hover:bg-green-950 hover:text-white text-black self-center transition-colors duration-300">
          {BlogPost.category}
        </button>
        <h1 className="text-5xl font-librebaskerville">{BlogPost.title}</h1>
        <p className="text-sm font-poppins text-gray-500">
          By <span className="text-black">{BlogPost.author}</span> on {BlogPost.date}
        </p>
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-6 dark:bg-gray-500" />
      </div>

      <div>a</div>
    </div>
  );
};

export default BlogPageDetails;
