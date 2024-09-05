import { verifyUserByToken } from '@/lib/verifyUserByToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UnauthorizedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('token')?.value;

  if (await verifyUserByToken(token)) {
    redirect('/authorized');
  }

  return <main className='flex-1 flex items-center justify-center'>{children}</main>;
}
