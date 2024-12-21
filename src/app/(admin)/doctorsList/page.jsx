"use client";
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '@/context/AdminContext'
import images from '@/assets/123.jpg'
import Image from 'next/image'
const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
    console.log('DoctorsList', doctors)
}, [aToken])





  return (
    //id
    //id_number
      //online_active
    //speciality
      //available
      //about
      //user.{    id": 17,
      //                 "first_name": "saleh",
      //                 "last_name": "zetawi",
      //                 "username": "salehzt223es5dd34",
      //                 "email": "salehe2@gmai2l.cd44",
      //                 "phone": "0569522815",
      //                 "is active": true,
      //                 "role": "Doctor" }
      //  "clinics": {
      //                 "success": true,
      //                 "message": "clinics retrieved successfully",
      //                 "data": []
      //             },
      //             "doctor_ratings": []
      //
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <Image className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={images} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{`${item.user.first_name} ${item.user.last_name}`}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item.id ,!item.available )} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList