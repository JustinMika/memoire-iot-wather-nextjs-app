"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { BellRing, AlignLeft } from "lucide-react";
import Image from "next/image";

const NavBar = () => {
   const [menu1, setMenu1] = useState(false);
   const [menu2, setMenu2] = useState(false);

   const [isMenuUserOpen, setisMenuUserOpen] = useState(false);
   const [isMenu, setisMenu] = useState(false);
   return (
      <nav className="fixed top-0 right-0 md:left-[16rem] left-0 z-50 w-full- bg-[#313438] text-white border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700">
         <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
               <div className="flex items-cente-r justify-start items-baseline">
                  <button
                     type="button"
                     className="inline-flex mr-2 items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                     onClick={() => {
                        setisMenu(!isMenu);
                     }}
                  >
                     <span className="sr-only">Open sidebar</span>
                     <AlignLeft />
                  </button>
                  <a href={`/`} className="flex md:mr-24">
                     <Image src="/nuageux.png" width={30} height={20} alt="."/>
                     <span className="ml-2 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white uppercase">
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
                           <span className="sr-only">View notifications</span>

                           <BellRing />
                        </button>

                        <button
                           type="button"
                           className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                        ></button>

                        <button
                           type="button"
                           className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                           onClick={() => {
                              setisMenuUserOpen(!isMenuUserOpen);
                           }}
                        >
                           <span className="sr-only">Open user menu</span>
                        </button>
                     </div>
                     <UserButton afterSignOutUrl="/" />
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
