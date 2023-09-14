import axios from "axios";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const d = await axios.get("http://localhost:2000/windSpeed");
      const data = d.data;
      return res.json({ data });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}

export async function POST(req: NextRequest) {
   res.json(req.body);
}
