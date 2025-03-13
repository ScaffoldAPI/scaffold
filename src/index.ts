import { mainMenu } from "./menus/mainMenu/index.js";
import ck from "chalk";

async function main() {
    await mainMenu();
}

main().catch((error) => {
    console.error(ck.red(`❌ Erro: ${error instanceof Error ? error.message : "Erro inesperado"}`));
    process.exit(1);
});