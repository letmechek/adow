import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models";
import { requireAuth } from "@/lib/auth";
import { eventSchema } from "@/lib/validation";

export async function GET(_request, { params }) {
  await connectDB();
  const event = await Event.findById(params.id);
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  return NextResponse.json(event);
}

export async function PUT(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = eventSchema.partial().parse({
      ...body,
      capacity: body.capacity ? Number(body.capacity) : undefined,
    });

    await connectDB();
    const event = await Event.findByIdAndUpdate(params.id, payload, { new: true });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Update event error:", error);
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const event = await Event.findById(params.id);
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  await event.deleteOne();
  return NextResponse.json({ message: "Event deleted" });
}
