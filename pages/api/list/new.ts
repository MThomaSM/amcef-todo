import { NextApiRequest, NextApiResponse } from 'next';
import {listSchema} from "@/schemas/listSchema";
import {getUserFromRequest} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const user = await getUserFromRequest(req);
        const userId = user.id;

        await listSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        const { title } = req.body;

        const newList = await prisma.list.create({
            data: {
                title,
                owner: {
                    connect: { id: userId as string },
                },
            },
        });

        res.status(201).json({ message: 'Zoznam bol úspešne vytvorený', newList });
    } catch (error: any) {
        return res.status(200).json(YupErrorsToResponse(error));
    }

}