"use client";
import React, { useContext, useState } from "react";
import { assetsDashboard } from "../../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../../context/AdminContext";
import { DashboardContext } from "../../../context/DashboardContext";
import Image from "next/image";
import images from "@/assets/123.jpg";

const AddDoctor = () => {

  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [is_active, setIs_active] = useState(0);
  const [password, setPassword] = useState();
  const [id_number, setId_number] = useState();
  const [role_id, setRole_id] = useState(2);
  const [online_active, setOnline_active] = useState(0);
  const [speciality, setSpeciality] = useState("General physician");
  const [available, setAvailable] = useState(0);

  const { backendUrl } = useContext(DashboardContext);
  const { aToken } = useContext(AdminContext);

  const formData = new FormData();


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("is_active", is_active);
    formData.append("password", password);
    formData.append("id_number", id_number);
    formData.append("role_id", role_id);
    formData.append("online_active", online_active);
    formData.append("speciality", speciality);
    formData.append("available", available);

    console.log("formData", formData);


    try {

      const { data } = await axios.post(backendUrl + "api/doctors", formData, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });


      if (data) {
        toast.success("Successfully added!");
        setFirst_name("");
        setLast_name("");
        setUsername("");
        setEmail("");
        setPhone("");
        setIs_active("");
        setPassword("");
        setId_number("");
        setRole_id("");
        setOnline_active("");
        setSpeciality("");
        setAvailable("");

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
             {/*<Image width={100} height={100} className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assetsDashboard.upload_area} alt="" />*/}
            <Image
              width={100}
              height={100}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={images}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            name=""
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>First name</p>
              <input
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Last name</p>
              <input
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p> User name</p>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Phone </p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Phone number"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>isActive</p>
              <select
                onChange={(e) => setIs_active(e.target.value)}
                value={is_active}
                className="border rounded px-2 py-2"
              >
                <option value={1}>Active</option>
                <option value={0}>Disabled</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Available</p>
              <select
                onChange={(e) => setAvailable(e.target.value)}
                value={available}
                className="border rounded px-2 py-2"
              >
                <option value={1}>Active</option>
                <option value={0}>Disabled</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Online Active</p>
              <select
                onChange={(e) => setOnline_active(e.target.value)}
                value={online_active}
                className="border rounded px-2 py-2"
              >
                <option value={1}>Active</option>
                <option value={0}>Disabled</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>ID Number </p>
              <input
                onChange={(e) => setId_number(e.target.value)}
                value={id_number}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Phone number"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Set Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Role</p>
              <select
                onChange={(e) => setRole_id(e.target.value)}
                value={role_id}
                className="border rounded px-2 py-2"
              >
                <option value={1}>1 Admin</option>
                <option value={2}>2 Patient</option>
                <option value={3}>3 Doctor</option>
                <option value={4}>4 Pharmacy user</option>
                <option value={5}>5 Laboratory user</option>
              </select>
            </div>


          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-2 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>


          </div>
        </div>



        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
