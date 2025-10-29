import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models";
import { requireAuth } from "@/lib/auth";
import { eventSchema } from "@/lib/validation";

export async function GET(request) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const upcoming = searchParams.get("upcoming");

  const query = {};
  if (upcoming === "true") {
    query.date = { $gte: new Date() };
  }

  const events = await Event.find(query).sort({ date: 1 });

  return NextResponse.json(events);
}

export async function POST(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = eventSchema.parse({
      ...body,
      capacity: body.capacity ? Number(body.capacity) : undefined,
    });

    await connectDB();
    const event = await Event.create(payload);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Create event error:", error);
    return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
  }
}
