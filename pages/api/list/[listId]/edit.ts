import { NextApiRequest, NextApiResponse } from 'next';
import {getUserFromRequest} from "@/utils/jwt";
import {listSchema} from "@/schemas/listSchema";
import {YupErrorsToResponse} from "@/utils/api";
import prisma from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId } = req.query;
    const { title } = req.body;

    try {

        const user = await getUserFromRequest(req);
        const userId = user.id;

        await listSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

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
            return res.status(404).json({ message: 'Zoznam nebol nájdeny' });
        }

        const updatedList = await prisma.list.update({
            where: {
                id: listId as string,
            },
            data: {
                title,
            },
        });

        res.status(200).json({ message: 'Zoznam bol úspešne upravený', updatedList });
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
