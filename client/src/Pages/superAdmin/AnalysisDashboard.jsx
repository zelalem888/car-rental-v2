import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

const AnalysisDashboard = () => {
    const [adminActivity, setAdminActivity] = useState([]);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const [vehicleDemand, setVehicleDemand] = useState([]);
    const [reservationTrend, setReservationTrend] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [userAnalysis, setUserAnalysis] = useState(null);

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

    useEffect(() => {
        const fetchVehicleDemand = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/superadmin/vehicle-demand");
                const data = await res.json();
                if (data.success) {
                    setVehicleDemand(data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchVehicleDemand();
    }, []);

    useEffect(() => {
        const fetchReservationTrend = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/superadmin/reservation-trend");
                const data = await res.json();
                if (data.success) setReservationTrend(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservationTrend();
    }, []);


    const fetchIncomeSummary = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/superadmin/income-summary");
            const data = await res.json();

            setTotalIncome(data.totalIncome);
        } catch (error) {
            console.error("Failed to fetch income summary");
        }
    };

    useEffect(() => {
        fetchIncomeSummary();
    }, []);


    const fetchMonthlyIncome = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/superadmin/income-monthly-trend");
            const data = await res.json();
            setMonthlyIncome(data);
        } catch (error) {
            console.error("Failed to fetch monthly income");
        }
    };

    useEffect(() => {
        fetchMonthlyIncome();
    }, []);

    const fetchUserAnalysis = async () => {
        const res = await fetch("http://localhost:3000/api/superadmin/user-analysis");
        if (!res.ok) throw new Error("Failed to fetch user analysis");
        return res.json();
    };

    useEffect(() => {
        fetchUserAnalysis()
            .then(setUserAnalysis)
            .catch(err => console.error(err));
    }, []);

    const userTrendData =
        userAnalysis?.monthlyTrend?.map(item => ({
            month: item.month,
            users: item.users
        })) || [];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative p-8">
                {/* --- Summary Cards --- */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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
                </div>

                {/* --- Reservation Trend Line Chart --- */}
                <div className="bg-white shadow rounded-lg p-5 mb-8">
                    <h3 className="text-gray-700 text-lg font-semibold mb-4">Monthly Reservation Trend</h3>
                    {reservationTrend.length === 0 ? (
                        <div>No reservation trend data available</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={reservationTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="reservations" stroke="#7F00FF" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>)
                    }
                </div>

                {/* --- Admin Activity Table --- */}
                <div className="bg-white rounded-lg shadow overflow-x-auto mb-8">
                    <table className="min-w-full border border-gray-200">

                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Admin</th>
                                <th className="py-3 px-4 text-left">Total Actions</th>
                                <th className="py-3 px-4 text-left">Created</th>
                                <th className="py-3 px-4 text-left">Approved</th>
                                <th className="py-3 px-4 text-left">Updated</th>
                                <th className="py-3 px-4 text-left">Rejected</th>
                                <th className="py-3 px-4 text-left">Cancelled</th>
                                <th className="py-3 px-4 text-left">Done</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loadingAdmins ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-6">
                                        <div className="absolute inset-0 bg-white/0 flex items-center justify-center z-40">
                                            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : adminActivity.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-6">
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
                                        <td className="py-2 px-4 text-green-600"> {admin.createdCount}</td>
                                        <td className="py-2 px-4 text-green-600">{admin.confirmedCount}</td>
                                        <td className="py-2 px-4 text-blue-500"> {admin.updatedCount}</td>
                                        <td className="py-2 px-4 text-red-500">{admin.rejectedCount}</td>
                                        <td className="py-2 px-4 text-yellow-500">{admin.cancelledCount}</td>
                                        <td className="py-2 px-4 text-green-600"> {admin.doneCount}</td>
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

                {/* --- Total Income Card --- */}
                <div className="bg-white shadow rounded-lg p-5 mb-8">
                    {totalIncome === 0 ? (
                        <><div className="bg-white p-5 rounded-xl shadow mb-8">
                            <h3 className="text-gray-700 text-lg font-semibold mb-4">Total Income</h3>

                            No income data available
                        </div></>
                    ) : (<div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="text-gray-700 text-lg font-semibold mb-4">Total Income</h3>

                        <h2 className="text-2xl font-bold text-green-600">
                            {totalIncome.toLocaleString()} Birr
                        </h2>
                    </div>)}
                </div>

                {/* --- Monthly Income Trend Line Chart --- */}
                <div className="bg-white shadow rounded-lg p-5 mb-8">
                    {monthlyIncome && monthlyIncome.length === 0 ? (
                        <div className="bg-white shadow rounded-lg p-5 mt-8">
                            <h3 className="text-gray-700 text-lg font-semibold mb-4">Monthly Income Trend</h3>

                            No monthly income data available
                        </div>
                    ) : (
                        <>
                            <h3 className="text-gray-700 text-lg font-semibold mb-4 mt-8">Monthly Income Trend</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyIncome}>
                                    <XAxis dataKey="monthName" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="monthlyIncome"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer></>)}
                </div>

                {/* --- User Analysis Section --- */}
                {userAnalysis && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow">
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-3xl font-bold">{userAnalysis.totalUsers}</h2>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow">
                            <p className="text-gray-500">New This Month</p>
                            <h2 className="text-3xl font-bold">
                                {userAnalysis.newUsersThisMonth}
                            </h2>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow">
                            <p className="text-gray-500">Last Month</p>
                            <h2 className="text-3xl font-bold">
                                {userAnalysis.newUsersLastMonth}
                            </h2>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow">
                            <p className="text-gray-500">Growth</p>
                            <h2 className="text-3xl font-bold text-green-600">
                                {userAnalysis.growthPercentage}%
                            </h2>
                        </div>
                    </div>
                )}

                {/* --- Monthly User Registration Trend Line Chart --- */}
                <div className="bg-white shadow rounded-lg p-5 mt-8">
                    <h3 className="text-gray-700 text-lg font-semibold mb-4">
                        Monthly User Registration Trend
                    </h3>

                    {userTrendData.length === 0 ? (
                        <p>No user trend data available</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#7F00FF"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>


            </div >
        </div >
    );
};

export default AnalysisDashboard;
