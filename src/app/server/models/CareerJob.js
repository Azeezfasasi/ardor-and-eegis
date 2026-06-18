import mongoose from 'mongoose';

const careerJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    level: {
      type: String,
      enum: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
      default: 'Mid-level',
    },
    salary: {
      type: String,
      trim: true,
      default: 'Competitive',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Closed'],
      default: 'Active',
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    closingDate: {
      type: Date,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CareerJob || mongoose.model('CareerJob', careerJobSchema);
