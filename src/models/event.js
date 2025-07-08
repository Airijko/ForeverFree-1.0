import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },

    eventType: {
      type: String,
      enum: [
        'Worship',
        'Retreat',
        'Outreach',
        'Prayer',
        'Bible Study',
        'Social',
        'Fundraiser',
        'Conference',
        'Camp',
        'Other',
      ],
      default: 'Other',
    },

    groupTarget: {
      type: String,
      enum: ['Kids', 'Youth', 'Young Adults', 'Adults', 'Seniors', 'All Ages'],
      default: 'All Ages',
    },

    startDate: { type: Date, required: true },
    endDate: Date,
    startTime: String,
    endTime: String,

    location: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      country: { type: String, required: true },
    },

    isFree: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },

    registrationLink: String,
    image: String,

    tags: [String],
  },
  { timestamps: true }
);

const Event = models.Event || model('Event', EventSchema);

export default Event;
