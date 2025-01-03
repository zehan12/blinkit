import { Request, Response, Router } from "express";
import { products } from "../mocks";

const productRouterV1: Router = Router();

export const getAllProducts = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        return res
            .status(200)
            .json({ message: "fetched all products", products: products });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

productRouterV1.get("/", getAllProducts);

export { productRouterV1 as productRoutesV1 };
