"use client";
import { assetsDashboard } from "@/assets/assets";
import axios from "axios";
import "./option.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AppContext } from "@/context/AppContext";
import {DoctorContext ,  }  from "@/context/DoctorContext";

const AppointmentsOption = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { dToken ,doctorId ,getDashData } = useContext(DoctorContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",

    p: 4,

    backgroundColor: "background.paper",
    boxShadow: 5,
  };

  const API_URL = 'http://localhost:8000/';


  // useEffect(() => {

    
    // fetchData();
  // }, []);

  // const fetchData = async () => {
  //   console.log('sfijhgsoidghaodighaoisdgh',`${API_URL}api/doctors/${doctorId}`)
  //   try {
  //     const { data } = await axios.get(`${API_URL}api/doctors/${doctorId}`, {
  //       headers: {
  //         Authorization: `Bearer ${dToken}`,
  //       },
  //     });
  //     console.log("Data.....", data);
  //     getDashData(data.data);
  //     console.log(`${API_URL}api/doctors/${doctorId}`)
  //   } catch (err) {
  //     console.log("Error fetching data:", err);
  //     // setError("Failed to fetch data. Please try again later.");
  //   }
  // };

  const data = {
    clinics: [
      {
        id: 1,
        name: "HealthCare Plus Clinic",
        address: "123 Main St, Springfield",
        phone: "+1 234 567 8900",
        doctorIds: [1, 2, 3],
      },
      {
        id: 2,
        name: "Downtown Family Clinic",
        address: "456 Elm St, Springfield",
        phone: "+1 234 567 8920",
        doctorIds: [2, 4],
      },
      {
        id: 3,
        name: "CareFirst Medical Center",
        address: "789 Oak St, Springfield",
        phone: "+1 234 567 8930",
        doctorIds: [1, 3, 5],
      },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Emily Carter",
        specialization: "Cardiology",
        email: "emily.carter@healthcareplus.com",
        phone: "+1 234 567 8910",
      },
      {
        id: 2,
        name: "Dr. Michael Johnson",
        specialization: "Dermatology",
        email: "michael.johnson@healthcareplus.com",
        phone: "+1 234 567 8911",
      },
      {
        id: 3,
        name: "Dr. Sophia Lee",
        specialization: "Pediatrics",
        email: "sophia.lee@downtownclinic.com",
        phone: "+1 234 567 8921",
      },
      {
        id: 4,
        name: "Dr. James Brown",
        specialization: "General Practice",
        email: "james.brown@downtownclinic.com",
        phone: "+1 234 567 8922",
      },
      {
        id: 5,
        name: "Dr. Olivia Garcia",
        specialization: "Orthopedics",
        email: "olivia.garcia@carefirst.com",
        phone: "+1 234 567 8931",
      },
    ],
  };

  const days = [
    "Sunday",
    "Saturday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const [clinicDays, setClinicDays] = useState(
    data.clinics.reduce((acc, clinic) => {
      acc[clinic.id] = [
        { day: "Sunday", availableFrom: "15:00:00", availableTo: "18:00:00" },
        { day: "Saturday", availableFrom: "15:00:00", availableTo: "18:00:00" },
        { day: "Monday", availableFrom: "15:00:00", availableTo: "18:00:00" },
        { day: "Tuesday", availableFrom: "15:00:00", availableTo: "18:00:00" },
        {
          day: "Wednesday",
          availableFrom: "15:00:00",
          availableTo: "18:00:00",
        },
        { day: "Thursday", availableFrom: "15:00:00", availableTo: "18:00:00" },
        { day: "Friday", availableFrom: "15:00:00", availableTo: "18:00:00" },
      ];
      return acc;
    }, {})
  );

  const handleChange = (clinicId, day, availableFrom, availableTo) => {
    setClinicDays((prev) => {
      const currentDays = prev[clinicId] || [];
      const dayIndex = currentDays.findIndex((d) => d.day === day);

      let updatedDays;
      if (dayIndex >= 0) {
        // Remove the day if it already exists
        updatedDays = currentDays.filter((_, idx) => idx !== dayIndex);
      } else {
        // Add the day if it doesn't exist
        updatedDays = [
          ...currentDays,
          {
            day,
            availableFrom: availableFrom || "15:00:00",
            availableTo: availableTo || "18:00:00",
          },
        ];
      }

      return { ...prev, [clinicId]: updatedDays };
    });
  };

  const handleChangeTime = (clinicId, day, availableFrom, availableTo) => {
    if (availableFrom >= availableTo) {
      return toast.error("Available time must be less than available to");
    }

    setClinicDays((prev) => {
      const currentDays = prev[clinicId] || [];
      const updatedDays = currentDays.map((d) => {
        if (d.day === day) {
          return { ...d, availableFrom, availableTo }; // Update the time for the specific day
        }
        return d;
      });

      return { ...prev, [clinicId]: updatedDays };
    });
  };
  const handleSubmit = async (event, clinicId, day) => {
    // const res=axios.put(``);
    event.preventDefault();
    try {
      const response   = await axios.get(`${API_URL}api/doctors`, {
        headers: {
            Authorization: `Bearer ${dToken}`,
        },
      });
      console.log(response.data);

      setDataA(response.data); // Store the extracted data
    } catch (err) {
      console.error("Error fetching data:", err);
      // setError("Failed to fetch data. Please try again later.");
    }

    handleClose();
  };
   
  const clinicsComp = data.clinics.map((cl, index) => (
    <div className="container mx-auto w-full px-4" key={index}>
      {cl.doctorIds.includes(doctorId) && (
        <div className="bg-white w-full relative flex flex-col justify-center rounded-t border  mt-10 ">
          <div className="flex justify-center items-center gap-2.5 px-4 py-3 rounded-t border">
            <Image src={assetsDashboard.list_icon} alt="" />
            <p className="font-semibold">{cl.name}</p>
          </div>
          <h1 className="text-center mt-2">Days Of Work</h1>

          <div className="relative w-full scrollable-content overflow-x-auto shadow-md sm:rounded-lg ">
            <table className=" table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Day
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Available From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Available To
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {clinicDays[cl.id]?.map((day, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 text-black">{day.day}</td>
                    <td className="px-6 py-4 text-black">
                      <input
                        type="time"
                        value={day.availableFrom}
                        disabled
                        className="bg-white"
                      />
                    </td>
                    <td className="px-6 py-4 text-black">
                      <input
                        type="time"
                        value={day.availableTo}
                        disabled
                        className="bg-white"
                      />
                    </td>
                    <td className="flex items-center h-full justify-start px-6 py-3">
                      Active{" "}
                      <Image
                        width={25}
                        height={25}
                        alt="active"
                        src={assetsDashboard.tick_icon}
                      />
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        sx={{ background: "green" }}
                        onClick={handleOpen}
                      >
                        Edit
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="opacity-30"
                      >
                        <Box sx={style}>
                          <form
                            onSubmit={(e) => handleSubmit(e, cl.id, day.day)}
                            className="flex flex-col"
                          >
                            <div>
                              <label>Available From :</label>
                              <input
                                type="time"
                                value={day.availableFrom}
                                className="bg-white"
                                onChange={(e) =>
                                  handleChangeTime(
                                    cl.id,
                                    day.day,
                                    e.target.value,
                                    day.availableTo
                                  )
                                }
                              />
                            </div>
                            <div>
                              <label>Available To :</label>
                              <input
                                type="time"
                                value={day.availableTo}
                                className="bg-white"
                                onChange={(e) =>
                                  handleChangeTime(
                                    cl.id,
                                    day.day,
                                    day.availableFrom,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <button className="bg-green-600 rounded text-white">
                              Save
                            </button>
                          </form>
                        </Box>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  ));

  return <div className="container mx-auto w-11/12 ">{clinicsComp}</div>;
};

export default AppointmentsOption;
