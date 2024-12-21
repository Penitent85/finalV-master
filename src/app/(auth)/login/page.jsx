"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminContext } from "@/context/AdminContext";
import { DoctorContext } from "@/context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(0);

  const router = useRouter(); // Correct instance
  const {
    getDoctosData,
    currencySymbol,

    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    setUserId,
  } = useContext(AppContext);
  const {
    dToken,
    setDToken,
    appointments,
    getAppointments,
    completeAppointment,
    profileData,
    setProfileData,
    getProfileData,
    setDoctorId,
    doctorId,
  } = useContext(DoctorContext);
  const {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    dashData,
    setAdminId,
  } = useContext(AdminContext);

  // NEXT_PUBLIC_API_URL='http://127.0.0.1:8000/'
  //NEXT_PUBLIC_BACKEND_URL = 'http://localhost:4000'
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}api/login`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('----data-----------', data);

      if (data) {
        setRoleId(data.user.role_id);

        setUserId(data.user.id);
        if (roleId === 1) {
          setAToken(data.token);
          localStorage.setItem("aToken", data.token);
          router.push("/api/adminDashboard");
        } else if (roleId === 3) {
          setDToken(data.token)
          localStorage.setItem("dToken", data.token);
          setDoctorId(data.user.id);
           localStorage.setItem("doctorId", data.user.id)

          router.push("/appointment");
        } else if (roleId === 2) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setDoctorId(data.user.id);
          localStorage.setItem("doctorId", data.user.id)

          loadUserProfileData();
          router.push("/bookAppointment");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      // console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment or{" "}
          <Link className="text-blue-400" href="/adminLogin">
            {" "}
            Login as Doctor or Admin
          </Link>
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
