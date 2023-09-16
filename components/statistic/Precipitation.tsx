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
   precipitation: number;
}

const Precipitation = () => {
   const [data, setData] = useState<DataItem[]>([
      { Heure: "", precipitation: 9.8 },
      { Heure: "", precipitation: 15.2 },
      { Heure: "", precipitation: 6.5 },
      { Heure: "", precipitation: 0.3 },
      { Heure: "", precipitation: 1.0 },
      { Heure: "", precipitation: 7.7 },
      { Heure: "", precipitation: 4.3 },
      { Heure: "", precipitation: 3.8 },
      { Heure: "", precipitation: 12.6 },
      { Heure: "", precipitation: 0.7 },
      { Heure: "", precipitation: 0.0 },
      { Heure: "", precipitation: 8.9 },
      { Heure: "", precipitation: 2.4 },
      { Heure: "", precipitation: 0.0 },
      { Heure: "", precipitation: 0.1 },
      { Heure: "", precipitation: 11.3 },
      { Heure: "", precipitation: 13.7 },
      { Heure: "", precipitation: 6.8 },
      { Heure: "", precipitation: 18.5 },
      { Heure: "", precipitation: 0.5 },
      { Heure: "", precipitation: 9.2 },
      { Heure: "", precipitation: 5.9 },
      { Heure: "", precipitation: 1.2 },
      { Heure: "", precipitation: 0.8 },
   ]);

   const getRandomFloat = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(1);
   };

   useEffect(() => {
      const generateNewData = () => {
         const newData = data.map((item) => ({
            ...item,
            precipitation: parseFloat(getRandomFloat(0, 20)),
         }));
         setData(newData);
      };

      const intervalId = setInterval(generateNewData, 20000); // Toutes les 20 secondes

      return () => clearInterval(intervalId);
   }, [data]);

   return (
      <div className="bg-white shadow-md w-full h-[70vh] p-2 rounded-sm space-y-3">
         <span className="my-2 text-center uppercase text-gray-500">
            Niveau du precipitation
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
                  dataKey="precipitation"
                  stroke="#009"
                  fillOpacity={1}
                  fill="url(#colorPv)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Precipitation;
