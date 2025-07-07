'use server';

import { connectToDB } from '@utils/database';
import Post from '@models/post';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { handleFileUpload } from '@utils/fileUpload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import PostCard from '@components/Cards/PostCard';

// Fetch all posts (no filter)
export const fetchAllPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find().populate('creator organization').lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch posts', status: 500 };
  }
};

// Map posts to components (UI-related, you may want to keep this elsewhere)
export const mapPosts = async (data) => {
  return data.map((post, index) => (
    <PostCard
      key={post._id}
      post={post}
      index={index}
      organization={post.organization}
    />
  ));
};

// Fetch a single post with organization check
export const fetchPost = async (postId, organizationId) => {
  try {
    await connectToDB();
    const post = await Post.findOne({
      _id: postId,
      organization: organizationId,
    }).lean();

    if (!post) {
      return {
        error: 'Post not found or does not belong to this organization',
        status: 404,
      };
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: 'Failed to fetch post', status: 500 };
  }
};

// Fetch posts by organization
export const fetchPostsByOrganization = async (organizationId) => {
  try {
    await connectToDB();
    const posts = await Post.find({ organization: organizationId }).lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch posts', status: 500 };
  }
};

// Extract post data from FormData
const extractPostData = async (formData) => {
  const imageFile = formData.get('image');

  let imageUrl = null;

  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await handleFileUpload(imageFile, 'posts');
  }

  const tagsRaw = formData.get('tags');
  const tags = tagsRaw ? tagsRaw.split(',').map((tag) => tag.trim()) : [];

  return {
    title: formData.get('title'),
    description: formData.get('description'),
    eventType: formData.get('eventType') || 'Other',
    groupTarget: formData.get('groupTarget') || 'All Ages',
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || null,
    startTime: formData.get('startTime') || '',
    endTime: formData.get('endTime') || '',
    location: formData.get('location'),
    isFree: formData.get('isFree') === 'true',
    price: Number(formData.get('price') || 0),
    currency: formData.get('currency') || 'USD',
    registrationLink: formData.get('registrationLink') || '',
    image: imageUrl,
    tags,
  };
};

// Create or update post (common handler)
const handlePost = async (id, formData, isEdit = false) => {
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const organizationId = formData.get('organization');

  if (!organizationId) {
    return { error: 'Organization ID is required', status: 400 };
  }

  const postData = await extractPostData(formData);

  try {
    await connectToDB();

    let post;

    if (isEdit) {
      post = await Post.findById(id);
      if (!post) return { error: 'Post not found', status: 404 };

      if (post.creator.toString() !== userId) {
        return {
          error: 'Unauthorized: You can only edit your own posts',
          status: 403,
        };
      }
    } else {
      post = new Post({
        creator: userId,
        organization: organizationId,
      });
    }

    Object.assign(post, postData);
    await post.save();

    // Revalidate pages affected by this post
    revalidatePath(`/communities/${organizationId}/posts`);
    revalidatePath(
      `/communities/${organizationId}/posts/${post._id.toString()}`
    );

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error(`Error ${isEdit ? 'updating' : 'creating'} post:`, error);
    return {
      error: `Failed to ${isEdit ? 'update' : 'create'} post`,
      status: 500,
    };
  }
};

// Public post actions

export const createPost = async (formData) => {
  const organizationId = formData.get('organization');
  const newPost = await handlePost(null, formData);
  if (newPost && !newPost.error) {
    redirect(`/communities/${organizationId}/posts/${newPost._id.toString()}`);
  }
  return newPost;
};

export const updatePost = async (id, formData) => {
  const organizationId = formData.get('organization');
  const updatedPost = await handlePost(id, formData, true);
  if (updatedPost && !updatedPost.error) {
    redirect(
      `/communities/${organizationId}/posts/${updatedPost._id.toString()}`
    );
  }
  return updatedPost;
};

export const deletePost = async (id, organizationId) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(id);
    // Revalidate the posts list page for that organization
    revalidatePath(`/communities/${organizationId}/posts`);
    return { message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post', status: 500 };
  }
};
