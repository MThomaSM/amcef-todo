import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import {getUserFromRequest} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId, itemId } = req.query;

    try {
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
            return res.status(404).json({ message: 'Zoznam neexistuje' });
        }

        const existingItem = await prisma.item.findFirst({
            where: {
                id: itemId as string,
                createdById: userId as string,
            },
        });

        if (!existingItem) {
            return res.status(404).json({ message: 'Položka neexistuje' });
        }

        await prisma.item.delete({
            where: {
                id: itemId as string,
            },
        });

        res.status(200).json({ message: 'Todo položka bola úspešne zmazana' });
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
