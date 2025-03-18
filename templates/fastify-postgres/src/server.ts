import appController from "./app.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;


appController.start();