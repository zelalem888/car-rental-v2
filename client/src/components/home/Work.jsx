import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  CircleHelp,
} from "lucide-react";


const Work = () => {  
    const navigate = useNavigate();
     
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const steps = [
  {
    icon: Car,
    title: "Select Your Car",
    description:
      "Choose from our wide range of premium vehicles for any occasion",
    bgcolor: "bg-blue-50",
    iconcolor: "text-blue-500",
  },
  {
    icon: MapPin,
    title: "Add Pickup & Return Date",
    description:
      "Choose where the car will be picked up and when it will be returned",
    bgcolor: "bg-green-50",
    iconcolor: "text-green-500",
  },
  {
    icon: Calendar,
    title: "Make a Reservation",
    description: "Review your details and confirm your booking instantly",
    bgcolor: "bg-green-50",
    iconcolor: "text-purple-500",
  },
  {
    icon: CreditCard,
    title: "Payment on Pickup",
    description:
      "Pay at our office when you arrive to collect the vehicle",
    bgcolor: "bg-green-50",
    iconcolor: "text-green-500",
  },
];


  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
            <CircleHelp className="w-5 h-5 text-green-900" />
            <span className="text-green-900 font-medium">How It Works?</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 mt-2">
            Rent Your Dream Car in 4 Easy Steps
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We've streamlined our rental process to get you on the road quickly
            and safely. Follow these simple steps to begin your journey with us.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative group">
              <div
                className={`${step.bgcolor} rounded-xl p-8 h-full transition-all duration-300 
                           group-hover:shadow-xl group-hover:-translate-y-2`}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 ${step.bgcolor} rounded-full flex items-center 
                               justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-8 h-8 ${step.iconcolor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step Number */}
                  <div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full 
                              flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 left-full w-8 border-t-2 
                               border-dashed border-green-300 -translate-y-1/2 z-10"></div>
                )}
              </div>

              {/* Completion Check */}
              <div className="absolute bottom-4 right-4">
                <CheckCircle
                  className="w-6 h-6 text-gray-300 group-hover:text-green-500 
                                   transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to get started? Book your dream car now!
          </p>
          <motion.button
            
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/models")}
            className="px-8 py-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-lg shadow-lg 
                     shadow-green-500/30 hover:bg-gradient-to-l transition-all">
            Book a Car Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
