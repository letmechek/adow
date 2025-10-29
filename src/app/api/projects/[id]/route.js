import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { requireAuth } from "@/lib/auth";
import { projectSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

function buildSlug(name, providedSlug) {
  return providedSlug ? slugify(providedSlug) : slugify(name);
}

async function findProject(identifier) {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    return Project.findById(identifier);
  }
  return Project.findOne({ slug: identifier });
}

export async function GET(_request, { params }) {
  await connectDB();
  const project = await findProject(params.id);

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = projectSchema.partial().parse({
      ...body,
      budget: body.budget !== undefined ? Number(body.budget) : undefined,
      progress: body.progress !== undefined ? Number(body.progress) : undefined,
      beneficiaries:
        body.beneficiaries !== undefined ? Number(body.beneficiaries) : undefined,
    });

    await connectDB();

    const project = await findProject(params.id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    if (payload.name || payload.slug) {
      project.slug = buildSlug(payload.name || project.name, payload.slug);
    }

    Object.assign(project, payload);
    await project.save();

    return NextResponse.json(project);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }

    console.error("Update project error:", error);
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const project = await findProject(params.id);

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  await project.deleteOne();

  return NextResponse.json({ message: "Project deleted" });
}
