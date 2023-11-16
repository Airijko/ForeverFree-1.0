import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Admin = async () => {
  const session = await getServerSession(options);
  console.log('Session object:', session);
  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/admin');
  }
  return (
    <div>
      <h1>ADMIN</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role ?? 'NULL'}</p>
      <p>{session.user.id ?? 'NULL'}</p>
    </div>
  );
};

export default Admin;
