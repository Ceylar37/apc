'use server';

import { hash } from '@/lib/bcrypt';
import { sign, verify } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const createPassword = async (data: FormData) => {
  const name = data.get('name') as string;
  const code = data.get('code') as string;
  const newPassword = data.get('newPassword') as string;

  const user = (await prisma.user.findUnique({
    where: {
      code: code
    }
  }))!;

  const passwordHash = await hash(newPassword);
  const token = sign({ id: user.id, name: user.name });

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      name,
      code: '',
      password: passwordHash,
      tokens: [...user.tokens.filter((token) => !!verify(token)), token]
    }
  });
  cookies().set('token', token);
  redirect('/authorized');
};
