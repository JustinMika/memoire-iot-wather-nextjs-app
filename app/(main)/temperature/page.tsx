import NavBar from "@/components/NavBar";
import Temperature from "@/components/statistic/Temperature";

export default function Home() {
   return (
      <main className="p-2">
         <NavBar />
         <Temperature />
      </main>
   );
}
