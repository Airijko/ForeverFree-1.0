import { Button } from '@components/ui/button';
import Link from 'next/link';
import Carousel from './Carousel';
import Image from 'next/image';
import { fetchAllEvents } from '@actions/eventAction';
import EventDetailedCard from '@components/Cards/EventDetailedCard';

const FeaturedEvents = async () => {
  const data = await fetchAllEvents(1, 10);
  const mappedData = data.map((events, index) => (
    <EventDetailedCard event={events} key={data._id} index={index} />
  ));

  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-20">
      <div className="flex max-w-3xl flex-col gap-2">
        <div className="flex flex-row justify-center">
          <Link href="/reviews/new" className="w-full">
            <Button className="bg-gradient flex h-[3rem] w-full flex-row gap-2 border border-b-8 border-amber-500 text-white transition duration-200 hover:scale-105 hover:bg-transparent hover:brightness-125">
              <Image
                src="/icons/pen-review.svg"
                alt="Pen Review"
                width={40}
                height={40}
              />
              <h1 className="text-3xl">Recent Player Reviews</h1>
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <Carousel data={mappedData} />
        </div>
      </div>
    </section>
  );
};
export default FeaturedEvents;
