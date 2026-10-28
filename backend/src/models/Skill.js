import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category name is required'],
      trim: true,
      unique: true,
    },
    items: {
      type: [String],
      required: [true, 'Skill items list is required'],
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

skillSchema.index({ order: 1 });

export const Skill = mongoose.model('Skill', skillSchema);
