import { LogOutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AdminNavBar = () => {
  const [userToken, setUserToken] = useState(false);
  const [adminID, setAdminID] = useState()
  const navigate = useNavigate()
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
          navigate("/admin/login");
          return;
        }
        const result = await responseVerify.json();

        setUserToken(true);
        // console.log(result)
        setAdminID(result)
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const logoutHandler = ()=>{
    setUserToken(false)
    localStorage.removeItem("jwt-token")
    navigate("/admin/login")
  }
  return (
    <nav className="bg-gray-800 shadow-md">
          {adminID && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to={`/admin/`}
              className="flex-shrink-0 text-white text-2xl font-bold"
            >
              AdminPanel
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              
              <Link
                to={`/admin/pending`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                pending Reserve
              </Link>
              <Link
                to={`/admin/confirmed`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                confirmed reserve
              </Link>
              {/* <Link
                to={`/admin/previous`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Previously rented Cars
              </Link> */}
            </div>
          </div>

          <div>
             <div className="flex items-center h-16">
              
              <button
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                {adminID.name}
              </button>
              <button
                onClick = {logoutHandler}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
              <LogOutIcon className="px-1 h-4 w-6"/>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </nav>
  );
};

export default AdminNavBar;
