import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("current");
  const [userData, setUserData] = useState()
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

        setUserReservedH(data.userReservedH || []);
        setUsersLog(data.usersLog || []);
        setUserData(data.customerName || [])
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  /* =======================
      PRINT HELPERS
  ======================= */

  const printReservation = (r) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Reservation #${r.R_ID}</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            h1 { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>Reservation Receipt</h1>
          <table>
            <tr><td>Reservation ID</td><td>${r.R_ID}</td></tr>
            <tr><td>Status</td><td>${r.Status}</td></tr>
            <tr><td>Pickup Date</td><td>${new Date(r.Pickup_Date).toDateString()}</td></tr>
            <tr><td>Return Date</td><td>${new Date(r.Return_Date).toDateString()}</td></tr>
            <tr><td>Days</td><td>${r.Rent_Day}</td></tr>
            <tr><td>Total Payment</td><td>$${r.total_Payment}</td></tr>
            <tr><td>Confirmation</td><td>${r.Confirmation_Number}</td></tr>
          </table>
          <script>
            window.print();
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const printAllLogs = () => {
    window.print();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User - {userData[0].FullName} # Email - {userData[0].Email}</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {["current", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {tab === "current" ? "Current Reservations" : "Reservation Logs"}
          </button>
        ))}
      </div>

      {/* CURRENT */}
      {activeTab === "current" && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Res ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Pickup</th>
                <th className="p-3">Return</th>
                <th className="p-3">Days</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userReservedH.map((r) => (
                <tr key={r.R_ID}>
                  <td className="p-3">{r.R_ID}</td>
                  <td className="p-3">{r.Status}</td>
                  <td className="p-3">{new Date(r.Pickup_Date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(r.Return_Date).toLocaleDateString()}</td>
                  <td className="p-3">{r.Rent_Day}</td>
                  <td className="p-3 font-semibold">${r.total_Payment}</td>
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

      {/* LOGS */}
      {activeTab === "history" && (
        <div className="bg-white rounded shadow p-4 print-area">
          <div className="flex justify-end mb-4 print:hidden">
            <button
              onClick={printAllLogs}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Print All Logs
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Res ID</th>
                <th className="p-3">Action</th>
                <th className="p-3">Old</th>
                <th className="p-3">New</th>
                <th className="p-3">Date</th>
                <th className="p-3">Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {usersLog.map((l) => (
                <tr key={l.Log_ID}>
                  <td className="p-3">{l.Log_ID}</td>
                  <td className="p-3">{l.Reservation_ID}</td>
                  <td className="p-3">{l.Action_Type}</td>
                  <td className="p-3">{l.Old_Status}</td>
                  <td className="p-3">{l.New_Status}</td>
                  <td className="p-3">{new Date(l.Logged_At).toLocaleString()}</td>
                  <td className="p-3">{l.Total_Charge || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
