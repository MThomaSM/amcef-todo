import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({ log: ['warn', 'error'], errorFormat: 'minimal'}) //minimal / pretty

export default prisma;