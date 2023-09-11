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

interface DataItem {
   Heure: string;
   Temperature: number;
}

const Temperature = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "0H", Temperature: 0.0 },
      { Heure: "1H", Temperature: 0.0 },
      { Heure: "2H", Temperature: 0.0 },
      { Heure: "3H", Temperature: 0.0 },
      { Heure: "4H", Temperature: 0.0 },
      { Heure: "5H", Temperature: 0.0 },
      { Heure: "6H", Temperature: 0.0 },
      { Heure: "7H", Temperature: 0.0 },
      { Heure: "8H", Temperature: 0.0 },
      { Heure: "9H", Temperature: 0.0 },
      { Heure: "10H", Temperature: 0.0 },
      { Heure: "11H", Temperature: 0.0 },
      { Heure: "12H", Temperature: 0.0 },
      { Heure: "13H", Temperature: 0.0 },
      { Heure: "14H", Temperature: 0.0 },
      { Heure: "15H", Temperature: 0.0 },
      { Heure: "16H", Temperature: 0.0 },
      { Heure: "17H", Temperature: 0.0 },
      { Heure: "18H", Temperature: 0.0 },
      { Heure: "19H", Temperature: 0.0 },
      { Heure: "20H", Temperature: 0.0 },
      { Heure: "21H", Temperature: 0.0 },
      { Heure: "22H", Temperature: 0.0 },
      { Heure: "23H", Temperature: 0.0 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            Temperature: parseFloat(getRandomFloat(8, 40)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

   return (
      <div className="bg-white shadow-md w-full h-[50vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            Temperature
         </span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={730}
               // height={250}
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
