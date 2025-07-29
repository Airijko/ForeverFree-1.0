import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative min-h-[650px]">
      <div className="relative w-full">
        <Image
          src="/assets/images/headerimage.png"
          alt="Header Background"
          width={1920}
          height={1080}
          priority
          className="h-auto w-full blur-[2px] [mask-image:linear-gradient(to_top,transparent_5%,black_50%)]"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center py-24 text-white">
        {children}
      </div>
    </header>
  );
};

export default MainHeader;
