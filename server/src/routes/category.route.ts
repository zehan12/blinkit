import { Request, Response } from "express";
import { products } from "../mocks";

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        return res.status(200).json({ products: products });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
