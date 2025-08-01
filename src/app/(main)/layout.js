import '@styles/globals.css';
import '@styles/embla.css';
import 'react-phone-number-input/style.css';

import Provider from '@components/Provider';
import MainLayout from '@components/Layouts/MainLayout';

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
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
