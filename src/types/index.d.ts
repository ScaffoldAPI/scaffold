export interface Answers {
    name: string;
    framework: "express" | "fastify";
    database: "mysql" | "postgres" | "mongo";
}

export interface MenuAnswers {
    action: string;
    language: string;
}