import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type ContactData = {
    first_name: string,
    last_name: string,
    phone: string
}

interface ValidationRequest extends Request {
    contactData: ContactData
}

const accessValidationContact = async (req: Request, res: Response, next: NextFunction) => {
    const validationReq = req as ValidationRequest;
    const {authorization} = validationReq.headers;

    if(!authorization){
        res.status(401).json({
            message: "Token is required!"
        });
    }

    const token = authorization!.split(' ')[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const jwtDecode = jwt.verify(token, secret);
        if(typeof jwtDecode !== "string"){
            validationReq.contactData = jwtDecode as ContactData
        }
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    next();
};

export default accessValidationContact;