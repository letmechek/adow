import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models";
import { requireAuth } from "@/lib/auth";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

function getClientIdentifier(request) {
  const header = request.headers.get("x-forwarded-for");
  if (header) {
    return header.split(",")[0].trim();
  }
  return request.headers.get("user-agent") || "anonymous";
}

export async function GET(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const subject = searchParams.get("subject");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const query = {};
  if (status && status !== "All") {
    query.status = status;
  }
  if (subject && subject !== "All") {
    query.subject = subject;
  }

  const [items, total, unread] = await Promise.all([
    Contact.find(query)
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Contact.countDocuments(query),
    Contact.countDocuments({ status: "New" }),
  ]);

  return NextResponse.json({
    data: items,
    meta: { unread },
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request) {
  try {
    const identifier = getClientIdentifier(request);
    const { success } = rateLimit(identifier, 5, 60_000);

    if (!success) {
      return NextResponse.json(
        { message: "You have reached the submission limit. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const payload = contactSchema.parse(body);

    await connectDB();
    const contact = await Contact.create({
      ...payload,
      submittedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Thank you for reaching out!", contactId: contact._id },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Contact submission error:", error);
    return NextResponse.json({ message: "Failed to submit contact form" }, { status: 500 });
  }
}
