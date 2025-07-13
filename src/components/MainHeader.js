import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative flex w-full flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/assets/images/FFLandingPage.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center blur-[2px]"
        />
      </div>
      <div className="z-10 w-full">{children}</div>
    </header>
  );
};

export default MainHeader;
