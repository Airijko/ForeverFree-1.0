import '@styles/globals.css';
import 'react-phone-number-input/style.css';
import Provider from '@components/Provider';
import DashboardLayout from '@components/Layouts/DashboardLayout';

export const metadata = {
  title: 'Dashboard - Forever Free',
};

const RootDashboardLayout = async ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="font-inter text-primary transition-colors duration-300 dark:text-white">
        <Provider>
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootDashboardLayout;
