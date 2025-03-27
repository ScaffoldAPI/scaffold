import ck from "chalk";

export const messages = {
    "en-US": {
        mainMenuTitle: "⚙️ Scaffold CLI 📦 1.1.4",
        createProject: "◈ Create API Project",
        settings: "☰ Settings",
        quit: "✕ Quit",
        settingsTitle: "☰ Settings",
        language: "🌐 Language",
        back: "⤶ Back",
        chooseLanguage: "🌐 Choose language",
        languageChanged: "Language changed to:",
        portuguese: "Portuguese (pt-BR)",
        english: "English (en-US)",
        projectName: "Project name:",
        chooseTechnology: "Choose language:",
        chooseFramework: "Choose framework:",
        chooseDB: "Choose database:",
        invalidName: "Use only lowercase letters and hyphens",
        dirExists: "Directory already exists. Overwrite?",
        creatingProject: "Creating project...",
        copyingFiles: "Copying template files...",
        installingDeps: "Installing dependencies...",
        success: "Project created successfully! To start:",
        missingNpm: "npm is not installed!",
        nodeVersion: "Node.js 20.11 or higher required!",
        yourVersion: "Your Node version:",
        operationCanceled: "Operation canceled by user",
        templateNotFound: "Template not found:",
        byeMessage: "👋 Goodbye!"
    },
    "pt-BR": {
        mainMenuTitle: "⚙️ Scaffold CLI 📦 1.1.4",
        createProject: "◈ Criar Projeto de API",
        settings: "☰ Configurações",
        quit: "✕ Sair",
        settingsTitle: "☰ Configurações",
        language: "🌐 Idioma",
        back: "⤶ Voltar",
        chooseLanguage: "🌐 Escolha o idioma",
        languageChanged: "Idioma alterado para:",
        portuguese: "🇧🇷 Português (pt-BR)",
        english: "🇺🇸 Inglês (en-US)",
        projectName: "Nome do projeto:",
        chooseTechnology: "Escolha a linguagem:",
        chooseFramework: "Escolha o framework:",
        chooseDB: "Escolha o banco de dados:",
        invalidName: "Use apenas letras minúsculas e hífens",
        dirExists: "Diretório já existe. Sobrescrever?",
        creatingProject: "Criando projeto...",
        copyingFiles: "Copiando arquivos do template...",
        installingDeps: "Instalando dependências...",
        success: "Projeto criado com sucesso! Para iniciar:",
        missingNpm: "npm não está instalado!",
        nodeVersion: "Node.js 20.11 ou superior necessário!",
        yourVersion: "Sua versão do Node:",
        operationCanceled: "Operação cancelada pelo usuário",
        templateNotFound: "Template não encontrado:",
        byeMessage: "👋 Até logo!"
    }
};

export const t = (key: keyof typeof messages["en-US"], lang: "pt-BR" | "en-US") => messages[lang][key];