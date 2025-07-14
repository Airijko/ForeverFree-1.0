'use server';

import { connectToDB } from '@utils/database';
import Organization from '@models/organization';
import Event from '@models/event';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { handleFileUpload } from '@utils/fileUpload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import EventCard from '@components/Cards/EventCard';

// Fetch all events (no filter)
export const fetchAllEvents = async () => {
  try {
    await connectToDB();
    const events = await Event.find().populate('creator organization').lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching events:', error);
    return { error: 'Failed to fetch events', status: 500 };
  }
};

// Map events to components
export const mapEvents = async (data) => {
  return data.map((event, index) => (
    <EventCard
      key={event._id}
      event={event}
      index={index}
      organization={event.organization}
    />
  ));
};

// Fetch a single event with organization check
export const fetchEvent = async (eventId, organizationId) => {
  try {
    await connectToDB();
    const event = await Event.findOne({
      _id: eventId,
      organization: organizationId,
    }).lean();

    if (!event) {
      return {
        error: 'Event not found or does not belong to this organization',
        status: 404,
      };
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error('Error fetching event:', error);
    return { error: 'Failed to fetch event', status: 500 };
  }
};

// Fetch events by organization
export const fetchEventsByOrganization = async (organizationId) => {
  try {
    await connectToDB();
    const events = await Event.find({ organization: organizationId }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching events:', error);
    return { error: 'Failed to fetch events', status: 500 };
  }
};

// Extract event data from FormData
const extractEventData = async (formData) => {
  const imageFile = formData.get('image');

  let imageUrl = null;

  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await handleFileUpload(imageFile, 'events');
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
    location: {
      street: formData.get('street'),
      city: formData.get('city'),
      province: formData.get('province'),
      country: formData.get('country'),
    },
    isFree: formData.get('isFree') === 'true',
    price: Number(formData.get('price') || 0),
    currency: formData.get('currency') || 'USD',
    registrationLink: formData.get('registrationLink') || '',
    image: imageUrl,
    tags,
  };
};

// Create or update event (common handler)
const handleEvent = async (id, formData, isEdit = false) => {
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role;
  const organizationId = formData.get('organization');

  if (!organizationId) {
    return { error: 'Organization ID is required', status: 400 };
  }

  const eventData = await extractEventData(formData);

  try {
    await connectToDB();

    let event;

    if (isEdit) {
      event = await Event.findById(id);
      if (!event) return { error: 'Event not found', status: 404 };

      // Allow if creator or admin
      if (event.creator.toString() !== userId && userRole !== 'admin') {
        return {
          error: 'Unauthorized: Only the creator or admins can edit this event',
          status: 403,
        };
      }
    } else {
      event = new Event({
        creator: userId,
        organization: organizationId,
      });
    }

    Object.assign(event, eventData);
    await event.save();

    // Revalidate pages affected by this event
    revalidatePath(`/communities/${organizationId}/events`);
    revalidatePath(
      `/communities/${organizationId}/events/${event._id.toString()}`
    );

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(`Error ${isEdit ? 'updating' : 'creating'} event:`, error);
    return {
      error: `Failed to ${isEdit ? 'update' : 'create'} event`,
      status: 500,
    };
  }
};

// Public event actions

export const createEvent = async (formData) => {
  const organizationId = formData.get('organization');
  const newEvent = await handleEvent(null, formData);
  if (newEvent && !newEvent.error) {
    redirect(
      `/communities/${organizationId}/events/${newEvent._id.toString()}`
    );
  }
  return newEvent;
};

export const updateEvent = async (id, formData) => {
  const organizationId = formData.get('organization');
  const updatedEvent = await handleEvent(id, formData, true);
  if (updatedEvent && !updatedEvent.error) {
    redirect(
      `/communities/${organizationId}/events/${updatedEvent._id.toString()}`
    );
  }
  return updatedEvent;
};

export const deleteEvent = async (id, organizationId) => {
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  try {
    await connectToDB();
    const event = await Event.findById(id);

    if (!event) {
      return { error: 'Event not found', status: 404 };
    }

    // Allow if creator or admin
    if (event.creator.toString() !== userId && userRole !== 'admin') {
      return {
        error: 'Unauthorized: Only the creator or admins can delete this event',
        status: 403,
      };
    }

    await Event.findByIdAndDelete(id);
    revalidatePath(`/communities/${organizationId}/events`);
    return { message: 'Event deleted successfully' };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { error: 'Failed to delete event', status: 500 };
  }
};

// Fetch featured events
export const fetchFeaturedEvents = async () => {
  try {
    await connectToDB();
    const events = await Event.find({ isFeatured: true })
      .populate('creator organization')
      .lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return { error: 'Failed to fetch featured events', status: 500 };
  }
};
