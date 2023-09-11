import { NextRequest, NextResponse as res } from "next/server";

export async function GET(request: NextRequest) {
   return res.json({
      message: "Hello from Nextjs",
      ip: request.ip,
   });
}
