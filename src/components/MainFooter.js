const MainFooter = () => {
  return (
    <footer className="w-full bg-indigo-950 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-lg font-bold text-white">
          ForeverFree &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-6 text-sm text-gray-300">
          <a href="/about" className="transition hover:text-white">
            About
          </a>
          <a href="/contact" className="transition hover:text-white">
            Contact
          </a>
          <a href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
