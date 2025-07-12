import { fetchAllOrganizations } from '@actions/organizationAction';
import { fetchAllEvents } from '@actions/eventAction';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';
import ListCommunities from '@components/Communties/ListCommunities';
import ListEvents from '@components/Events/ListEvents';
import DynamicPanel from '@components/Layouts/DynamicPanel';

const Home = async () => {
  const communityData = await fetchAllOrganizations();
  const recentCommunities = communityData.reverse().slice(0, 4);
  const eventData = await fetchAllEvents();
  const recentEvents = eventData.reverse().slice(0, 1);

  return (
    <>
      <section className="mainContent">
        <MainHeader>
          <div className="flex h-full flex-col items-center justify-end">
            <h1 className="head_text max-w-2xl text-center md:text-4xl">
              Discover What&apos;s Happening in Your Christian Community
            </h1>
            <p className="desc max-w-lg text-center">
              Find events, connect with churches, and explore resources that
              enrich your faith journey.
            </p>
            <div className="mt-5 flex flex-row items-center gap-2">
              <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <Link href="/events"> Find Events Near Me</Link>
              </button>
              <button
                type="button"
                className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                <Link href="/communities">Explore Christian Communities</Link>
              </button>
            </div>
          </div>
        </MainHeader>
        {/* Main Content */}
        <div className="flex w-full flex-col gap-6 px-4 py-6">
          <div className="flex flex-col gap-4">
            <h3 className="heading-3">Featured Events</h3>
            <ListEvents data={recentEvents} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="heading-3">Explore Christian Communities</h3>
            <ListCommunities data={recentCommunities} columns={2} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
