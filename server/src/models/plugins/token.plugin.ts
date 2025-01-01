// src/models/tokenPlugin.ts
import { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export interface ITokenMethods {
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export interface ITokenDocument extends Document, ITokenMethods {}

export function tokenPlugin<T extends Document>(
    schema: Schema<T, Model<T>>
): void {
    schema.methods.generateAccessToken = function (): string {
        const payload = {
            id: this._id,
            role: (this as any).role,
        };
        const token = jwt.sign(payload, config.jwt.accessToken.secret, {
            expiresIn: config.jwt.accessToken.expiry,
        });
        return token;
    };

    schema.methods.generateRefreshToken = function (): string {
        const payload = {
            id: this._id,
        };
        const token = jwt.sign(payload, config.jwt.refreshToken.secret, {
            expiresIn: config.jwt.refreshToken.expiry,
        });
        return token;
    };
}
