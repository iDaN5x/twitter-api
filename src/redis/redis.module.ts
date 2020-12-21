import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
    AsyncOptions,
    createAsyncOptionsProvider
} from "src/util/async-options";
import { REDIS_CLIENT_OPTIONS } from "./constants";
import { RedisOptions, redisConfig } from "./redis.config";
import { redisFactory } from "./redis.provider";

@Module({})
export class RedisModule {
    static register(options: RedisOptions): DynamicModule {
        return {
            module: RedisModule,
            providers: [
                redisFactory,
                {
                    provide: REDIS_CLIENT_OPTIONS,
                    useValue: options
                }
            ],
            exports: [redisFactory]
        };
    }

    static registerAsync(options: AsyncOptions<RedisOptions>): DynamicModule {
        const optionsProvider = createAsyncOptionsProvider(options);

        return {
            module: RedisModule,
            providers: [redisFactory, optionsProvider],
            exports: [redisFactory]
        };
    }

    static registerWithConfig(): DynamicModule {
        return {
            module: RedisModule,
            imports: [ConfigModule.forFeature(redisConfig)],
            providers: [redisFactory],
            exports: [redisFactory]
        };
    }
}
