import { registerAs } from "@nestjs/config";
import { plainToClass } from "class-transformer";
import { RedisStoreOptions as IStoreConfig } from "connect-redis";

export class StoreConfig implements IStoreConfig {
    ttl?: number;
    disableTTL?: boolean;
    disableTouch?: boolean;
    prefix?: string;
    scanCount?: number;
}

export const storeConfig = registerAs("session.store", () => {
    return plainToClass(
        StoreConfig,
        {
            ttl: process.env["SESSION_STORE_TTL"],
            disableTTL: process.env["SESSION_STORE_DISABLE_TTL"],
            disableTouch: process.env["SESSION_STORE_DISABLE_TOUCH"],
            prefix: process.env["SESSION_STORE_PREFIX"],
            scanCount: process.env["SESSION_STORE_SCAN_COUNT"]
        },
        {
            enableImplicitConversion: true
        }
    );
});
