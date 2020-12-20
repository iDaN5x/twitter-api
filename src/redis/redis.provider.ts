import { FactoryProvider } from "@nestjs/common";
import { once } from "events";
import { RedisClient, createClient } from "redis";
import { RedisConfig, redisConfig } from "./redis.config";

export const redisFactory: FactoryProvider = {
    provide: RedisClient,
    inject: [redisConfig.KEY],
    async useFactory(config: RedisConfig) {
        const client = createClient(config);
        await once(client, "ready");
        return client;
    }
};
