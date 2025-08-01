import MainFooter from '@components/MainFooter';

const MainLayout = ({ children, mainNavbar }) => {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full flex-col">
        {/* Top Navbar */}
        {mainNavbar}
        {/* Main Content */}
        <div className="flex w-full flex-row items-center justify-center">
          {children}
        </div>
        {/* Footer */}
        <div className="mt-24">
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
