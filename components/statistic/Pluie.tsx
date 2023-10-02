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
   pluie: number;
}

const Niveaupluie = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "", pluie: 9.8 },
      { Heure: "", pluie: 15.2 },
      { Heure: "", pluie: 6.5 },
      { Heure: "", pluie: 0.3 },
      { Heure: "", pluie: 1.0 },
      { Heure: "", pluie: 7.7 },
      { Heure: "", pluie: 4.3 },
      { Heure: "", pluie: 3.8 },
      { Heure: "", pluie: 12.6 },
      { Heure: "", pluie: 0.7 },
      { Heure: "", pluie: 0.0 },
      { Heure: "", pluie: 8.9 },
      { Heure: "", pluie: 2.4 },
      { Heure: "", pluie: 0.0 },
      { Heure: "", pluie: 0.1 },
      { Heure: "", pluie: 11.3 },
      { Heure: "", pluie: 13.7 },
      { Heure: "", pluie: 6.8 },
      { Heure: "", pluie: 18.5 },
      { Heure: "", pluie: 0.5 },
      { Heure: "", pluie: 9.2 },
      { Heure: "", pluie: 5.9 },
      { Heure: "", pluie: 1.2 },
      { Heure: "", pluie: 0.8 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            pluie: parseFloat(getRandomFloat(0, 20)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

   return (
      <div className="bg-white shadow-md w-full h-[75vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">pluie</span>
         <ResponsiveContainer width="100%" height="100%">
            <BarChart
               width={730}
               height={250}
               data={data}
               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
               <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="20%" stopColor="#82ca9d" stopOpacity={1} />
                     <stop offset="99%" stopColor="#82ca9d" stopOpacity={0.2} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="Heure" />
               <YAxis />
               <Tooltip />
               <Bar
                  type="monotone"
                  dataKey="pluie"
                  stroke="#32ca90"
                  fillOpacity={1}
                  fill="url(#colorPv)"
               />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Niveaupluie;
