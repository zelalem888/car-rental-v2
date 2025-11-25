import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  HelpCircle,
  Mail,
  Phone,
  Car,
  CreditCard,
  Calendar,
  Shield,
} from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      title: "Booking Process",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      questions: [
        {
          question: "How do I make a car reservation?",
          answer:
            "Making a reservation is simple:\n\n• Select your desired car model\n• Choose pickup and return dates\n• Enter your details\n• pay for renting in person\n\nYou'll receive instant confirmation via email.",
        },
        {
          question: "Can I modify my reservation?",
          answer:
            "Yes, you can modify your reservation through our website or by contacting customer service. Changes made 48 hours before pickup are free of charge.",
        },
      ],
    },
    {
      title: "Rental Requirements",
      icon: Car,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      questions: [
        {
          question: "What documents do I need to rent a car?",
          answer:
            "Required documents include:\n\n• Valid driver's license\n• Credit card in renter's name\n• Proof of insurance\n• Government-issued ID\n\nInternational renters may need additional documentation.",
        },
        {
          question: "What are the age requirements?",
          answer:
            "• Minimum age: 21 years\n• Under 25: Young driver surcharge applies\n• Luxury vehicles: 25+ years required\n• Senior drivers: No upper age limit with valid license",
        },
      ],
    },
    {
      title: "Payments & Insurance",
      icon: CreditCard,
      color: "text-green-500",
      bgColor: "bg-green-50",
      questions: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept:\n\n• Major credit cards\n• Debit cards (with additional verification)\n• Digital wallets\n• Corporate accounts\n\nCash payments are not accepted.",
        },
        {
          question: "What insurance options are available?",
          answer:
            "We offer comprehensive coverage options:\n\n• Basic insurance (included)\n• Full coverage protection\n• Personal accident insurance\n• Tire and windshield protection",
        },
      ],
    },
    {
      title: "Policies & Protection",
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      questions: [
        {
          question: "What is your fuel policy?",
          answer:
            "Our fuel policy is simple:\n\n• Cars provided with full tank\n• Return with full tank\n• Missing fuel charged at market rate\n• Prepaid fuel option available",
        },
        {
          question: "What happens if I return late?",
          answer:
            "• 29-minute grace period\n• Hourly charges apply after grace period\n• Full day rate for significant delays\n• Early returns do not qualify for refunds",
        },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            <span className="text-orange-700 font-medium">Need Help?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our car rental services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-4">
              <div
                className={`flex items-center gap-3 p-4 ${category.bgColor} rounded-lg`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.title}
                </h3>
              </div>

              {category.questions.map((item, itemIndex) => {
                const index = `${categoryIndex}-${itemIndex}`;
                return (
                  <div
                    key={itemIndex}
                    className="border border-gray-200 hover:border-orange-500 rounded-lg bg-white transition-colors">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left">
                      <span className="text-lg font-medium text-gray-800">
                        {item.question}
                      </span>
                      <div
                        className={`p-2 rounded-full ${
                          activeIndex === index
                            ? "bg-orange-100"
                            : "bg-gray-100"
                        } transition-colors`}>
                        {activeIndex === index ? (
                          <Minus className="w-4 h-4 text-orange-500" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden">
                          <div className="px-6 py-4 bg-orange-50/50 border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl opacity-10"></div>
          <div className="relative bg-white border border-orange-100 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-8">
                Can't find what you're looking for? Our customer support team is
                here to help you 24/7.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>Email Support</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 border border-orange-200 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Call Support</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
