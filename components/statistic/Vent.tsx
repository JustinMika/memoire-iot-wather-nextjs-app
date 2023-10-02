"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const generateRandomSpeed = () => {
   // Génération aléatoire d'une vitesse entre 0 et 360 degrés
   return Math.floor(Math.random() * 361);
};

const DirectionVent = () => {
   const [speed, setSpeed] = useState(0);

   useEffect(() => {
      // Génération initiale de la vitesse
      const initialSpeed = generateRandomSpeed();
      setSpeed(initialSpeed);

      // Mise à jour de la vitesse toutes les 2 secondes
      const intervalId = setInterval(() => {
         const newSpeed = generateRandomSpeed();
         setSpeed(newSpeed);
      }, 2000);

      return () => {
         clearInterval(intervalId);
      };
   }, []);

   const meterSize = 200;
   const meterRadius = meterSize / 2;

   const arrowAngle = speed;
   const x1 = meterRadius;
   const y1 = meterRadius;
   const x2 = meterRadius + 60 * Math.sin((arrowAngle * Math.PI) / 180);
   const y2 = meterRadius - 60 * Math.cos((arrowAngle * Math.PI) / 180);

   return (
      <ScrollArea className="h-[100%] space-y-3">
         <p className="text-xl uppercase text-center text-grey-700">
            La vitesse du vent
         </p>
         <div className="flex justify-center items-center">
            <div className="w-[28rem] h-[28rem]">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  viewBox={`0 0 ${meterSize} ${meterSize}`}
               >
                  {/* Cadran du compteur de vitesse (cercle complet) */}
                  <circle
                     cx={meterRadius}
                     cy={meterRadius}
                     r={meterRadius - 15}
                     stroke="gray"
                     strokeWidth="2"
                     fill="none"
                  />

                  {/* Graduations et texte */}
                  {Array.from({ length: 36 }, (_, index) => {
                     const gradAngle = index * 10;
                     return (
                        <g key={index}>
                           <line
                              x1={meterRadius}
                              y1={5}
                              x2={meterRadius}
                              y2={15}
                              stroke="gray"
                              strokeWidth="2"
                              transform={`rotate(${gradAngle} ${meterRadius} ${meterRadius})`}
                           />
                           <text
                              x={meterRadius}
                              y={20}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="gray"
                              fontSize="5"
                              transform={`rotate(${gradAngle} ${meterRadius} ${meterRadius})`}
                           >
                              {gradAngle}
                           </text>
                        </g>
                     );
                  })}

                  <defs>
                     <marker
                        id="arrowhead"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                     >
                        <path
                           d="M 0 0 L 10 5 L 0 10 z"
                           fill={speed < 39 ? "green" : "red"}
                        />
                     </marker>
                  </defs>

                  {/* Flèche pour la vitesse */}
                  <line
                     x1={x1}
                     y1={y1}
                     x2={x2}
                     y2={y2}
                     stroke={speed < 39 ? "green" : "red"}
                     strokeWidth="2"
                     markerEnd="url(#arrowhead)"
                     style={{ fill: speed < 39 ? "green" : "red" }}
                  />
                  <text
                     x={100}
                     y={120}
                     textAnchor="middle"
                     dominantBaseline="middle"
                     fill="gray"
                     fontSize="12"
                     className={`font-bold`}
                     style={{ fill: speed < 39 ? "green" : "red" }}
                     transform={`rotate(0 100 100)`}
                  >
                     {speed + "km/h"}
                  </text>

                  {/* Définition de la flèche */}
                  <defs>
                     <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                     >
                        <polygon points="0 0, 10 3.5, 0 7" fill="red" />
                     </marker>
                  </defs>
               </svg>
            </div>
         </div>
      </ScrollArea>
   );
};

export default DirectionVent;
