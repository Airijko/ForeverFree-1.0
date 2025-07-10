import '@styles/globals.css';
import 'react-phone-number-input/style.css';

import MainNavbar from '@components/Navbars/MainNavbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Forever Free',
  description: 'Find Events in Your Local Area',
  icons: {
    icon: '/assets/icons/ForeverFree_Logo.png',
  },
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-primary dark:text-white font-inter transition-colors duration-300">
        <Provider>
          <div className="flex min-h-screen w-full flex-row justify-center">
            {/* Sidebar/Navbar */}
            <MainNavbar />
            <main className="border-x border-gray-200  dark:border-neutral-700 transition-all duration-300">
              {children}
            </main>
            <aside className="sticky top-0 hidden h-screen w-[300px] flex-shrink-0 lg:flex" />
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
