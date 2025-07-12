const MainLayout = ({ children, mainNavbar }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-7xl flex-row">
        {/* Left Navbar */}
        <aside>{mainNavbar}</aside>
        {/* Main Content */}
        <div className="flex w-full flex-row">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
