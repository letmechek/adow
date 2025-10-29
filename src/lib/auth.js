import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "change-me";
const TOKEN_NAME = "adow_admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24; // 1 day

export function signJwt(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_MAX_AGE,
    ...options,
  });
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(token) {
  const cookieStore = cookies();
  cookieStore.set({
    name: TOKEN_NAME,
    value: token,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: TOKEN_MAX_AGE,
  });
}

export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(TOKEN_NAME);
}

export function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
}

export function getUserFromRequest(request) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyJwt(token);
}

export function requireAuth(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  request.user = user;
  return null;
}
