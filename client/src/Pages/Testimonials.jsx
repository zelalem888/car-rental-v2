import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ThumbsUp,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "/path/to/avatar1.jpg",
      rating: 5,
      comment:
        "The best car rental experience I've ever had! The process was seamless from start to finish. The car was immaculate and the customer service was exceptional.",
      carRented: "Tesla Model 3",
      date: "January 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Family Vacation",
      image: "/path/to/avatar2.jpg",
      rating: 5,
      comment:
        "Perfect for our family vacation! The SUV was spacious, clean, and well-maintained. The staff was incredibly helpful with car seat installation.",
      carRented: "Toyota Highlander",
      date: "December 2023",
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Weekend Getaway",
      image: "/path/to/avatar3.jpg",
      rating: 4,
      comment:
        "Great service and competitive prices. The pickup and drop-off process was quick and efficient. Will definitely use again!",
      carRented: "BMW 3 Series",
      date: "February 2024",
    },
  ];

  const stats = [
    { value: "15K+", label: "Happy Customers", icon: Users },
    { value: "4.9", label: "Average Rating", icon: Star },
    { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    { value: "24/7", label: "Customer Support", icon: MessageCircle },
  ];

  const reviewHighlights = [
    {
      title: "Exceptional Service",
      count: 2481,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Clean Vehicles",
      count: 1938,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Easy Booking",
      count: 1756,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Great Value",
      count: 1542,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Quote className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">
                Customer Stories
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-green-500">Customers</span> Say
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover why thousands of customers choose us for their car rental
              needs and trust us with their travel experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50 group hover:bg-green-50 transition-colors">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">
                        {testimonials[activeIndex].name}
                      </h3>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">
                        {testimonials[activeIndex].role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {testimonials[activeIndex].comment}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Car Rented: {testimonials[activeIndex].carRented}
                      </span>
                      <span>•</span>
                      <span>{testimonials[activeIndex].date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:border-green-200 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:border-green-200 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What People Love About Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what aspects of our service customers appreciate the most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${highlight.bgColor} rounded-lg p-6 text-center`}>
                <h3 className={`text-2xl font-bold mb-2 ${highlight.color}`}>
                  {highlight.count.toLocaleString()}+
                </h3>
                <p className="text-gray-700">{highlight.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="bg-green-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience It Yourself?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-green-100">
              Join thousands of satisfied customers and book your perfect rental
              car today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-500 px-8 py-3 rounded-lg font-medium 
                       hover:bg-green-50 transition-colors">
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
