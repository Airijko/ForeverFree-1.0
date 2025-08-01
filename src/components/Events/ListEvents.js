export const dynamic = 'force-dynamic';

import { mapEvents } from '@actions/eventAction';

const ListEvents = async ({ data }) => {
  const events = await mapEvents(data);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events}
      </div>
    </section>
  );
};

export default ListEvents;
