import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

const AnalysisDashboard = () => {
    const [adminActivity, setAdminActivity] = useState([]);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const [vehicleDemand, setVehicleDemand] = useState([]);

    const [error, setError] = useState(null);

    const [summary, setSummary] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            const res = await fetch("http://localhost:3000/api/superadmin/reservation-summary");
            const data = await res.json();
            setSummary(data);
        };
        fetchSummary();
    }, []);

    useEffect(() => {
        const fetchAdminActivity = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) return;

                const res = await fetch("http://localhost:3000/api/superadmin/admin-activity", {
                    headers: { "jwt-token": token }
                });

                if (!res.ok) throw new Error("Failed to fetch admin activity");

                const data = await res.json();

                setAdminActivity(data.data);
            } catch (err) {
                console.error(err);
                setError("Unable to load admin activity");
            } finally {
                setLoadingAdmins(false);
            }
        };

        fetchAdminActivity();
    }, []);

    const [reservationTrend, setReservationTrend] = useState([
        { month: "Jan", reservations: 20 },
        { month: "Feb", reservations: 35 },
        { month: "Mar", reservations: 50 },
        { month: "Apr", reservations: 60 },
        { month: "May", reservations: 45 },
        { month: "Jun", reservations: 55 },
        { month: "Jul", reservations: 70 },
        { month: "Aug", reservations: 65 },
        { month: "Sep", reservations: 80 },
        { month: "Oct", reservations: 90 },
        { month: "Nov", reservations: 75 },
        { month: "Dec", reservations: 95 },
    ]);

    useEffect(() => {
        const fetchVehicleDemand = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/superadmin/vehicle-demand");
                const data = await res.json();
                if (data.success) {
                    setVehicleDemand(data.data);
                    console.log("Vehicle Demand Data:", data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchVehicleDemand();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative p-8">
                {/* --- Summary Cards --- */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <span className="text-gray-500">Total Reservations</span>
                        <span className="text-2xl font-bold text-gray-800">{summary.total}</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <span className="text-gray-500">Pending</span>
                        <span className="text-2xl font-bold text-yellow-500">{summary.pending}</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <span className="text-gray-500">Approved</span>
                        <span className="text-2xl font-bold text-green-600">{summary.approved}</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <span className="text-gray-500">Cancelled</span>
                        <span className="text-2xl font-bold text-red-500">{summary.rejected}</span>
                    </div>
                </div> */}

                {/* --- Reservation Trend Line Chart --- */}
                <div className="bg-white shadow rounded-lg p-5 mb-8">
                    <h3 className="text-gray-700 text-lg font-semibold mb-4">Monthly Reservation Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={reservationTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="reservations" stroke="#7F00FF" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* --- Admin Activity Table --- */}
                <div className="bg-white rounded-lg shadow overflow-x-auto mb-8">
                    <table className="min-w-full border border-gray-200">

                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Admin</th>
                                <th className="py-3 px-4 text-left">Total Actions</th>
                                <th className="py-3 px-4 text-left">Approved</th>
                                <th className="py-3 px-4 text-left">Cancelled</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loadingAdmins ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6">
                                        <div className="absolute inset-0 bg-white/0 flex items-center justify-center z-40">
                                            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : adminActivity.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6">
                                        No admin activity found
                                    </td>
                                </tr>
                            ) : (
                                adminActivity.map((admin, index) => (
                                    <tr
                                        key={admin.adminId}
                                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    >
                                        <td className="py-2 px-4">{admin.adminName}</td>
                                        <td className="py-2 px-4">{admin.totalActions}</td>
                                        <td className="py-2 px-4 text-green-600">
                                            {admin.confirmedCount}
                                        </td>
                                        <td className="py-2 px-4 text-red-500">
                                            {admin.cancelledCount}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

                {/* --- Vehicle Demand Bar Chart --- */}
                <div className="bg-white shadow rounded-lg p-5 mb-8">
                    <h3 className="text-gray-700 text-lg font-semibold mb-4">Vehicle Demand</h3>
                    {vehicleDemand.length === 0 ? (
                        <div>No vehicle demand data available</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={vehicleDemand}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="vehicleName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalReservations" fill="#7F00FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                </div>

            </div >
        </div >
    );
};

export default AnalysisDashboard;
