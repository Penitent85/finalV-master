"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext(null);

const DoctorContextProvider = (props) => {
  const backendUrl = 'http://localhost:8000/';
  const [doctorId, setDoctorId] = useState(null);
  const [dToken, setDToken] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [clinic, setClinic] = useState(null)



  useEffect(()=>{
if(!dToken) {
  setDToken(localStorage.getItem("dToken"));
}
if(!doctorId) {
  setDoctorId(localStorage.getItem("doctorId"));
}


  },[doctorId,dToken])

  // Getting Doctor appointment data from Database using API
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `api/doctors/${doctorId}/appointments`,
        { headers: {
          Authorization: `Bearer ${dToken}`
          } }
      );

      console.log( 'data apoon' , data)

      if (data) {
        setAppointments(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  console.log('appointments',appointments);

  // Getting Doctor profile data from Database using API
  const getProfileData = async () => {

    try {
       const { data } = await axios.get(backendUrl + `api/doctors/${doctorId}`, {
        headers:
        {
          Authorization: `Bearer ${dToken}`,
        },
      });
       setProfileData(data.data);
       console.log( 'profile data',data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to cancel doctor appointment using API
  // not working
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: {
          Authorization: `Bearer ${dToken}`
          } }
      );

      if (data) {
        toast.success(data.message);
        getAppointments();
        // after creating dashboard
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to Mark appointment completed using API
  // not working
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: {
          Authorization: `Bearer ${dToken}`
          } }
      );

      if (data) {
        toast.success(data.message);
        getAppointments();
        // Later after creating getDashData Function
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `api/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${dToken}`
        },
      });
      // console.log('dash ----- data',data.data);
      if (data) {
        setDashData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // console.log('DASH data',dashData);


  const getAppointmentData = async () => {

    // console.log('Dtoken get Apontement ',dToken)
    // console.log( '----backendUrl---',backendUrl + `api/doctors/${doctorId}/appointments` )
    try {
      const { data } = await axios.get(backendUrl + `api/doctors/${doctorId}/appointments`, {
        headers: {
          Authorization: `Bearer ${dToken}`
        },
      });

      if (data) {
        setAppointments(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };



  const getClinic = async () => {

    const  clinic = await axios.get(backendUrl + `api/clinics`, {
        headers: {
            Authorization: `Bearer ${dToken}`
        },
    }
    )

    console.log( 'clinic',clinic)
        if(clinic){
            setClinic(clinic.data.data)
        }
        else{
            toast.error(clinic.data.message)
        }




  };


  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    getClinic,
    dashData,
    getDashData,
    getAppointmentData,
    profileData,
    setProfileData,
    getProfileData,
    setDoctorId,
    clinic,
    doctorId,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
