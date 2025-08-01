import SearchForm from '@components/Forms/SearchForm';

import Image from 'next/image';

const EventLayout = ({ children }) => {
  return (
    <section className="mx-auto w-full">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/images/layered-steps-2.svg"
          alt="Header Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      {/* Main Content */}
      <section className="h-full">
        <h1 className="my-8 w-full text-center text-6xl font-bold text-white">
          <span className="block">Find Christian Events</span>
        </h1>
        <SearchForm />
        <main>{children}</main>
      </section>
    </section>
  );
};

export default EventLayout;
