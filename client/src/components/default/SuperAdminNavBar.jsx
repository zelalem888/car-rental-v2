import { LogOutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SuperAdminNavBar = () => {
    const [superAdmin, setSuperAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) return navigate("/admin/login");

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

                const data = await responseVerify.json();

                setSuperAdmin(data.user);
            } catch (err) {
                console.log(err);
            }
        };
        verify();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("jwt-token");
        navigate("/admin/login");
    };

    if (!superAdmin) return null;

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between h-16">

                    {/* Logo / Brand */}
                    <div className="flex items-center">
                        <Link
                            to="/superadmin/manage-admins"
                            className="text-white text-2xl font-bold"
                        >
                            SuperAdmin
                        </Link>

                        <div className="hidden sm:flex sm:ml-6 sm:space-x-6">

                            <Link
                                to="/superadmin/manage-admins"
                                className="text-gray-300 hover:text-white transition px-2 py-2"
                            >
                                Manage Admins
                            </Link>

                            <Link
                                to="/superadmin/manage-drivers"
                                className="text-gray-300 hover:text-white transition px-2 py-2"
                            >
                                Manage Drivers
                            </Link>

                            <Link
                                to="/superadmin/analytics"
                                className="text-gray-300 hover:text-white transition px-2 py-2"
                            >
                                Analytics
                            </Link>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <span className="text-gray-300">{superAdmin.name} {"(SuperAdmin)"}</span>

                        <button
                            onClick={logoutHandler}
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                        >
                            <LogOutIcon className="h-4 w-4 mr-1" />
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default SuperAdminNavBar;
