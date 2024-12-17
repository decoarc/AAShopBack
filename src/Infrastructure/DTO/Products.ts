import { Products } from "../../Domain/Entities/Products";

export interface ProductsDTOOut {
  data: Products[];
  nextPage: number | null;
}
