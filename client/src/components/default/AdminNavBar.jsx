import { LogOutIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const [adminID, setAdminID] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= VERIFY ADMIN ================= */
  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        const res = await fetch("http://localhost:3000/api/admin/verify", {
          method: "POST",
          headers: { "jwt-token": token },
        });

        if (!res.ok) {
          navigate("/admin/login");
          return;
        }

        const data = await res.json();
        setAdminID(data);
      } catch (err) {
        console.error(err);
      }
    };

    verify();
  }, []);

  /* ================= CLEAR INPUT WHEN TYPE CHANGES ================= */
  useEffect(() => {
    setSearchValue("");
    setResults([]);
  }, [searchType]);

  /* ================= LOGOUT ================= */
  const logoutHandler = () => {
    localStorage.removeItem("jwt-token");
    navigate("/admin/login");
  };

  /* ================= SEARCH HANDLER ================= */
  const searchHandler = async () => {
    if (!searchValue) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/advanced/search?type=${searchType}&value=${searchValue}`
      );

      const data = await res.json();
      
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-gray-800 shadow-md">
        {adminID && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              {/* LEFT */}
              <div className="flex items-center space-x-6 text-white">
                <Link to="/admin" className=" text-xl font-bold">
                  AdminPanel
                </Link>

                <Link to="/admin/pending" className="nav-link">
                  Pending
                </Link>
                <Link to="/admin/confirmed" className="nav-link">
                  Confirmed
                </Link>
                <Link to="/admin/users" className="nav-link">
                  Users
                </Link>
              </div>

              {/* RIGHT */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 text-sm"
                >
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </button>

                <span className="text-gray-300 text-sm">
                  {adminID.user.name} (Admin)
                </span>

                <button
                  onClick={logoutHandler}
                  className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 text-sm"
                >
                  <LogOutIcon className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ================= SEARCH MODAL ================= */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-[80%] h-[80%] shadow-xl p-8 overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">
                Advanced Search
              </h2>
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            {/* SEARCH TYPE (RADIO) */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Search by
              </p>

              <div className="flex gap-8 text-sm">
                {[
                  { label: "Name", value: "name" },
                  { label: "Email", value: "email" },
                  { label: "Phone", value: "phone" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="searchType"
                      value={item.value}
                      checked={searchType === item.value}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="accent-gray-800"
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SEARCH INPUT */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={`Enter ${searchType}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gray-800"
              />
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex justify-end mb-8">
              <button
                onClick={searchHandler}
                className="bg-gray-800 text-white px-8 py-3 text-sm hover:bg-gray-900 transition"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

           {/* RESULTS */}
            <div className="space-y-2">
              {!loading && results.length === 0 && (
                <p className="text-sm text-gray-500">No results found</p>
              )}

              {results.map((item) => (
                <div
                  key={item.C_ID}
                  className="flex justify-between items-center border border-gray-200 p-3 rounded-md hover:shadow-md transition"
                >
                  <div className="flex gap-6 items-center text-sm">
                    <p className="font-medium text-gray-800">{item.FullName}</p>
                    <p className="text-gray-600">{item.Email}</p>
                    <p className="text-gray-600">{item.PhoneNumber}</p>
                  </div>

                  <button
                    onClick={() =>{ setShowSearch(false)
                     navigate(`/admin/user/${item.C_ID}`)}}
                    className="bg-gray-800 text-white px-4 py-1 text-sm rounded hover:bg-gray-900 transition"
                  >
                    Details
                  </button>
                </div>
              ))}
            </div>


          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavBar;
