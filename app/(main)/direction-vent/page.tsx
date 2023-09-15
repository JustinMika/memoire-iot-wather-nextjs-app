import NavBar from "@/components/NavBar";
import DirectionVent from "@/components/statistic/DirectionVent";

export default function Home() {
   return (
      <main className="p-0 h-[50vh] overflow-y-hidden">
         <NavBar />
         <DirectionVent />
      </main>
   );
}
