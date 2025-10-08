import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";
import ScrollToTop from "../pages/ScrollToTop";

const Faqs = () => {
  const navigate = useNavigate();

  const data = [
    {
      title: "01. The order",
      q1: "When do I receive my order?",
      ans1: "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
      q2: "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
      ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
      q3: "When will I receive the invoice for my order?",
      ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice.",
    },
    {
      title: "02. Shipment",
      q1: "When do I receive my order?",
      ans1: "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
      q2: "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
      ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
      q3: "When will I receive the invoice for my order?",
      ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice.",
    },
    {
      title: "03. The order",
      q1: "When do I receive my order?",
      ans1: "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
      q2: "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
      ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
      q3: "When will I receive the invoice for my order?",
      ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice.",
    },
    {
      title: "04. Returns, exchanges and complaints",
      q1: "When do I receive my order?",
      ans1: "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
      q2: "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
      ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
      q3: "When will I receive the invoice for my order?",
      ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice.",
    },
  ];

  return (
    <div className="container pt-[100px] sm:pt-[120px] lg:pt-[150px]">
      <div className="flex flex-col gap-2 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 border-b border-gray-300">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-librebaskerville text-center sm:text-left">FAQs</h1>
        <div className="flex gap-2 font-poppins text-sm sm:text-md justify-center sm:justify-start">
          <button onClick={() => navigate("/")} className="underline">
            Home
          </button>
          /<span>FAQs</span>
        </div>
      </div>

      {/* faqs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 xl:px-14 my-8 sm:my-12 lg:my-16">
        {data.map((item) => (
          <div key={item.title} className="flex flex-col">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-librebaskerville text-center sm:text-left">{item.title}</h1>
            <p className="font-poppins mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-md font-semibold text-gray-700">{item.q1}</p>
            <p className="text-xs sm:text-sm text-gray-500 font-poppins mt-1 sm:mt-2">{item.ans1}</p>
            <p className="font-poppins mt-4 sm:mt-6 text-sm sm:text-md font-semibold text-gray-700">{item.q2}</p>
            <p className="text-xs sm:text-sm text-gray-500 font-poppins mt-1 sm:mt-2">{item.ans2}</p>
            <p className="font-poppins mt-4 sm:mt-6 text-sm sm:text-md font-semibold text-gray-700">{item.q3}</p>
            <p className="text-xs sm:text-sm text-gray-500 font-poppins mt-1 sm:mt-2">{item.ans3}</p>
          </div>
        ))}
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Faqs;
