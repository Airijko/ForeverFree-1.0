import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative flex h-[375px] w-full flex-col items-center justify-center bg-gradient-to-t from-blue-200 to-blue-300 px-32 pt-16">
      <Image
        src="/assets/icons/simple-cross.png"
        width={100}
        height={100}
        alt="ForeverFree Logo"
        className="absolute left-1/2 top-5 z-50 -translate-x-1/2"
        priority
      />
      {children}
    </header>
  );
};

export default MainHeader;
