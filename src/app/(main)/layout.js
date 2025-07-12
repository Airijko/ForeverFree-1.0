import '@styles/globals.css';
import 'react-phone-number-input/style.css';

import Provider from '@components/Provider';
import MainLayout from '@components/Layouts/MainLayout';
import MainNavbar from '@components/Navbars/MainNavbar';

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
      <body className="font-inter text-primary transition-colors duration-300 dark:text-white">
        <Provider>
          <div className="flex min-h-screen w-full flex-row justify-center">
            <MainLayout mainNavbar={<MainNavbar />}>{children}</MainLayout>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
