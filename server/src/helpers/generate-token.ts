import jwt from "jsonwebtoken";
import { config } from "../config";


export const generateTokens = (user: any) => {
    console.log(user)
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        config.jwt.accessToken.secret,
        { expiresIn: config.jwt.accessToken.expiry }
    );

    const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        config.jwt.refreshToken.secret,
        { expiresIn: config.jwt.refreshToken.expiry }
    );

    return {
        refreshToken,
        accessToken,
    };
};
