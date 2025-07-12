import CreateCommunityForm from '@components/Forms/CreateCommunityForm';
import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import AuthPrompt from '@components/AuthPrompt';

const CreateCommunity = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return <AuthPrompt />;
  }

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-start my-20 xl:mt-6 rounded-lg shadow-lg overflow-auto">
      <header className="w-full flex flex-col items-center justify-end py-8 bg-gradient-to-t from-blue-200 to-blue-300">
        <h1 className="text-left text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
          <span className="blue_gradient">Register Organization</span>
        </h1>
        <p className="text-left max-w-md text-sm text-neutral-500">
          Fill out the form below to register your community.
        </p>
      </header>

      <CreateCommunityForm />
    </section>
  );
};

export default CreateCommunity;
