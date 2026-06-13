import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt-token");

        const responseVerify = await fetch(
          "http://localhost:3000/api/admin/verify",
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

        const result = await responseVerify.json();
        navigate(`/admin/${result.id}`);
      } catch (e) {

      }
    };
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        setError("Invalid username or password.")
      }

      const data = await response.json();

      // if (!data.success) {
      //   setError("Invalid username or password..");
      //   return;
      // }

      localStorage.setItem("jwt-token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.type === "superadmin") {
        navigate("/superadmin/manage-admins");
      } else if (data.user.type === "admin") {
        navigate("/admin");
      }
    } catch (e) {
      throw new Error(e)
    }

  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Left Side: Illustration / Welcome */}
      <div className="hidden md:flex flex-1 bg-orange-500 items-center justify-center p-10 rounded-l-3xl">
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome Back, Admin!</h1>
          <p className="text-lg">
            Manage your vehicles, reservations, and more with ease.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-1 justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="sm:w-[350px] w-full text-center border border-gray-200 rounded-2xl px-8 py-8 bg-white shadow-lg"
        >
          <h1 className="text-gray-800 text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          {/* Username */}
          <div className="flex items-center w-full mb-4 bg-white border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail-icon"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-none outline-none ring-0 w-full"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center w-full mb-4 bg-white border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock-icon"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-none outline-none ring-0 w-full"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full h-12 rounded-full text-white bg-orange-500 hover:bg-orange-600 shadow-md transition"
          >
            Login
          </button>

          {/* Footer Text */}
          <p className="text-gray-400 text-xs mt-6">
            &copy; 2025 Sami Car Rental System. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );


}

export default LoginForm;
