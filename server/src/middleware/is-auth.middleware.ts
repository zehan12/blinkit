import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                message: "Access Token Required!",
            });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, config.jwt.accessToken.secret);
        req.user = decodedToken;
        next();
    } catch (err: any) {
        return res.status(403).json({
            message: "Access Token Required!",
        });
    }
};
