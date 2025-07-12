import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative flex w-full flex-col items-center justify-center bg-gradient-to-t from-amber-400 to-amber-300 px-32 py-12">
      <Image
        src="/assets/icons/simple-cross.png"
        width={100}
        height={100}
        alt="ForeverFree Logo"
        className="absolute left-7 top-20 z-50"
        priority
      />
      {children}
    </header>
  );
};

export default MainHeader;
