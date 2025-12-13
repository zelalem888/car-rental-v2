import { LogOutIcon , Plus ,Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ManageDrivers = () => {
 const [superAdminData, setSuperAdminData] = useState();
    const [allDrivers, setAllDrivers] = useState([]);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [targetID, setTargetID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) {
                    navigate("/admin/login");
                    return;
                }

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
                    localStorage.removeItem("jwt-token");
                    return navigate("/admin/login");
                }



                const adminData = await responseVerify.json();

                if(adminData.user.type !="superadmin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/admin`)
                }
                setSuperAdminData(adminData.user);

                const driverResponse = await fetch("http://localhost:3000/api/superadmin/drivers");

                if (!driverResponse.ok) throw new Error("Failed to fetch admins");
                const drivers = await driverResponse.json();
                setAllDrivers(drivers.drivers);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [deletePopUp, navigate]);

    // Delete handlers
    const handleDelete = (D_ID) => {
        setDeletePopUp(true);
        setTargetID(D_ID);
    };

    const cancelDelete = () => setDeletePopUp(false);

    const confirmDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/superadmin/delete/driver/${targetID}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);
            setDeletePopUp(false);

        } catch (e) {
            alert("Unexpected error occurred");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin List</h2>

                {/* Add Admin Button */}
                <div className="flex gap-4">
                <button
                    onClick={() => navigate("/superadmin/add-admin")}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                    <Plus size={18} />
                    <span>Add Admin</span>
                </button>
                <button
                    onClick={() => navigate("/superadmin/add-driver")}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                    <Plus size={18} />
                    <span>Add Driver</span>
                </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Full Name</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th className="py-3 px-4 text-left">License Number</th>
                            <th className="py-3 px-4 text-left">Experience Years</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allDrivers &&
                            allDrivers.map((driver, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4 font-medium text-gray-800">{driver.full_name}</td>
                                    <td className="py-2 px-4">{driver.phone}</td>
                                    <td className="py-2 px-4">{driver.license_number}</td>
                                    <td className="py-2 px-4">{driver.experience_years}</td>
                                    <td className="py-2 px-4">{driver.status}</td>

                                    {/* Actions */}
                                    <td className="py-2 px-4 text-center flex justify-center gap-2">
                                        {/* Edit */}
                                        <button
                                            onClick={() => navigate(`/superadmin/update-driver/${driver.D_ID}`)}
                                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                        >
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(driver.D_ID)}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Delete Confirmation */}
                {deletePopUp && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this admin? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageDrivers
