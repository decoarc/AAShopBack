import express, { Application } from "express";
import cors from "cors";
import routes from "./Interface/Routes";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:3000/",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors());

app.use(express.json());

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("API");
});

export default app;
