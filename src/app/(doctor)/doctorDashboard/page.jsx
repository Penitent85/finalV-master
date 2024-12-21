"use client";
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '@/context/DoctorContext'
import { assetsDashboard } from '@/assets/assets'
import { DashboardContext } from '@/context/DashboardContext'
import Image from 'next/image';
import images from '../../../assets/123.jpg'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment , appointments,getAppointmentData, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(DashboardContext)


  useEffect(() => {

    if (dToken) {
      getAppointmentData()
      getDashData()
    }
  }, [])

  // console.log( 'dashData',dashData )
  console.log('"""""__appap',dashData)

  // return appointments && (
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <Image className='w-14' src={assetsDashboard.earning_icon} alt="" />
          <div>
            {/*<p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>*/}
            <p className='text-xl font-semibold text-gray-600'>{currency}</p>
            <p className='text-xl font-semibold text-gray-600'>$$ $</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div
            className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <Image className='w-14' src={assetsDashboard.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{appointments.length}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <Image className='w-14' src={assetsDashboard.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p></div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <Image src={assetsDashboard.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {/*{appointments.slice(0, 5).map((item, index) => (*/}
          {/*  <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>*/}
          {/*    <Image className='rounded-full w-10' src={images} alt="" />*/}
          {/*    <div className='flex-1 text-sm'>*/}
          {/*      <p className='text-gray-800 font-medium'>{item.userData.name}</p>*/}
          {/*      <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>*/}
          {/*    </div>*/}
          {/*    {item.cancelled*/}
          {/*      ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>*/}
          {/*      : item.isCompleted*/}
          {/*        ? <p className='text-green-500 text-xs font-medium'>Completed</p>*/}
          {/*        : <div className='flex'>*/}
          {/*          <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assetsDashboard.cancel_icon} alt="" />*/}
          {/*          <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assetsDashboard.tick_icon} alt="" />*/}
          {/*        </div>*/}
          {/*    }*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>

      </div>
    </div>
  )
}

export default DoctorDashboard