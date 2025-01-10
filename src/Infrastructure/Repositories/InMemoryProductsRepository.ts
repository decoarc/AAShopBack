import { Pool, PoolClient, types } from "pg";
import { ProductsRep } from "../../Domain/Interfaces/ProductsRep";
import { ProductsDTOOut } from "../DTO/Products";
import { Products } from "../../Domain/Entities/Products";
require("dotenv").config();

export class InMemoryProductsRepository implements ProductsRep {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async findBySearch(
    page: number,
    pageSize: number,
    query: string | undefined
  ): Promise<ProductsDTOOut> {
    return new Promise(async (res, rej) => {
      const client: PoolClient = await this.pool.connect();
      const result = await client.query(
        `SELECT * FROM produtos
         WHERE LOWER(nome) LIKE $1
         ORDER BY id
         LIMIT $2 OFFSET $3`,
        [`%${String(query ?? "").toLowerCase()}%`, pageSize, page]
      );

      const produtos = result.rows;

      const nextPage = produtos.length < pageSize ? null : Number(page) + 1;
      return res({ data: produtos, nextPage });
    });
  }
  async create(product: Products): Promise<void> {
    return new Promise(async (res, rej) => {
      const client: PoolClient = await this.pool.connect();
      await client.query(
        `INSERT INTO produtos (nome, descricao, preco)
         VALUES ($1, $2, $3)`,
        [product.nome, product.descricao, product.preco]
      );
      return res();
    });
  }
  async update(product: Products): Promise<void> {
    return new Promise(async (res, rej) => {
      const client: PoolClient = await this.pool.connect();
      await client.query(
        `UPDATE produtos
         SET nome = $1, descricao = $2, preco = $3
         WHERE id = $4`,
        [product.nome, product.descricao, product.preco, product.id]
      );
      return res();
    });
  }
  async delete(id: number): Promise<void> {
    return new Promise(async (res, rej) => {
      const client: PoolClient = await this.pool.connect();
      await client.query(
        `DELETE FROM produtos
         WHERE id = $1`,
        [id]
      );
      return res();
    });
  }
}
