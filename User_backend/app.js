import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import animalRoute from "./routes/animal.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", animalRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`User backend running on http://localhost:${PORT}`);
});
