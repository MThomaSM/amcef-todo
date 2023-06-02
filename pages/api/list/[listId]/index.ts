import { NextApiRequest, NextApiResponse } from 'next';
import {listSchema} from "@/schemas/listSchema";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId } = req.query;

    try {
        const list = await prisma.list.findFirst({
            where: {
                id: listId as string,
            },
        });

        if (!list) {
            return res.status(404).json({ message: 'Zoznam nebol nájdeny' });
        }
        res.status(200).json(list);
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
