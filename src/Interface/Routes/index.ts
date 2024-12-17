import { Router, Request, Response } from "express";
import { getProducts } from "../Controllers/get_products";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

router.get("/products", getProducts);

router.post("/data", (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Olá, ${name}!` });
});

export default router;
