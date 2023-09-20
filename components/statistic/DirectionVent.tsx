"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DirectionVent() {
   const [arrowRotation, setArrowRotation] = useState(0);

   useEffect(() => {
      const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

      const intervalId = setInterval(() => {
         axios
            .get("/api/v1/all-data")
            .then((response: any) => {
               // console.log(response?.data?.rows);
            })
            .catch((error) => {});
         let v;
         let dir;
         let d;
         axios
            .get("/api/v1/direction-vent")
            .then((response: any) => {
               console.log(response?.data);
               if (response?.data) {
                  v = response?.data;
               } else {
                  v = 0;
               }
               dir = v ?? 0;
               d = dir?.rows ? parseInt(dir.rows) : 0;
               console.log(d);
               if (d > 0 && d <= 44) {
                  setArrowRotation(0);
               } else if (d > 44 && d < 89) {
                  setArrowRotation(45);
               } else if (d > 89 && d < 134) {
                  setArrowRotation(90);
               } else if (d > 134 && d < 179) {
                  setArrowRotation(225);
               } else if (d > 181 && d < 225) {
                  setArrowRotation(270);
               } else if (d > 225 && d < 316) {
                  setArrowRotation(315);
               } else {
                  setArrowRotation(0);
               }
            })
            .catch((error) => {});

         const randomDirection =
            directions[Math.floor(Math.random() * directions.length)];
         let newRotation = 0;

         // if (randomDirection === "N") {
         //    setArrowRotation(0);
         // } else if (randomDirection === "NE") {
         //    setArrowRotation(45);
         // } else if (randomDirection === "E") {
         //    setArrowRotation(90);
         // } else if (randomDirection === "SE") {
         //    setArrowRotation(135);
         // } else if (randomDirection === "S") {
         //    setArrowRotation(180);
         // } else if (randomDirection === "SO") {
         //    setArrowRotation(225);
         // } else if (randomDirection === "O") {
         //    setArrowRotation(270);
         // } else if (randomDirection === "NO") {
         //    setArrowRotation(315);
         // }
      }, 3000);

      return () => clearInterval(intervalId);
   }, []);

   const letterPositions = [
      { letter: "N", angle: 0 },
      { letter: "NE", angle: 45 },
      { letter: "E", angle: 90 },
      { letter: "SE", angle: 135 },
      { letter: "S", angle: 180 },
      { letter: "SO", angle: 225 },
      { letter: "O", angle: 270 },
      { letter: "NO", angle: 315 },
   ];

   return (
      <main className="p-2">
         <NavBar />
         {/* <Temperature /> */}
         <p className="text-center text-gray-600 font-bold text-xl">
            Direction du vent [<i>La girouette W200P</i>]
         </p>
         <div className="flex justify-center items-center">
            <div className="w-[28rem] h-[28rem] relative">
               <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
               >
                  {/* Cercle extérieur */}
                  <circle
                     cx="50"
                     cy="50"
                     r="45"
                     stroke="gray"
                     strokeWidth="1"
                     fill="none"
                  />

                  {/* Flèche pour indiquer la direction */}
                  <line
                     x1="50"
                     y1="50"
                     x2="50"
                     y2="22"
                     stroke="gray"
                     strokeWidth="1"
                     markerEnd="url(#arrowhead)"
                     style={{ fill: "green" }}
                     transform={`rotate(${arrowRotation} 50 50)`}
                  />

                  {/* Affichage des lettres à l'intérieur */}
                  {letterPositions.map(({ letter, angle }) => {
                     const x = 50 + Math.sin((angle * Math.PI) / 180) * 35;
                     const y = 50 - Math.cos((angle * Math.PI) / 180) * 35;

                     return (
                        <text
                           key={letter}
                           x={x}
                           y={y}
                           textAnchor="middle"
                           dominantBaseline="middle"
                           fill="black"
                           fontSize="10"
                        >
                           {letter}
                        </text>
                     );
                  })}

                  {/* Définition de la flèche */}
                  <defs>
                     <marker
                        id="arrowhead"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="4"
                        markerHeight="6"
                        orient="auto"
                     >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="gray" />
                     </marker>
                  </defs>

                  {/* Cercle intérieur */}
                  <circle cx="50" cy="50" r="2" fill="gray" />
               </svg>
            </div>
         </div>
      </main>
   );
}
