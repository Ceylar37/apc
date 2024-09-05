import { authGuard } from '@/lib/authGuard';
import prisma from '@/lib/prisma';

export const POST = authGuard(async (req) => {
  const body = await req.json();
  const { book } = body;

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

  return new Response();
});
