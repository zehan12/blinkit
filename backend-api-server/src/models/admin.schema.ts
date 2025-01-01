import { model, Schema } from "mongoose";
import { userSchema } from "./user.schema";

const adminSchema = new Schema({
    ...userSchema.obj,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin"], default: "Admin" },
});

export const Admin = model("Admin", adminSchema);
