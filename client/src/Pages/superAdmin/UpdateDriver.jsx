import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDriver = () => {
     const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
       fullName: "",
        phoneNumber: "",
        license_number : "",
        experience_years: "",
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
                    `http://localhost:3000/api/superadmin/driver/${id}`,
                    {
                        headers: { "jwt-token": token },
                    }
                );

                if (!response.ok) {
                    navigate("/superadmin/manage-admins");
                    throw new Error("driver not found");
                }

                const fullDriver = await response.json();
                const driver = fullDriver.driver;

                setFormData({
                    fullName: driver.full_name || "",
                    phoneNumber: driver.phone || "",
                    license_number: driver.license_number || "",
                    experience_years: driver.experience_years || "",
                    status: driver.status || "",
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
        if (!formData.license_number.trim()) errs.license_number = "License Number is required";
        if (!formData.experience_years) errs.experience_years = "Experience years is required";
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
                `http://localhost:3000/api/superadmin/update-driver/${id}`,
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

            alert(data.message)
            navigate("/superadmin/manage-drivers");
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
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            placeholder="phoneNumber"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-700">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            License Number
                        </label>
                        <input
                            type="text"
                            value={formData.license_number}
                            onChange={(e) =>
                                setFormData({ ...formData, license_number: e.target.value })
                            }
                            placeholder="License Number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.license_number && (
                            <p className="text-red-700">{errors.license_number}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Experience Years
                        </label>
                        <input
                            type="number"
                            value={formData.experience_years}
                            onChange={(e) =>
                                setFormData({ ...formData, experience_years: e.target.value })
                            }
                            placeholder="Experience Years"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {errors.experience_years && (
                            <p className="text-red-700">{errors.experience_years}</p>
                        )}
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
                            <option value="busy">busy</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition"
                        >
                            Update Driver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateDriver
