import MainHeader from '@components/MainHeader';

const Home = async () => {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <MainHeader>
        <h1 className="head_text text-center dark:text-neutral-200 max-w-2xl">
          Discover What&apos;s Happening in Your Christian Community
        </h1>
        <p className="desc text-center max-w-lg">
          Find events, connect with churches, and explore resources that enrich
          your faith journey.
        </p>
        <div className="flex flex-row items-center mt-5 gap-2">
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Find Events Near Me
          </button>
          <button
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Explore Christian Communities
          </button>
        </div>
      </MainHeader>
      <div className="flex gap-6 mt-6">
        <button className="btn btn-primary">Explore</button>
        <button className="btn btn-outline">Following</button>
      </div>
    </section>
  );
};

export default Home;
