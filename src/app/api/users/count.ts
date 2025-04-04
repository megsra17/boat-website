import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName"); // replace with your database name
    // Count documents in the "users" collection.
    // Adjust the filter if you have a specific "active" flag.
    const count = await db.collection("users").countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user count" });
  }
}
