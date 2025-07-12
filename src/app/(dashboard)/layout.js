import '@styles/globals.css';
import 'react-phone-number-input/style.css';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Dashboard - Forever Free',
};

const DashboardLayout = ({ children }) => {
  return (
    <Provider>
      <div className="min-h-screen w-full bg-neutral-50 font-inter text-primary transition-colors duration-300 dark:bg-neutral-900 dark:text-white">
        {children}
      </div>
    </Provider>
  );
};

export default DashboardLayout;
