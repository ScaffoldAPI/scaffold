#!/usr/bin/env node
import fs from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import inquirer from "inquirer";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import type {Answers} from "#types";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


type Lang = "en-US" | "pt-BR";
const systemLang = Intl.DateTimeFormat().resolvedOptions().locale;
const lang: Lang = systemLang.startsWith("pt") ? "pt-BR" : "en-US";

const messages = {
    "en-US": {
        projectName: "Project name:",
        chooseFramework: "Choose framework:",
        chooseDB: "Choose database:",
        invalidName: "Use only lowercase letters and hyphens",
        dirExists: "Directory already exists. Overwrite?",
        creatingProject: "Creating project...",
        copyingFiles: "Copying template files...",
        installingDeps: "Installing dependencies...",
        success: "Project created successfully! To start:",
        missingNpm: "npm is not installed!",
        nodeVersion: "Node.js 18 or higher required!",
        yourVersion: "Your Node version:",
        operationCanceled: "Operation canceled by user",
        templateNotFound: "Template not found:"
    },
    "pt-BR": {
        projectName: "Nome do projeto:",
        chooseFramework: "Escolha o framework:",
        chooseDB: "Escolha o banco de dados:",
        invalidName: "Use apenas letras minúsculas e hífens",
        dirExists: "Diretório já existe. Sobrescrever?",
        creatingProject: "Criando projeto...",
        copyingFiles: "Copiando arquivos do template...",
        installingDeps: "Instalando dependências...",
        success: "Projeto criado com sucesso! Para iniciar:",
        missingNpm: "npm não está instalado!",
        nodeVersion: "Node.js 18 ou superior necessário!",
        yourVersion: "Sua versão do Node:",
        operationCanceled: "Operação cancelada pelo usuário",
        templateNotFound: "Template não encontrado:"
    }
};

// Helpers
const t = (key: keyof (typeof messages)["en-US"]) => messages[lang][key];
const log = {
    error: (msg: string) => console.error(`❌ ${chalk.red(msg)}`),
    success: (msg: string) => console.log(`✅ ${chalk.green(msg)}`),
    info: (msg: string) => console.log(`ℹ️  ${chalk.blue(msg)}`)
};


const checkPrerequisites = () => {
    if (process.versions.node < "18.0.0") {
        log.error(`${t("nodeVersion")}\n${t("yourVersion")} ${process.versions.node}`);
        process.exit(1);
    }

    try {
        execSync("npm --version", { stdio: "ignore" });
    } catch (error) {
        log.error(t("missingNpm"));
        process.exit(1);
    }
};

async function handleExistingDirectory(projectPath: string) {
    const { overwrite } = await inquirer.prompt({
        type: "confirm",
        name: "overwrite",
        message: t("dirExists"),
        default: false
    });

    if (!overwrite) {
        log.info(t("operationCanceled"));
        process.exit(0);
    }

    const spinner = ora(t("creatingProject")).start();
    try {
        fs.rmSync(projectPath, { recursive: true, force: true });
        spinner.succeed();
    } catch (error) {
        spinner.fail();
        log.error(error instanceof Error ? error.message : "Unknown error");
        process.exit(1);
    }
}

async function main() {
    checkPrerequisites();

    // @ts-ignore
    const questions: inquirer.QuestionCollection<Answers> = [
        {
            name: "name",
            message: t("projectName"),
            default: "my-api",
            validate: (input: string) =>
                /^[a-z-]+$/.test(input) || t("invalidName")
        },
        {
            type: "list",
            name: "framework",
            message: t("chooseFramework"),
            choices: [
                { name: `${chalk.cyan("🌐 Express")}`, value: "express" },
                { name: `${chalk.cyan("🌐 Fastify")}`, value: "fastify" }
            ]
        },
        {
            type: "list",
            name: "database",
            message: t("chooseDB"),
            choices: [
                { name: `${chalk.blue("🗄️ MySQL")}`, value: "mysql" },
                { name: `${chalk.blue("🐘 PostgreSQL")}`, value: "postgres" },
                { name: `${chalk.green("🌲 MongoDB")}`, value: "mongo" }
            ]
        }
    ];

    const answers = await inquirer.prompt<Answers>(questions);
    const projectPath = path.resolve(process.cwd(), answers.name);

    if (fs.existsSync(projectPath)) {
        await handleExistingDirectory(projectPath);
    }

    const templatePath = path.join(
        __dirname,
        "../templates",
        `${answers.framework}-${answers.database}`
    );

    if (!fs.existsSync(templatePath)) {
        log.error(`${t("templateNotFound")} ${chalk.yellow(templatePath)}`);
        process.exit(1);
    }

    const copySpinner = ora(t("copyingFiles")).start();
    try {
        fs.mkdirSync(projectPath, { recursive: true });
        fs.cpSync(templatePath, projectPath, { recursive: true, force: true });
        copySpinner.succeed();
    } catch (error) {
        copySpinner.fail();
        log.error(error instanceof Error ? error.message : "Failed to copy template");
        process.exit(1);
    }

    const installSpinner = ora(t("installingDeps")).start();
    try {
        execSync("npm install", {
            stdio: "inherit",
            cwd: projectPath,
            timeout: 120000
        });
        installSpinner.succeed();
    } catch (error) {
        installSpinner.fail();
        log.error(error instanceof Error ? error.message : "Installation failed");
        process.exit(1);
    }

    console.log();
    log.success(t("success"));
    console.log(chalk.yellow(`cd ${answers.name}`));
    console.log(chalk.yellow("npm start\n"));
}

main().catch((error) => {
    log.error(error instanceof Error ? error.message : "Unexpected error");
    process.exit(1);
});