import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    discountPrice: { type: Number, required: true },
    quantity: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
});

export const Product = model("Product", productSchema);
