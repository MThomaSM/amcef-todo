import { NextApiRequest, NextApiResponse } from "next";
import {getUserFromRequest} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { listId } = req.query;

    try {
        const user = await getUserFromRequest(req);
        const userId = user.id;

        const sharedUsers = await prisma.sharedList.findMany({
            where: {
                listId: listId as string,
                list: {
                    owner: {
                        id: userId as string
                    }
                }
            },
            include: {
                user: true,
            },
        });

        const usersWithShareId = sharedUsers.map((sharedUser) => ({
            ...sharedUser.user,
            shareId: sharedUser.id,
        }));

        return res.status(200).json(usersWithShareId);
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
