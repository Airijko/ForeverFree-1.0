import '@styles/globals.css';

import MainNavbar from '@components/MainNavbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Forever Free',
  description: 'Find Events in Your Local Area',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-secondary dark:bg-slate-900 text-primary dark:text-white font-inter transition-colors duration-300">
        <Provider>
          <MainNavbar />
          <main className="app relative z-10">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
