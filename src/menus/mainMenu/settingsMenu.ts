import { select } from "@inquirer/prompts";
import ck from "chalk";
import { mainMenu } from "./index.js";
import { divider } from "../helpers/index.js";
import { t } from "../helpers/messages/index.js";

export async function settingsMenu(lang: "pt-BR" | "en-US") {
    console.clear();
    const menu = await select({
        message: ck.cyan.underline(t("settingsTitle", lang)),
        choices: [
            {
                name: ck.blue(t("language", lang)),
                value: "language"
            },
            {
                name: ck.gray(t("back", lang)),
                value: "back"
            }
        ]
    });
    divider();

    switch (menu) {
        case "language":
            const newLang = await changeLanguage(lang);
            await settingsMenu(newLang); // Atualiza o idioma e volta ao menu de configurações
            break;
        case "back":
            await mainMenu(lang); // Volta ao menu principal
            break;
    }
}

async function changeLanguage(currentLang: "pt-BR" | "en-US") {
    const language = await select({
        message: ck.cyan.underline(t("chooseLanguage", currentLang)),
        choices: [
            {
                name: ck.blue(t("portuguese", currentLang)),
                value: "pt-BR"
            },
            {
                name: ck.blue(t("english", currentLang)),
                value: "en-US"
            },
            {
                name: ck.gray(t("back", currentLang)),
                value: "back"
            }
        ] as const,
    });
    divider();

    if (language === "back") {
        return currentLang; // Mantém o idioma atual
    } else {
        console.log(ck.green(`${t("languageChanged", currentLang)} ${language}`));
        return language; // Retorna o novo idioma
    }
}