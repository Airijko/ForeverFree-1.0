import MainNavbar from '@components/Navbars/MainNavbar';
import MainFooter from '@components/MainFooter';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Top Navbar */}
      <MainNavbar />

      {/* Main Content */}
      <main className="w-full flex-1">{children}</main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
};

export default MainLayout;
