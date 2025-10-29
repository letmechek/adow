import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { Project, News, Event, Contact } from "@/models";

export async function GET(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();

  const [projects, news, events, contacts] = await Promise.all([
    Project.countDocuments({}),
    News.countDocuments({}),
    Event.countDocuments({ date: { $gte: new Date() } }),
    Contact.countDocuments({}),
  ]);

  const statusBreakdown = await Project.aggregate([
    { $group: { _id: "$status", total: { $sum: 1 } } },
  ]);

  const projectStats = statusBreakdown.reduce(
    (acc, item) => ({ ...acc, [item._id]: item.total }),
    {}
  );

  const recentContacts = await Contact.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .select("name subject status createdAt");

  return NextResponse.json({
    counts: {
      projects,
      news,
      events,
      contacts,
    },
    projectStats,
    recentContacts,
  });
}
