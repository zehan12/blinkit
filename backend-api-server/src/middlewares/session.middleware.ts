import session from "express-session";
import { config, store } from "../configs";

export const sessionMiddleware = session({
    secret: "sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5" as string,
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: store,
    cookie: {
        secure: config.env === "production", // Set to true on HTTPS
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
        sameSite: "lax", // CSRF protection
    },
});
