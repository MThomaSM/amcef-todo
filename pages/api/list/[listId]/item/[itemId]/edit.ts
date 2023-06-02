import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import {itemSchema} from "@/schemas/itemSchema";
import {getUserFromRequest} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";

const prisma = new PrismaClient({ log: ['warn', 'error'], errorFormat: 'minimal'}) //minimal / pretty

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId, itemId } = req.query;
    const { title, description, deadline, status } = req.body;

    try {
        await itemSchema.validate(req.body, { abortEarly: false });
        const user = await getUserFromRequest(req);
        const userId = user.id;

        const list = await prisma.list.findFirst({
            where: {
                OR: [
                    {
                        userId: userId as string,
                    },
                    {
                        SharedList: {
                            some: {
                                userId: userId as string,
                            },
                        },
                    },
                ],
                id: listId as string,
            },
        });

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }


        const existingItem = await prisma.item.findFirst({
            where: {
                id: itemId as string,
                createdById: userId as string,
            },
        });

        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found' });
        }


        const updatedItem = await prisma.item.update({
            where: {
                id: itemId as string,
            },
            data: {
                title,
                description,
                deadline,
                status
            },
        });

        res.status(200).json({ message: 'Todo položka bola úspešne aktualizovaná', updatedItem });
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
