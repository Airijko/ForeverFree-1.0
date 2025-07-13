import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
