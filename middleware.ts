import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
   publicRoutes: [
      "/api/v1",
      "/api/v1/all-data",
      "/api/v1/data", // ta
      "/api/v1/humidite", // humidite
      "/api/v1/direction-vent", // Dv
      "/api/v1/precipitation", // Viveau pluie
      "/api/v1/lumiere",
      "/api/v1/prec-pluie",
   ],
});

export const config = {
   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
