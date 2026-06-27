import mongoose from 'mongoose'

const trialRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    userType: {
      type: String,
      required: [true, 'Type of user is required'],
      enum: ['single', 'partnership', 'group'],
    },
    storageNeeded: {
      type: String,
      required: [true, 'Storage needed is required'],
      trim: true,
    },
    usersAllowed: {
      type: String,
      required: [true, 'Users allowed is required'],
      trim: true,
    },
    transferLimit: {
      type: String,
      required: [true, 'Transfer limit is required'],
      trim: true,
    },
  },
  { timestamps: true, collection: 'trial_requests' }
)

const TrialRequest = mongoose.model('TrialRequest', trialRequestSchema)

export default TrialRequest
