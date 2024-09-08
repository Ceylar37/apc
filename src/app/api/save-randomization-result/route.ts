import { authGuard } from '@/lib/authGuard';
import prisma from '@/lib/prisma';

export const POST = authGuard(async (req) => {
  const body = await req.json();
  const { book, userId } = body;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      books: true
    }
  });
  await prisma.spin.create({
    data: {
      result: book,
      selections: {
        createMany: {
          data: users.map((user) => ({
            userId: user.id,
            books: user.books
          }))
        }
      }
    }
  });
  await prisma.user.updateMany({
    data: {
      books: []
    }
  });
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      winCount: {
        increment: 1
      }
    }
  });

  return new Response();
});
