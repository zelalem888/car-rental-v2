import React from "react";
import { Outlet } from "react-router-dom";
import SuperAdminNavBar from "../components/default/SuperAdminNavBar";
const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <SuperAdminNavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export { SuperAdminLayout };
