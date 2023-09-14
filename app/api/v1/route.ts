import axios from "axios";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const d = await axios.get("http://localhost:2000/");
      const data = d.data;
      return res.json({
         message: "Hello from Nextjs",
         ip: req.method,
         data: data,
      });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}
