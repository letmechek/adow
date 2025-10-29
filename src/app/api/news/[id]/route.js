import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { News } from "@/models";
import { requireAuth } from "@/lib/auth";
import { newsSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

async function findArticle(identifier) {
  const bySlug = await News.findOne({ slug: identifier });
  if (bySlug) return bySlug;
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    return News.findById(identifier);
  }
  return null;
}

export async function GET(request, { params }) {
  await connectDB();
  const article = await findArticle(params.id);

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  if (request.nextUrl.searchParams.get("increment") === "true") {
    await News.updateOne({ _id: article._id }, { $inc: { views: 1 } });
  }

  return NextResponse.json(article);
}

export async function PUT(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = newsSchema
      .partial()
      .parse({
        ...body,
        tags: Array.isArray(body.tags)
          ? body.tags
          : typeof body.tags === "string"
          ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : undefined,
      });

    await connectDB();

    const article = await News.findById(params.id);
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    if (payload.title || payload.slug) {
      article.slug = slugify(payload.slug || payload.title || article.title);
    }

    const updateData = { ...payload };
    if (updateData.tags === undefined) {
      delete updateData.tags;
    }

    Object.assign(article, updateData);
    if (payload.publishDate) {
      article.publishDate = new Date(payload.publishDate);
    }
    await article.save();

    return NextResponse.json(article);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Update article error:", error);
    return NextResponse.json({ message: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();

  const article = await News.findById(params.id);
  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  await article.deleteOne();
  return NextResponse.json({ message: "Article deleted" });
}
