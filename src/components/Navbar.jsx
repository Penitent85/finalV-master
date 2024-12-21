"use client";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppContext } from "../context/AppContext";
import Image from "next/image";
import { assets } from "../assets/assets";
import { AdminContext } from "@/context/AdminContext";
import { DoctorContext } from "@/context/DoctorContext";
import Link from "next/link";
const Navbar = () => {
  const router = useRouter();
  const path = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
 

  
  
  const hidePath = [
    "/allAppointment",
    "/doctorsList",
    "/adminDashboard",
    "/addDoctor",
    "/doctorAppointment",
    "/doctorDashboard",
    "/doctorProfile",
    "/appointmentOption"
  ];
  const shouldHidePath = (path) => {
    // Check for exact matches
    if (hidePath.includes(path)) {
      return true;
    }
  
    // Check for dynamic segments with IDs (e.g., "/appointmentOption/:id")
    const dynamicPathRegex = new RegExp(
      `^(${hidePath.join("|")})(/[^/]+)?$`
    );
  
    return dynamicPathRegex.test(path);
  };

  const logout = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken(null);
      router.push("/login");
    } else if (dToken) {
      localStorage.removeItem("dToken");
      setDToken(null);
      router.push("/login");
    } else {
      localStorage.removeItem("aToken");
      setAToken(null);
      router.push("/login");
    }
  };

  return (
    <div
      className={`${
        shouldHidePath(path) ? "hidden" : "flex"
      }   items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]`}
    >
      <Image
        onClick={() => router.push("/")}
        className="w-44 cursor-pointer"
        src={assets.logo} // Update the path based on your public folder structure
        alt=""
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <li className={`${path === "/" ? "active" : ""}`}>
          <Link href="/" className="py-1">
            HOME
          </Link>
          <hr
            className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden`}
          />
        </li>
        <li className={`${path === "/doctors" ? "active" : ""}`}>
          <Link href="/doctors" className="py-1">
            ALL DOCTORS
          </Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className={`${path === "/about" ? "active" : ""}`}>
          <Link href="/about" className="py-1">
            ABOUT
          </Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className={`${path === "/CONTACT" ? "active" : ""}`}>
          <Link href="/contact" className="py-1">
            CONTACT
          </Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
      </ul>

      <div className="flex items-center gap-4 ">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <Image className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <Image
              className="w-2.5"
              src={assets.dropdown_icon} // Update the path based on your public folder
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => router.push("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => router.push("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : dToken  ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <Image className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <Image
              className="w-2.5"
              src={assets.dropdown_icon} // Update the path based on your public folder
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => router.push("/doctorDashboard")}
                  className="hover:text-black cursor-pointer"
                >
                   Dashboard
                </p>
            
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : aToken ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <Image className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <Image
              className="w-2.5"
              src={assets.dropdown_icon} // Update the path based on your public folder
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
               
                <p
                  onClick={() => router.push("/adminDashboard")}
                  className="hover:text-black cursor-pointer"
                >
                   Dashboard
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login | Create account
          </button>
        )}
        <Image
          onClick={() => setShowMenu(!showMenu)} // Toggle menu visibility
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />


        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <Image
              src={assets.logo} // Update the path based on your public folder
              className="w-36"
              alt=""
            />
            <Image
              onClick={() => setShowMenu(!showMenu)}
              src={assets.cross_icon} // Update the path based on your public folder
              className="w-7"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <li>
              <Link
                href="/"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded full inline-block"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/doctors"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded full inline-block"
              >
                ALL DOCTORS
              </Link>
            </li>
            <li>
              <a
                href="/about"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded full inline-block"
              >
                ABOUT
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded full inline-block"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
