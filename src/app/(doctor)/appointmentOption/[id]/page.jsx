"use client";
import { assetsDashboard } from "@/assets/assets";
import axios from "axios";
import "../option.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useParams, useRouter } from "next/navigation";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { DoctorContext } from "@/context/DoctorContext";
import { AppContext } from "@/context/AppContext";

const AppointmentsOption = () => {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null); // Store the current row's data
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [available, setAvailable] = useState(false);
  const dToken = localStorage.getItem("dToken");
  const { doctorId } = useContext(DoctorContext);

  const handleOpen = (row) => {
    setCurrentRow(row);
    setStartTime(row.start_time);
    setEndTime(row.end_time);
    setAvailable(row.available !== 0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const param = useParams();
  const pr2 = param.id.split("%2C");
  const clinicId = pr2[0];
  console.log("clinicId", clinicId);

  const [days, setdays] = useState([]);
  const { token } = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, [setOpen, open]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}api/doctors/${doctorId}/clinics/${pr2[0]}/schedule`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setdays(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const router = useRouter();

  const formatTime = (time, id) => {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours) - 8); // Add  8 hours to the time
    date.setMinutes(minutes);
    date.setSeconds(0);
    console.log("date======", date);
    console.log("id", id);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const formattedStartTime = formatTime(start_time, id);
    const formattedEndTime = formatTime(end_time, id);
    console.log(formattedStartTime, formattedEndTime);

    console.log(`Saving for ID: ${id}`, start_time, end_time, available);
    if (start_time === end_time) {
      return toast.error(
        "Try again: Start time must be different from End time"
      );
    }
    if (start_time > end_time) {
      return toast.error("Try again: Start time must be lower than End time");
    }

    const params = new URLSearchParams();
    params.append("start_time", formattedStartTime);
    params.append("end_time", formattedEndTime);
    params.append("available", available ? 1 : 0);

    

    try {
      const response = await axios.put(
        `${API_URL}api/doctors/3/clinics/${clinicId}/schedule/${id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Success", response);
      toast.success("Schedule updated successfully");
      handleClose();
    } catch (err) {
      console.log("Error updating schedule:", err);
      toast.error("Failed to update schedule. Please try again.");
    }
  };

  return (
    <div className="container mx-auto w-11/12 ">
      <div className="container mx-auto w-full px-4">
        <div className="bg-white w-full relative flex flex-col justify-center rounded-t border  mt-10 ">
          <div className="flex justify-center items-center gap-2.5 px-4 py-3 rounded-t border">
            <Image src={assetsDashboard.list_icon} alt="" />
            <p className="font-semibold">{pr2[1]}</p>
          </div>
          <h1 className="text-center mt-2">Days Of Work</h1>

          <div className="relative w-full scrollable-content overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                {days.map((d, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 text-black">{d.day}</td>
                    <td className="px-6 py-4 text-black">
                      <input
                        type="time"
                        value={d.start_time}
                        disabled
                        className="bg-white"
                      />
                    </td>
                    <td className="px-6 py-4 text-black">
                      <input
                        type="time"
                        value={d.end_time}
                        disabled
                        className="bg-white"
                      />
                    </td>
                    <td className="flex items-center h-full justify-start px-6 py-3">
                      {d.available !== 0 ? "Active" : "Offline"}
                      {d.available !== 0 ? (
                        <Image
                          width={25}
                          height={25}
                          alt="active"
                          src={assetsDashboard.tick_icon}
                        />
                      ) : (
                        <PersonOffOutlinedIcon
                          sx={{ bgcolor: "red", borderRadius: "50%" }}
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        sx={{ background: "green" }}
                        onClick={() => handleOpen(d)}
                      >
                        Edit <h1>{d.id}</h1>
                      </Button>

                      <Modal
                        open={open && currentRow?.id === d.id} // Ensure modal is row-specific
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex items-center justify-center bg-black/30" // Center the modal with a transparent backdrop
                      >
                        <Box
                          sx={{
                            backgroundColor: "white",
                            padding: "24px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            maxWidth: "400px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px", // Spacing between elements
                          }}
                        >
                          <form
                            onSubmit={(e) => handleSubmit(e, currentRow?.id)}
                            className="flex flex-col space-y-4"
                          >
                            <div className="flex items-center space-x-3">
                              <label
                                htmlFor="availability"
                                className="text-sm font-medium text-gray-700"
                              >
                                Availability:
                              </label>
                              <label className="switch">
                                <input
                                  id="availability"
                                  type="checkbox"
                                  onChange={() => setAvailable(!available)}
                                  checked={available}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="start-time"
                                className="text-sm font-medium text-gray-700 mb-1"
                              >
                                Available From:
                              </label>
                              <input
                                id="start-time"
                                type="time"
                                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                value={start_time}
                                onChange={(e) => setStartTime(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="end-time"
                                className="text-sm font-medium text-gray-700 mb-1"
                              >
                                Available To:
                              </label>
                              <input
                                id="end-time"
                                type="time"
                                className="bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                value={end_time}
                                onChange={(e) => setEndTime(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm font-medium  focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
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
      </div>
    </div>
  );
};

export default AppointmentsOption;
