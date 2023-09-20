"use client";
import React, { useState, useEffect } from "react";
import {
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   AreaChart,
   Area,
} from "recharts";
import axios from "axios";

interface DataItem {
   Temperature: number;
   Heure: string;
}

const Temperature = () => {
   const [data, setData] = useState([]);

   axios
      .get("/api/v1/data")
      .then((response: any) => {
         // console.log(response?.data?.rows);
         setData(response?.data?.rows);
      })
      .catch((error) => {
         // console.error("Error fetching posts:", error);
      });

   useEffect(() => {
      const getData = () => {
         axios
            .get("/api/v1/all-data")
            .then((response: any) => {
               console.log(response?.data?.rows);
            })
            .catch((error) => {
               // console.error("Error fetching posts:", error);
            });
      };

      const intervalId = setInterval(getData, 5000);

      return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
      const generateNewData = () => {
         axios
            .get("/api/v1/data")
            .then((response: any) => {
               // console.log(response?.data?.rows);
               setData(response?.data?.rows);
            })
            .catch((error) => {
               // console.error("Error fetching posts:", error);
            });
      };

      const intervalId2 = setInterval(generateNewData, 5000); // Toutes les 20 secondes

      return () => clearInterval(intervalId2);
   }, []);

   return (
      <div className="bg-white shadow-md w-full h-[60vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            Temperature
         </span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={730}
               height={270}
               data={data}
               margin={{ top: 5, right: 20, left: 0, bottom: 30 }}
            >
               <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="Heure" />
               <YAxis />
               <Tooltip />
               <Area
                  type="monotone"
                  dataKey="Temperature"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Temperature;
