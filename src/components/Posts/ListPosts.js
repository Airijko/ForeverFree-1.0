export const dynamic = 'force-dynamic';

import Wrapper from '../Wrapper';
import { mapPosts } from '@actions/postActions';

const ListPosts = async ({ data }) => {
  const posts = await mapPosts(data);
  console.log('ListPosts', posts);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4">{posts}</div>
    </section>
  );
};

export default ListPosts;
