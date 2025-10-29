import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Newsletter } from "@/models";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const search = searchParams.get("search");

  const query = {};
  if (search) {
    query.email = { $regex: search, $options: "i" };
  }

  const [subscribers, total] = await Promise.all([
    Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Newsletter.countDocuments(query),
  ]);

  return NextResponse.json({
    data: subscribers,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
}
