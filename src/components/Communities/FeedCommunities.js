import CommunityCard from '@components/Cards/CommunityCard';

const FeedCommunities = ({ communities }) => {
  return (
    <section className="w-full">
      <ul className="mx-auto my-4 flex flex-col gap-5">
        {communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </ul>
    </section>
  );
};

export default FeedCommunities;
