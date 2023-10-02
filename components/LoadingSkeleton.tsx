import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
   return (
      <div className="flex justify-center items-center w-full backdrop-blur-md">
         <Loader2 className="animate-spin" /> Leading ...
      </div>
   );
};

export default LoadingSkeleton;
