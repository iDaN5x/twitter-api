import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { SessionModule } from "./session/session.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        RedisModule.registerWithConfig(),
        SessionModule.registerWithConfig()
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
