import { Request, Response, NextFunction } from "express";

export const isAdminAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session.admin) {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized. Please log in as admin.",
        });
    }
};
