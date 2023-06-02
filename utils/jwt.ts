import {NextRequest} from "next/server";
import {NextApiRequest, NextApiResponse} from "next";
import {promisify} from "util";
import {User} from "@/store/user-slice";
import {PrismaClient} from "@prisma/client";
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient({ log: ['warn', 'error'], errorFormat: 'minimal'}) //minimal / pretty

export const signToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 43200 }); //12h
};

export const getUserFromRequest = async(req: NextApiRequest): Promise<User>  => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token || token == "null") {
        throw Error('authentication failed');
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // @ts-ignore
    const currentUser: User = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    return currentUser;
}

export const createAndSendToken = (user: User, statusCode: number, res: NextApiResponse) => {
    const token = signToken(user.id);

    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 12; // 12 hours
    res.status(statusCode).json({
        status: 'success',
        token: token,
        expiresIn,
        data: user
    })
}