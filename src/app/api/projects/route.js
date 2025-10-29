import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { requireAuth } from "@/lib/auth";
import { projectSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

function buildProjectQuery(searchParams) {
  const query = {};

  if (searchParams.get("category") && searchParams.get("category") !== "All") {
    query.category = searchParams.get("category");
  }

  if (searchParams.get("status") && searchParams.get("status") !== "All") {
    query.status = searchParams.get("status");
  }

  const search = searchParams.get("search");
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  return query;
}

export async function GET(request) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const sort = searchParams.get("sort") || "newest";

  const query = buildProjectQuery(searchParams);

  let sortField = { createdAt: -1 };
  if (sort === "progress") {
    sortField = { progress: -1 };
  } else if (sort === "budget") {
    sortField = { budget: -1 };
  }

  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort(sortField)
      .skip((page - 1) * limit)
      .limit(limit),
    Project.countDocuments(query),
  ]);

  return NextResponse.json({
    data: projects,
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
    const payload = projectSchema.parse({
      ...body,
      budget: Number(body.budget),
      progress: Number(body.progress),
      beneficiaries: body.beneficiaries ? Number(body.beneficiaries) : undefined,
    });

    await connectDB();

    const slug = payload.slug || slugify(payload.name);
    const existing = await Project.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    const project = await Project.create({ ...payload, slug });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Create project error:", error);
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}
