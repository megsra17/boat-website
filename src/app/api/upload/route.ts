// src/pages/api/upload/route.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import cloudinary from "@/lib/cloudinary";

// Configure multer to use memory storage (we'll send the file buffer to Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Upload the file buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "boats" }, // You can specify a folder for organization
      (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ url: result?.secure_url });
        }
      }
    );

    // Pipe the file buffer into the upload stream
    // @ts-ignore
    req.file.stream.pipe(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, because we're handling file streams
  },
};

export default apiRoute;
