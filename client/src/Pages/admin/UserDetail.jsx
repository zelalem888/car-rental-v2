import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPrintReservation from "../../components/printPDF/AdminPrintReservation";
import PrintLog from "../../components/printPDF/printLog";
const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("current");
  const [userData, setUserData] = useState();
  const [userReservedH, setUserReservedH] = useState([]);
  const [usersLog, setUsersLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwt-token");
        if (!token) return navigate("/admin/login");

        const verify = await fetch("http://localhost:3000/api/admin/verify", {
          method: "POST",
          headers: { "jwt-token": token },
        });

        if (!verify.ok) {
          localStorage.removeItem("jwt-token");
          return navigate("/admin/login");
        }

        const res = await fetch(`http://localhost:3000/api/user/detail/${id}`);
        const data = await res.json();

        // console.log(data)
        setUserReservedH(data.userReservedH || []);
        setUsersLog(data.usersLog || []);
        setUserData(data.customerName || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  /* ======================= PRINT HELPERS ======================= */
  const printReservation = (r) => {
    AdminPrintReservation(r);
  };


  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        User - {userData[0].FullName} | Email - {userData[0].Email}
      </h1>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 border-b mb-6">
        {["current", "history", "profile"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {tab === "current"
              ? "Current Reservations"
              : tab === "history"
              ? "Reservation Logs"
              : "User Profile"}
          </button>
        ))}
      </div>

      {/* ================= CURRENT RESERVATIONS ================= */}
      {activeTab === "current" && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Res ID</th>
                <th className="p-3">Admin Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Pickup</th>
                <th className="p-3">Return</th>
                <th className="p-3">Days</th>
                <th className="p-3">Total</th>
                <th className="p-3">Tax</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userReservedH.map((r) => (
                <tr key={r.R_ID}>
                  <td className="p-3">{r.R_ID}</td>
                
                  <td className="p-3">{r.adminName|| "..."}</td>
                  <td className="p-3">{r.Status}</td>
                  <td className="p-3">{new Date(r.Pickup_Date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(r.Return_Date).toLocaleDateString()}</td>
                  <td className="p-3">{r.Rent_Day}</td>
                  <td className="p-3 font-semibold">{r.total_Payment} birr</td>
                  <td className="p-3 font-semibold">{r.Tax_Amount} birr</td>
                  <td className="p-3">
                    <button
                      onClick={() => printReservation(r)}
                      className="text-indigo-600 hover:underline"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= RESERVATION LOGS ================= */}
      {activeTab === "history" && (
        <div className="bg-white rounded shadow p-4 print-area">
          <div className="flex justify-end mb-4 print:hidden">
           <button
            onClick={() =>
              PrintLog(usersLog, {
                FullName: userData[0].FullName,
                Email: userData[0].Email,
              })
            }
            className="bg-blue-700 text-white py-2 px-3 rounded-md" 
          >
            Print Logs PDF
          </button>
          </div>

          {/* PRINT HEADER */}
          <div className="hidden print:block text-center mb-6">
            <h1 className="text-2xl font-bold">User Reservation Logs</h1>
            <p className="text-sm mt-1">
              Name: {userData[0].FullName} | Email: {userData[0].Email}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Printed on: {new Date().toLocaleString()}
            </p>
            <hr className="mt-4" />
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Res ID</th>
                <th className="p-3">Action</th>
                <th className="p-3">Old</th>
                <th className="p-3">New</th>

                <th className="p-3">Pickup</th>
                <th className="p-3">Return</th>
                <th className="p-3">Days</th>
                <th className="p-3">Price/Day</th>
                <th className="p-3">Tax</th>

                <th className="p-3">Charge</th>
                <th className="p-3">Overpaid</th>
                <th className="p-3">Refund</th>

                <th className="p-3">Confirmation</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {usersLog.map((l) => (
                <tr key={l.Log_ID} className="hover:bg-gray-50">
                  <td className="p-3">{l.Log_ID}</td>
                  <td className="p-3">{l.Reservation_ID}</td>
                  <td className="p-3 capitalize">{l.Action_Type}</td>
                  <td className="p-3">{l.Old_Status}</td>
                  <td className="p-3">{l.New_Status}</td>

                  <td className="p-3">
                    {new Date(l.Pickup_Date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(l.Return_Date).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">{l.Rent_Days}</td>

                  <td className="p-3">
                    {Number(l.Price_Per_Day).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {l.Tax_Amount ? Number(l.Tax_Amount).toLocaleString() : "—"}
                  </td>

                  <td className="p-3 font-medium">
                    {Number(l.Total_Charge).toLocaleString()}
                  </td>

                  <td className="p-3 text-green-600">
                    {l.Overpayment ? Number(l.Overpayment).toLocaleString() : "—"}
                  </td>

                  <td className="p-3 text-red-600">
                    {l.Refund ? Number(l.Refund).toLocaleString() : "—"}
                  </td>

                  <td className="p-3">{l.Confirmation_Number}</td>

                  <td className="p-3 text-xs text-gray-600">
                    {new Date(l.Logged_At).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ================= USER PROFILE ================= */}
      {activeTab === "profile" && userData && (
  <div className="bg-white rounded shadow p-8 space-y-6">
    <h2 className="text-2xl font-bold mb-6">User Profile</h2>

    {/* USER BASIC INFO */}
    <div className="grid grid-cols-2 gap-8 text-sm">
      <div>
        <p className="font-medium text-gray-700">Full Name</p>
        <p className="text-gray-900">{userData[0].FullName}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Email</p>
        <p className="text-gray-900">{userData[0].Email}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Phone Number</p>
        <p className="text-gray-900">{userData[0].PhoneNumber}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Date of Birth</p>
        <p className="text-gray-900">{new Date(userData[0].DoB).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Nationality</p>
        <p className="text-gray-900">{userData[0].Nationality}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">City</p>
        <p className="text-gray-900">{userData[0].City}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Register Date</p>
        <p className="text-gray-900">{new Date(userData[0].Register_Date).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Last Updated</p>
        <p className="text-gray-900">{userData[0].Update_Date}</p>
      </div>
    </div>

    {/* USER DOCUMENTS */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Documents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userData[0].Documents
          ? Object.entries(JSON.parse(userData[0].Documents)).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-100 rounded shadow p-4 flex flex-col items-center"
              >
                <p className="text-gray-700 font-medium mb-2 capitalize">{key.replace("_", " ")}</p>
                {value ? (
                  <img
                    src={`http://localhost:3000${value}`}
                    alt={key}
                    className="h-48 w-full object-contain rounded border"
                  />
                ) : (
                  <div className="h-48 w-full flex items-center justify-center bg-gray-200 text-gray-500 rounded">
                    No Document
                  </div>
                )}
              </div>
            ))
          : <p className="text-gray-500">No documents uploaded</p>}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserDetail;
