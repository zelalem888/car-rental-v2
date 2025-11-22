import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/home/Hero";
import Work from "../components/home/Work";
import Faq from "../components/home/Faq";
import Loader from "../components/default/Loader";
import MouseTrail from "../components/default/Mousetrail";


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {/* <MouseTrail/> */}
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen pt-16 md:pt-20">
        <motion.div variants={fadeInUp}>
          <Hero />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Work />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Faq />
        </motion.div>
      </motion.main>
    </>
  );
};

export default Home;
