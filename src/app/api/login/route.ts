import prisma from '@/lib/prisma';
import { compare } from '@/lib/bcrypt';
import { sign, verify } from '@/lib/jwt';

export async function POST(req: Request) {
  const { name, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      name
    }
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  if (!(await compare(password, user.password))) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const token = sign({ id: user.id, name: user.name });

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      tokens: [...user.tokens.filter((token) => !!verify(token)), token]
    }
  });
  return new Response(token, {
    status: 200,
    headers: { 'set-cookie': `token=${token}; Path=/; Secure; HttpOnly; Secure;` }
  });
}
