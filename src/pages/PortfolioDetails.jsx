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
      <div className="items-center justify-center h-screen">Item not found</div>
    );

  // Generate slug function for navigation
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const SvgData = [
    {
      img: Svg1,
    },
    {
      img: Svg2,
    },
    {
      img: Svg3,
    },
    {
      img: Svg4,
    },
  ];

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
    <div className="pt-[110px] ">
      <div className="flex flex-col gap-4 mx-12">
        {/* url link */}
        <div className="flex items-center gap-2">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm underline font-poppins text-gray-700 hover:text-black "
          >
            Home
          </p>{" "}
          /{" "}
          <p
            onClick={() => navigate("/blog/portfolio")}
            className="cursor-pointer text-sm underline font-poppins text-gray-700 hover:text-black "
          >
            Portfolio
          </p>{" "}
          / <p className="font-poppins text-sm">{portfolioItem.title}</p>
        </div>
        {/* image */}
        <img src={portfolioItem.img} alt={portfolioItem.title} />
        {/* title & client */}
        <div className="max-w-5xl mx-auto my-12 w-full ">
          <div className="flex ">
            <div className="flex flex-col gap-4">
              <p className="flex gap-2 text-sm text-gray-500 font-poppins ">
                {" "}
                {portfolioItem.tags.map((tag) => (
                  <p className="border border-gray-300 px-4 py-1 hover:bg-gray-300">
                    {tag}
                  </p>
                ))}
              </p>
              <h1 className="text-4xl font-librebaskerville">
                {portfolioItem.title}
              </h1>
            </div>
            <div className="flex flex-col ml-60 gap-6">
              <p className="flex font-poppins text-sm ">
                Client : <span className="text-gray-500">Tung Hoang</span>
              </p>
              <p className="flex font-poppins text-sm ">
                Year : <span className="text-gray-500">2025</span>
              </p>
            </div>
          </div>
          {/* text - content */}
          <div className="flex flex-col mt-16 gap-4 text-md text-gray-500 font-poppins">
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
          <div className="flex gap-4 justify-between w-full">
            {SvgData.map((item, index) => (
              <div key={index} className="flex flex-col relative gap-1">
                <p className="absolute top-8 left-2 text-white bg-red-600 self-start px-1 text-sm">
                  20% off
                </p>
                <img src={item.img} className="w-full h-full" />
                <p className="font-librebaskerville text-md">
                  Example Product Title
                </p>
                <p className="font-librebaskervilleItalic  text-md ">
                  <span className="line-through text-gray-500 mr-2">
                    $19.99
                  </span>
                  $29.99
                </p>
              </div>
            ))}
          </div>
          {/*tag and icon */}
          <div className="flex justify-between items-center mt-12">
            <div className="flex gap-2 ">
              {portfolioItem.tags.map((tag) => (
                <button className="border border-gray-300 font-poppins text-sm px-4 py-1 hover:bg-green-950 hover:text-white transition-colors duration-300">
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-6 ">
              <button>
                <FaFacebookF size={20} />
              </button>
              <button>
                <FaXTwitter size={20} />
              </button>

              <button>
                <FaTiktok size={20} />
              </button>
            </div>
          </div>

          {/*if news then show previos and next post*/}

          <div className="relative mt-12 flex justify-between border-y border-gray-400 transition-colors duration-300 py-4">
            {PrevItem ? (
              <div className="flex flex-col group text-gray-500 hover:text-black gap-2">
                <p className="font-poppins uppercase text-sm">Prev</p>
                <Link
                  to={`/blog/portfolio/${generateSlug(PrevItem.title)}`}
                  className=" group text-sm font-librebaskerville"
                >
                  {PrevItem.title}
                </Link>
              </div>
            ) : (
              <span />
            )}

            <button
              onClick={() => navigate(`/blog/portfolio`)}
              className="cursor-pointer group/download relative flex  items-center bg-white p-2 rounded-full hover:bg-opacity-70 font-semibold border border-black transition-all duration-300"
            >
              <Ellipsis size={32} />
              <div className="absolute text-xs uppercase font-poppins scale-0 rounded-md py-2 px-12 text-white bg-gray-600 lg:-left-10 mb-3 bottom-full group-hover/download:scale-90 origin-bottom transition-all duration-300 shadow-lg before:content-[''] before:absolute before:top-full before:left-2/4 before:w-3 before:h-3 before:border-solid before:bg-gray-600 before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4">
                Back to Portfolio
              </div>
            </button>

            {NextItem ? (
              <div className="flex flex-col group text-gray-500 hover:text-black gap-2">
                <p className="font-poppins uppercase text-sm self-end">NEXT</p>
                <Link
                  to={`/blog/portfolio/${generateSlug(NextItem.title)}`}
                  className=" group text-sm font-librebaskerville"
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
              <h2 className="text-3xl font-librebaskerville self-center text-black ">
                Comments{" "}
                <span className="text-xl font-poppins text-zinc-600">
                  ({comments.length})
                </span>
              </h2>

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b text-sm border-gray-300 py-2 my-2"
                >
                  <div className="flex justify-between ">
                    <p className="flex items-center gap-2 ">
                      <div class="relative w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-400">
                        <svg
                          class="absolute w-4 h-4 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      {comment.name}
                    </p>
                    <p>{comment.date}</p>
                  </div>
                  <p className="my-4 lg:mr-20 tracking-wider">
                    <span className="text-black">Comment :</span>{" "}
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* comment form */}
          <div className="flex flex-col mt-12">
            <h1 className="font-librebaskerville self-center text-4xl text-black mt-4 mb-2">
              Leave a comment
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-8 gap-8 w-full"
              noValidate
            >
              <div className="flex  w-full gap-8">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="bg-gray-100 w-full px-4 py-4"
                  style={{ outline: "none" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-100 w-full px-4 py-4"
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
                className="bg-gray-100 w-full px-4 py-4"
                style={{ outline: "none" }}
              />

              <button
                type="submit"
                className="border border-gray-800 self-center px-8 py-3 text-black font-poppins text-sm hover:bg-gradient-to-r from-green-950 via-green-500 to-green-950 hover:text-white hover:animate-moveStripes-slow"
              >
                POST COMMENT
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mb-12 mx-12">
        <h1 className="text-3xl font-librebaskerville flex items-center justify-center">
          Related Portfolio
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-12">
          {Data.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <Link
                to={`/blog/portfolio/${generateSlug(item.title)}`}
                className="overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-80 object-cover hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <p className="mt-4 font-librebaskerville text-md">{item.title}</p>
              <p className="flex gap-2 font-poppins text-sm">
                {item.tags.map((tag) => (
                  <span className="text-gray-500 border border-gray-300 px-1 hover:bg-gray-200 hover:text-gray-700">
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
