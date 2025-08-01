import { fetchAllCommunities } from '@actions/communityAction';
import CommunityCardPreview from '@components/Cards/CommunityCardPreview';
import Image from 'next/image';

const page = async () => {
  const communities = await fetchAllCommunities();
  const recentCommunities = communities.reverse().slice(0, 4);

  return (
    <main>
      <section className="my-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 px-6 py-12 shadow-lg">
        <div className="flex w-full max-w-4xl flex-row items-center gap-8">
          {/* Text content on the left */}
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Explore Christian Communities
            </h1>
            <p className="text-lg text-gray-100">
              Find welcoming Christian communities where faith grows,
              friendships flourish, and purpose is shared. Discover churches,
              schools, and groups ready to walk alongside you.
            </p>
          </div>

          {/* Image on the right */}
          <div className="relative h-64 md:flex-1">
            <Image
              src="/assets/images/LoneCross.png"
              alt="Christian community landscape"
              fill
              className="hidden rounded-xl object-cover shadow-lg sm:block"
            />
          </div>
        </div>
      </section>
      <section className="my-8 flex w-full flex-col items-start">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Recently Added Communities
        </h1>
        <ul className="my-4 flex w-full flex-col gap-5 md:flex-row">
          {recentCommunities.map((community) => (
            <CommunityCardPreview key={community._id} community={community} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default page;
