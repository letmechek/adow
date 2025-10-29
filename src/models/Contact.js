import mongoose from "mongoose";
import { CONTACT_SUBJECTS } from "../lib/constants.js";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: CONTACT_SUBJECTS,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["New", "Read", "Replied"],
      default: "New",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ status: 1, submittedAt: -1 });

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
