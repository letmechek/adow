import { NextResponse } from "next/server";
import { getAuthToken, verifyJwt } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models";

export async function GET() {
  const token = getAuthToken();

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(payload.sub).select("username email role");

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user });
}
