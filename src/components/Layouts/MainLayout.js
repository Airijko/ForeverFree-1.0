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
      </div>
    </div>
  );
};

export default MainLayout;
