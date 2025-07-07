export const dynamic = 'force-dynamic';

import { mapEvents } from '@actions/eventAction';

const ListEvents = async ({ data }) => {
  const events = await mapEvents(data);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4">{events}</div>
    </section>
  );
};

export default ListEvents;
