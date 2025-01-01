import dotenv from "dotenv";
import { configSchema } from "../validations";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

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
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    },
    jwt: {
        accessToken: {
            secret: "anyrandomaccesssecret",
            expiry: "1d",
        },
        refreshToken: {
            secret: "anyrandomrefreshsecret",
            expiry: "7d",
        },
    },
};
