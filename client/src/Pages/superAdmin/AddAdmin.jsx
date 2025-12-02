import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    const navigate = useNavigate();

    const [SA_ID, setSuperAdminId] = useState(null);
    const [formData, setFormData] = useState({
        type: "admin",
        fullName: "",
        userName: "",
        password: "",
        phoneNumber: "",
        address: "",
        status: "",
        registrationDate: "",
    });

    const [errors, setErrors] = useState({});

    // Verify superadmin
    useEffect(() => {
        const verifySuperAdmin = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) return navigate("/superadmin/login");

                const res = await fetch("http://localhost:3000/api/admin/verify", {
                    method: "POST",
                    headers: { "jwt-token": token },
                });

                if (!res.ok) {
                    localStorage.removeItem("jwt-token");
                    return navigate("/superadmin/login");
                }

                const data = await res.json();
                setSuperAdminId(data.user.id);
            } catch (e) {
                console.error("Verification error:", e);
            }
        };
        verifySuperAdmin();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Frontend validation
    const validate = () => {
        const errs = {};
        if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
        if (!formData.userName.trim()) errs.userName = "Username is required";
        if (formData.password && formData.password.length < 6)
            errs.password = "Password must be at least 6 characters";
        if (formData.phoneNumber && !/^\+?\d{7,15}$/.test(formData.phoneNumber))
            errs.phoneNumber = "Invalid phone number";
        if (!formData.address.trim()) errs.address = "Address is required.";
        if (!formData.status) errs.status = "Status must be selected.";
        if (!formData.registrationDate) errs.registrationDate = "Date is required.";


        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!SA_ID) return alert("Super Admin not verified.");
        if (!validate()) return;

        try {
            const res = await fetch("http://localhost:3000/api/superadmin/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "jwt-token": localStorage.getItem("jwt-token"),
                },
                body: JSON.stringify({ SA_ID, ...formData }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to register admin.");
            }

            const successData = await res.json();
            navigate("/superadmin/manage-admins");
        } catch (e) {
            console.log(e.message);
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Admin
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.userName && <p className="text-red-600">{errors.userName}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.password && <p className="text-red-600">{errors.password}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.address && <p className="text-red-600">{errors.address}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-600">{errors.status}</p>}
                    </div>

                    {/* Registration Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Registration Date</label>
                        <input
                            type="date"
                            name="registrationDate"
                            value={formData.registrationDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.registrationDate && <p className="text-red-600">{errors.registrationDate}</p>}
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition"
                        >
                            Add Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;
