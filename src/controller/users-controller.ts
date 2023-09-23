import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

type UserData = {
    name: string,
    email: string,
    address: string
}

const createNewUser = async (req: Request, res: Response) => {
    const {name,email,address}: UserData = req.body;
    const result = await prisma.users.create({
        data: {
            name: name,
            email: email,
            address: address,
        }
    });
    res.json({
        data:result,
        message: "Created user success"
    });
};

const getUser = async (req: Request, res: Response) => {
    const result = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            password: false
        },
    });
    res.json({
        data: result,
        message: "Get data user success"
    });
};

const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    
    const {name, email, address} = req.body;
    const result = await prisma.users.update({
        data: {
            name: name,
            email: email,
            address: address
        },
        where: {
            id: id
        }
    });
    res.json({
        data: result,
        message: `User ${id} updated`
    });
};

const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const result = await prisma.users.delete({
        where: {
            id: id
        }
    });
    res.json({
        data: result,
        message: `User ${id} deleted`
    });
};


export default {
    createNewUser,
    getUser,
    updateUser,
    deleteUser
}