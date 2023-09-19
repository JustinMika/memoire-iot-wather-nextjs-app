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
      const allData = [
         `${getRandomValue(1, 40, 1)}°C`,
         `${getRandomValue(1, 70, 1)}%`,
         `${getRandomValue(1, 100, 1)}%`,
         `${getRandomValue(1, 100, 1)}%`,
         `${getRandomValue(1, 100, 1)}%`,
         `${getRandomValue(0, 400, 1)}mm`,
         `${getRandomValue(0, 1)}%:`,
         formattedDate,
         formattedDate,
      ];
      const all_Data = {
         ta: `${getRandomValue(1, 40, 1)}°C`,
         ha: `${getRandomValue(1, 70, 1)}%`,
         lx: `${getRandomValue(1, 100, 1)}%`,
         Vv: `${getRandomValue(1, 100, 1)}%`,
         Dv: `${getRandomValue(1, 100, 1)}%`,
         Np: `${getRandomValue(0, 400, 1)}mm`,
         Pp: `${getRandomValue(0, 1)}%:`,
         created_at: formattedDate,
         updated_at: formattedDate,
      };
      var sql = `INSERT INTO data_meteos(ta, ha, lx, Vv, Dv, Np, Pp, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?)`;
      const [result] = await connection.query(sql, allData);
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
