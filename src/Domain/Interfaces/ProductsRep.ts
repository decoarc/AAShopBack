import { ProductsDTOOut } from "../../Infrastructure/DTO/Products";
import { Products } from "../Entities/Products";

export interface ProductsRep {
  findBySearch(
    page: number,
    pageSize: number,
    query: string | undefined
  ): Promise<ProductsDTOOut>;
  create(product: Products): Promise<void>;
  update(product: Products): Promise<void>;
  delete(id: number): Promise<void>;
}
