import { fetchAllEvents } from '@actions/eventAction';
import ListEvents from '@components/Events/ListEvents';

const Events = async () => {
  const data = await fetchAllEvents();

  return (
    <section className="mt-12 min-w-full">
      <div className="w-full">
        <div className="flex w-full flex-col bg-neutral-100 pb-24">
          <section className="mainContent flex flex-col scrollbar-hide">
            <h3 className="my-8 w-full text-start text-4xl font-semibold text-neutral-700">
              <span>Upcoming Events</span>
            </h3>
            <ListEvents data={data} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Events;
