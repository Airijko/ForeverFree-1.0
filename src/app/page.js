import { fetchAllOrganizations } from '@actions/organizationActions';
import { fetchAllEvents } from '@actions/eventAction';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';
import ListCommunities from '@components/communties/ListCommunities';
import ListEvents from '@components/Events/ListEvents';

const Home = async () => {
  const communityData = await fetchAllOrganizations();
  const recentCommunities = communityData.reverse().slice(0, 4);
  const eventData = await fetchAllEvents();
  const recentEvents = eventData.reverse().slice(0, 1);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <MainHeader>
        <div className="flex flex-col items-center justify-end h-full w-full max-w-5xl mb-5">
          <h1 className="head_text text-center max-w-2xl md:text-4xl">
            Discover What&apos;s Happening in Your Christian Community
          </h1>
          <p className="desc text-center max-w-lg">
            Find events, connect with churches, and explore resources that
            enrich your faith journey.
          </p>
          <div className="flex flex-row items-center mt-5 gap-2">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <Link href="/events"> Find Events Near Me</Link>
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              <Link href="/communities">Explore Christian Communities</Link>
            </button>
          </div>
        </div>
      </MainHeader>
      {/* Main Content */}
      <div className="flex flex-col gap-6 py-6 w-full max-w-5xl px-4">
        <div className="flex flex-col gap-4">
          <h3 className="heading-3">Featured Events</h3>
          <ListEvents data={recentEvents} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="heading-3">Explore Christian Communities</h3>
          <ListCommunities data={recentCommunities} />
        </div>
      </div>
    </section>
  );
};

export default Home;
