import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Search, ChevronRight, Ellipsis, Menu, X } from "lucide-react";
import Footer from "../pages/Footer";
import Layout from "../pages/Layout";
import ScrollToTop from "./ScrollToTop";
import BlogData from "../data/Blog_Data";
import { toast } from "react-toastify";

const BlogPageDetails = () => {
  const { tab, id } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Find the blog post based on tab and id
  const findBlogPost = () => {
    //convert URL parameter back to readable format
    const title = id.replace(/-/g, " ").toLowerCase();

    // get data of current tab
    const tabData = BlogData[tab];
    if (!tabData) return null;

    // handle both array and single objects
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
      <div className="text-2xl md:text-4xl lg:text-6xl flex flex-col items-center justify-center text-black h-screen px-4 text-center">
        Blog post not found
        <button
          onClick={() => navigate(`/blog/${tab}`)}
          className="text-lg md:text-xl lg:text-2xl my-4 font-librebaskerville bg-green-900 px-4 py-2 text-white hover:bg-green-800 transition-colors"
        >
          Back to blog
        </button>
      </div>
    );
  }

  const Category = [
    {
      name: "Air Purifying",
      link: "air-purifying",
    },
    {
      name: "Ceramic Pots",
      link: "ceramic-pots",
    },
    {
      name: "Herbs Seeds",
      link: "herbs-seeds",
    },
    {
      name: "Indoor Plants",
      link: "indoor-plants",
    },
    {
      name: "Low Maintenance",
      link: "low-maintainance",
    },
    {
      name: "Plant Bundle",
      link: "plant-bundle",
    },
  ];

  // function to generate user friendly slug from title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\?/g, "").replace(/\s+/g, "-");
  };

  //Get related post from same category
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (BlogPost) {
      const tabData = BlogData[tab];
      if (Array.isArray(tabData)) {
        // Filter out the current post and get other posts from the same category
        const related = tabData.filter((post) => post.id);
        setRelatedPosts(related);
      }
    }
  }, [BlogPost, tab]);

  // handle permanent comment for indoor plant
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (BlogPost && BlogPost.id === "news-2") {
      const permanentComment = {
        id: "permanent-1",
        name: "Plant Lover",
        date: "September 09, 2025",
        message:
          "I completely agree! Indoor plants have transformed my home environment and improved my mental health. They're not just decorations but living companions that purify the air and bring nature indoors.",
      };

      // check if permanent comment already exists
      const savedComments = localStorage.getItem(`comment-${BlogPost.id}`);
      if (savedComments) {
        const comments = JSON.parse(savedComments);
        const permanentCommentExists = comments.some(
          (comment) => comment.id === "permanent-1"
        );

        if (!permanentCommentExists) {
          const updatedComments = [permanentComment, ...comments];
          setComments(updatedComments);
          localStorage.setItem(
            `comment-${BlogPost.id}`,
            JSON.stringify(updatedComments)
          );
        } else {
          setComments(comments);
        }
      } else {
        setComments([permanentComment]);
        localStorage.setItem(
          `comment-${BlogPost.id}`,
          JSON.stringify([permanentComment])
        );
      }
    } else if (BlogPost) {
      const savedComments = localStorage.getItem(`comment-${BlogPost.id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    }
  }, [BlogPost]);

  //validation for email address
  const validateEmail = (email) => {
    // A simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitted) return;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter your comment");
      return;
    }

    const newComment = {
      id: Date.now(), // unique id for each comments
      name: name,
      date: new Date().toLocaleTimeString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      message: message,
    };

    const updatedComment = [...comments, newComment];
    setComments(updatedComment);
    localStorage.setItem(
      `comment-${BlogPost.id}`,
      JSON.stringify(updatedComment)
    );

    setSubmitted(true);
    setEmail("");
    setName("");
    setMessage("");

    toast.success("Thanks for your valuable feedback!");

    //reset submission after 3 second
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  // Sidebar component for mobile
  const SidebarContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full border border-gray-300 px-4 py-2">
        <input
          type="text"
          placeholder="Search Blog..."
          className="w-full font-poppins text-gray-500 bg-transparent"
          style={{ outline: "none" }}
        />
        <Search className="justify-self-end text-gray-400 cursor-pointer hover:text-gray-700" />
      </div>
      
      <h1 className="font-librebaskerville text-lg mt-4 mb-2">Categories</h1>
      {Category.map((category, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/collections/${category.link}`);
            setIsSidebarOpen(false);
          }}
          className="flex items-center font-poppins cursor-pointer text-gray-500 hover:text-black text-sm gap-1"
        >
          <ChevronRight size={16} className="text-gray-500" />
          <p>{category.name}</p>
        </div>
      ))}

      {/* Related Posts */}
      <h1 className="font-librebaskerville text-lg mt-4 mb-2">Related Posts</h1>

      {/*display related post from the same category*/}
      {relatedPosts.length > 0 ? (
        <div className="flex flex-col gap-2">
          {relatedPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <div className="flex gap-4">
                <Link 
                  to={`/blog/${tab}/${generateSlug(post.title)}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img
                    src={post.previewImage}
                    alt={post.title}
                    className="cursor-pointer w-20 h-16 md:w-28 md:h-24 object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <Link
                    to={`/blog/${tab}`}
                    className="font-poppins text-xs cursor-pointer text-gray-500 hover:text-black"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {post.category.toUpperCase()}
                  </Link>
                  <Link 
                    to={`/blog/${tab}/${generateSlug(post.title)}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <h1 className="text-sm font-poppins cursor-pointer line-clamp-2">
                      {post.title}
                    </h1>
                  </Link>
                  <p className="font-poppins cursor-pointer text-xs text-gray-500 hover:text-black">
                    {(() => {
                      const savedComments = localStorage.getItem(
                        `comment-${post.id}`
                      );
                      const commentCounts = savedComments
                        ? JSON.parse(savedComments).length
                        : 0;
                      return `${commentCounts} ${
                        commentCounts === 1 ? "comment" : "comments"
                      }`;
                    })()}
                  </p>
                </div>
              </div>
              {index < relatedPosts.length - 1 && (
                <span className="h-px w-full my-2 bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      ) : null}

      {/* Tags */}
      <h1 className="font-librebaskerville text-lg mt-4 mb-2">Tags</h1>
      <div className="flex flex-wrap gap-2">
        {BlogData[tab].map((post) =>
          post.tags?.map((tag, index) => (
            <button
              key={index}
              className="relative overflow-hidden border border-[#18181a] text-[#18181a] inline-block text-[13px] leading-[13px] px-3 py-2 cursor-pointer bg-white select-none group"
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
  );

  return (
    <Layout>
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 pt-16 md:pt-20 lg:pt-[100px]">
        {/* Breadcrumb */}
        <div className="flex gap-2 font-poppins text-xs sm:text-sm text-gray-500 flex-wrap">
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
          / <span className="truncate max-w-[150px] sm:max-w-xs">{BlogPost.title}</span>
        </div>

        {/* Blog Header */}
        <div className="flex flex-col gap-4 my-4 md:my-6 text-center">
          <img
            src={BlogPost.image}
            className="w-full h-auto my-2 md:my-4 rounded-lg"
            alt={BlogPost.title}
          />
          <button
            onClick={() => navigate(`/blog/${tab}`)}
            className="bg-white border text-sm font-poppins border-gray-700 px-4 py-1 md:px-6 md:py-1 hover:bg-green-950 hover:text-white text-black self-center transition-colors duration-300"
          >
            {BlogPost.category}
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-librebaskerville px-2">
            {BlogPost.title}
          </h1>
          <p className="text-xs sm:text-sm font-poppins text-gray-500">
            By <span className="text-black">{BlogPost.author}</span> on{" "}
            {BlogPost.date}
          </p>
          <hr className="w-32 sm:w-48 h-1 mx-auto my-2 sm:my-4 bg-gray-100 border-0 rounded-sm dark:bg-gray-500" />
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-green-950 text-white rounded-lg font-poppins text-sm"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 bg-white mb-4 md:mb-8 lg:mb-12">
          {/* Left Sidebar - Hidden on mobile when closed */}
          <div className={`w-full flex flex-col gap-4 lg:w-1/4 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <SidebarContent />
          </div>

          {/* Right side content */}
          <div className="w-full flex flex-col gap-4 md:gap-6 text-justify text-gray-500 text-sm sm:text-base font-poppins lg:w-3/4">
            <p>
              Quisque elementum nibh at dolor pellentesque, a eleifend libero
              pharetra. Mauris neque felis, volutpat nec ullamcorper eget,
              sagittis vel enim. Nam sit amet ante egestas, gravida tellus
              vitae, semper eros. Nullam mattis mi at metus egestas, in
              porttitor lectus sodales. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Voluptate laborum vero voluptatum.
            </p>
            <p>
              Lorem quasi aliquid maiores iusto suscipit perspiciatis a
              aspernatur et fuga repudiandae deleniti excepturi nesciunt animi
              reprehenderit similique sit. ipsum dolor sit amet, consectetur
              adipisicing elit. Qui at laborum nulla quae quibusdam molestias
              earum suscipit dolorum debitis hic sint asperiores maxime deserunt
              neque explicabo molestiae autem totam illum?
            </p>
            
            {/* Quote Section */}
            <div className="flex gap-3 md:gap-4 text-zinc-900 my-2 text-base md:text-lg">
              <div className="w-1 h-24 md:h-36 bg-black flex-shrink-0" />
              <div className="flex flex-col ml-4 md:ml-8 lg:ml-16">
                <p className="text-sm md:text-base">
                  Maecenas semper aliquam massa. Praesent pharetra sem vitae
                  nisi eleifend molestie. Aliquam molestie scelerisque
                  ultricies. Suspendisse potenti. Phasellus interdum risus at mi
                  ullamcorper lobortis. In et metus aliquet, suscipit leo.
                </p>
                <h1 className="font-librebaskerville text-lg md:text-xl mt-4 md:mt-8">
                  ROBERT SMITH
                </h1>
              </div>
            </div>
            
            <p>
              Donec sed tincidunt lacus. Duis vehicula aliquam vestibulum.
              Aenean at mollis mi. Cras ac urna sed nisi auctor venenatis ut id
              sapien. Vivamus commodo lacus lorem, a tristique sapien tempus
              non. Donec fringilla cursus porttitor. Morbi quis massa id mi
              pellentesque placerat. Nam scelerisque sit amet diam id blandit.
              Nullam ultrices ligula at ligula tincidunt, sit amet aliquet mi
              pellentesque. Aenean eget fermentum risus. Aenean eu ultricies
              nulla, id bibendum libero. Vestibulum dui augue, malesuada nec
              tellus vel, egestas condimentum ipsum. Vestibulum ut.
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 md:gap-4 my-4 md:my-6">
              {BlogData[tab].map((post) =>
                post.tags?.map((tag, index) => (
                  <button
                    key={index}
                    className="relative overflow-hidden border border-[#18181a] text-[#18181a] inline-block text-[13px] md:text-[15px] leading-[13px] md:leading-[15px] px-3 md:px-[18px] py-2 md:py-[15px] cursor-pointer bg-white select-none group"
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

            {/*if news then show previous and next post*/}
            {relatedPosts.length > 1 &&
              (() => {
                //find current Index
                const currentIndex = relatedPosts.findIndex(
                  (post) => post.title === BlogPost.title
                );

                const PrevPost =
                  currentIndex > 0 ? relatedPosts[currentIndex - 1] : null;
                const NextPost =
                  currentIndex < relatedPosts.length - 1
                    ? relatedPosts[currentIndex + 1]
                    : null;

                return (
                  <div className="relative flex justify-between border-y border-gray-400 transition-colors duration-300 py-4">
                    {PrevPost ? (
                      <div className="flex flex-col group text-gray-500 hover:text-black gap-1 md:gap-2 max-w-[40%]">
                        <p className="font-poppins uppercase text-xs md:text-sm">Prev</p>
                        <Link
                          to={`/blog/${tab}/${generateSlug(PrevPost.title)}`}
                          className="group text-xs md:text-sm font-librebaskerville line-clamp-2"
                        >
                          {PrevPost.title}
                        </Link>
                      </div>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={() => navigate(`/blog/${tab}`)}
                      className="cursor-pointer group/download relative flex items-center bg-white p-1 md:p-2 rounded-full hover:bg-opacity-70 font-semibold border border-black transition-all duration-300"
                    >
                      <Ellipsis size={24} className="md:w-8 md:h-8" />
                      <div className="absolute text-xs uppercase font-poppins scale-0 rounded-md py-1 md:py-2 px-4 md:px-12 text-white bg-gray-600 lg:-left-10 mb-2 md:mb-3 bottom-full group-hover/download:scale-90 origin-bottom transition-all duration-300 shadow-lg before:content-[''] before:absolute before:top-full before:left-2/4 before:w-2 before:h-2 md:before:w-3 md:before:h-3 before:border-solid before:bg-gray-600 before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4">
                        Back to News
                      </div>
                    </button>

                    {NextPost ? (
                      <div className="flex flex-col group text-gray-500 hover:text-black gap-1 md:gap-2 max-w-[40%] text-right">
                        <p className="font-poppins uppercase text-xs md:text-sm self-end">NEXT</p>
                        <Link
                          to={`/blog/${tab}/${generateSlug(NextPost.title)}`}
                          className="group text-xs md:text-sm font-librebaskerville line-clamp-2"
                        >
                          {NextPost.title}
                        </Link>
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>
                );
              })()}

            {/* show comments here */}
            {comments.length > 0 && (
              <div className="my-4 md:my-6 w-full font-poppins text-gray-500">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-librebaskerville self-center text-black text-center md:text-left">
                  Comments{" "}
                  <span className="text-base md:text-lg lg:text-xl font-poppins text-zinc-600">
                    ({comments.length})
                  </span>
                </h2>

                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b text-xs md:text-sm border-gray-300 py-2 md:py-3 my-2"
                  >
                    <div className="flex justify-between flex-col sm:flex-row gap-1 sm:gap-0">
                      <p className="flex items-center gap-2">
                        <div className="relative w-5 h-5 md:w-6 md:h-6 overflow-hidden bg-gray-300 rounded-full">
                          <svg
                            className="absolute w-3 h-3 md:w-4 md:h-4 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        {comment.name}
                      </p>
                      <p className="text-xs">{comment.date}</p>
                    </div>
                    <p className="my-2 md:my-4 lg:mr-4 xl:mr-20 tracking-wide md:tracking-wider">
                      <span className="text-black">Comment:</span>{" "}
                      {comment.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Comments Form */}
            <h1 className="font-librebaskerville self-center text-2xl md:text-3xl lg:text-4xl text-black mt-4 mb-2 text-center md:text-left">
              Leave a comment
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full"
              noValidate
            >
              <div className="flex flex-col sm:flex-row w-full gap-4 md:gap-6 lg:gap-8">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="bg-gray-100 w-full px-3 py-3 md:px-4 md:py-4 text-sm md:text-base"
                  style={{ outline: "none" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-100 w-full px-3 py-3 md:px-4 md:py-4 text-sm md:text-base"
                  style={{ outline: "none" }}
                />
              </div>
              <textarea
                type="text"
                rows={6}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                required
                className="bg-gray-100 w-full px-3 py-3 md:px-4 md:py-4 text-sm md:text-base resize-vertical"
                style={{ outline: "none" }}
              />

              <button
                type="submit"
                className="border border-gray-800 self-center px-6 py-2 md:px-8 md:py-3 text-black font-poppins text-sm hover:bg-gradient-to-r from-green-950 via-green-500 to-green-950 hover:text-white hover:animate-moveStripes-slow transition-all duration-300"
              >
                POST COMMENT
              </button>
            </form>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </Layout>
  );
};

export default BlogPageDetails;