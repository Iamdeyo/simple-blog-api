import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db/db.js";
import router from "./routes/index.js";

const app = express();
dotenv.config();

db.init();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", router);
app.get("/", (req, res) => {
  return res.send("Welcome to Blog API");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${8000}`);
});
