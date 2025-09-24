import { useState } from "react";
import Footer from "../pages/Footer";
import ScrollToTop from "../pages/ScrollToTop";

const faqs = [
  {
    question: "When do I receive my order?",
    answer:
      "Your order will be shipped on the date indicated while placing the order. The delivery time is also stated on your order confirmation.",
  },
  {
    question:
      "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
    answer:
      "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
  },
  {
    question: "When will I receive the invoice for my order?",
    answer:
      "Invoices are typically sent via email after your order has been shipped.",
  },
  {
    question: "How long will my order take to be delivered?",
    answer:
      "Delivery times vary and are indicated at checkout and in the order confirmation.",
  },
  {
    question: "Do I need to create an account to place an order?",
    answer:
      "An account is not always necessary, but it can help you track orders and delivery.",
  },
  {
    question: "Can I choose my currency I pay in?",
    answer:
      "When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
  },
];

export default function Faqs2() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      <div className="max-w-2xl mx-auto mb-16 mt-[130px]">
        <h2 className="text-4xl font-serif font-bold mb-10">
          Frequently Asked Questions.
        </h2>
        {faqs.map((faq, idx) => (
          <div key={faq.question} className="border-b border-gray-300 py-4">
            <button
              className="w-full text-left focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)} // toggle open/close
            >
              <span
                className={`block text-lg  ${
                  openIdx === idx
                    ? "text-black font-semibold font-librebaskerville"
                    : "font-poppins"
                } transition-all duration-200`}
              >
                {faq.question}
              </span>
            </button>
            {openIdx === idx && (
              <div className="mt-2 text-gray-600 font-poppins text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
