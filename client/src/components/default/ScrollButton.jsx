import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  // Use useEffect to properly handle event listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      aria-label="Scroll to top">
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollButton;
