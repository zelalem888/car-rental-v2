// src/components/RequireRole.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireRole = ({ allowed = [], children, fallbackPath = "/admin/login" }) => {
    const [loading, setLoading] = useState(true);
    const [allowedAccess, setAllowedAccess] = useState(false);

    useEffect(() => {
        const check = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                if (!token) {
                    setAllowedAccess(false);
                    setLoading(false);
                    return;
                }

                // Try to get user info from localStorage (preferred if you already save it)
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setAllowedAccess(allowed.includes(user.type));
                    setLoading(false);
                    return;
                }

                // Otherwise, call verify endpoint (keeps it safe if no stored user)
                const res = await fetch("http://localhost:3000/api/admin/verify", {
                    method: "POST",
                    headers: { "jwt-token": token }
                });
                // console.log(res);
                if (!res.ok) {
                    setAllowedAccess(false);
                } else {
                    const data = await res.json();
                    setAllowedAccess(allowed.includes(data.type));
                    // Optional: store the user locally for faster checks
                    localStorage.setItem("user", JSON.stringify(data));
                }
            } catch (e) {
                console.error(e);
                setAllowedAccess(false);
            } finally {
                setLoading(false);
            }
        };

        check();
    }, [allowed]);

    if (loading) return null; // or a spinner component
    if (!allowedAccess) return <Navigate to={fallbackPath} replace />;

    return children;
};

export default RequireRole;