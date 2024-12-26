import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: { type: String },
    role: {
        type: String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true,
    },
    isActivated: { type: Boolean, default: false },
});
