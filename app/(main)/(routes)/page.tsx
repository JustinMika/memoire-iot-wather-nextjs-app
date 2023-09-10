import NavBar from "@/components/NavBar";
import Temperature from "@/components/statistic/Temperature";
import TemperaturePluie from "@/components/statistic/TemperaturePluie";

export default function Home() {
   return (
      <main className="p-0">
         <NavBar />
         <Temperature />
      </main>
   );
}
