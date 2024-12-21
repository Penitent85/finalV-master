"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { assetsDashboard } from "../../../assets/assets";
import adminContext, { AdminContext } from "@/context/AdminContext";
import { DashboardContext } from "@/context/DashboardContext";
import image from "@/assets/123.jpg";
import {DoctorContext} from "@/context/DoctorContext";
import {AppContext} from "@/context/AppContext";
import {Numbers} from "@mui/icons-material";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData,doctors ,getAllDoctors , patients,getAllPatiant , getAllAppointments ,appointments} = useContext(AdminContext);



  const { slotDateFormat } = useContext(DashboardContext);

  console.log("aa"+appointments)
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
      getAllPatiant();
      getAllAppointments();
    }
  }, []);

  const splitTime = (time) => {
    const utcDate = new Date(time);
    return   utcDate.toLocaleTimeString('en-GB', { hour12: false }); // Time in format HH:mm:ss



  }
  const splitDate = (date) => {
    const utcDate = new Date(date);
    return   utcDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Date in format YYYY:MM:DD

  }

  return (

      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <Image className="w-14" src={assetsDashboard.doctor_icon} alt="Doctor Icon" width={56} height={56} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{doctors?.length}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <Image className="w-14" src={assetsDashboard.appointments_icon} alt="Appointments Icon" width={56} height={56} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{ appointments?.length}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <Image className="w-14" src={assetsDashboard.patients_icon} alt="Patients Icon" width={56} height={56} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{patients?.length}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <Image src={assetsDashboard.list_icon} alt="List Icon" width={24} height={24} />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          {/*   getLatest Apptontment  */}
          <div className="pt-4 border border-t-0">
            {appointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <Image
                  className="rounded-full w-10"
                  // src={item.docData.image}
                  src={image}
                  alt={`${item.doctor.user.first_name}'s Profile Picture`}
                  width={40}
                  height={40}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.doctor.user.first_name} {item.doctor.user.last_name}</p>
                  <p className="text-gray-600">
                    {`${splitDate(item.date)} ${splitTime(item.time)} `}
                  </p>
                </div>
                {item.status ==="pending"? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) :
                  <p className="text-green-500 text-xs font-medium">Completed</p>

                }
              </div>
            ))}
          </div>
        </div>

      </div>

  );
};

export default Dashboard;
