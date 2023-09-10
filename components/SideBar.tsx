"use client";
import { UserButton } from "@clerk/nextjs";
import {
   Settings,
   LayoutDashboard,
   ThermometerSun,
   Wind,
   Flower2,
   CloudCog,
   CloudRainWind,
   CloudMoonRain,
   Fan
} from "lucide-react";
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
         {/* <nav className="fixed top-0 right-0 left-0 z-50 w-full bg-slate-200 border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={() => {
                                    setisMenu(!isMenu);
                                }}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href={`/`} className="flex md:mr-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white uppercase">
                                    Meteo app
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <span className="sr-only">
                                            View notifications
                                        </span>

                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        
                                    </button>

                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        onClick={() => {
                                            setisMenuUserOpen(!isMenuUserOpen);
                                        }}
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                    </button>
                                </div>
                                    <UserButton  afterSignOutUrl="/"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav> */}
         <aside className={isMenu ? open : noopen}>
            <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-20 dark:bg-gray-800 text-white">
               <ul className="space-y-2 font-medium">
                  <li>
                     <a
                        href={`/`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <LayoutDashboard />
                        <span className="ml-3">Dashboard</span>
                     </a>
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
                        href={`/sol`}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <Flower2 />
                        <span className="ml-3">Humidité du sol</span>
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
                  <hr className="bg-white border border-1 border-white" />
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
