import fs from "fs";
import {execSync} from "child_process";
import inquirer from "inquirer";
import path from "path";
import {fileURLToPath} from "url";
import {Answers} from "#types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const questions = [
        {
            name: "name",
            message: "Nome do projeto:",
            default: "my-api"
        },
        {
            type: "list",
            name: "framework",
            message: "Escolha o framework:",
            choices: [
                {name: "🌐 Express", value: "express"},
                {name: "🌐 Fastify", value: "fastify"}
            ]
        },
        {
            type: "list",
            name: "database",
            message: "Escolha o banco de dados:",
            choices: [
                {name: "🗄️ MySQL", value: "mysql"},
                {name: "🐘 PostgreSQL", value: "postgres"},
                {name: "🌲 MongoDB", value: "mongo"}
            ]
        }
    ];


    // @ts-ignore
    const answers = await inquirer.prompt<Answers>(questions);

    const projectPath = path.join(process.cwd(), answers.name);

    const templatePath = path.join(__dirname, "..", "templates", `${answers.framework}-${answers.database}`);

    if (!fs.existsSync(templatePath)) {
        console.error("Template não encontrado!");
        console.log("Caminho do template:", templatePath);
        process.exit(1);
    }

    fs.mkdirSync(projectPath, {recursive: true});

    fs.cpSync(templatePath, projectPath, {recursive: true});

    console.log("Instalando dependências...");
    execSync(`cd ${answers.name} && npm install`, {stdio: "inherit"});

    console.log("Projeto criado com sucesso! Para iniciar, execute:");
    console.log(`cd ${answers.name} && npm start`);
}

main().catch((error) => {
    console.error("Ocorreu um erro:", error);
});