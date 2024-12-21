"use client";

import NavbarDashboard from "@/components/AdminDashboard/NavbarDashborad.jsx";
import Sidebar from "@/components/AdminDashboard/Sidebar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { DoctorContext } from "@/context/DoctorContext";

export default function RootLayout({ children }) {
  const nav = useRouter();
  const { dToken } = useContext(DoctorContext);
  useEffect(() => {
    if (!dToken) {
      nav.push('/adminLogin');
    }
  }, [dToken, nav]); // Run effect when dToken or nav changes

  if (!dToken) {
    return null;
  }
  return (
    <div className={` -mx-4 sm:mx-[-13%]`}>
      <NavbarDashboard />
      <div className="flex items-start">
        <Sidebar  />
        {children}
      </div>
    </div>
  );
}
