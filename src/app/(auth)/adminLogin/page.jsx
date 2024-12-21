"use client";
import axios from "axios";
import React, { useContext, useState } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DoctorContext } from "@/context/DoctorContext";
import { AdminContext } from "@/context/AdminContext";

const Login = () => {
  const nav = useRouter();
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState();
  // NEXT_PUBLIC_API_URL='http://127.0.0.1:8000/'
  //NEXT_PUBLIC_BACKEND_URL = 'http://localhost:4000'
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const { setDToken, dToken, setDoctorId, doctorId } =
    useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);
  const formData = new FormData();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const { data } = await axios.post(backendUrl + "api/login", {
        email,
        password,
      });
      if (data) {
        setAToken(data.token);
        setDToken(data.token);
        setDoctorId(data.user.id);
        localStorage.setItem("dToken", data.token);
        localStorage.setItem("doctorId", data.user.id);
        setRoleId(data.user.role_id);
        console.log("data", data);

        nav.push("/doctorAppointment");
        //  nav.push("/doctorAppointment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("role_id", roleId);
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {/* {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )} */}
      </div>
    </form>
  );
};

export default Login;
