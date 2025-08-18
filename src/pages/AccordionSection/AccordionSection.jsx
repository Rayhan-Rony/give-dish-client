import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform connects restaurants, charities, and donors to reduce food waste and support communities in need.",
  },
  {
    question: "How can I become a charity?",
    answer:
      "Charities can request access by registering and paying a one-time verification fee. After admin approval, you’ll be able to request donations.",
  },
  {
    question: "Can restaurants track their donations?",
    answer:
      "Yes, restaurants can manage and monitor the status of their donations directly from their dashboard.",
  },
  {
    question: "Is there any fee for general users?",
    answer:
      "No. General users can browse and save donations for free without any charges.",
  },
];

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-11/12 mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <FaChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Body */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40" : "max-h-0"
              } overflow-hidden bg-gray-50`}
            >
              <p className="p-5 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccordionSection;
