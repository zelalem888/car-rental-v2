import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
    const navigate = useNavigate();

    const [SA_ID, setSuperAdminId] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        license_number : "",
        experience_years: "",
        status: "",
    });

    const [errors, setErrors] = useState({});

    // Verify superadmin
    useEffect(() => {
        const verifySuperAdmin = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) return navigate("/admin/login");

                const res = await fetch("http://localhost:3000/api/admin/verify", {
                    method: "POST",
                    headers: { "jwt-token": token },
                });

                if (!res.ok) {
                    localStorage.removeItem("jwt-token");
                    return navigate("/admin/login");
                }

                const data = await res.json();
                if(data.user.type !="superadmin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/admin`)
                }
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
        if (formData.phoneNumber && !/^\+?\d{7,15}$/.test(formData.phoneNumber))
            errs.phoneNumber = "Invalid phone number";
        if (!formData.license_number.trim()) errs.license_number = "License Number is required.";
        if (!formData.experience_years.trim()) errs.experience_years = "Experience Years is required.";
        if (!formData.status) errs.status = "Status must be selected.";


        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!SA_ID) return alert("Super Admin not verified.");
        if (!validate()) return;

        try {
            const res = await fetch("http://localhost:3000/api/superadmin/driveradd", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "jwt-token": localStorage.getItem("jwt-token"),
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to register Driver.");
            }

            const successData = await res.json();
            navigate("/superadmin/manage-drivers");
        } catch (e) {
            console.log("internal error");
            // console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Driver
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

                    {/* License Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">License Number</label>
                        <input
                            type="text"
                            name="license_number"
                            value={formData.license_number}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.license_number && <p className="text-red-600">{errors.license_number}</p>}
                    </div>

                        {/* experience */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">experience</label>
                        <input
                            type="number"
                            name="experience_years"
                            value={formData.experience_years}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.experience_years && <p className="text-red-600">{errors.experience_years}</p>}
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
                            <option value="busy">busy</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-600">{errors.status}</p>}
                    </div>

            

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition"
                        >
                            Add Driver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDriver;
