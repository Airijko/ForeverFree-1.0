import CreatePostForm from '@components/Forms/CreatePostForm';
import { createPost } from '@actions/postActions';

const CreatePostPage = async ({ params }) => {
  const { id } = await params;
  const orgId = await id;

  return <CreatePostForm orgId={orgId} createPost={createPost} />;
};

export default CreatePostPage;
