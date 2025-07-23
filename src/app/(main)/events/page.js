import { fetchAllEvents } from '@actions/eventAction';
import ListEvents from '@components/Events/ListEvents';
import Maps from '@components/Maps';
import EventFilterBar from '@components/Navbars/EventFilterBar';
import { mapCoordinatesFromData } from '@actions/locationAction';

const Events = async () => {
  const data = await fetchAllEvents();
  const coordinates = await mapCoordinatesFromData(data);

  return (
    <>
      <section className="mainContent">
        <div className="h-screen w-full">
          <div className="flex h-full w-full">
            <main className="flex-grow overflow-y-scroll p-4 scrollbar-hide">
              <div className="py-4">
                <h1 className="text- mb-6 w-full text-center text-6xl font-bold">
                  <span className="block">Christian Events</span>
                </h1>
                <EventFilterBar />
              </div>
              <ListEvents data={data} />
            </main>
          </div>
        </div>
      </section>
      <aside className="hidden h-full w-full md:block">
        <Maps location={coordinates} />
      </aside>
    </>
  );
};

export default Events;
