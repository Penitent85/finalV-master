"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  // const backendUrl = 'http://127.0.0.1:8000/'

  const [aToken, setAToken] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [noDoctor, setNoDoctor] = useState();
const [patients ,setPatients] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("aToken");
    if (token) setAToken(token);
  }, []);
  // Getting all Doctors data from Database using API
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctors", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
     console.log("--------------",data);
      if (data) {
        console.log('data', data)
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
       toast.error(error.message);
    }
  };
  const getAllPatiant = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/patients", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      console.log("--------patient------",data);
      if (data) {
        console.log('data', data)
        setPatients(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Function to change doctor availablity using API
  const changeAvailability = async (id , available) => {
    const params = new URLSearchParams();
    available = available ? 1 : 0;

    params.append("available", available);

available = available ? 1 : 0;
    try {
      const { data } = await axios.put(
        backendUrl + `api/doctors/${id}`,
          params
          ,
          { headers: {
            Authorization: `Bearer ${aToken}`,
              "content-type": "application/x-www-form-urlencoded",

            }

        }
      );
      if (data) {
        toast.success(data.message);
        await  getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting all appointment data from Database using API
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/appointments", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      console.log("--------------",data.data);
      if (data) {

        setAppointments(data.data);

      } else {
        toast.error(data.message);
      }


    } catch (error) {
      console.log('no appointment')
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to cancel appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Admin Dashboard data from Database using API
  const getDashData = async () => {
    try {
      // error route
      const { data } = await axios.get(backendUrl + "api/appointments", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (data) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    getDashData,
    cancelAppointment,
    dashData,
    patients,
    getAllPatiant
    // adminId,
    // setAdminId,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
