import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Car Body */}
        <motion.div
          initial={{ x: -200 }}
          animate={{
            x: 200,
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            },
          }}
          className="relative">
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              },
            }}
            className="w-24 h-10 bg-green-500 rounded-lg relative">
            {/* Car Windows */}
            <div className="absolute top-0 left-4 w-8 h-4 bg-green-600 rounded-t-lg"></div>
            <div className="absolute -top-2 right-4 w-6 h-4 bg-green-600 rounded-t-lg skew-x-12"></div>

            {/* Headlights */}
            <div className="absolute right-0 top-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="absolute left-1 top-2 w-2 h-2 bg-red-500 rounded-full"></div>

            {/* Wheels */}
            <motion.div
              animate={{
                rotate: 360,
                transition: {
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "linear",
                },
              }}
              className="absolute -bottom-3 left-2 w-6 h-6 bg-gray-800 rounded-full border-4 border-gray-300"></motion.div>
            <motion.div
              animate={{
                rotate: 360,
                transition: {
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "linear",
                },
              }}
              className="absolute -bottom-3 right-2 w-6 h-6 bg-gray-800 rounded-full border-4 border-gray-300"></motion.div>
          </motion.div>
        </motion.div>

        {/* Road markings */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8">
          <motion.div
            animate={{
              scaleX: [1, 0.8, 1],
              transition: {
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="w-8 h-2 bg-gray-300 rounded-full"></motion.div>
          <motion.div
            animate={{
              scaleX: [1, 0.8, 1],
              transition: {
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.2,
              },
            }}
            className="w-8 h-2 bg-gray-300 rounded-full"></motion.div>
          <motion.div
            animate={{
              scaleX: [1, 0.8, 1],
              transition: {
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.4,
              },
            }}
            className="w-8 h-2 bg-gray-300 rounded-full"></motion.div>
        </div>

        {/* Loading text */}
        <motion.p
          animate={{
            opacity: [1, 0.5, 1],
            transition: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-gray-600 font-medium">
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
