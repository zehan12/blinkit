const mongoose = require("mongoose");
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import { config } from "./config";

const MongoDBStoreFactory = MongoDBStore(session);

export const store = new MongoDBStoreFactory({
    uri: config.db.uri as string,
    collection: "sessions",
});

store.on("error", (error: any) => {
    console.error("Session store error:", error);
});
