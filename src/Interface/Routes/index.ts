import { Router, Request, Response } from "express";
import { GetAllProductsComposer } from "../Composers/GetAllProductsComposer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

router.get("/products", (req: Request, res: Response) => {
  const getAllProductsComposer = new GetAllProductsComposer();
  return getAllProductsComposer.productsController.getAll(req, res);
});

router.post("/data", (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Olá, ${name}!` });
});

export default router;
