import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Unsubscribed"],
      default: "Active",
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

newsletterSchema.index({ status: 1 });

export default mongoose.models.Newsletter ||
  mongoose.model("Newsletter", newsletterSchema);
