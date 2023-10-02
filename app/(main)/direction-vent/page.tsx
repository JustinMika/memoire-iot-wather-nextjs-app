import NavBar from "@/components/NavBar";
import DirectionVent from "@/components/statistic/DirectionVent";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
   return (
      <main className="p-0 h-[80vh] overflow-y-hidden">
         <ScrollArea>
            <NavBar />
            <DirectionVent />
         </ScrollArea>
      </main>
   );
}
