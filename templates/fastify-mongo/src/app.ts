import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./appModule.js";
import connectDB from "./config/database.js";

class AppController {
    public app: Fastify.FastifyInstance;

    constructor() {
        this.app = Fastify({ logger: true });
        this.database();
        this.middlewares();
        this.routes();
    }

    private async database(): Promise<void> {
        await connectDB();
    }

    private middlewares(): void {
        this.app.register(cors, {
            origin: "*",
        });
    }

    private routes(): void {
        this.app.register(routes);
    }

    public async start(): Promise<void> {
        try {
            await this.app.listen({ port: 3000, host: "0.0.0.0" });
            console.log(`🚀 Servidor rodando em http://localhost:3000`);
        } catch (err) {
            this.app.log.error(err);
            process.exit(1);
        }
    }
}

const appController = new AppController();
export default appController;