import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoute from "./routes/health.route.js";
import adminRoute from "./routes/admin.route.js";
import userRoute from "./routes/user.route.js";
import apikeyRoute from "./routes/apikey.route.js";
import animalRoute from "./routes/animal.route.js";
import devApiKeyRoute from "./routes/dev.apikey.route.js";
import developerRoute from "./routes/developer.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", adminRoute);
app.use("/api", userRoute);
app.use("/api", apikeyRoute);
app.use("/api", animalRoute);
app.use("/api", developerRoute);
app.use("/api", devApiKeyRoute);

app.use("/", healthRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
