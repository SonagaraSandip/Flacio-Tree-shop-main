import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../data/ProductCard";
// import { useAuth } from "../contexts/AuthContext";
import {
  CircleCheckBig,
  X,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AddToCartModal = ({ product, selectedVariant, quantity, onClose }) => {
  const navigate = useNavigate();
  const [quantityModal, setQuantityModal] = useState(quantity);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  ``;
  const carouselRef = useRef(null);

  const displayImage = selectedVariant || product.variants[0];

  // const { cart, updateQuantity } = useAuth();

  //handle terms acceptance
  const handleTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= products.length ? 0 : prevIndex + 1
    );
  };

  //handle prev button
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(products.length - 1, 0) : prevIndex - 1
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white w-full h-3/4 overflow-y-auto max-w-4xl mx-auto flex flex-col px-8 animate-zoom-in shadow-xl"
      >
        <button
          className="absolute top-4 right-4 cursor-pointer bg-white border border-gray-800 hover:bg-black hover:text-white"
          onClick={onClose}
        >
          <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>

        {/*heading */}
        <div className="flex flex-col w-full gap-1 items-center  py-4">
          <h1 className="flex items-center justify-center gap-2 uppercase font-librebaskerville tracking-wider">
            <CircleCheckBig size={16} className="text-green-500" /> Successfully
            added to your cart.
          </h1>
          <p className="text-gray-500 font-poppins text-sm">
            There are 0 item(s) in your cart
          </p>
        </div>

        {/* image and content */}
        <div className="flex border-y px-2 border-gray-300 ">
          <div className="w-1/2 flex gap-4 items-center border-r border-gray-300 my-8">
            <img
              src={displayImage.image || product.frontImage}
              alt={product.name}
              className="h-40 justify-center object-contain"
            />
            <div className="flex flex-col gap-2  text-sm justify-center">
              <h1 className="uppercase text-sm font-librebaskerville">
                {product.name}
              </h1>
              <p className="text-gray-500 font-poppins">
                Color : {displayImage.color}
              </p>
              {/* quantity button*/}
              <div className="flex items-center self-center gap-1 border border-gray-300 my-2 px-2 py-2">
                <button
                  onClick={() => setQuantityModal((q) => Math.max(1, q - 1))}
                  className=" px-3 "
                  disabled={quantityModal === 1}
                >
                  <Minus size={20} />
                </button>
                <p>{quantityModal}</p>

                <button
                  onClick={() => setQuantityModal((q) => q + 1)}
                  className="px-3 "
                >
                  <Plus size={20} />
                </button>
              </div>
              <p className="text-gray-500 font-poppins">
                ${" "}
                {product.discountPrice
                  ? (product.discountPrice * quantityModal).toFixed(2)
                  : (product.originalPrice * quantityModal).toFixed(2)}
              </p>
            </div>
          </div>
          {/* Right side content */}
          <div className="w-1/2 flex flex-col px-4 my-8 gap-2 justify-center ">
            <p className="font-poppins text-zinc-900 py-2 border-b text-sm border-gray-300 border-dashed">
              {" "}
              Cart total : $ 50
            </p>
            {/*animation marquee  */}
            <div className=" font-poppins text-sm text-gray-500 py-4 border-b border-gray-300 border-dashed overflow-hidden">
              <p className="whitespace-nowrap animate-marquee transition-all duration-1000 ">
                All charges are billed in{" "}
                <strong className="text-black">USD</strong>. While the content
                of your cart is currently displayed in{" "}
                <strong className="text-black">USD</strong>, the checkout will
                use <strong className="text-black">USD</strong> at the most
                current exchange rate.
                <t />
              </p>
            </div>

            {/* add to cart and view cart */}
            <div className="my-6">
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="checkbox"
                  onClick={handleTermsChange}
                  className="w-4 h-4 mt-1 cursor-pointer"
                />{" "}
                <p className="text-gray-500 ">
                  I agree with the{" "}
                  <span
                    onClick={() => setIsTermOpen(true)}
                    className="text-gray-950 border-b font-poppins border-black hover:border-none cursor-pointer hover:font-baseline transition-all duration-300"
                  >
                    Terms and conditions
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full font-poppins text-sm flex items-center justify-center px-4 py-3 border border-gray-500 hover:bg-green-950 hover:text-white mt-2 transition-color duration-300"
                >
                  VIEW CART
                </button>
                <button
                  className={`w-full font-poppins uppercase text-sm flex items-center justify-center group px-4 py-3 border mt-2 transition-all duration-300 ${
                    acceptTerms
                      ? "cursor-pointer bg-green-950 text-white "
                      : "cursor-not-allowed border-gray-400 bg-zinc-700 text-white opacity-70"
                  }`}
                  style={{
                    width: "100%",
                  }}
                >
                  Buy It Now
                </button>
              </div>
            </div>
            <div className="flex flex-col h-28 gap-4 bg-gray-200 p-4 font-poppins text-sm tracking-wide">
              <p>
                Congratulations , you've got free <br /> shipping!
              </p>
              <div
                style={{ width: "50%" }}
                className="h-2 mt-2 w-full bg-gradient-to-r from-green-900 via-green-500 to-green-900 animate-moveStripes-slow"
              ></div>
            </div>
          </div>
        </div>

        {/* you may aslo like this  */}
        <div className=" my-6">
          <h1 className="text-2xl font-librebaskerville text-center">
            You may also like
          </h1>

          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={carouselRef}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-6">
              {products.slice(currentIndex, currentIndex + 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/*left -right button show if mouse hover */}
            {hovered && products.length > 4 && (
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
      </div>
      {/* open shipping pop-up */}
      {isTermOpen && (
        <div
          onClick={() => setIsTermOpen(false)}
          className="fixed inset-0 z-40 flex items-center justify-center  animate-zoom-in w-screen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col items-center justify-center  "
          >
            <button
              onClick={() => setIsTermOpen(false)}
              className=" w-full flex items-center justify-end"
            >
              <X className="text-base font-normal text-gray-500 hover:text-black" />
            </button>
            <h1 className="text-2xl text-black w-full font-librebaskerville ">
              Shipping Info
            </h1>
            <div className="flex flex-col mt-8 mb-4 gap-4 text-md font-poppins w-full ">
              <h1 className="">
                <span className="font-semibold">Return Policy :</span>
                <span className="text-gray-500">
                  {" "}
                  We will gladly accept returns for any reason within 30 days of
                  receipt of delivery.
                </span>
              </h1>
              <h1>
                <span className="font-semibold">Availability :</span>{" "}
                <span className="text-gray-500">
                  Ships anywhere in the United States.
                </span>
              </h1>
              <h1>
                <span className="font-semibold">Processing Time :</span>
                <span className="text-gray-500">
                  Allow 3-4 business days processing time for your order to
                  ship.
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartModal;
