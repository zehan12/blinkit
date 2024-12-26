require("dotenv").config({ path: __dirname + "/../../.env" });
import { configSchema } from "../validation";

const configValidation = configSchema.safeParse(process.env);

if (!configValidation.success) {
    console.error("Invalid configuration:", configValidation.error.format());
    process.exit(1);
}

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    db: {
        uri:
            process.env.NODE_ENV === "production" && process.env.DB_URI
                ? process.env.DB_URI
                : `mongodb://localhost:27017/${process.env.APP_NAME}`,
    },
};
