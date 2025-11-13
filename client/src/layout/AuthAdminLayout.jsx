import React from "react";
import { Outlet } from "react-router-dom";

const AuthAdminLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export { AuthAdminLayout };
