import { InMemoryProductsRepository } from "../../Infrastructure/Repositories/InMemoryProductsRepository";
import { GetAllProducts } from "../../Use-cases/GetAllProducts";
import { ProductsController } from "../Controllers/ProductsController";

export class GetAllProductsComposer {
  constructor() {}
  private _productRepository = new InMemoryProductsRepository();
  private getAllProducts = new GetAllProducts(this._productRepository);
  productsController = new ProductsController(this.getAllProducts);
}

//const productRepository = new InMemoryProductsRepository();
//const getAllProducts = new GetAllProducts(productRepository);
//const productsController = new ProductsController(getAllProducts);
