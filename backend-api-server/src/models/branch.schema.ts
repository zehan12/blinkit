import { model, Schema } from "mongoose";

const branchSchema = new Schema({
    name: { type: String, required: true },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    address: { type: String },
    deliveryPartners: [
        {
            type: Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        },
    ],
});

export const Branch = model("Branch", branchSchema);
