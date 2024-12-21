"use client";
import React, { useEffect } from 'react'
import { assetsDashboard } from '../../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '@/context/AdminContext'
import { AppContext } from '@/context/AppContext'
import { DashboardContext } from '@/context/DashboardContext';
import images from '@/assets/123.jpg'
import Image from "next/image";


const AllAppointments = () => {

  const {aToken, appointments, cancelAppointment, getAllAppointments} = useContext(AdminContext)
  const {slotDateFormat, calculateAge, currency} = useContext(DashboardContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments()

    }
  }, [aToken])
  console.log(appointments)
  const splitTime = (time) => {
    const utcDate = new Date(time);
    return   utcDate.toLocaleTimeString('en-GB', { hour12: false }); // Time in format HH:mm:ss



  }
  const splitDate = (date) => {
    const utcDate = new Date(date);
    return   utcDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Date in format YYYY:MM:DD

  }



  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <Image src={images} className='w-8 rounded-full' alt="" /> <p>{item.doctor.user.last_name}</p>
            </div>
            <p>18</p>
            <p className='max-sm:hidden'>{splitDate(item.date) }  {splitTime(item.time)}</p>
            <p>{item.doctor.user.username}</p>
            {/*<p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>*/}
        {/*    <div className='flex items-center gap-2'>*/}
        {/*      /!* <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p> *!/*/}
        {/*      <img src={images} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>*/}
        {/*    </div>*/}
            <p>{currency}{item.amount}</p>
            {item.status ==="pending" ?  <p className='text-red-400 text-xs font-medium'>Pending</p> :  <p className='text-green-500 text-xs font-medium'>Completed</p>   }
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments