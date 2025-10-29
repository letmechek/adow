import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { News } from "@/models";
import { requireAuth } from "@/lib/auth";
import { newsSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

function buildNewsQuery(searchParams) {
  const query = {};

  if (searchParams.get("status")) {
    query.status = searchParams.get("status");
  } else {
    query.status = "Published";
  }

  if (searchParams.get("category") && searchParams.get("category") !== "All") {
    query.category = searchParams.get("category");
  }

  const search = searchParams.get("search");
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (startDate || endDate) {
    query.publishDate = {};
    if (startDate) query.publishDate.$gte = new Date(startDate);
    if (endDate) query.publishDate.$lte = new Date(endDate);
  }

  return query;
}

export async function GET(request) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const sort = searchParams.get("sort") || "newest";

  const query = buildNewsQuery(searchParams);

  const sortField =
    sort === "views" ? { views: -1 } : sort === "oldest" ? { publishDate: 1 } : { publishDate: -1 };

  const [articles, total] = await Promise.all([
    News.find(query)
      .sort(sortField)
      .skip((page - 1) * limit)
      .limit(limit),
    News.countDocuments(query),
  ]);

  return NextResponse.json({
    data: articles,
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
    const payload = newsSchema.parse({
      ...body,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
        ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [],
    });

    await connectDB();

    const slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    const existing = await News.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "An article with this slug already exists" },
        { status: 400 }
      );
    }

    const article = await News.create({
      ...payload,
      slug,
      tags: payload.tags || [],
      publishDate: payload.publishDate ? new Date(payload.publishDate) : new Date(),
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Create news error:", error);
    return NextResponse.json({ message: "Failed to create article" }, { status: 500 });
  }
}
