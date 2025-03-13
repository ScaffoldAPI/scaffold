import express from "express";
import cors from "cors";
import routes from "./appModule.js";
import connection from "./config/database.js";

class AppController {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    private async database(): Promise<void> {
        try {
            await connection.raw("SELECT 1");
            console.log("📦 Banco de dados conectado com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao conectar no banco de dados:", error);
            process.exit(1);
        }
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
