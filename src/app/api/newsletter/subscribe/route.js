import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Newsletter } from "@/models";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = newsletterSchema.parse(body);

    await connectDB();
    const existing = await Newsletter.findOne({ email: payload.email });

    if (existing) {
      if (existing.status === "Unsubscribed") {
        existing.status = "Active";
        existing.subscribedAt = new Date();
        await existing.save();
      }
      return NextResponse.json({ message: "You are already subscribed." });
    }

    await Newsletter.create({
      email: payload.email,
      subscribedAt: new Date(),
      status: "Active",
    });

    return NextResponse.json(
      { message: "Thank you for subscribing!" },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ message: "Failed to subscribe" }, { status: 500 });
  }
}
