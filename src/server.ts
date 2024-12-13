import { createServer } from "node:http";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});