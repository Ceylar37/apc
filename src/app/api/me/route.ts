import { authGuard } from '@/lib/authGuard';

export const GET = authGuard(async (req, user) => {
  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  return new Response(
    JSON.stringify({
      id: user.id,
      name: user.name,
      books: user.books,
      winCount: user.winCount
    })
  );
});
