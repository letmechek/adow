import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/models";
import { requireAuth } from "@/lib/auth";
import { gallerySchema } from "@/lib/validation";

export async function GET(request) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "24", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const query = {};
  if (category && category !== "All") {
    query.category = category;
  }

  const [items, total] = await Promise.all([
    Gallery.find(query)
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Gallery.countDocuments(query),
  ]);

  return NextResponse.json({
    data: items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = gallerySchema.parse(body);

    await connectDB();
    const item = await Gallery.create({
      ...payload,
      uploadedAt: new Date(),
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }

    console.error("Create gallery item error:", error);
    return NextResponse.json({ message: "Failed to add gallery item" }, { status: 500 });
  }
}
