"use client";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [doctors, setDoctors] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let token_;
    token_ =localStorage.getItem("token");
    if(!token_){
        token_ = localStorage.getItem("dToken")
    }
    if(!token_){
      token_ = localStorage.getItem("aToken")
    }

    setToken(token_);

    // if (token_) {
    //   getDoctosData();
    //   loadUserProfileData();
    // }

  }, [setToken, token]);


 

  // Getting Doctors using API
  const getDoctosData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Doctor data", data.data);
      if (data) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login to view doctors");
    }
  };


  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `api/patients/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        console.log("object data", data);
        setUserData(data.data);
      }
    } catch (error) {
    //   console.log(error);
    //   toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctosData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    setUserId,
    userId,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
