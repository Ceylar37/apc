import { PrismaClient } from '@prisma/client';

// @ts-ignore
let prisma: PrismaClient = global.prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
