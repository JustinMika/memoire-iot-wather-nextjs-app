"use client";
import {
   Settings,
   LayoutDashboard,
   ThermometerSun,
   Wind,
   Flower2,
   CloudCog,
   CloudRainWind,
   CloudMoonRain,
   Fan,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SideBar = () => {
   const [menu1, setMenu1] = useState(false);
   const [menu2, setMenu2] = useState(false);

   const [isMenuUserOpen, setisMenuUserOpen] = useState(false);
   const [isMenu, setisMenu] = useState(false);

   const noopen = `bg-slate-200 fixed top-0 left-0 z-40 w-64 h-screen pt-2 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 -translate-x-full`;
   const open = `bg-slate-200 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transform-none`;
   return (
      <>
         <aside className={isMenu ? open : noopen}>
            <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-20 dark:bg-gray-800 text-white">
               <ul className="space-y-2 font-medium">
                  <li>
                     <Link
                        href={`/`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <LayoutDashboard />
                        <span className="ml-3">Dashboard</span>
                     </Link>
                  </li>
                  <li>
                     <a
                        href={`/temperature`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <ThermometerSun />
                        <span className="ml-3">Temperature</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/vent`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <Wind />
                        <span className="ml-3">Vitesse du vent</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/direction-vent`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <Fan />
                        <span className="ml-3">Direction du vent</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/humidite`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <Flower2 />
                        <span className="ml-3">Humidité</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/precipitation`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <CloudRainWind />
                        <span className="ml-3">Précipitation</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/pluie`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <CloudMoonRain />
                        <span className="ml-3">Pluie</span>
                     </a>
                  </li>
                  <li>
                     <a
                        href={`/niveau-de-cO2`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <CloudCog />
                        <span className="ml-3">Niveau de CO2</span>
                     </a>
                  </li>
                  <hr className="bg-gray-300 border border-1 border-gray-300" />
                  <li>
                     <a
                        href={`/Settings`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <Settings />
                        <span className="ml-3">Settings</span>
                     </a>
                  </li>
               </ul>
            </div>
         </aside>
      </>
   );
};

export default SideBar;
