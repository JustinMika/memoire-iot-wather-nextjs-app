import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
   return (
      <div className="flex justify-center items-center h-[100vh] backdrop-blur-md absolute">
         <Loader2 className="animate-spin" />
      </div>
   );
};

export default LoadingSkeleton;
