import { NextRequest, NextResponse as res } from "next/server";
import connection from "@/config/databases";
import axios from "axios";

function getRandomValue(min: any, max: any, decimalPlaces = 0) {
   const random = Math.random() * (max - min) + min;
   return random.toFixed(decimalPlaces);
}

export async function GET() {
   try {
      // const [rows] = await connection.query(
      //    `SELECT Dv FROM data_meteos ORDER BY created_at DESC LIMIT 1`
      // );
      // const d = rows[0];

      const d = await axios.get("http://192.168.43.138/api/data");

      const rows = {
         rows: d?.data["Dv"] ?? getRandomValue(1, 320, 0),
      };

      return res.json({ rows: d?.data["Dv"] ?? getRandomValue(1, 320, 0) });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}
