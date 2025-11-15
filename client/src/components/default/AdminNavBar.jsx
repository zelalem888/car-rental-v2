import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={"/admin/1"} className="flex-shrink-0 text-white text-2xl font-bold">
              AdminPanel
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            <Link
                to={"/admin/1/pending"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                pending Reserve
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Users
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
