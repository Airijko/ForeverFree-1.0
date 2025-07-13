import { fetchAllEvents } from '@actions/eventAction';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';
import ListEvents from '@components/Events/ListEvents';
import Image from 'next/image';
import EventDetailedCard from '@components/Cards/EventDetailedCard';
import Carousel from '@components/Embla/Carousel';

const Home = async () => {
  const eventData = await fetchAllEvents();
  const recentEvents = await eventData.reverse().slice(0, 4);
  const recentEventsList = eventData.map((event, index) => (
    <EventDetailedCard event={event} key={event._id} index={index} />
  ));

  return (
    <>
      <section className="mainContent">
        <MainHeader>
          <div className="flex h-full flex-col items-center justify-end">
            <h1 className="head_text max-w-lg text-center">
              Connect with your Christian Community
            </h1>
            <p className="desc max-w-lg text-center">
              Join groups, find events, and grow in faith and fellowship.
            </p>
            <div className="mt-5 flex flex-row items-center gap-2">
              <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 md:text-xl lg:text-2xl"
              >
                <Link href="/events"> Find Events Near Me</Link>
              </button>
            </div>
            <div className="flex w-full flex-col gap-5">
              <h3 className="heading-2">Featured Events</h3>
              <Carousel data={recentEventsList} />
            </div>
          </div>
        </MainHeader>
        {/* Main Content */}
        <div className="flex w-full flex-col gap-6 px-7 py-5">
          <section className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
            <div className="mb-auto md:w-1/2">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <h3 className="heading-3">Explore Christian Communities</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover and connect with local Christian organizations.
                </p>
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-amber-400 px-5 py-3 text-xl font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 md:text-2xl xl:text-3xl"
                >
                  <Link href="/communities">Explore Communities</Link>
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-center overflow-hidden rounded-xl md:mt-0 md:w-1/2 md:justify-end">
              <Image
                src="/assets/images/LoneCross.png"
                alt="Lone Cross"
                width={400}
                height={400}
                className="h-auto max-h-64 w-full object-contain"
              />
            </div>
          </section>
          <div className="flex w-full flex-col gap-2">
            <h3 className="heading-3">Upcoming Events</h3>
            <ListEvents data={recentEvents} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
