import GenericRedisStore from "connect-redis";
import session, { Store } from "express-session";
import { RedisClient } from "redis";
import { StoreConfig, storeConfig } from "./store.config";
import { FactoryProvider } from "@nestjs/common";

export const RedisStore = GenericRedisStore(session);

export const storeFactory: FactoryProvider = {
    provide: Store,
    inject: [RedisClient, storeConfig.KEY],
    useFactory(client: RedisClient, config: StoreConfig) {
        return new RedisStore({ client, ...config });
    }
};
