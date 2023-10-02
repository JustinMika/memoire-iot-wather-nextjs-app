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

const Sol = () => {
   const [data, setData] = useState();

   useEffect(() => {
      const getData = () => {
         axios
            .get("/api/v1/all-data")
            .then((response: any) => {
               console.log(response?.data?.rows);
               // setData(response?.data?.rows);
            })
            .catch((error) => {
               console.error("Error fetching posts:", error);
            });
      };

      const intervalId = setInterval(getData, 5000);

      return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
      const generateNewData = () => {
         axios
            .get("/api/v1/humidite")
            .then((response: any) => {
               console.log(response?.data?.rows);
               setData(response?.data?.rows);
            })
            .catch((error) => {
               console.error("Error fetching posts:", error);
            });
      };

      const intervalId2 = setInterval(generateNewData, 5000); // Toutes les 20 secondes

      return () => clearInterval(intervalId2);
   }, []);

   return (
      <div className="bg-white shadow-md w-full h-[70vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            {"Niveau d'humidite"}
         </span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={730}
               height={250}
               data={data}
               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
               <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#009" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#0092" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="Heure" />
               <YAxis />
               <Tooltip />
               <Area
                  type="monotone"
                  dataKey="humidite"
                  stroke="#009"
                  fillOpacity={1}
                  fill="url(#colorPv)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Sol;
