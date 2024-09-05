import { CreatePasswordForm } from '@/features/create-password';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function FirstLogin({ params }: { params: { code?: string } }) {
  if (!params.code) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: {
      code: params.code
    }
  });

  if (!user) {
    return redirect('/login');
  }

  return <CreatePasswordForm />;
}
