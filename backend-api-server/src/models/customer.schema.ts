import { model, Schema } from "mongoose";
import { userSchema } from "./user.schema";

const customerSchema = new Schema({
    ...userSchema.obj,
    phone: { type: Number, required: true, unique: true },
    role: { type: String, enum: ["Customer"], default: "Customer" },
    liveLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    address: { type: String },
});

export const Customer = model("Customer", customerSchema);
