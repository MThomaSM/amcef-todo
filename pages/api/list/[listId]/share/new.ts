import { NextApiRequest, NextApiResponse } from 'next';
import {getUserFromRequest} from "@/utils/jwt";

import {shareSchema} from "@/schemas/shareSchema";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId } = req.query;
    const { email } = req.body;

    try {
        const user = await getUserFromRequest(req);
        const userId = user.id;

        await shareSchema.validate(req.body, { abortEarly: false });
        const existingList = await prisma.list.findFirst({
            where: {
                id: listId as string,
                userId: userId as string,
            },
        });

        if (!existingList) {
            return res.status(404).json({ message: 'Zoznam nebol nájdeny' });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email as string,
            },
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'Uživateľ neexistuje' });
        }

        if(existingUser.id === userId){
            return res.status(404).json({ message: 'Nemôžete zdieľať zoznam sám sebe' });
        }

        const sharedList = await prisma.sharedList.create({
            data: {
                list: {
                    connect: { id: listId as string}
                },
                user: {
                    connect: { id: existingUser.id as string }
                }
            }
        });

        res.status(200).json({ message: 'Uspešne ste zdieľal zoznam', sharedList });
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
