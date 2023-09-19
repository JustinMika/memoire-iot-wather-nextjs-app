import axios from "axios";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
   try {
      return res.json({
         message: "Hello from Nextjs",
         ip: req.method,
      });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}
