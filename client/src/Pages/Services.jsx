import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Car,
  CheckCircle,
  Award,
  Settings,
  Users,
  CreditCard,
  Clock,
  BarChart,
  PhoneCall,
  Calendar,
} from "lucide-react";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const featureCards = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Advanced security measures for safe transactions",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Car,
      title: "Wide Selection",
      description: "Diverse fleet of vehicles for every need",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const advancedFeatures = [
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check car availability instantly with live updates",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Calendar,
      title: "Flexible Duration",
      description: "Rent cars from hours to months with flexible terms",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: PhoneCall,
      title: "24/7 Support",
      description: "Round-the-clock comprehensive customer assistance",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  const stats = [
    { value: "15K+", label: "Happy Customers" },
    { value: "150+", label: "Locations" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Star className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enjoy the Best service in
              <span className="text-green-500"> Car Rentals</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to CarRental, where we redefine the car rental experience.
              Our mission is to provide seamless, reliable, and affordable car
              rental service for everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Basic Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Settings className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">Main Services</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for car rentals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.bgColor} rounded-lg p-6 hover:scale-105 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Advanced Features */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Premium Services</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our application is packed with powerful features to ensure a
                smooth car rental experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 
                           transition-all hover:-translate-y-1 group">
                  <div
                    className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center 
                                mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
