import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl w-full text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-green-700" />
          </div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-bold text-green-800 mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg leading-relaxed mb-8"
        >
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-gray-900 
                       rounded-lg hover:bg-green-600 hover:scale-105 transition-all"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gray-900 text-white rounded-lg 
                       hover:bg-gray-800 transition-all"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;