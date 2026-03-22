import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, estimatedCost } = body;

    // Simulate booking API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const bookingId = randomUUID();
    // Simulate insertion
    await db.insert(bookings).values({
      id: bookingId,
      userId: "mock_booking_user", // Usually extracted from session
      provider: provider || "Gojek",
      status: "Success",
      estimatedCost: estimatedCost || 15000,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, bookingId, message: "Pesanan berhasil dibuat!" });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Gagal memproses pesanan" }, { status: 500 });
  }
}
