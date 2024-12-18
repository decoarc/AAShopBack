import { ProductsRep } from "../Domain/Interfaces/ProductsRep";

export class GetAllProducts {
  constructor(private productsRep: ProductsRep) {}

  async execute(page: number, pageSize: number, query: string | undefined) {
    return this.productsRep.findBySearch(page, pageSize, query);
  }
}
