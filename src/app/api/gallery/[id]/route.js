import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/models";
import { requireAuth } from "@/lib/auth";
import { gallerySchema } from "@/lib/validation";

export async function PATCH(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = gallerySchema.partial().parse(body);

    await connectDB();
    const item = await Gallery.findByIdAndUpdate(params.id, payload, { new: true });
    if (!item) {
      return NextResponse.json({ message: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Update gallery error:", error);
    return NextResponse.json({ message: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const item = await Gallery.findById(params.id);
  if (!item) {
    return NextResponse.json({ message: "Gallery item not found" }, { status: 404 });
  }

  await item.deleteOne();
  return NextResponse.json({ message: "Gallery item deleted" });
}
