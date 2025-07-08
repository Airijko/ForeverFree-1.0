import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const AdminGuard = async ({ children }) => {
  const session = await getServerSession(options);
  if (!session || session.user.role !== 'admin') {
    return redirect('/api/auth/signin?callbackUrl=/');
  }
  return children;
};

export default AdminGuard;
