import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Car,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically handle the newsletter subscription
    }
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { Icon: Twitter, href: "#", color: "hover:bg-blue-400" },
    { Icon: Instagram, href: "#", color: "hover:bg-pink-600" },
    { Icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Car Models", path: "/models" },
    { label: "Services", path: "/services" },
    { label: "Contact Us", path: "/contact" },
  ];

  const workingHours = [
    { day: "Mon - Fri", hours: "2:00AM - 11:00AM" },
    { day: "Saturday", hours: "2:00AM - 10:00AM" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <Car className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold">
                <span className="text-white">Car</span>
                <span className="text-green-500">Rental</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for car rentals. Experience premium service
              with unlimited miles at unbeatable
              prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center
                           ${color} hover:text-white transition-all duration-300`}>
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group hover:text-green-500 transition-colors inline-flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Working Hours</h3>
            <ul className="space-y-4">
              {workingHours.map((schedule, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <span className="block text-sm text-gray-400">
                      {schedule.day}
                    </span>
                    <span className="block text-white">{schedule.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-green-500 group-hover:rotate-12 transition-transform" />
                <span className="hover:text-green-500 transition-colors">
                  +251 911 121 123
                </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="hover:text-green-500 transition-colors">
                  info@samicarrental.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-500" />
                <span>Addis Ababa, bole</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Sami CarRental. All rights reserved. Built
            with ❤️ for better car rental experience.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
