import ListCommunities from '@components/communties/ListCommunities';

const Communities = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="font-satoshi text-5xl font-bold">Christian Communities</h1>
      <ListCommunities />
    </section>
  );
};

export default Communities;
