import { fetchAllEvents, fetchFeaturedEvents } from '@actions/eventAction';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';
import ListEvents from '@components/Events/ListEvents';
import Image from 'next/image';
import EventDetailedCard from '@components/Cards/EventDetailedCard';
import EventCarousel from '@components/Embla/EventCarousel';

const Home = async () => {
  const eventData = await fetchAllEvents();
  const recentEvents = await eventData.reverse().slice(0, 4);
  const featuredEvents = await fetchFeaturedEvents();
  const mappedFeaturedEvents = featuredEvents.map((event, index) => (
    <div className="embla__slide" key={event._id}>
      <EventDetailedCard event={event} key={event._id} index={index} />
    </div>
  ));

  return (
    <section className="flex h-full w-full flex-col">
      <MainHeader>
        <div className="flex h-full w-full flex-col items-center justify-end">
          <h1 className="head_text max-w-4xl text-center">
            Connect with your Christian Community
          </h1>
          <p className="desc max-w-5xl text-center">
            Join groups, find events, and grow in faith and fellowship.
          </p>
          <div className="mt-5 flex flex-row items-center gap-2">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 md:text-xl lg:text-2xl"
            >
              <Link href="/events"> Find Nearby Events</Link>
            </button>
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border px-5 py-2.5 text-center text-lg font-medium text-white md:text-xl lg:text-2xl"
            >
              <Link href="/communities">Find Communities</Link>
            </button>
          </div>
          <div className="mt-5 flex max-w-4xl flex-col gap-5">
            <h3 className="heading-2">Upcoming Events</h3>
            <EventCarousel events={mappedFeaturedEvents} />
          </div>
        </div>
      </MainHeader>
      {/* Main Content */}
      <main className="mainContent">
        <div className="flex w-full flex-col gap-6 px-7 py-5">
          <section className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
            <div className="mb-auto md:w-1/2">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <h3 className="heading-3">Explore Christian Communities</h3>
                <p className="text-gray-300">
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
      </main>
    </section>
  );
};

export default Home;
