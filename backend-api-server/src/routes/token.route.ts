import { Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../configs";
import { ROLE } from "../constants";
import { Customer, DeliveryPartner } from "../models";
import { generateTokens } from "../helpers";

export const refreshTokenHandler = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json({ message: "Refresh Token Required" });
    }

    try {
        const decodedToken = jwt.verify(
            refreshToken,
            config.jwt.refreshToken.secret
        ) as JwtPayload;
        let user;

        if (decodedToken?.role === ROLE.CUSTOMER) {
            user = await Customer.findById(decodedToken.userId);
        } else if (decodedToken?.role === ROLE.DELIVERY_PARTNER) {
            user = await DeliveryPartner.findById(decodedToken.userId);
        } else {
            return res.status(403).json({
                message: "Invalid Role",
            });
        }

        if (!user) {
            return res.status(403).json({
                message: "Invalid Refresh Token",
            });
        }

        const { accessToken, refreshToken: newRefreshToken } =
            generateTokens(user);

        return res.status(200).json({
            message: "Refresh Token generated",
            user,
            tokens: {
                accessToken,
                refreshToken: newRefreshToken,
            },
        });
    } catch (err: any) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

const tokenRouterV1: Router = Router();
tokenRouterV1.post("/refresh-token", refreshTokenHandler);

export { tokenRouterV1 as tokenRouesV1 };
