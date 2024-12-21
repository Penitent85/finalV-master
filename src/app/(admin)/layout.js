"use client";

import NavbarDashboard from "@/components/AdminDashboard/NavbarDashborad.jsx";
import Sidebar from "@/components/AdminDashboard/Sidebar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AdminContext } from "@/context/AdminContext";

export default function RootLayout({ children }) {
  const nav = useRouter();
  const { aToken } = useContext(AdminContext);

  useEffect(() => {
    if (!aToken) {
      nav.push('/adminLogin');
    }
  }, [aToken, nav]); // Run effect when dToken or nav changes

  if (!aToken) {
    return null;
  }
  return (
    <div className={` -mx-4 sm:mx-[-13%]`}>
      <NavbarDashboard />
      <div className="flex items-start">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
