import SideBar from "@/components/SideBar";
import { Suspense } from "react";

export const metadata = {
   title: "Meteo Agricole",
   description: "apllication de production de rapport meteorologique",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div>
         <SideBar />
         <Suspense>
            <div className="px-0 py-4 sm:ml-64 bg-slate-50 h-screen">
               <div className="px-4 py-4 mt-14">{children}</div>
            </div>
         </Suspense>
      </div>
   );
}
