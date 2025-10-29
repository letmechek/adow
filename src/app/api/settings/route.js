import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Setting } from "@/models";
import { requireAuth } from "@/lib/auth";
import { settingsSchema } from "@/lib/validation";

export async function GET() {
  await connectDB();
  const settings = await Setting.find({});
  return NextResponse.json(settings);
}

export async function PUT(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = settingsSchema.parse(body);

    await connectDB();

    const operations = payload.map((setting) =>
      Setting.findOneAndUpdate(
        { key: setting.key },
        { value: setting.value, updatedAt: new Date() },
        { upsert: true, new: true }
      )
    );

    const results = await Promise.all(operations);
    return NextResponse.json(results);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Update settings error:", error);
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
  }
}
