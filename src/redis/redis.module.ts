import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import {
    AsyncOptions,
    createAsyncOptionsProvider
} from "src/util/async-options";
import { REDIS_CLIENT_OPTIONS } from "./constants";
import { RedisOptions } from "./redis-options.interface";
import { redisConfig } from "./redis.config";
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
            imports: options.imports,
            providers: [redisFactory, optionsProvider],
            exports: [redisFactory]
        };
    }

    static registerWithConfig(overrides: RedisOptions = {}): DynamicModule {
        return {
            module: RedisModule,
            imports: [ConfigModule.forFeature(redisConfig)],
            providers: [
                redisFactory,
                {
                    inject: [redisConfig.KEY],
                    provide: REDIS_CLIENT_OPTIONS,
                    useFactory(config: RedisOptions) {
                        return { ...config, ...overrides };
                    }
                }
            ],
            exports: [redisFactory]
        };
    }
}
