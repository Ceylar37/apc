import { authGuard } from '@/lib/authGuard';
import prisma from '@/lib/prisma';

export const GET = authGuard(async () => {
  const spins = await prisma.spin.findMany({
    select: {
      id: true,
      result: true,
      selections: {
        select: {
          id: true,
          books: true,
          user: {
            select: {
              name: true
            }
          }
        }
      },
      date: true
    }
  });

  return new Response(JSON.stringify(spins));
});
