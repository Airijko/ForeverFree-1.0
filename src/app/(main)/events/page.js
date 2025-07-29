import { fetchAllEvents } from '@actions/eventAction';
import ListEvents from '@components/Events/ListEvents';
import Maps from '@components/Maps';
import EventFilterBar from '@components/Navbars/EventFilterBar';
import { mapCoordinatesFromData } from '@actions/locationAction';

const Events = async () => {
  const data = await fetchAllEvents();
  const coordinates = await mapCoordinatesFromData(data);

  return (
    <section className="mainContent w-full">
      <div className="h-screen w-full">
        <div className="flex h-full w-full flex-col">
          <h1 className="my-4 w-full text-start text-6xl font-bold text-white">
            <span className="block">Christian Events</span>
          </h1>
          <main className="flex flex-col scrollbar-hide">
            <div className="flex flex-row gap-6">
              <div className="flex w-1/2 flex-col gap-3">
                <EventFilterBar />
                <h3 className="my-3 w-full text-start text-4xl font-semibold text-white">
                  <span className="block">Upcoming Events</span>
                </h3>
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="mr-2 rounded-lg border px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-100"
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-100"
                  >
                    Month
                  </button>
                </div>
                <ListEvents data={data} />
              </div>

              <div className="flex w-1/2 flex-col">
                <div className="hidden h-[500px] overflow-hidden rounded-2xl md:block">
                  <Maps location={coordinates} />
                </div>
                <h3 className="my-3 w-full text-start text-4xl font-semibold text-white">
                  <span className="block">Featured Events</span>
                </h3>
              </div>
            </div>
          </main>
          <section className="flex bg-red-500">BOTTOM SECTION</section>
        </div>
      </div>
    </section>
  );
};

export default Events;
