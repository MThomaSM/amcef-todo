import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import {getUserFromRequest} from '@/utils/jwt';
import {YupErrorsToResponse} from "@/utils/api";

const prisma = new PrismaClient({ log: ['warn', 'error'], errorFormat: 'minimal' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { listId, itemId } = req.query;

    try {
        const user = await getUserFromRequest(req);
        const userId = user.id;

        const item = await prisma.item.findFirst({
            where: {
                id: itemId as string,
                list: {
                    id: listId as string,
                    userId: userId as string,
                },
            },
        });
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
