import { createEvent } from '@actions/eventAction';
import CreateEventForm from '@components/Forms/CreateEventForm';

const CreatePostPage = async ({ params }) => {
  const { orgId } = await params;

  return <CreateEventForm orgId={orgId} createEvent={createEvent} />;
};

export default CreatePostPage;
