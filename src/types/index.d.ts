export interface Answers {
    name: string;
    language: "js" | "ts";
    framework: "express" | "fastify";
    database: "mysql" | "postgres" | "mongo";
}

export interface MenuAnswers {
    action: string;
    language: string;
}