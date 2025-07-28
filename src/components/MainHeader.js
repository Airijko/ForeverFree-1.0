import Image from 'next/image';

const MainHeader = ({ children }) => {
  return (
    <header className="relative h-[90vh] w-full">
      <Image
        src="/assets/images/headerimage.png"
        alt="Header Background"
        fill
        priority
        className="object-cover object-top blur-[2px] [mask-image:linear-gradient(to_top,transparent_5%,black_50%)]"
      />

      <div className="absolute inset-0 flex items-center justify-center py-24 text-white">
        {children}
      </div>
    </header>
  );
};

export default MainHeader;
