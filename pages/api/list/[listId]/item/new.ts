import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import {itemSchema} from "@/schemas/itemSchema";
import {getUserFromRequest} from "@/utils/jwt";
import {YupErrorsToResponse} from "@/utils/api";

const prisma = new PrismaClient({ log: ['warn', 'error'], errorFormat: 'minimal'}) //minimal / pretty
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { listId } = req.query;
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

        await itemSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        const { title, description, deadline, status } = req.body;

        const createdItem = await prisma.item.create({
            data: {
                title,
                description,
                deadline,
                status,
                list: { connect: { id: listId as string } },
                createdBy: { connect: { id: userId as string } },
            },
        });

        res.status(201).json({ message: 'Todo položka bola úspešne vytvorená successfully', createdItem });
    } catch (error) {
        return res.status(200).json(YupErrorsToResponse(error));
    }
}
