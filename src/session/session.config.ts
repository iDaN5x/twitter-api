import { registerAs } from "@nestjs/config";
import { plainToClass } from "class-transformer";
import { SessionOptions as ISessionConfig } from "express-session";

export class SessionConfig implements ISessionConfig {
    secret: string[];
    name?: string;
    rolling?: boolean;
    proxy?: boolean;
    resave?: boolean = false;
    saveUninitialized?: boolean = false;
}

export const sessionConfig = registerAs("session", () => {
    return plainToClass(
        SessionConfig,
        {
            secret: process.env["SESSION_SECRET"].split(","),
            name: process.env["SESSION_NAME"],
            rolling: process.env["SESSION_ROLLING"],
            proxy: process.env["SESSION_PROXY"],
            resave: process.env["SESSION_RESAVE"],
            saveUninitialized: process.env["SESSION_SAVEUNINITIALIZED"]
        },
        {
            enableImplicitConversion: true
        }
    );
});
