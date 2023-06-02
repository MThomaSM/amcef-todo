import { NextApiRequest, NextApiResponse } from 'next';
import {getUserFromRequest} from "@/utils/jwt";
import {shareSchema} from "@/schemas/shareSchema";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId, shareId } = req.query;

    try {
        const user = await getUserFromRequest(req);
        const userId = user.id;

        const existingList = await prisma.list.findFirst({
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

        if (!existingList) {
            return res.status(404).json({ message: 'Zoznam nebol nájdeny' });
        }

        const existingShare = await prisma.sharedList.findUnique({
            where: {
                id: shareId as string,
            },
            include: {
                user: true,
                list: true
            }
        });

        res.status(200).json(existingShare);
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
