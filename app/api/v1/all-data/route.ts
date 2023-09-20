import { NextRequest, NextResponse as res } from "next/server";
import axios from "axios";
import connection from "@/config/databases";
import formattedDate from "@/lib/DateTime";

function getRandomValue(min: any, max: any, decimalPlaces = 0) {
   const random = Math.random() * (max - min) + min;
   return random.toFixed(decimalPlaces);
}

export async function GET(req: NextRequest) {
   try {
      const d = await axios.get("http://192.168.43.138/api/data");

      const all_Data = [
         `${d?.data["ta"] ?? getRandomValue(1, 40, 1)}`,
         `${d?.data["ha"] ?? getRandomValue(1, 70, 1)}`,
         `${d?.data["lx"] ?? getRandomValue(30, 100, 1)}`,
         `${d?.data["Vv"] ?? getRandomValue(1, 100, 1)}`,
         `${d?.data["Dv"] ?? getRandomValue(1, 100, 1)}`,
         `${d?.data["Np"] ?? getRandomValue(0, 400, 1)}`,
         `${d?.data["Pp"] ?? getRandomValue(0, 0)}`,
         formattedDate,
         formattedDate,
      ];

      var sql = `INSERT INTO data_meteos(ta, ha, lx, Vv, Dv, Np, Pp, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?)`;

      const [result] = await connection.query(sql, all_Data);
      return res.json({ result });
   } catch (error) {
      return res.json({
         error: error,
      });
   }
}

export async function POST(req: NextRequest) {
   res.json(req.body);
}
