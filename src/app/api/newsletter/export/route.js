import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Newsletter } from "@/models";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  await connectDB();
  const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 });

  const header = "Email,Status,SubscribedAt\n";
  const rows = subscribers
    .map((subscriber) => {
      const date = subscriber.subscribedAt
        ? new Date(subscriber.subscribedAt).toISOString()
        : "";
      return `${subscriber.email},${subscriber.status},${date}`;
    })
    .join("\n");

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="newsletter-subscribers.csv"`,
    },
  });
}
