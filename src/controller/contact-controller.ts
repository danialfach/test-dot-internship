import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

const addContact = async (req: Request, res: Response, next: NextFunction) => {
    const {first_name, last_name, phone, userId} = req.body;
    try {
        const result = await prisma.contact.create({
            data: {
                first_name,
                last_name,
                phone,
                userId: userId
            }
        });
        res.json({
            data: result,
            message: "Contact added."
        });
    } catch (error) {
        console.log(error);
    }
};

const getContact = async(req: Request, res: Response, next: NextFunction) => {
    const result = await prisma.contact.findMany({
        select: {
            userId: true,
            first_name: true,
            last_name: true,
            phone: true
        }
    });
    res.json({
        data: result,
        message: "Get contact data success."
    });
};

const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;

    const {first_name, last_name, phone} = req.body;
    const result = await prisma.contact.update({
        data: {
            first_name: first_name,
            last_name: last_name,
            phone: phone,
        },
        where: {
            userId: userId
        }
    });
    res.json({
        data: result,
        message: `Contact ${userId} updated`
    });
};

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;

    const result = await prisma.contact.delete({
        where: {
            userId: userId
        }
    });
    res.json({
        data: result,
        message: `Contact ${userId} deleted.`
    });
};

export default {
    addContact,
    getContact,
    updateContact,
    deleteContact
};