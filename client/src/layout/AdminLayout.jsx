import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/default/AdminNavBar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <AdminNavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export { AdminLayout };
