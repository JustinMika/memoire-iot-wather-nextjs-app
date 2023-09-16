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
   humidite: number;
}

const Sol = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "", humidite: 9.8 },
      { Heure: "", humidite: 15.2 },
      { Heure: "", humidite: 6.5 },
      { Heure: "", humidite: 0.3 },
      { Heure: "", humidite: 1.0 },
      { Heure: "", humidite: 7.7 },
      { Heure: "", humidite: 4.3 },
      { Heure: "", humidite: 3.8 },
      { Heure: "", humidite: 12.6 },
      { Heure: "", humidite: 0.7 },
      { Heure: "", humidite: 0.0 },
      { Heure: "", humidite: 8.9 },
      { Heure: "", humidite: 2.4 },
      { Heure: "", humidite: 0.0 },
      { Heure: "", humidite: 0.1 },
      { Heure: "", humidite: 11.3 },
      { Heure: "", humidite: 13.7 },
      { Heure: "", humidite: 6.8 },
      { Heure: "", humidite: 18.5 },
      { Heure: "", humidite: 0.5 },
      { Heure: "", humidite: 9.2 },
      { Heure: "", humidite: 5.9 },
      { Heure: "", humidite: 1.2 },
      { Heure: "", humidite: 0.8 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            humidite: parseFloat(getRandomFloat(0, 20)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

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
