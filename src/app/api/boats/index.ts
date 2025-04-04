// src/app/api/boats/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("boatdb");

  if (req.method === "GET") {
    const boats = await db.collection("boats").find({}).toArray();
    res.status(200).json({ boats });
  } else if (req.method === "POST") {
    const newBoat = req.body;
    const result = await db.collection("boats").insertOne(newBoat);
    res.status(201).json({ boat: newBoat, insertedId: result.insertedId });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
