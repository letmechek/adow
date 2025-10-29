import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { User } from "@/models";
import { setAuthCookie, signJwt } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    await connectDB();

    const user = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }],
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signJwt({
      sub: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    setAuthCookie(token);

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ message: "Failed to login" }, { status: 500 });
  }
}
