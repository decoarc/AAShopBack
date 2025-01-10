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
    const client: PoolClient = await this.pool.connect();
    const offset = (page - 1) * pageSize;
    try {
      const result = await client.query(
        `SELECT * FROM produtos
         WHERE LOWER(nome) LIKE $1
         ORDER BY id
         LIMIT $2 OFFSET $3`,
        [`%${String(query ?? "").toLowerCase()}%`, pageSize, offset]
      );

      const produtos = result.rows;
      const nextPage = produtos.length < pageSize ? null : Number(page) + 1;
      return { data: produtos, nextPage };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async create(product: Products): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query(
        `INSERT INTO produtos (nome, descricao, preco)
         VALUES ($1, $2, $3)`,
        [product.nome, product.descricao, product.preco]
      );
    } finally {
      client.release();
    }
  }
  async update(product: Products): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query(
        `UPDATE produtos
         SET nome = $1, descricao = $2, preco = $3
         WHERE id = $4`,
        [product.nome, product.descricao, product.preco, product.id]
      );
    } finally {
      client.release();
    }
  }
  async delete(id: number): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query(
        `DELETE FROM produtos
         WHERE id = $1`,
        [id]
      );
    } finally {
      client.release();
    }
  }
}
