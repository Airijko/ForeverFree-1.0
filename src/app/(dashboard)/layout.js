import '@styles/globals.css';
import 'react-phone-number-input/style.css';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Dashboard - Forever Free',
};

const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="font-inter text-primary transition-colors duration-300 dark:text-white">
        <Provider>
          <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default DashboardLayout;
