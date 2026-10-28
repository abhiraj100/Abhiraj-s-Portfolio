import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    tag: {
      type: String,
      required: [true, 'Project category/tag is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Full Stack',
      trim: true,
    },
    metrics: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    stack: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ order: 1 });

export const Project = mongoose.model('Project', projectSchema);
