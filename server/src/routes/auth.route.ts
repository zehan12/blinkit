import { Request, Response, Router } from "express";
import { config } from "../config";
import { Customer, DeliveryPartner } from "../models";
import jwt from "jsonwebtoken";
import { ROLE } from "../constant";
import { comparePassword } from "../helpers/bcrypt";
import { generateTokens } from "../helpers";

const authRouterV1: Router = Router();

export const loginCustomerHandler = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { phone } = req.body;
        let customer = await Customer.findOne({ phone });

        if (!customer) {
            customer = await Customer.create({
                phone,
                role: ROLE.CUSTOMER,
                isActivated: true,
            });
            const { accessToken, refreshToken } = generateTokens(customer);
            return res.status(200).json({
                message: "customer created and logged in successfully",
                customer,
                tokens: { accessToken, refreshToken },
            });
        } else {
            const { accessToken, refreshToken } = generateTokens(customer);
            return res.status(200).json({
                message: "customer logged in successfully",
                customer,
                tokens: { accessToken, refreshToken },
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            message: `error: ${err.message}`,
        });
    }
};

export const loginDeliveryPartnerHandler = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { email, password } = req.body;
    try {
        const partner = await DeliveryPartner.findOne({ email });
        if (!partner) {
            return res.status(404).json({
                message: "delivery partner not found!",
            });
        }
        // console.log(partner.password,password)
        // const isPasswordMatch = comparePassword(partner?.password!, password);
        // if (!isPasswordMatch) {
        //     return res.status(400).json({
        //         message: "Invalid Credentials",
        //     });
        // }

        const { accessToken, refreshToken } = generateTokens(partner);

        return res.status(200).json({
            message: "Login Successful",
            DeliveryPartner: partner,
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (err: any) {
        return res.status(500).json({
            message: `err : ${err.message}`,
        });
    }
};

export const createDeliveryPartnerHandler = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { email, password, phone } = req.body;
    try {
        const existingPartner = await DeliveryPartner.findOne({ email });
        if (existingPartner) {
            return res.status(400).json({
                message: "Delivery Partner with this email already exits",
            });
        }

        const partner = await DeliveryPartner.create({
            email,
            password,
            phone,
        });

        return res.status(201).json({
            message: "New Delivery Partner is created",
            deliveryPartner: partner,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "error :" + err.message,
        });
    }
};

authRouterV1.post("/customer/login", loginCustomerHandler);
authRouterV1.post("/delivery-partner/register", createDeliveryPartnerHandler);
authRouterV1.post("/delivery-partner/login", loginDeliveryPartnerHandler);

export { authRouterV1 as authRoutesV1 };
