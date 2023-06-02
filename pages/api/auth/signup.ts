// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const bcrypt = require('bcryptjs');
import {signupSchema} from "@/schemas/signupSchema";
import {createAndSendToken, signToken} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";

export type User = {
    id: string,
    email: string,
    password: string | undefined
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST"){
        return res.status(400).json({message: "Bad method"});
    }

    const { email, password, confirmPassword } = req.body;

    try {
        await signupSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

        let passwordHash = "";

        if(confirmPassword === password){
            passwordHash = await bcrypt.hash(password, 12);
        }

        if(passwordHash === ""){
            return res.status(401).json({message: "Missing hash"});
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(user)
            return res.status(401).json({message: "Daný email už je registrovaný"});


        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: passwordHash,
            },
        })

        return createAndSendToken(newUser, 201, res);

    } catch (error: any) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
