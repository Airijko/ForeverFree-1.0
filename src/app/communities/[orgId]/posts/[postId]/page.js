import { fetchPost } from '@actions/postActions';
import Image from 'next/image';

const ViewPostPage = async ({ params }) => {
  const { orgId, postId } = params;
  console.log('orgId:', orgId, 'postId:', postId);

  // Fetch post linked to this org
  const post = await fetchPost(postId, orgId);

  if (post.error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">{post.error}</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {post.title}
      </h1>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Event Type:</strong> {post.eventType}
      </p>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Target Group:</strong> {post.groupTarget}
      </p>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Date:</strong>{' '}
        {new Date(post.startDate).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {post.endDate
          ? ` - ${new Date(post.endDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}`
          : ''}
      </p>

      {post.startTime && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <strong>Time:</strong> {post.startTime}{' '}
          {post.endTime && `- ${post.endTime}`}
        </p>
      )}

      <p className="mb-6 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
        {post.description}
      </p>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <strong>Location:</strong> {post.location}
      </p>

      {post.isFree ? (
        <p className="mb-4 text-green-600 dark:text-green-400 font-semibold">
          Free Event
        </p>
      ) : (
        <p className="mb-4 text-red-600 dark:text-red-400 font-semibold">
          Price: {post.currency} {post.price.toFixed(2)}
        </p>
      )}

      {post.registrationLink && (
        <a
          href={post.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Register Here
        </a>
      )}

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          className="mt-6 rounded-md object-cover w-full max-h-96"
        />
      )}
    </article>
  );
};

export default ViewPostPage;
