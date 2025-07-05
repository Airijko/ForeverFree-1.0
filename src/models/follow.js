// models/Follow.js
import { Schema, model, models } from 'mongoose';

const followSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    followedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

followSchema.index({ user: 1, organization: 1 }, { unique: true });

const Follow = models.Follow || model('Follow', followSchema);
export default Follow;
