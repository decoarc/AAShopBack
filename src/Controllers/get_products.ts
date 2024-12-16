import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Pool } from "pg";

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getProducts = async (req: Request, res: Response) => {
  const { page = 0, pageSize = 10, query = "" } = req.query;

  try {
    const offset = Number(page) * Number(pageSize);
    const limit = Number(pageSize);

    const client = await pool.connect();

    const result = await client.query(
      `SELECT * FROM produtos 
       WHERE LOWER(nome) LIKE $1
       ORDER BY id
       LIMIT $2 OFFSET $3`,
      [`%${String(query).toLowerCase()}%`, limit, offset]
    );

    const produtos = result.rows;

    const nextPage = produtos.length < limit ? null : Number(page) + 1;

    client.release();

    res.status(200).json({ data: produtos, nextPage });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};
