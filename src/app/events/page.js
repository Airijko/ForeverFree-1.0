import { fetchAllEvents } from '@actions/eventAction';
import SearchBar from '@components/Inputs/SearchBar';
import ListEvents from '@components/Events/ListEvents';
import Maps from '@components/Maps';
import EventFilterBar from '@components/Navbars/EventFilterBar';
import { mapCoordinatesFromData } from '@actions/locationAction';

const Events = async () => {
  const data = await fetchAllEvents();
  const coordinates = await mapCoordinatesFromData(data);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-screen">
        <div className="flex w-full h-full">
          <div className="h-full pt-40">
            <EventFilterBar />
          </div>
          <main className="flex-grow overflow-y-scroll p-4 scrollbar-hide">
            <div className="py-4">
              <h1 className="head_text w-full text-center text-6xl font-bold mb-6">
                <span className="block">Christian Events</span>
              </h1>
              {/* Search Bar */}
              <SearchBar />
            </div>
            <ListEvents data={data} />
          </main>
          <section className="w-[720px] h-full">
            <Maps location={coordinates} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Events;
