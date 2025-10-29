import mongoose from "mongoose";
import { NEWS_CATEGORIES } from "../lib/constants.js";

const newsSchema = new mongoose.Schema(
  {
    title: {
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
      enum: NEWS_CATEGORIES,
      required: true,
    },
    featuredImage: String,
    content: {
      type: String,
      required: true,
    },
    excerpt: String,
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "Office of Mohamed Adow MP",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ title: "text", content: "text", tags: "text" });

export default mongoose.models.News || mongoose.model("News", newsSchema);
