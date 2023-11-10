import '@styles/globals.css';

import MainNavbar from '@components/MainNavbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Forever Free',
  description: 'Find Events in Your Local Area',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <MainNavbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
