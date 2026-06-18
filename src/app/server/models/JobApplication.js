import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerJob',
      required: [true, 'Job ID is required'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      // URL to uploaded resume
    },
    status: {
      type: String,
      enum: ['Received', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired', 'On Hold'],
      default: 'Received',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    lastReplyDate: {
      type: Date,
    },
    replies: [
      {
        message: String,
        sentDate: {
          type: Date,
          default: Date.now,
        },
        senderType: {
          type: String,
          enum: ['admin', 'applicant'],
          default: 'admin',
        },
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
