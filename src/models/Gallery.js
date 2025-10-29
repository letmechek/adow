import mongoose from "mongoose";
import { GALLERY_CATEGORIES } from "../lib/constants.js";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: GALLERY_CATEGORIES,
      required: true,
    },
    dateTaken: Date,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

gallerySchema.index({ category: 1, uploadedAt: -1 });

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
