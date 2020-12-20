import { FactoryProvider } from "@nestjs/common";
import session, { Session, Store } from "express-session";
import { sessionConfig } from "./session.config";

export const sessionFactory: FactoryProvider = {
    provide: Session,
    inject: [sessionConfig.KEY, Store],
    useFactory(config, store) {
        return session({ store, ...config });
    }
};
