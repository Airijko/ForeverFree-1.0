import CreatePostForm from '@components/Forms/CreatePostForm';
import { createPost } from '@actions/postActions';

const CreatePostPage = async ({ params }) => {
  const { orgId } = await params;

  return <CreatePostForm orgId={orgId} createPost={createPost} />;
};

export default CreatePostPage;
