import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  ChevronRight,
  Car,
  Star,
  Shield,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { Link } from "react-router-dom";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

   useEffect(()=>{
       const fetchData = async () => {
        try {
          const token = localStorage.getItem("jwt-token");
  
          const responseVerify = await fetch(
            "http://localhost:3000/api/user/verify",
            {
              method: "POST",
              headers: {
                "jwt-token": token,
              },
            }
          );
  
         if (!responseVerify.ok) {
          return;
        }
        navigate(`/`);
        } catch (e) {
         
        }
      };
      fetchData();
    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/login",{
        method : "POST",
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(formData)
      })
      if(!response.ok){
        setError("Invalid Email or Password.")
       return
      }
      const result = await response.json()
      localStorage.setItem('jwt-token', result)
      navigate("/")
    } catch (error) {
      console.log(error)
    console.log("Invalid DataType")
    }
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 flex">
      {/* Left Section: Content */}
      {/* Left Section: Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden">
        {/* Background with gradient and pattern */}
        <div  className="absolute inset-0 login-bg">
          {/* Modern grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}></div>

          {/* Floating shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="relative w-full p-12 flex flex-col justify-between z-10">
          {/* Top Section */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-white group">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Car className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold">Sami CarRental</span>
            </Link>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Your Journey
                  <br />
                  Begins Here
                </h1>
                <p className="text-green-50/90 text-lg leading-relaxed max-w-md">
                  Experience premium car rental services with unlimited miles
                  and flexible pickup options.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {[
                  {
                    icon: Star,
                    title: "Premium Fleet",
                    desc: "Top-tier vehicles",
                  },
                  {
                    icon: Shield,
                    title: "Secure Booking",
                    desc: "Protected transactions",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
                    <feature.icon className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-green-50/80 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "20+", label: "Premium Cars" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-green-50/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section: Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden flex flex-col items-center gap-4 mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-all">
                <Car className="w-8 h-8 text-green-500" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-gray-900">Car</span>
                <span className="text-green-500">Rental</span>
              </span>
            </Link>
          </motion.div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Login to Your Account</h2>
            <p className="text-gray-600">
              Welcome back! Please enter your details
            </p>
          </div>

          <form 
          onSubmit={handleSubmit} 
          className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  autoComplete="off"
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-green-500 hover:text-green-600 transition-colors">
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium 
                       login-bg transition-colors flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign in
            </motion.button>

          </form>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/register"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors 
                       inline-flex items-center gap-1">
              Sign up
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </p>
        </div>
      </motion.div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
