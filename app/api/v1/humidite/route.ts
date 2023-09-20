import { NextRequest, NextResponse as res } from "next/server";
import connection from "@/config/databases";

export async function GET() {
   try {
      const [rows] = await connection.query(
         `SELECT ha as humidite, CONCAT(HOUR(created_at), ':', MINUTE(created_at), ':', SECOND(created_at)) AS Heure FROM data_meteos`
      );
      return res.json({ rows });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}
