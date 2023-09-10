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
   Pluie: number;
}

const TemperaturePluie = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "0h", Temperature: 32.5, Pluie: 9.8 },
      { Heure: "1h", Temperature: 23.1, Pluie: 15.2 },
      { Heure: "2h", Temperature: 18.7, Pluie: 6.5 },
      { Heure: "3h", Temperature: 12.8, Pluie: 0.3 },
      { Heure: "4h", Temperature: 27.4, Pluie: 1.0 },
      { Heure: "5h", Temperature: 14.6, Pluie: 7.7 },
      { Heure: "6h", Temperature: 31.2, Pluie: 4.3 },
      { Heure: "7h", Temperature: 19.8, Pluie: 3.8 },
      { Heure: "8h", Temperature: 22.7, Pluie: 12.6 },
      { Heure: "9h", Temperature: 29.3, Pluie: 0.7 },
      { Heure: "10h", Temperature: 36.9, Pluie: 0.0 },
      { Heure: "11h", Temperature: 33.4, Pluie: 8.9 },
      { Heure: "12h", Temperature: 26.5, Pluie: 2.4 },
      { Heure: "13h", Temperature: 14.9, Pluie: 0.0 },
      { Heure: "14h", Temperature: 37.8, Pluie: 0.1 },
      { Heure: "15h", Temperature: 20.2, Pluie: 11.3 },
      { Heure: "16h", Temperature: 28.7, Pluie: 13.7 },
      { Heure: "17h", Temperature: 38.6, Pluie: 6.8 },
      { Heure: "18h", Temperature: 15.3, Pluie: 18.5 },
      { Heure: "19h", Temperature: 26.8, Pluie: 0.5 },
      { Heure: "20h", Temperature: 31.1, Pluie: 9.2 },
      { Heure: "21h", Temperature: 17.6, Pluie: 5.9 },
      { Heure: "22h", Temperature: 39.2, Pluie: 1.2 },
      { Heure: "23h", Temperature: 20.8, Pluie: 0.8 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            Temperature: parseFloat(getRandomFloat(8, 40)),
            Pluie: parseFloat(getRandomFloat(0, 20)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

   return (
      <div className="bg-white shadow-md w-full h-[70vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            Temperature Ambiante & Pluie
         </span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart
               width={730}
               height={250}
               data={data}
               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                  dataKey="Pluie"
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
