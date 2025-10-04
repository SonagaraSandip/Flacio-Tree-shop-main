import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Data from "../data/Portfolio_Data";
import Svg1 from "../assets/portfolio/svg-image-1.svg";
import Svg2 from "../assets/portfolio/svg-image-2.svg";
import Svg3 from "../assets/portfolio/svg-image-3.svg";
import Svg4 from "../assets/portfolio/svg-image-4.svg";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { toast } from "react-toastify";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Ellipsis } from "lucide-react";

const PortfolioDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const Portfolio = () => {
    const title = id.replace(/-/g, " ").toLowerCase();

    return Data.find((item) => item.title.toLowerCase() === title);
  };
  const portfolioItem = Portfolio();

  //load comment from localstorage
  useEffect(() => {
    if (portfolioItem) {
      const savedComments = localStorage.getItem(
        `comments-${portfolioItem.id}`
      );
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    }
  }, [portfolioItem]);

  if (!portfolioItem)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Item not found
      </div>
    );

  // Generate slug function for navigation
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const SvgData = [{ img: Svg1 }, { img: Svg2 }, { img: Svg3 }, { img: Svg4 }];

  // get previous and next portfolio item
  const getAdjacentItems = () => {
    const currentIndex = Data.findIndex((item) => item.id === portfolioItem.id);
    const PrevItem = currentIndex > 0 ? Data[currentIndex - 1] : null;
    const NextItem =
      currentIndex < Data.length - 1 ? Data[currentIndex + 1] : null;
    return { PrevItem, NextItem };
  };

  const { PrevItem, NextItem } = getAdjacentItems();

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
      `comment-${portfolioItem.id}`,
      JSON.stringify(updatedComment)
    );

    setSubmitted(true);
    setEmail("");
    ``;
    setName("");
    setMessage("");

    toast.success("Thanks for your valuable feedback!");

    //reset subbimition after 3 second
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pt-20 sm:pt-24 lg:pt-[110px]">
      <div className="flex flex-col gap-4 mx-4 sm:mx-6 lg:mx-12">
        {/* url link */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer underline font-poppins text-gray-700 hover:text-black"
          >
            Home
          </p>{" "}
          /{" "}
          <p
            onClick={() => navigate("/blog/portfolio")}
            className="cursor-pointer underline font-poppins text-gray-700 hover:text-black "
          >
            Portfolio
          </p>{" "}
          / <p className="font-poppins">{portfolioItem.title}</p>
        </div>
        {/* image */}
        <img
          src={portfolioItem.img}
          alt={portfolioItem.title}
          className="w-full h-auto"
        />
        {/* title & client */}
        <div className="max-w-5xl mx-auto my-8  sm:my-12 w-full ">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-0">
            <div className="flex flex-col gap-4">
              <p className="flex flex-wrap gap-2 text-sm text-gray-500 font-poppins ">
                {" "}
                {portfolioItem.tags.map((tag) => (
                  <p className="border border-gray-300 px-3 py-1  hover:bg-gray-300 transition-colors">
                    {tag}
                  </p>
                ))}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-librebaskerville">
                {portfolioItem.title}
              </h1>
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <p className="flex font-poppins text-sm ">
                Client : <span className="text-gray-500 ml-2">Tung Hoang</span>
              </p>
              <p className="flex font-poppins text-sm ">
                Year : <span className="text-gray-500 ml-2">2025</span>
              </p>
            </div>
          </div>
          {/* text - content */}
          <div className="flex flex-col mt-8 sm:mt-16 gap-4 text-sm sm:text-md text-gray-500 font-poppins">
            <p>
              Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero,
              non adipiscing dolor urna a orci. Aenean commodo ligula eget
              dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris
              ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu
              tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.
            </p>
            <p>
              Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla
              neque dolor, sagittis eget, iaculis quis, molestie non, velit.
              Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo
              dolor, tempus non, auctor et, hendrerit quis, nisi.
            </p>
          </div>
          {/* svg image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-between w-full mt-8">
            {SvgData.map((item, index) => (
              <div key={index} className="flex flex-col relative gap-1">
                <p className="absolute top-2 sm:top-4 left-1 sm:left-2 text-white bg-red-600 self-start px-1 text-xs sm:text-sm">
                  20% off
                </p>
                <img
                  src={item.img}
                  className="w-full h-auto"
                  alt={`Product ${index + 1}`}
                />
                <p className="font-librebaskerville text-sm sm:text-md mt-2">
                  Example Product Title
                </p>
                <p className="font-librebaskervilleItalic text-sm sm:text-md">
                  <span className="line-through text-gray-500 mr-2">
                    $19.99
                  </span>
                  $29.99
                </p>
              </div>
            ))}
          </div>
          {/*tag and icon */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 gap-4 sm:gap-0">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {portfolioItem.tags.map((tag) => (
                <button className="border border-gray-300 font-poppins text-xs sm:text-sm px-3 sm:px-4 py-1 hover:bg-green-950 hover:text-white transition-colors duration-300">
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-4 sm:gap-6">
              <button className="hover:scale-110 transition-transform">
                <FaFacebookF size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="hover:scale-110 transition-transform">
                <FaXTwitter size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="hover:scale-110 transition-transform">
                <FaTiktok size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/*if news then show previos and next post*/}

          <div className="relative mt-8 sm:mt-12 flex justify-between items-center border-y border-gray-400 transition-colors duration-300 py-4">
            {PrevItem ? (
              <div className="flex flex-col group text-gray-500 hover:text-black gap-1 sm:gap-2 max-w-[40%]">
                <p className="font-poppins uppercase text-xs sm:text-sm">
                  Prev
                </p>
                <Link
                  to={`/blog/portfolio/${generateSlug(PrevItem.title)}`}
                  className="text-xs sm:text-sm font-librebaskerville truncate"
                >
                  {PrevItem.title}
                </Link>
              </div>
            ) : (
              <span />
            )}

            <button
              onClick={() => navigate(`/blog/portfolio`)}
              className="cursor-pointer group/download relative flex items-center bg-white p-2 rounded-full hover:bg-opacity-70 font-semibold border border-black transition-all duration-300 mx-2"
            >
              <Ellipsis size={24} className="sm:w-8 sm:h-8" />
              <div className="absolute text-xs uppercase font-poppins scale-0 rounded-md py-2 px-8 sm:px-12 text-white bg-gray-600 lg:-left-10 mb-3 bottom-full group-hover/download:scale-90 origin-bottom transition-all duration-300 shadow-lg before:content-[''] before:absolute before:top-full before:left-2/4 before:w-3 before:h-3 before:border-solid before:bg-gray-600 before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4">
                Back to Portfolio
              </div>
            </button>

            {NextItem ? (
              <div className="flex flex-col group text-gray-500 hover:text-black gap-1 sm:gap-2 max-w-[40%] items-end">
                <p className="font-poppins uppercase text-xs sm:text-sm">
                  NEXT
                </p>
                <Link
                  to={`/blog/portfolio/${generateSlug(NextItem.title)}`}
                  className="text-xs sm:text-sm font-librebaskerville truncate text-right"
                >
                  {NextItem.title}
                </Link>
              </div>
            ) : (
              <span />
            )}
          </div>

          {/* show comments here */}
          {comments.length > 0 && (
            <div className="my-6 w-full font-poppins text-gray-500">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-librebaskerville self-center text-black text-center sm:text-left ">
                Comments{" "}
                <span className="text-lg sm:text-xl font-poppins text-zinc-600">
                  ({comments.length})
                </span>
              </h2>

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b text-sm border-gray-300 py-4 my-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <p className="flex items-center gap-2">
                      <div className="relative w-6 h-6 overflow-hidden bg-gray-300 rounded-full">
                        <svg
                          className="absolute w-4 h-4 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
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
                    <p className="text-xs sm:text-sm">{comment.date}</p>
                  </div>
                  <p className="my-3 sm:my-4 lg:mr-20 tracking-wider text-sm">
                    <span className="text-black">Comment :</span>{" "}
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* comment form */}
          <div className="flex flex-col mt-8 sm:mt-12">
            <h1 className="font-librebaskerville self-center text-2xl sm:text-3xl lg:text-4xl text-black my-4 sm:mb-2">
              Leave a comment
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-6 sm:mt-8 gap-6 sm:gap-8 w-full"
              noValidate
            >
              <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-8">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="bg-gray-100 w-full px-4 py-3 sm:py-4 text-sm sm:text-base"
                  style={{ outline: "none" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-100 w-full px-4 py-3 sm:py-4 text-sm sm:text-base"
                  style={{ outline: "none" }}
                />
              </div>
              <textarea
                type="text"
                rows={8}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                required
                className="bg-gray-100 w-full px-4 py-3 sm:py-4 text-sm sm:text-base"
                style={{ outline: "none" }}
              />

              <button
                type="submit"
                className="border border-gray-800 self-center px-6 sm:px-8 py-2 sm:py-3 text-black font-poppins text-sm hover:bg-gradient-to-r from-green-950 via-green-500 to-green-950 hover:text-white hover:animate-moveStripes-slow transition-all duration-300"
              >
                POST COMMENT
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mb-8 sm:mb-12 mx-4 sm:mx-6 lg:mx-12">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-librebaskerville flex items-center justify-center text-center">
          Related Portfolio
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center mt-6 sm:mt-12">
          {Data.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <Link
                to={`/blog/portfolio/${generateSlug(item.title)}`}
                className="overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 sm:h-60 lg:h-80 w-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <p className="mt-2 sm:mt-4 font-librebaskerville text-sm sm:text-md">{item.title}</p>
              <p className="flex flex-wrap gap-1 font-poppins text-xs sm:text-sm">
                {item.tags.map((tag) => (
                  <span className="text-gray-500 border border-gray-300 px-1 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default PortfolioDetails;
