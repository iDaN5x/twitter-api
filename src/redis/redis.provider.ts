import { FactoryProvider } from "@nestjs/common";
import { once } from "events";
import { RedisClient, createClient } from "redis";
import { REDIS_CLIENT_OPTIONS } from "./constants";
import { RedisOptions } from "./redis.config";

export const redisFactory: FactoryProvider = {
    provide: RedisClient,
    inject: [REDIS_CLIENT_OPTIONS],
    async useFactory(config: RedisOptions) {
        const client = createClient(config);
        await once(client, "ready");
        return client;
    }
};
