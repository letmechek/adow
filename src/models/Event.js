import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: String,
    endTime: String,
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    rsvpLink: String,
    capacity: Number,
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ date: 1 });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
