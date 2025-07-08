import AdminGuard from '@components/Auth/AdminGuard';
import AdminSideBar from '@components/Navbars/AdminSideBar';

const DashboardLayout = async ({ children }) => (
  <AdminGuard>
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-amber-950">
      {/* Sidebar */}
      <AdminSideBar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col py-32">{children}</main>
    </div>
  </AdminGuard>
);

export default DashboardLayout;
