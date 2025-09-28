import { useState, useEffect } from "react";
import { X } from "lucide-react";

const PopupAd = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //check if ad is already shown
    const shown = sessionStorage.getItem("popupAd");
    if (!shown) {
      setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("popupAd", "true");
      }, 4000);
    }
  }, []);

  if (!show) return null;

  return  <div
              onClick={() => setShow(false)}
              className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-900 bg-opacity-60 animate-zoom-in w-screen"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col items-center justify-center  "
              >
                <button
                  onClick={() => setShow(false)}
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
                      We will gladly accept returns for any reason within 30 days
                      of receipt of delivery.
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
};

export default PopupAd;
