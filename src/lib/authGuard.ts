import { cookies } from 'next/headers';
import { User } from '@prisma/client';
import { verifyUserByToken } from './verifyUserByToken';

// eslint-disable-next-line no-unused-vars
export const authGuard = (cb: (req: Request, user: User) => Promise<Response>) => {
  return async (req: Request) => {
    const token = cookies().get('token')?.value;
    const userFromDb = await verifyUserByToken(token);
    if (!userFromDb) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    return cb(req, userFromDb);
  };
};
