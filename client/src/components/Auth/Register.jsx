import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  ChevronRight,
  Car,
  Star,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Users,
  SquareUser,
  Phone,
  Calendar,
  Globe,
  Map,
  MapPinHouse,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    nationality: "Ethiopian",
    city: "Addis Ababa",
  });
const [confirmPassword, setConfirmPassword] = useState("");



  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
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

    const validateField = (name, value, formData, confirmPassword) => {
      switch (name) {
        case "fullName":
          if (value.length <= 3) return "Full name must be greater than 3 characters";
          return null;

        case "password":
          if (value.length < 8) return "Password must be at least 8 characters";
          if (confirmPassword && value !== confirmPassword)
            return "Passwords do not match";
          return null;

        case "confirmPassword":
          if (value !== formData.password) return "Passwords do not match";
          return null;

        case "phoneNumber":
          if (!/^\d{10}$/.test(value))
            return "Phone number incorrect. ex: 0912345678";
          return null;

        default:
          return null;
      }
    };

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "confirmPassword") {
        setConfirmPassword(value);

        const error = validateField(
          name,
          value,
          { ...formData, [name]: value },
          confirmPassword
        );


        setErrors(prev => ({
          ...prev,
          confirmPassword: error,
          password:
            value && value !== formData.password
              ? "Passwords do not match"
              : null,
        }));

        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      const error = validateField(
        name,
        value,
        { ...formData, [name]: value },
        confirmPassword
      );

      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    if (formData.password !== confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();  

      if (!response.ok) {   
        if (data.type === "zod") {
          const newErrors = {};
          data.errors.forEach(err => {
            newErrors[err.field] = err.message;
          });
          setErrors(prev => ({ ...prev, ...newErrors }));
          return;
        }

        if (data.type === "custom") {
          setErrors(prev => ({ ...prev, email: data.message }));
          return;
        }

        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("jwt-token", data); 
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 flex">
      {/* Left Section: Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden"
      >
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br register-bg">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          ></div>

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
              className="flex items-center gap-2 text-white mb-16 group"
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Car className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold">Sami CarRental</span>
            </Link>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Start Your
                  <br />
                  Journey Today
                </h1>
                <p className="text-green-50/90 text-lg leading-relaxed max-w-md">
                  Join thousands of satisfied customers and experience our
                  premium car rental services.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {[
                  {
                    icon: Users,
                    title: "Easy Sign Up",
                    desc: "Quick registration process",
                  },
                  {
                    icon: Shield,
                    title: "Secure Account",
                    desc: "Protected personal data",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"
                  >
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

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <Star className="w-8 h-8 text-white" />
              <div>
                <h4 className="text-white font-semibold">
                  Trusted by Thousands
                </h4>
                <p className="text-green-50/80 text-sm">
                  Join our growing community of car renters
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section: Register Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden flex flex-col items-center gap-4 mb-8"
          >
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
            <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-600">
              Join us for the best car rental experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* =============full name=============== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="fullName"
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Full Name"
                />
                <SquareUser className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>
                
                {/* ============name error================ */}

             {errors.fullName && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                 <p className="text-sm">{errors.fullName}</p>
              </motion.div>
            )}
            {/* ==================Email=========================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="email"
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ============email already created error================ */}

             {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
               <p className="text-sm"> {errors.email} </p>
              </motion.div>
            )}

            {/* ==================password========================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="password"
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword.password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ================confirm Password===================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleChange(e)}
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ==============confirm password error================= */}

            {(errors.password || errors.confirmPassword) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{ errors.password || errors.confirmPassword}</p>
              </motion.div>
            )}

            {/* ===============phone Number=================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="phoneNumber"
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Phone Number"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ==========phone Number error============== */}
            {errors.phoneNumber && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{errors.phoneNumber}</p>
              </motion.div>
            )}

            {/* ==============Date Of Birth============================ */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  max={"2007-11-12"}
                  min={"1955-11-12"}
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="dateOfBirth"
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Birth Date"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ================nationality=================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nationality
              </label>
              <div className="relative">
                <select
                  className="nationality w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  onChange={(e) =>
                    handleChange(e)
                  }
                  name="nationality"
                  required
                >
                  <option defaultValue={"Ethiopian"} value={"Ethiopian"}>
                    Ethiopian
                  </option>
                </select>
              
                <Globe className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ====================City======================= */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <div className="relative">
                <select
                  className="city w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  onChange={(e) =>
                   handleChange(e)
                  }
                  required
                  name="city"
                >
                  <option value={"Addis Ababa"}>Addis Ababa</option>
                  <option value={"Bahir Dar"}>Bahir Dar</option>
                  <option value={"Hawassa"}>Hawassa</option>
                  <option value={"Adama"}>Adama</option>
                  <option value={"Mekelle"}>Mekelle</option>
                </select>
               
                <MapPinHouse className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 register-bg text-white rounded-lg font-medium 
                        transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors 
                       inline-flex items-center gap-1"
            >
              Sign in
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
