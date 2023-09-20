"use client";
import NavBar from "@/components/NavBar";
import Temperature from "@/components/statistic/Temperature";
import TemperaturePluie from "@/components/statistic/TemperaturePluie";
import { ScrollArea } from "@/components/ui/scroll-area";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
   useEffect(() => {
      axios
         .get("/api/v1/all-data")
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.error("Error fetching posts:", error);
         });
   }, []);

   return (
      <main className="p-0 h-[80vh] overflow-y-hidden">
         <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
         />
         <NavBar />
         <ScrollArea className="h-[100%]">
            <div className="space-y-8">
               <TemperaturePluie />
               <Temperature />
            </div>
         </ScrollArea>
      </main>
   );
}
