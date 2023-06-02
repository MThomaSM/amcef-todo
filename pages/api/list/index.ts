import { NextApiRequest, NextApiResponse } from 'next';

import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const lists = await prisma.list.findMany({
            include: {
                items: {
                    include: {
                        createdBy: true,
                    },
                },
                SharedList: true,
            },
        });

        res.status(200).json(lists);
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
