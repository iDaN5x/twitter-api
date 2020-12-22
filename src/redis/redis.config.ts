import { registerAs } from "@nestjs/config";
import { plainToClass } from "class-transformer";
import { ClientOpts as IRedisOptions } from "redis";

export { ClientOpts as IRedisOptions } from "redis";

export class RedisOptions implements IRedisOptions {
    host?: string;
    port?: number;
    path?: string;
    url?: string;
    socket_keepalive?: boolean;
    socket_initial_delay?: number;
    retry_max_delay?: number;
    connect_timeout?: number;
    max_attempts?: number;
    password?: string;
    db?: string | number;
    prefix?: string;
}

export const redisConfig = registerAs("redis", () => {
    return plainToClass(
        RedisOptions,
        {
            host: process.env["REDIS_HOST"],
            port: process.env["REDIS_PORT"],
            path: process.env["REDIS_PATH"],
            url: process.env["REDIS_URL"],
            socket_keepalive: process.env["REDIS_SOCKET_KEEPALIVE"],
            socket_initial_delay: process.env["REDIS_SOCKET_INITIAL_DELAY"],
            retry_max_delay: process.env["REDIS_RETRY_MAX_DELAY"],
            connect_timeout: process.env["REDIS_CONNECT_TIMEOUT"],
            max_attempts: process.env["REDIS_MAX_ATTEMPTS"],
            password: process.env["REDIS_PASSWORD"],
            db: process.env["REDIS_DB"],
            prefix: process.env["REDIS_PREFIX"]
        },
        {
            enableImplicitConversion: true
        }
    );
});
