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

      console.log(data)


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
    <div className="flex mt-10 justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-ful text-center border border-gray-300/60 rounded-2xl px-8 bg-white py-3"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          Login
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please login to continue in admin</p>

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail-icon lucide-mail"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border-none outline-none ring-0"
            value={formData.username}
            onChange={(e) => {
              setFormData(
                { ...formData, username: e.target.value }
              )
            }}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock-icon lucide-lock"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
            required
          />
        </div>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
