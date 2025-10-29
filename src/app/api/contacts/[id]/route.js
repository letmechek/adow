import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models";
import { requireAuth } from "@/lib/auth";
import { contactStatusSchema } from "@/lib/validation";

export async function PUT(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();
    const payload = contactStatusSchema.parse(body);

    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { status: payload.status },
      { new: true }
    );

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Update contact error:", error);
    return NextResponse.json({ message: "Failed to update contact" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const contact = await Contact.findById(params.id);
  if (!contact) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }
  await contact.deleteOne();

  return NextResponse.json({ message: "Contact deleted" });
}
