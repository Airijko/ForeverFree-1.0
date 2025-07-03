import { Schema, model, models } from 'mongoose';

const OrganizationSchema = new Schema({
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
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  image: {
    type: String,
  },
  denomination: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['church', 'school', 'organization'],
  },
});

const Organization =
  models.Organization || model('Organization', OrganizationSchema);

export default Organization;
