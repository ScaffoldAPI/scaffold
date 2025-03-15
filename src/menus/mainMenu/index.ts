import { select } from "@inquirer/prompts";
import ck from "chalk";
import { settingsMenu } from "./settingsMenu.js";
import { createProject } from "../project/index.js";
import { divider } from "../helpers/index.js";
import { t } from "../helpers/messages/index.js";

export async function mainMenu(lang: "pt-BR" | "en-US" = "pt-BR") {
    console.clear();
    const menu = await select({
        message: ck.cyan.underline(t("mainMenuTitle", lang)),
        choices: [
            {
                name: ck.green(t("createProject", lang)),
                value: "createProject"
            },
            {
                name: ck.blue(t("settings", lang)),
                value: "settings"
            },
            {
                name: ck.red(t("quit", lang)),
                value: "quit"
            }
        ]
    });
    divider();

    switch (menu) {
        case "createProject":
            await createProject(lang);
            await mainMenu(lang);
            break;
        case "settings":
            await settingsMenu(lang);
            break;
        case "quit":
            console.log(ck.blueBright("🖥️ Github: "), ck.white("@igordmouraa"));
            console.log(ck.yellow(t("byeMessage", lang)));
            process.exit(0);
    }
}