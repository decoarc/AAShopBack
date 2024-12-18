import { Request, Response } from "express";
import { GetAllProducts } from "../../Use-cases/GetAllProducts";

export class ProductsController {
  constructor(private getAllProducts: GetAllProducts) {}

  async getAll(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 10;
    const query = req.query.query as string | undefined;

    const products = await this.getAllProducts.execute(page, pageSize, query);
    res.json(products);
  }
}
