import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: '#6B21A8', // Purple
    },
    textColor: {
      type: String,
      default: '#FFFFFF', // White
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Index for frequently queried fields
messageSchema.index({ isActive: 1, startDate: 1 });
messageSchema.index({ createdAt: -1 });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
