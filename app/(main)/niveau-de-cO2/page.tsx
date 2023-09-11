import NavBar from "@/components/NavBar";
import NiveauCo2 from "@/components/statistic/NiveauCo2";

export default function Home() {
   return (
      <main className="p-2">
         <NavBar />
         <NiveauCo2 />
      </main>
   );
}
