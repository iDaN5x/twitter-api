import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "src/redis/redis.module";
import { sessionConfig } from "./session.config";
import { sessionFactory } from "./session.provider";
import { storeConfig } from "./store.config";
import { storeFactory } from "./store.provider";

@Module({
    imports: [
        ConfigModule.forFeature(sessionConfig),
        ConfigModule.forFeature(storeConfig),
        RedisModule
    ],
    providers: [sessionFactory, storeFactory],
    exports: [sessionFactory, storeFactory]
})
export class SessionModule {}
