import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="container relative flex min-h-[1000px] flex-col items-center justify-start px-4 py-32">
      {/* Background Image with fade to transparent */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/assets/images/headerimage.png"
          alt="Background"
          fill
          priority
          className="object-cover object-top blur-[2px] [mask-image:linear-gradient(to_top,transparent_5%,black_50%)]"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </header>
  );
};

export default MainHeader;
