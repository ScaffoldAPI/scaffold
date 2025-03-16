import express from "express";
import cors from "cors"
import routes from "./appModule.js";
import connectDB from "./config/database.js";

class AppController {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    private async database(): Promise<void> {
        await connectDB();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private routes(): void {
        this.app.use(routes);
    }
}

export default new AppController().app;