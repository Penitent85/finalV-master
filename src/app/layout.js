
import AppContextProvider from "@/context/AppContext";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import "../../src/app/globals.css";
import DoctorContextProvider from "@/context/DoctorContext";
import DashboardContextProvider from "@/context/DashboardContext";
import AdminContextProvider from "@/context/AdminContext";
import 'react-toastify/dist/ReactToastify.css';
// import Head from "next/head";
import "./globals.css";
export const metadata = {
  title: 'Doctor Dashboard',
}
export default function RootLayout({ children }) {


  return (
    <html lang="en">


      <body className={` mx-4 sm:mx-[10%]`}>
      <ToastContainer position="top-center"/>

        <AppContextProvider>
        <DashboardContextProvider>
         <AdminContextProvider>
          <DoctorContextProvider>
          <Navbar />

          {children}
          <Footer />
          </DoctorContextProvider>

        </AdminContextProvider>
        </DashboardContextProvider>

        </AppContextProvider>

      </body>
    </html>
  );
}






