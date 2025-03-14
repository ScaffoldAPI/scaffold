import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import inquirer from "inquirer";
import ck from "chalk";
import ora from "ora";
import { t } from "../helpers/messages/index.js";
import type { Answers } from "#types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(lang: "pt-BR" | "en-US") {
    try {
        // @ts-ignore
        const questions: inquirer.QuestionCollection<Answers> = [
            {
                name: "name",
                message: t("projectName", lang),
                default: "my-api",
                validate: (input: string) =>
                    /^[a-z-]+$/.test(input) || t("invalidName", lang)
            },
            {
                type: "list",
                name: "framework",
                message: t("chooseFramework", lang),
                choices: [
                    { name: `${ck.cyan("🌐 Express")}`, value: "express" },
                    { name: `${ck.cyan("🌐 Fastify")}`, value: "fastify" }
                ]
            },
            {
                type: "list",
                name: "database",
                message: t("chooseDB", lang),
                choices: [
                    { name: `${ck.blue("🗄️ MySQL")}`, value: "mysql" },
                    { name: `${ck.blue("🐘 PostgreSQL")}`, value: "postgres" },
                    { name: `${ck.green("🌲 MongoDB")}`, value: "mongo" }
                ]
            }
        ];

        const answers = await inquirer.prompt<Answers>(questions);
        const projectPath = path.resolve(process.cwd(), answers.name);

        if (fs.existsSync(projectPath)) {
            const { overwrite } = await inquirer.prompt({
                type: "confirm",
                name: "overwrite",
                message: t("dirExists", lang),
                default: false
            });

            if (!overwrite) {
                console.log(ck.yellow(t("operationCanceled", lang)));
                return;
            }

            const spinner = ora(t("creatingProject", lang)).start();
            try {
                fs.rmSync(projectPath, { recursive: true, force: true });
                spinner.succeed();
            } catch (error) {
                spinner.fail();
                console.error(ck.red(error instanceof Error ? error.message : "Erro desconhecido"));
                return;
            }
        }

        const templatePath = path.join(__dirname, "../../../templates", `${answers.framework}-${answers.database}`);

        if (!fs.existsSync(templatePath)) {
            console.error(ck.red(`${t("templateNotFound", lang)} ${ck.yellow(templatePath)}`));
            return;
        }

        const copySpinner = ora(t("copyingFiles", lang)).start();
        try {
            fs.mkdirSync(projectPath, { recursive: true });
            fs.cpSync(templatePath, projectPath, { recursive: true, force: true });
            copySpinner.succeed();
        } catch (error) {
            copySpinner.fail();
            console.error(ck.red(error instanceof Error ? error.message : "Falha ao copiar template"));
            return;
        }

        const installSpinner = ora(t("installingDeps", lang)).start();
        try {
            execSync("npm install", {
                stdio: "inherit",
                cwd: projectPath,
                timeout: 120000
            });
            installSpinner.succeed();
        } catch (error) {
            installSpinner.fail();
            console.error(ck.red(error instanceof Error ? error.message : "Falha na instalação"));
            return;
        }

        console.log(ck.green(t("success", lang)));
        console.log(ck.yellow(`cd ${answers.name}`));
        console.log(ck.yellow("npm start\n"));

        process.exit(0);
    } catch (error) {
        console.error(ck.red(`Erro inesperado: ${error instanceof Error ? error.message : "Erro desconhecido"}`));
        process.exit(1);
    }
}