import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db.js";
import { sampleAdmin, sampleProjects, sampleNews, sampleEvents, sampleGallery, sampleNewsletter, sampleSettings } from "./sample-data.js";
import { User, Project, News, Event, Gallery, Newsletter, Setting } from "../models/index.js";

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    News.deleteMany({}),
    Event.deleteMany({}),
    Gallery.deleteMany({}),
    Newsletter.deleteMany({}),
    Setting.deleteMany({}),
  ]);

  const hashedPassword = await bcrypt.hash(sampleAdmin.password, 12);

  await User.create({
    username: sampleAdmin.username,
    email: sampleAdmin.email,
    password: hashedPassword,
    role: "admin",
  });

  await Project.insertMany(sampleProjects);
  await News.insertMany(sampleNews);
  await Event.insertMany(sampleEvents);
  await Gallery.insertMany(
    sampleGallery.map((item, index) => ({
      ...item,
      uploadedAt: item.dateTaken || new Date(),
      caption: item.caption || `Gallery Item ${index + 1}`,
    }))
  );
  await Newsletter.insertMany(sampleNewsletter);
  await Setting.insertMany(sampleSettings);

  console.log("✅ Database seeded successfully");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
