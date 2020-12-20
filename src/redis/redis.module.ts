import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { redisConfig } from "./redis.config";
import { redisFactory } from "./redis.provider";

@Module({
    imports: [ConfigModule.forFeature(redisConfig)],
    providers: [redisFactory],
    exports: [redisFactory]
})
export class RedisModule {}
