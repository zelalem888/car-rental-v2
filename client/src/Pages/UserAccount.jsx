import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  Car,
  Eye,
  EyeOff,
  AlertCircle,
  SquareUser,
  Phone,
  Calendar,
  Globe,
  MapPinHouse,
  Trash,
} from "lucide-react";
import { useNavigate, Link, useParams, redirect } from "react-router-dom";
const UserAccount = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    nationality: "Ethiopian",
    city: "Addis Ababa",
  });
  const [formPass ,setFormPass] = useState({
    oldPassword : "",
    newPassword: ""
  })


  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [emailCheck, setEmailCheck] = useState();
  const [passwordError, setPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [account , setAccount] = useState("account")
  const navigate = useNavigate();

  useEffect(() => {
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
          navigate(`/`);
          return;
        }
        const result = await responseVerify.json();
        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          navigate(`/account/${result.id}`);
          return;
        }

        const userResult = await response.json();
        // console.log(userResult);
        let pNumber = "";

        if (
          String(userResult[0].PhoneNumber).startsWith("9") ||
          String(userResult[0].PhoneNumber).startsWith("7")
        ) {
          pNumber = "0" + String(userResult[0].PhoneNumber);
        } else {
          pNumber = String(userResult[0].PhoneNumber);
        }

        setFormData({
          fullName: userResult[0].FullName,
          email: userResult[0].Email,
          phoneNumber: pNumber,
          dateOfBirth: userResult[0].DoB.slice(0, 10),
          nationality: userResult[0].Nationality,
          city: userResult[0].City,
        });
      } catch (e) {}
    };
    fetchData();
  }, [navigate]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      String(formData.phoneNumber).length != 10
    ) {
      setPhoneError("Phone number must have 10 characters");
      return;
    } else {
      setPhoneError(null);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        // console.log(errorData);
        setEmailCheck("Email already existed");
        return;
      }
      const result = await response.json();
      // console.log(result);
      localStorage.removeItem("jwt-token");
      localStorage.setItem("jwt-token", result);
      navigate("/");
    } catch (error) {
      console.log("network error", error);
    }
  };

  const passwordHandler = async(e)=>{
   e.preventDefault();
    if (formPass.newPassword.length < 8 && 
        formPass.oldPassword.length < 8 ) {
      setPasswordError("length must be greeter than 8 characters.");
      return;
    } else {
      setPasswordError(null);
    }
    // console.log(formPass)
    // console.log("heelo")
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/updatepassword/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formPass),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        setPasswordError("Password Incorrect.")
        // console.log(errorData);
        return;
      }
      const result = await response.json();
      // console.log(result);
      navigate("/");
    } catch (error) {
      console.log("network error", error);
    }
    
  }

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log("delete unsuccessful");
        return;
      }
      const result = (await response.json())
      alert(result.message)
      localStorage.removeItem("jwt-token");
      navigate("/")
    } catch (error) {
      console.log("network error", error);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex items-center justify-center p-6 md:p-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" flex flex-col items-center gap-4 mb-8"
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
          <div className="flex justify-evenly mb-12">
               <a
                onClick={()=> setAccount("account")}
                className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${
                    account === "account"
                      ? "text-green-500"
                      : "text-gray-700"
                  } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${account === "account" ? "after:w-full" : ""}`}
              >
                Account Detail
                </a>
                  <a
                    onClick={()=> setAccount("password")}
                className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${
                    account === "password"
                      ? "text-green-500"
                      : "text-gray-700"
                  } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${account === "password" ? "after:w-full" : ""}`}
              >
                password
                </a>  
              </div>

          {account == "account" ? (
            <>
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
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
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
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* ============email already created error================ */}

            {(emailError || emailCheck) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm"> {emailError || emailCheck}</p>
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
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 
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
                    setFormData({ ...formData, nationality: e.target.value })
                  }
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
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium 
                       hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Update Account
            </motion.button>
          </form>
            <p className="mt-8 text-center text-gray-600">
            Do you wanna Delete your account?{" "}
            <button
              className="text-green-500 font-semibold hover:text-green-600 transition-colors 
                       inline-flex items-center gap-1"
              onClick={() => {
                setDeletePopUp(true);
              }}
            >
              Delete Account
              <Trash className="w-4 h-4" />
            </button>
            {deletePopUp && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Confirm Deletion
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setDeletePopUp(false);
                      }}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteHandler}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </p>
          </>
          ) : (
            <>
                 {/* ==================password========================== */}

            <form onSubmit={passwordHandler}>

            <div className="space-y-2">
              <h1 className="text-sm font-medium text-gray-700">
               Old Password
              </h1>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  onChange={(e) =>
                    setFormPass({...formPass, oldPassword : e.target.value})
                  }
                  value={formPass.oldPassword || ""}
                  name="password"
                   autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="input old password"
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

            {/* ================new Password===================== */}

            <div className="space-y-2">
              <h1 className="text-sm font-medium text-gray-700">
                New Password
              </h1>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  onChange={(e) =>
                    setFormPass({...formPass, newPassword : e.target.value})
                  }
                  value={formPass.newPassword || ""}
                   autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 
                           focus:border-transparent transition-all"
                  placeholder="input New password"
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-8 px-4 py-3 bg-green-500 text-white rounded-lg font-medium 
                       hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Update Password
            </motion.button>
            </form>
            </>
          ) }
          <div>
          </div>

        
        </div>
      </motion.div>
    </>
  );
};

export default UserAccount;
