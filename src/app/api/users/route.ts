import { authGuard } from '@/lib/authGuard';
import prisma from '@/lib/prisma';

export const GET = authGuard(async (req, user) => {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: user.id
          }
        },
        {
          code: ''
        }
      ]
    },
    select: {
      id: true,
      name: true,
      books: true
    }
  });

  return new Response(JSON.stringify(users));
});
