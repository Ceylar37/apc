import { z } from 'zod';
import { verify } from './jwt';
import prisma from './prisma';
import { User } from '@prisma/client';

const userDataSchema = z.object({
  id: z.string(),
  name: z.string()
});

export const verifyUserByToken = async (token: string | undefined): Promise<User | null> => {
  if (!token) {
    return null;
  }

  const userData = verify(token);
  if (!userData) {
    return null;
  }

  const { success, data: userDataParsed } = userDataSchema.safeParse(userData);
  if (!success) {
    return null;
  }

  const userFormDb = await prisma.user.findUnique({
    where: {
      id: userDataParsed.id
    }
  });
  if (!userFormDb || !userFormDb.tokens.includes(token)) {
    return null;
  }

  return userFormDb;
};
