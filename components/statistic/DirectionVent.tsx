"use client";
import NavBar from "@/components/NavBar";
// import Temperature from "@/components/statistic/Temperature";
import { useEffect, useState } from "react";

export default function DirectionVent() {
   const [arrowRotation, setArrowRotation] = useState(0);

   useEffect(() => {
      const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

      const intervalId = setInterval(() => {
         const randomDirection =
            directions[Math.floor(Math.random() * directions.length)];
         let newRotation = 0;

         if (randomDirection === "N") {
            setArrowRotation(0);
         } else if (randomDirection === "NE") {
            setArrowRotation(45);
         } else if (randomDirection === "E") {
            setArrowRotation(90);
         } else if (randomDirection === "SE") {
            setArrowRotation(135);
         } else if (randomDirection === "S") {
            setArrowRotation(180);
         } else if (randomDirection === "SO") {
            setArrowRotation(225);
         } else if (randomDirection === "O") {
            setArrowRotation(270);
         } else if (randomDirection === "NO") {
            setArrowRotation(315);
         }
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
                     y2="10"
                     stroke="red"
                     strokeWidth="2"
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

                  {/* Cercle intérieur */}
                  <circle cx="50" cy="50" r="4" fill="gray" />
               </svg>
            </div>
         </div>
      </main>
   );
}
