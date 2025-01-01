import { model, Schema } from "mongoose";

const counterSchema = new Schema({
    name: { type: String, required: true },
    sequence_value: { type: Number, default: 0 },
});

export const Counter = model("Counter", counterSchema);
