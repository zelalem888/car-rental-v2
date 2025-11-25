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
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassworder: "",
  });


  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
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
    if (formData.password !== confirmPassword.confirmPassworder) {
      setPasswordError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 8) {
      setPasswordError("length must be greeter than 8 characters.");
      return;
    }
    if (
      String(formData.phoneNumber).length != 12 &&
      String(formData.phoneNumber).length != 10
    ) {
      setPhoneError("phone number incorrect. ex:- 0912345678 or +251912345678");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setEmailError(errorData.error)
        throw new Error(errorData.error);
      }
      const result = await response.json();
      localStorage.setItem("jwt-token", result)
      console.log(result);
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
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
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
                <p className="text-orange-50/90 text-lg leading-relaxed max-w-md">
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
                    <p className="text-orange-50/80 text-sm">{feature.desc}</p>
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
                <p className="text-orange-50/80 text-sm">
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
              <div className="bg-orange-50 p-2 rounded-lg group-hover:bg-orange-100 transition-all">
                <Car className="w-8 h-8 text-orange-500" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-gray-900">Car</span>
                <span className="text-orange-500">Rental</span>
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
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Full Name"
                />
                <SquareUser className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ==================Email=========================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ============email already created error================ */}

             {emailError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{emailError}</p>
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
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
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
                  value={confirmPassword.confirmPassworder}
                  onChange={(e) =>
                    setConfirmPassword({
                      confirmPassworder: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
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

            {passwordError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{passwordError}</p>
              </motion.div>
            )}

            {/* ===============phone Number=================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Phone Number"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ==========phone Number error============== */}
            {phoneError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{phoneError}</p>
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
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
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
                  className="nationality w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  required
                >
                  <option defaultValue={"Ethiopian"} value={"Ethiopian"}>
                    Ethiopian
                  </option>
                  <option value={"Non-Ethiopian"}>Non-Ethiopian</option>
                </select>
              
                <Globe className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ===================Address====================== */}

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your Address"
                />
                <Map className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div> */}

            {/* ====================City======================= */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <div className="relative">
                <select
                  className="city w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
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
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors 
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
