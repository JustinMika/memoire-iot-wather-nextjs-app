"use client";
import React, { useState, useEffect } from "react";
import {
   BarChart,
   XAxis,
   YAxis,
   Bar,
   Tooltip,
   Legend,
   ResponsiveContainer,
   AreaChart,
   Area,
} from "recharts";
import axios from "axios";

interface DataItem {
   Heure: string;
   Temperature: number;
   Pluie: number;
}

const TemperaturePluie = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      const getData = () => {
         axios
            .get("/api/v1/all-data")
            .then((response: any) => {
               console.log(response?.data?.rows);
            })
            .catch((error) => {
               console.error("Error fetching posts:", error);
            });
      };

      const intervalId = setInterval(getData, 3000);

      return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
      const generateNewData = () => {
         axios
            .get("/api/v1/prec-pluie")
            .then((response: any) => {
               console.log(response?.data?.rows);
               setData(response?.data?.rows);
            })
            .catch((error) => {
               console.error("Error fetching posts:", error);
            });
      };

      const intervalId2 = setInterval(generateNewData, 3000); // Toutes les 20 secondes

      return () => clearInterval(intervalId2);
   }, []);

   return (
      <div className="bg-white w-full h-[70vh] p-2 rounded-sm space-y-3 shadow-md">
         <span className="my-2 text-center uppercase text-gray-500">
            Temperature Ambiante & precipitation
         </span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={730}
               height={280}
               data={data}
               margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
            >
               <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
               <Area
                  type="monotone"
                  dataKey="precipitation"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default TemperaturePluie;
