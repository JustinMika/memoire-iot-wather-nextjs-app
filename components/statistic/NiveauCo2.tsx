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
   co2: number;
}

const NiveauCo2 = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "", co2: 9.8 },
      { Heure: "", co2: 15.2 },
      { Heure: "", co2: 6.5 },
      { Heure: "", co2: 0.3 },
      { Heure: "", co2: 1.0 },
      { Heure: "", co2: 7.7 },
      { Heure: "", co2: 4.3 },
      { Heure: "", co2: 3.8 },
      { Heure: "", co2: 12.6 },
      { Heure: "", co2: 0.7 },
      { Heure: "", co2: 0.0 },
      { Heure: "", co2: 8.9 },
      { Heure: "", co2: 2.4 },
      { Heure: "", co2: 0.0 },
      { Heure: "", co2: 0.1 },
      { Heure: "", co2: 11.3 },
      { Heure: "", co2: 13.7 },
      { Heure: "", co2: 6.8 },
      { Heure: "", co2: 18.5 },
      { Heure: "", co2: 0.5 },
      { Heure: "", co2: 9.2 },
      { Heure: "", co2: 5.9 },
      { Heure: "", co2: 1.2 },
      { Heure: "", co2: 0.8 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            co2: parseFloat(getRandomFloat(0, 20)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

   return (
      <div className="bg-white shadow-md w-full h-[70vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            Niveau du co2
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
                     <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="Heure" />
               <YAxis />
               <Tooltip />
               <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default NiveauCo2;
