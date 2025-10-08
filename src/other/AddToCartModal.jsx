import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../data/ProductCard";
import { toast } from "react-toastify";
// import { useAuth } from "../contexts/AuthContext";
import {
  CircleCheckBig,
  X,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AddToCartModal = ({
  product,
  selectedVariant,
  onClose,
  cart,
  total,
  updateQuantity,
}) => {
  const navigate = useNavigate();

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef(null);

  const displayImage = selectedVariant || product.variants[0];

  // const { cart, updateQuantity } = useAuth();

  const currentCartItem = useMemo(() => {
    return cart.find(
      (item) =>
        item.product.id === product.id &&
        (item.variant?.color === selectedVariant?.color ||
          (!selectedVariant && !item.variant))
    );
  }, [cart, product.id, selectedVariant]);

  const currentItemId = currentCartItem ? currentCartItem.id : null;

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

  const progressWidth = Math.min(100, (total / 100) * 100);

  const price = useMemo(() => {
    if (!currentCartItem) return product.discountPrice || product.originalPrice;

    return (
      currentCartItem.variant?.price ??
      currentCartItem.product?.discountPrice ??
      currentCartItem.product?.originalPrice ??
      product.discountPrice ??
      product.originalPrice
    );
  }, [currentCartItem, product]);

  const totalPrice = (price * currentCartItem.quantity).toFixed(2);
  console.log(currentCartItem);

  const handleBuyNow = () => {
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions to proceed.");
      return;
    }
    navigate("/checkout");
    onClose();
  };

  // memorize product slice to prevent unneccessary re-render
  const visiableProducts = useMemo(() => {
    return products.slice(currentIndex, currentIndex + 4);
  }, [currentIndex]);
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 w-screen p-2 sm:p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-white w-full h-auto sm:h-3/4 max-h-[90vh] overflow-y-auto max-w-4xl mx-auto flex flex-col px-4 sm:px-8 animate-zoom-in shadow-xl"
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer bg-white border border-gray-800 hover:bg-black hover:text-white z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 hover:rotate-90 transition-transform duration-300 hover:scale-90" />
          </button>

          {/*heading */}
          <div className="flex flex-col w-full gap-1 items-center py-3 sm:py-4">
            <h1 className="flex items-center justify-center gap-2 uppercase font-librebaskerville tracking-wider text-sm sm:text-base text-center">
              <CircleCheckBig
                size={16}
                className="text-green-500 sm:w-4 sm:h-4"
              />{" "}
              Successfully added to your cart.
            </h1>
            <p className="text-gray-500 font-poppins text-xs sm:text-sm text-center">
              There are {cart.length} item(s) in your cart
            </p>
          </div>

          {/* image and content */}
          <div className="flex flex-col sm:flex-row border-y px-2 border-gray-300 ">
            <div className="w-full sm:w-1/2 flex flex-col sm:flex-row gap-4 items-center border-b sm:border-b-0 sm:border-r border-gray-300 py-4 sm:py-8">
              <img
                src={displayImage.image || product.frontImage}
                alt={product.name}
                className="h-32 sm:h-40 justify-center object-contain"
              />
              <div className="flex flex-col gap-2  text-sm justify-center w-full sm:w-auto text-center sm:text-left">
                <h1 className="uppercase text-sm font-librebaskerville">
                  {product.name}
                </h1>
                <p className="text-gray-500 font-poppins text-xs sm:text-sm">
                  Color : {displayImage.color}
                </p>
                {/* quantity button*/}
                <div className="flex items-center justify-center sm:justify-start gap-1 border border-gray-300 my-2 px-2 py-2 w-fit mx-auto sm:mx-0">
                  <button
                    onClick={() =>
                      updateQuantity(
                        currentItemId,
                        currentCartItem.quantity - 1
                      )
                    }
                    className="px-2 sm:px-3 "
                    disabled={currentCartItem.quantity === 1}
                  >
                    <Minus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <p>{currentCartItem?.quantity}</p>

                  <button
                    onClick={() =>
                      updateQuantity(
                        currentItemId,
                        currentCartItem?.quantity + 1
                      )
                    }
                    className="px-2 sm:px-3 "
                  >
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
                <p className="text-gray-500 font-poppins text-sm">
                  ${totalPrice}
                </p>
              </div>
            </div>
            {/* Right side content */}
            <div className="w-full sm:w-1/2 flex flex-col px-2 sm:px-4 py-4 sm:py-8 gap-2 justify-center">
              <p className="font-poppins text-zinc-900 py-2 border-b text-xs sm:text-sm border-gray-300 border-dashed text-center sm:text-left">
                {" "}
                Cart total : $ {total.toFixed(2)}
              </p>
              {/*animation marquee  */}
              <div className="font-poppins text-xs sm:text-sm text-gray-500 py-3 sm:py-4 border-b border-gray-300 border-dashed overflow-hidden">
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
              <div className="my-4 sm:my-6">
                <div className="flex items-start gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={handleTermsChange}
                    className="w-4 h-4 mt-0.5 cursor-pointer flex-shrink-0"
                  />{" "}
                  <label
                    htmlFor="checkbox"
                    className="text-xs sm:text-sm text-gray-700 flex flex-wrap items-center gap-1"
                  >
                    I agree with the{" "}
                    <span
                      onClick={() => setIsTermOpen(true)}
                      className="text-gray-950 border-b font-poppins border-black hover:border-none cursor-pointer hover:font-baseline transition-all duration-300"
                    >
                      Terms and conditions
                    </span>
                  </label>
                </div>
                <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-4">
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full font-poppins text-xs sm:text-sm flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 border border-gray-500 hover:bg-green-950 hover:text-white transition-colors duration-300"
                  >
                    VIEW CART
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className={`w-full font-poppins uppercase text-xs sm:text-sm flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 border transition-all duration-300 ${
                      acceptTerms
                        ? "cursor-pointer bg-green-950 text-white "
                        : "cursor-not-allowed border border-gray-400 bg-zinc-700 text-white opacity-70"
                    }`}
                    style={{
                      width: "100%",
                    }}
                  >
                    Buy It Now
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4 bg-gray-100 p-3 sm:p-4 font-poppins text-xs sm:text-sm tracking-wide">
                <p>
                  {total <= "100"
                    ? `Spend $ ${(100 - total).toFixed(
                        2
                      )} more and get free shipping!`
                    : "Congratulations , you've got free shipping!"}
                </p>
                <div
                  style={{ width: `${progressWidth}%` }}
                  className={`h-2 w-full bg-gradient-to-r  animate-moveStripes ${
                    total < 100
                      ? " from-gray-900 via-gray-500 to-gray-900"
                      : " from-green-900 via-green-500 to-green-900 "
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* you may aslo like this  */}
          <div className="my-4 sm:my-6">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-librebaskerville text-center">
              You may also like
            </h1>

            <div
              className="relative mt-4 sm:mt-6"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              ref={carouselRef}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 justify-center transition-all duration-500">
                {visiableProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onClose}
                  />
                ))}
              </div>
              {/*left -right button show if mouse hover */}
              {hovered && products.length > 4 && (
                <>
                  <button
                    onClick={prevSlide}
                    className={`hidden sm:flex absolute z-10 top-1/2 -left-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-1 sm:p-2`}
                  >
                    <ChevronLeft
                      size={20}
                      className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                    />
                  </button>
                  <button
                    onClick={nextSlide}
                    className={`hidden sm:flex absolute z-10 top-1/2 -right-4 transform -translate-y-1/2 bg-white transition-all duration-300 hover:bg-green-800 hover:text-white rounded-full p-1 sm:p-2`}
                  >
                    <ChevronRight
                      size={20}
                      className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                    />
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
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 animate-zoom-in w-screen p-2 sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsTermOpen(false)}
                className="w-full flex items-center justify-end mb-2"
              >
                <X className="text-base font-normal text-gray-500 hover:text-black w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl text-black w-full font-librebaskerville">
                Terms & Conditions
              </h1>
              <div className="flex flex-col mt-3 sm:mt-4 mb-3 sm:mb-4 gap-3 sm:gap-4 text-sm text-gray-500 font-poppins w-full overflow-y-auto">
                <p className="text-xs sm:text-sm">
                  Yodie supplies products listed on the Yodie, and Yodie
                  websites, and in our stores under the following Terms and
                  Conditions. Please read these Terms and Conditions, and our
                  Privacy and Cookie Policies carefully before using any of our
                  websites, or ordering from us.
                </p>
                <p className="text-xs sm:text-sm">
                  The Terms and Conditions apply to your use of any Yodie
                  website and to any products you purchase from them; regardless
                  of how you access the website, including any technologies or
                  devices where our website is available to you at home, on the
                  move or in store
                </p>
                <p className="text-xs sm:text-sm">
                  We reserve the right to update these Terms and Conditions at
                  any time, and any updates affecting you or your purchases will
                  be notified to you, by us in writing (via email), and on this
                  page.
                </p>
                <p className="text-xs sm:text-sm">
                  The headings in these Conditions are for convenience only and
                  shall not affect their interpretation.
                </p>
                <p className="text-xs sm:text-sm">
                  We recommend that you print and keep a copy of these Terms and
                  Conditions for your future reference...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddToCartModal;
