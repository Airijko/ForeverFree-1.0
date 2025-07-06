import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative flex flex-col items-center justify-center pt-16 px-32 h-[375px] w-full bg-gradient-to-t from-blue-200 to-blue-300">
      <Image
        src="/assets/icons/simple-cross.png"
        width={100}
        height={100}
        alt="ForeverFree Logo"
        className="absolute top-5 left-1/2 -translate-x-1/2 z-50"
        priority
      />
      {children}
    </header>
  );
};

export default MainHeader;
