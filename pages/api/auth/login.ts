
import type { NextApiRequest, NextApiResponse } from 'next'

const bcrypt = require('bcryptjs');
import {signupSchema} from "@/schemas/signupSchema";
import {createAndSendToken, signToken} from "@/utils/jwt";
import {loginSchema} from "@/schemas/loginSchema";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST"){
        return res.status(400).json({message: "Bad method"});
    }
    const { email, password }  = req.body;

    try {
        await loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if(!user){
            return res.status(401).json({message: "Zle údaje"});
        }

        if(await bcrypt.compare(password, user.password) === false){
            return res.status(401).json({message: "Zle údaje"});
        }

        return createAndSendToken(user, 200, res);

    } catch (error: any) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
