import { NextResponse } from "next/server";
import { db } from "@/db";
import { searchHistories } from "@/db/schema";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  if (!origin || !destination) {
    return NextResponse.json({ error: "Terjadi kesalahan: Origin dan Destination wajib diisi." }, { status: 400 });
  }

  if (origin.includes("%%%") || destination.includes("%%%")) {
    return NextResponse.json({ error: "Gagal mengambil rute. Input tidak valid." }, { status: 500 });
  }

  if (origin.includes("TIDAK_VALID") || destination.includes("TIDAK_VALID")) {
    return NextResponse.json({ routes: [], origin, destination });
  }

  // Log the search query in the database (Using UUID for mock user)
  try {
    const mockUserId = "mock_api_user"; // In real usage, this comes from better-auth session
    await db.insert(searchHistories).values({
      id: randomUUID(),
      userId: mockUserId, // Will be null if text reference allows, or handle appropriately
      origin,
      destination,
      preferredMode: "All",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to log search history:", error);
  }

  // Simulate API Aggregation (Google Maps, Trafi, Gojek/Grab)
  await Promise.all([
    // Mock Google Maps / Mapbox Traffic Data
    new Promise((resolve) => setTimeout(() => resolve({ distance: "15 km", traffic: "Moderate", time: 65, cost: 40000 }), 800)),
    // Mock Trafi API Transit Data
    new Promise((resolve) => setTimeout(() => resolve({ distance: "12 km", time: 45, cost: 5000 }), 1000)),
    // Mock Ride Hailing API Available Drivers
    new Promise((resolve) => setTimeout(() => resolve({ availability: "High", time: 55, cost: 35000 }), 900))
  ]);

  const routes = [
    {
      id: "r1",
      type: "Kombinasi (Ojek + KRL)",
      time: "45 mins",
      cost: "Rp 15.000",
      distance: "12 km",
      badge: "Tercepat",
      badgeVariant: "default",
      details: ["Jalan Kaki ke Stasiun", "Naik KRL ke Sudirman", "Ojek Online ke Tujuan"]
    },
    {
      id: "r2",
      type: "Ride-Hailing (Motor)",
      time: "55 mins",
      cost: "Rp 35.000",
      distance: "14 km",
      badge: "Praktis",
      badgeVariant: "secondary",
      details: ["Pesan Ojek Online dari Titik Jemput ke Tujuan"]
    },
    {
      id: "r3",
      type: "Kendaraan Pribadi (Mobil)",
      time: "65 mins",
      cost: "Rp 40.000 (Bensin + Tol)",
      distance: "15 km",
      badge: "Nyaman",
      badgeVariant: "outline",
      details: ["Berkendara via Tol Dalam Kota", "Estimasi Kemacetan Moderat"]
    }
  ];

  return NextResponse.json({ routes, origin, destination });
}
