// src/app/api/boats/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/boats -> Returns all boats
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("boatdb"); // replace with your actual database name
    const boats = await db.collection("boats").find({}).toArray();

    return NextResponse.json({ boats }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch boats" },
      { status: 500 }
    );
  }
}
