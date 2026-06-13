import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Car,
  MapPin,
  CreditCard,
  Search,
  Calendar,
  Key,
  ThumbsUp,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const features = [
    {
      icon: CreditCard,
      title: "Affordable Pricing",
      description:
        "Competitive rates with no hidden fees. Get the best value for your money.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: "Flexible Locations",
      description:
        "Multiple pickup and drop-off points across the city for your convenience.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Car,
      title: "Diverse Fleet",
      description:
        "Choose from our wide range of vehicles including luxury, economy, and SUVs.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service to assist you anytime, anywhere.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const benefits = [
    { value: "50+", label: "Car Models" },
    { value: "24/7", label: "Support" },
    { value: "98%", label: "Happy Clients" },
    { value: "150+", label: "Locations" },
  ];

  const steps = [
    {
      icon: Search,
      title: "Search & Compare",
      description: "Browse our collection and compare different vehicles.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Calendar,
      title: "Select Dates",
      description: "Choose your pickup and return dates.",
      color: "from-blue-500 to-green-500",
    },
    {
      icon: Key,
      title: "Quick Booking",
      description: "Easy and secure booking process.",
      color: "from-green-500 to-yellow-500",
    },
    {
      icon: ThumbsUp,
      title: "Start Driving",
      description: "Pick up your car and enjoy your journey.",
      color: "from-yellow-500 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Discover More</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
              Experience Premium Car Rental Service
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Your journey begins with us - Comfortable, Reliable, and
              Affordable
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/models")}
                className="px-8 py-4 bg-green-500 text-white rounded-lg font-medium 
                         hover:bg-green-600 transition-colors inline-flex items-center gap-2">
                View Our Fleet
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-white text-gray-800 rounded-lg font-medium 
                         hover:bg-gray-50 transition-colors border border-gray-200">
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-16 pb-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center group hover:bg-green-50 transition-colors">
                <h3 className="text-3xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">
              We offer the best car rental experience with premium features and
              services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.bgColor} rounded-xl p-8 hover:-translate-y-2 transition-transform`}>
                <div className="mb-6">
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Get started with our simple and streamlined booking process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, ${step.color})`,
                    opacity: 0.1,
                  }}></div>
                <div className="relative bg-white rounded-xl p-8 border border-gray-100">
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-6">
                    <step.icon className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
              <Zap className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">
                Ready to Hit the Road?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Start your journey with our premium car rental service today
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/booking")}
                className="px-8 py-4 bg-white text-green-500 rounded-lg font-medium 
                         hover:bg-green-50 transition-colors inline-flex items-center gap-2">
                <Car className="w-5 h-5" />
                Book a Ride Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
