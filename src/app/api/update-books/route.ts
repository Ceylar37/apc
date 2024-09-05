import { authGuard } from '@/lib/authGuard';
import prisma from '@/lib/prisma';

export const POST = authGuard(async (req, user) => {
  const { books } = await req.json();

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      books
    }
  });

  return new Response();
});
