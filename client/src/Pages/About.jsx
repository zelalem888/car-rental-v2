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

  
  const stats = [
    { value: "50+", label: "Happy Customers" },
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
              <span className="text-green-700 font-medium">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Best in
              <span className="text-green-500"> Car Rentals</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to CarRental, where we redefine the car rental experience.
              Our mission is to provide seamless, reliable, and affordable car
              rentals for everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-green-500" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our mission is to revolutionize the car rental industry by
                providing a seamless, transparent, and customer-centric
                experience. We believe in making car rentals accessible,
                affordable, and stress-free for everyone.
              </p>
              <ul className="space-y-4">
                {[
                  "User-friendly booking process",
                  "Transparent pricing with no hidden fees",
                  "24/7 customer support",
                  "Regular fleet maintenance and updates",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
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
              <h2 className="text-3xl font-bold">Key Features</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for car rentals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
        </div>
      </section>
    </div>
  );
};

export default About;
