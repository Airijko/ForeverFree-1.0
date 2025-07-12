const MainLayout = ({ children, rightPanel, mainNavbar }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Navbar */}
      <aside className="border-r border-gray-200 dark:border-neutral-700">
        {mainNavbar}
      </aside>
      {/* Main Content */}
      <div className="flex w-full flex-row">{children}</div>
    </div>
  );
};

export default MainLayout;
