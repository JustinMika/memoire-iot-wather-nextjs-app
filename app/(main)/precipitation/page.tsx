import NavBar from "@/components/NavBar";
import Precipitation from "@/components/statistic/Precipitation";
import Temperature from "@/components/statistic/Temperature";

export default function Home() {
   return (
      <main className="p-2">
         <NavBar />
         <Precipitation />
      </main>
   );
}
