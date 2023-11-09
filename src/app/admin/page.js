import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Admin = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/admin');
  }
  return (
    <div>
      <h1>ADMIN</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Admin;
