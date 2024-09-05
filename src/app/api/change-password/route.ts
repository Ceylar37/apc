import { authGuard } from '@/lib/authGuard';
import { compare, hash } from '@/lib/bcrypt';
import prisma from '@/lib/prisma';

export const POST = authGuard(async (req: Request, user) => {
  const { password, newPassword } = await req.json();

  if (!(await compare(password, user.password))) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: await hash(newPassword)
    }
  });

  return new Response(undefined, { status: 200 });
});
