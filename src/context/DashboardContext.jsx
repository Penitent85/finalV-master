"use client";
import { createContext } from "react";


export const DashboardContext = createContext()

const DashboardContextProvider = (props) => {

    // const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const currency = '$';
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        console.log(dateArray)
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <DashboardContext.Provider value={value}>
            {props.children}
        </DashboardContext.Provider>
    )

}

export default DashboardContextProvider;