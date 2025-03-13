import express from "express";
import routes from "./appModule.js";
import connectDB from "./database/index.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", routes);

export default app;