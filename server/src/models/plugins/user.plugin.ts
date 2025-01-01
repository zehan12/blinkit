// src/models/userPlugin.ts
import { Schema, Document, Model, HookNextFunction } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUserMethods {
    verifyPassword(password: string): Promise<boolean>;
}

export interface IUserStatics {
    // Add static methods if needed
}

export interface IUserDocument extends Document, IUserMethods {}

export function userPlugin<T extends IUserDocument>(
    schema: Schema<T, Model<T>, IUserMethods>
): void {
    // Pre-save Hook for Password Hashing
    schema.pre<T>("save", async function (next: HookNextFunction) {
        if (this.isModified("password") && this.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
                next();
            } catch (error) {
                next(error);
            }
        } else {
            next();
        }
    });

    schema.methods.verifyPassword = async function (password: string): Promise<boolean> {
        if (!this.password) return false;
        return bcrypt.compare(password, this.password);
    };

    // toJSON Transformation to Remove Sensitive Fields
    schema.set("toJSON", {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    });

}
