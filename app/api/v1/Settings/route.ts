import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
   return res.json({
      message: "Hello from Nextjs",
      ip: req.method,
   });
}

export async function POST(req: NextRequest) {
   res.json(req.body);
}
