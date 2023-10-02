"use client";
import NavBar from "@/components/NavBar";
import Vent from "@/components/statistic/Vent";
import axiosInstance from "@/lib/axios";
import { useEffect } from "react";

export default function Home() {
   // useEffect(() => {
   //    // receive data from Arduino
   //    axiosInstance
   //       .get("/api/data")
   //       .then((response) => {
   //          console.log(response);
   //       })
   //       .catch((error) => {
   //          console.error("Error fetching posts:", error);
   //       });
   // }, []);
   return (
      <main className="p-2">
         <NavBar />
         <Vent />
      </main>
   );
}
