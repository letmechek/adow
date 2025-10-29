import mongoose from "mongoose";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../lib/constants.js";

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: PROJECT_CATEGORIES,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: "Planned",
    },
    startDate: Date,
    completionDate: Date,
    beneficiaries: Number,
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    milestones: {
      type: [milestoneSchema],
      default: [],
    },
    locationCoordinates: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
