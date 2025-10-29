import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Newsletter } from "@/models";
import { requireAuth } from "@/lib/auth";

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const subscriber = await Newsletter.findById(params.id);
  if (!subscriber) {
    return NextResponse.json({ message: "Subscriber not found" }, { status: 404 });
  }

  await subscriber.deleteOne();
  return NextResponse.json({ message: "Subscriber removed" });
}
