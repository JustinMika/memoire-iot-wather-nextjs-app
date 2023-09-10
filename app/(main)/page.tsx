import NavBar from "@/components/NavBar";
import Temperature from "@/components/statistic/Temperature";
import { Loader2 } from "lucide-react";

export default function Home() {
   return (
      <main className="p-2">
         <NavBar />
         <Temperature />
      </main>
   );
}
