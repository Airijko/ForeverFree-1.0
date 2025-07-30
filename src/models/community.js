import { Schema, model, models } from 'mongoose';

const serviceTimeSchema = new Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
});

const serviceSchema = new Schema({
  description: { type: String, required: true },
  times: [serviceTimeSchema],
});

const CommunitySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  location: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
  },
  website: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return (
          !v ||
          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
            v
          )
        );
      },
      message: 'Please enter a valid URL',
    },
  },
  image: {
    type: String,
  },
  bannerUrl: {
    type: String,
  },
  denomination: {
    type: String,
    default: 'Non-Denominational',
  },
  language: {
    type: String,
    default: 'English',
  },
  services: [serviceSchema],
  description: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['church', 'school', 'organization'],
  },
  tags: {
    type: [String],
    default: [],
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['admin', 'editor', 'viewer'],
        default: 'viewer',
      },
    },
  ],
});

const Community = models.Community || model('Community', CommunitySchema);

export default Community;
