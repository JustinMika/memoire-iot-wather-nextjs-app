import { NextRequest, NextResponse as res } from "next/server";
import connection from "@/config/databases";

export async function GET() {
   try {
      const [rows] = await connection.query(
         `SELECT
         CASE
           WHEN lx = 0 THEN FLOOR(RAND() * (50 - 30 + 1)) + 30
           WHEN lx = 1 THEN FLOOR(RAND() * (100 - 90 + 1)) + 90
         END AS Lumiere,
         CONCAT(HOUR(created_at), ':', MINUTE(created_at), ':', SECOND(created_at)) AS Heure
       FROM data_meteos`
      );
      return res.json({ rows });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}
