import * as env from "env-var";
import { registerAs } from "@nestjs/config";
import { REDIS_CLIENT_OPTIONS, REDIS_CONFIG_NS } from "./constants";
import { RedisOptions } from "./redis-options.interface";

export const redisConfig = registerAs<() => RedisOptions>(
    REDIS_CONFIG_NS,
    () => {
        return {
            KEY: REDIS_CLIENT_OPTIONS,
            url: env.get("REDIS_URL").asUrlString(),
            host: env.get("REDIS_HOST").asString(),
            path: env.get("REDIS_PATH").asString(),
            password: env.get("REDIS_PASSWORD").asString(),
            prefix: env.get("REDIS_PREFIX").asString(),
            db: env.get("REDIS_DB").asString(),
            socket_keepalive: env.get("REDIS_SOCKET_KEEPALIVE").asBool(),
            socket_initial_delay: env.get("REDIS_SOCKET_INITIAL_DELAY").asInt(),
            retry_max_delay: env.get("REDIS_RETRY_MAX_DELAY").asInt(),
            connect_timeout: env.get("REDIS_CONNECT_TIMEOUT").asInt(),
            max_attempts: env.get("REDIS_MAX_ATTEMPTS").asInt(),
            port: env.get("REDIS_PORT").asInt()
        };
    }
);
