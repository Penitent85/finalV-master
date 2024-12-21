"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { assetsDashboard } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { AdminContext } from "../../context/AdminContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Sidebar = () => {
  const { dToken, doctorId,getClinic ,clinic  } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const pathname = usePathname();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // const [clinic, setClinic] = useState();

  useEffect(() => {
    console.log("run fetch data");

    fetchData();
    getClinic();
  }, []);

  const fetchData = async () => {
    try {
      console.log("enter fetch ");

      const { data } = await axios.get(`${API_URL}api/doctors/${doctorId}`, {
        headers: {
         Authorization: `Bearer ${dToken}`
        },
      });
      console.log(data);

      // setClinic(response.data.data.clinics.data);
    } catch (err) {
      console.log("Error fetching data:", err);
      // setError("Failed to fetch data. Please try again later.");
    }
  };


  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken ? (
        <ul className="text-[#515151] mt-5">
          <Link
            href="/adminDashboard"
            className={`flex items-center  gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/adminDashboard")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image className="min-w-5" src={assetsDashboard.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </Link>
          <Link
            href="/allAppointment"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/allAppointment")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointments</p>
          </Link>

          <Link
            href="/addDoctor"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/addDoctor")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image className="min-w-5" src={assetsDashboard.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </Link>
          <Link
            href="/doctorsList"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/doctorsList")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.people_icon}
              alt=""
            />
            <p className="hidden md:block">Doctors List</p>
          </Link>
        </ul>
      ) : (
        <ul className="text-[#515151] mt-5">
          <Link
            href="/doctorDashboard"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/doctorDashboard")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image className="min-w-5" src={assetsDashboard.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </Link>
          <Link
            href="/doctorAppointment"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/doctorAppointment")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointments</p>
          </Link>
          <Link
            href="/doctorProfile"
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/doctorProfile")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.people_icon}
              alt=""
            />
            <p className="hidden md:block">Profile</p>
          </Link>
          <Link
            href="/appointmentOption"
            className={`flex items-center  py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/appointmentOption")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointment Option</p>
          </Link>

          <li
            className={`flex items-center gap-1 md:gap-3 py-3.5  px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive("/doctorProfile")
                ? "bg-[#F2F3FF] border-r-4 border-primary"
                : ""
            }`}
          >
            <Image
              className="min-w-5"
              src={assetsDashboard.appointment_icon}
              alt=""
            />

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className=" flex cursor-pointer items-center justify-between rounded-lg  ">
                <p className="hidden md:block">Clinics Option</p>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4 text-black">
               clinic&&{clinic?.map((cl, index) => (
                  <li key={index}>
                    <Link
                        href={`/appointmentOption/${cl.id},${cl.name}`}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      {cl.name}
                    </Link>
                  </li>
              ))}
              </ul>
            </details>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
