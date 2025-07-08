import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  visitedAt: { type: Date, default: Date.now },
  ip: String,
});

export default mongoose.models.Visit || mongoose.model('Visit', VisitSchema);
