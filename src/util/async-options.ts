import { ModuleMetadata, Provider, Type } from "@nestjs/common";

export interface OptionsFactory<TOptions> {
    createOptions(): Promise<TOptions> | TOptions;
}

export interface AsyncOptions<TOptions>
    extends Pick<ModuleMetadata, "imports"> {
    key: string;
    inject?: any[];
    useExisting?: Type<OptionsFactory<TOptions>>;
    useClass?: Type<OptionsFactory<TOptions>>;
    useFactory?: (...args: any[]) => Promise<TOptions> | TOptions;
}

export function createAsyncOptionsProvider<TOptions>(
    options: AsyncOptions<TOptions>
): Provider {
    if (options.useClass || options.useExisting) {
        return {
            provide: options.key,
            inject: [options.useClass || options.useExisting],
            async useFactory(optionsFactory: OptionsFactory<TOptions>) {
                return optionsFactory.createOptions();
            }
        };
    }

    return {
        provide: options.key,
        inject: options.inject || [],
        useFactory: options.useFactory
    };
}
