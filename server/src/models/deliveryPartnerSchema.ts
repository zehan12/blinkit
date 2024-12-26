import { model, Schema } from "mongoose";
import { userSchema } from "./user.schema";

const deliverPartnerSchema = new Schema({
    ...userSchema.obj,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    role: {
        type: String,
        enum: ["DeliveryPartner"],
        default: "DeliveryPartner",
    },
    liveLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    address: {
        type: String,
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
    },
});

export const DeliveryPartner = model("DeliveryPartner", deliverPartnerSchema);
