import { Request, Response } from "express";
import path from "path";
import fs from "fs";

interface Produt {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  foto: string;
}

export const getProducts = (req: Request, res: Response) => {
  const { page = 0, pageSize = 10, query = "" } = req.query;

  const queryString = String(query).toLowerCase();

  const filePath = path.join(__dirname, "../data/produtos.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).json({ error: "Erro ao carregar os produtos" });
    }

    try {
      const produtos: Produt[] = JSON.parse(data);

      const filteredProducts = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(queryString)
      );

      const start = Number(page) * Number(pageSize);
      const end = start + Number(pageSize);

      const paginatedProducts = filteredProducts.slice(start, end);

      const nextPage = end < filteredProducts.length ? Number(page) + 1 : null;

      res.status(200).json({ data: paginatedProducts, nextPage });
    } catch (parseError) {
      console.error("Erro ao analisar JSON:", parseError);
      res.status(500).json({ error: "Erro ao analisar os produtos" });
    }
  });
};
