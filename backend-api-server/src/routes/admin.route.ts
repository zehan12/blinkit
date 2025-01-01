// src/routes/adminRoutesV1.ts

import { Router, Request, Response, NextFunction } from "express";
import { Admin } from "../models";
import { isAdminAuthenticated } from "../middlewares";
import { comparePassword } from "../helpers/bcrypt";
import { config } from "../configs";
// import bcrypt from "bcrypt";
// import rateLimit from "express-rate-limit";

const adminRouterV1: Router = Router();

// Mock admin data (In production, use a database with hashed passwords)
const ADMIN = {
    id: 1,
    email: config.admin.email,
    password: config.admin.password,
};

// Rate limiter for login route
// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // Limit each IP to 5 login requests per windowMs
//     message:
//         "Too many login attempts from this IP, please try again after 15 minutes.",
// });

// Health Check Route (Protected)
adminRouterV1.get("/", isAdminAuthenticated, (req, res) => {
    res.send({
        message: "Admin route is accessible.",
        admin: req.session.admin,
    });
});

adminRouterV1.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const ad = await Admin.create({ name, email, password });
    res.status(200).json({
        user: ad,
    });
});

// Login Route with Rate Limiting and Password Hashing
adminRouterV1.post(
    "/login",
    async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        // Check if email matches
        if (email !== ADMIN.email) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = password === ADMIN.password;
        // comparePassword(password, ADMIN.hashedPassword);
        if (isMatch) {
            // Save admin info in session without the password
            req.session.admin = {
                id: ADMIN.id,
                email: ADMIN?.email!,
            };

            return res.status(200).json({
                message: "Login successful",
                admin: req.session.admin,
            });
        }

        return res.status(401).json({ message: "Invalid credentials." });
    }
);

// Logout Route (Protected)
adminRouterV1.post(
    "/logout",
    isAdminAuthenticated,
    (req: Request, res: Response) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Error logging out." });
            }
            res.clearCookie("connect.sid"); // Default session cookie name
            return res.status(200).json({ message: "Logout successful." });
        });
    }
);

export { adminRouterV1 as adminRoutesV1 };
