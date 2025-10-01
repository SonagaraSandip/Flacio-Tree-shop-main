import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Heart, Star } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import LoadingEffect from "../components/loadingEffect";
import Products from "../data/products";
import Leave from "../assets/Banner/leave.avif";
import { toast } from "react-toastify";

export default function RightBanner() {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [show, setShow] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState({});

  useEffect(() => {
    const shown = sessionStorage.getItem("rightAdShown");
    if (!shown) {
      setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("rightAdShown", "true");
      }, 9000); // show after 9s
    }
  }, []);

  const handleWishlist = (product) => {
    setLoadingWishlist((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setLoadingWishlist((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({ product });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (product) => {
    const selectedVariant =
      product.variants && product.variants.length > 0
        ? product.variants[0]
        : null;

    addToCart({
      product,
      selectedVariant,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  const recommendedProduct = Products.filter(
    (product) => product.id === 3 || product.id === 4 || product.id === 7
  );

  //star
  const renderStar = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={16} fill={index < rating ? "black" : "none"} />
    ));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={() => setShow(false)}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      <div className="relative">
        <button
          className=" absolute top-4 right-4 z-10 self-end border border-gray-400 hover:bg-black hover:text-white"
          onClick={() => setShow(false)}
        >
          <X className="hover:rotate-90 transition-transform duration-300 hover:scale-90" />
        </button>
      </div>
      <div className="absolute right-0 top-0 bg-white  flex w-[52vh] h-full overflow-y-auto animate-fadeInRight">
        <div className="flex flex-col gap-4  w-full h-full">
          {/* banner */}
          <div
            className="min-h-52 w-full"
            style={{
              backgroundImage: `url(${Leave})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="flex h-full items-end text-2xl mx-4 pb-4 uppercase text-white font-semibold font-librebaskerville ">
              before you <br /> leave ...
            </p>
          </div>
          {/* text */}
          <div className="flex flex-col gap-4 my-2 text-center">
            <p className="text-xl font-poppins text-gray-500">
              Take{" "}
              <span className="text-2xl font-librebaskerville text-black">
                15% off
              </span>{" "}
              your first order
            </p>
            <p className=" text-gray-500 font-poppins">
              Enter the code :{" "}
              <span className="border-b border-gray-800 text-black">
                FIRST15
              </span>
            </p>
            <button
              onClick={() => {
                navigate("/collections/all");
                setShow(false);
              }}
              className="text-md bg-zinc-800 mt-2 text-white mx-8 px-4 py-2 uppercase font-poppins hover:bg-green-950 transition-colors duration-300"
            >
              continue shopping
            </button>
          </div>
          {/*recommend */}
          <div className="flex flex-col gap-4 mx-6">
            <p className="text-md font-poppins pb-4 border-b border-gray-300">
              Recommended
            </p>

            {recommendedProduct.map((product) => {
              const isProductInWishlist = isInWishlist(product.id);

              return (
                <div key={product.id} className="flex gap-4 my-2">
                  <button onClick={() => {navigate(`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`); setShow(false);}}>
                    <img
                      src={product.frontImage}
                      alt={product.name}
                      className="w-28 h-36 object-cover rounded-md"
                    />
                  </button>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex text-gray-500">
                      {renderStar(product.rating)}
                    </div>
                    <p className="text-sm font-librebaskerville mt-1 text-gray-800">
                      {product.name}
                    </p>
                    {/* price */}
                    <div className="flex items-center gap-1">
                      {product.discountPrice ? (
                        <div className="flex gap-1 font-poppins text-sm">
                          <p className="line-through text-gray-500 ">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                          <p className="text-green-600">
                            ${product.discountPrice.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p>${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    {/* color */}
                    {product.id !== 7 && (
                      <div className="flex gap-2">
                        <button className="bg-black p-3 rounded-full" />
                        <button
                          className={`${
                            product.id === 3 ? "bg-pink-400" : "bg-white"
                          } border border-gray-400 p-3 rounded-full `}
                        />
                      </div>
                    )}

                    {/* add to cart button */}
                    {product.id === 7 ? (
                      <button
                        onClick={() => handleWishlist(product)}
                        disabled={loadingWishlist[product.id]}
                        className={`border border-gray-500 mt-2 self-start hover:bg-green-950 hover:text-white ${
                          isProductInWishlist
                            ? "bg-green-950 text-white"
                            : "text-gray-600"
                        } transition-colors duration-300 text-gray-600 p-1`}
                      >
                        {loadingWishlist[product.id] ? (
                          <LoadingEffect size="small" />
                        ) : (
                          <Heart size={20} />
                        )}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="border border-gray-300 px-4 py-1 mt-2 text-sm font-poppins hover:bg-green-950 hover:text-white transition-all duration-300"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => handleWishlist(product)}
                          disabled={loadingWishlist[product.id]}
                          className={`border border-gray-300 mt-2 self-start hover:bg-green-950 hover:text-white ${
                            isInWishlist(product.id)
                              ? "bg-green-950 text-white"
                              : ""
                          } transition-colors duration-300 text-gray-500 p-1`}
                        >
                          {loadingWishlist[product.id] ? (
                            <LoadingEffect size="small" />
                          ) : (
                            <Heart size={20} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
