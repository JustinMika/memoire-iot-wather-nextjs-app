// import SideBar from "@/components/SideBar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
       <ClerkProvider>
            <html lang="fr">
               <body>
                  {children}
               </body>
            </html>
       </ClerkProvider>
    );
}
