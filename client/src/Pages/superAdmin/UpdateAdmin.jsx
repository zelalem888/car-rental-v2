import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: "",
        phoneNumber: "",
        address: "",
        status: "active",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) {
                    navigate("/admin/login");
                    return;
                }

                const response = await fetch(
                    `http://localhost:3000/api/superadmin/admin/${id}`,
                    {
                        headers: { "jwt-token": token },
                    }
                );

                if (!response.ok) {
                    navigate("/superadmin/manage-admins");
                    throw new Error("Admin not found");
                }

                const fulladmin = await response.json();
                const admin = fulladmin.admins;

                setFormData({
                    fullName: admin.FullName || "",
                    userName: admin.Username || "",
                    password: "" || "13246578",
                    phoneNumber: admin.PhoneNumber || "",
                    address: admin.Address || "",
                    status: admin.Status || "",
                });
            } catch (e) {
                console.error(e);
            }
        };

        fetchAdmin();
    }, [id, navigate]);

    const validate = () => {
        const errs = {};
        if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
        if (!formData.userName.trim()) errs.userName = "Username is required";
        if (formData.password && formData.password.length < 6)
            errs.password = "Password must be at least 6 characters";
        if (formData.phoneNumber && !/^\+?\d{7,15}$/.test(formData.phoneNumber))
            errs.phoneNumber = "Invalid phone number";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(
                `http://localhost:3000/api/superadmin/update-admin/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "jwt-token": token,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Update failed");
            }

            const data = await response.json();
            
            if(data.user.type != "superadmin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/admin`)
                }

            alert(data.message)
            navigate("/superadmin/manage-admins");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Update Admin
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                        {errors.fullName && (
                            <p className="text-red-700">{errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) =>
                                setFormData({ ...formData, userName: e.target.value })
                            }
                            placeholder="Username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                        {errors.userName && (
                            <p className="text-red-700">{errors.userName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            placeholder="Password (leave empty to keep current)"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-700">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-700">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition"
                        >
                            Update Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdmin;