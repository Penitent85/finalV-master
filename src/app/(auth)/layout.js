"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AdminContext } from "@/context/AdminContext";
import { DoctorContext } from "@/context/DoctorContext";
import { AppContext } from "@/context/AppContext";

export default function RootLayout({ children }) {
  const nav = useRouter();
  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (aToken || dToken || token) {
      nav.push('/');
    }
  }, [aToken,dToken,token]); // Run effect when dToken or nav changes

  return (
    <div className={` -mx-4 sm:mx-[-13%]`}>
 
        {children}
      </div>
   
  );
}
