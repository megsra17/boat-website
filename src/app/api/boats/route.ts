import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("your-db-name");
    const boats = await db.collection("boats").find({}).toArray();

    return NextResponse.json({ boats });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch boats" },
      { status: 500 }
    );
  }
}
