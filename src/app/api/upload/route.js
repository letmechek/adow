import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && cloudKey && cloudSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret,
    secure: true,
  });
}

async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "mohamed-adow" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
}

async function saveToLocal(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileExtension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.writeFile(filePath, buffer);

  return {
    url: `/uploads/${fileName}`,
    public_id: fileName,
  };
}

export async function POST(request) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files?.length) {
      return NextResponse.json({ message: "No files provided" }, { status: 400 });
    }

    const useCloud = Boolean(cloudName && cloudKey && cloudSecret);

    const uploads = await Promise.all(
      files.map(async (file) => {
        if (useCloud) {
          const result = await uploadToCloudinary(file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
          };
        }

        const local = await saveToLocal(file);
        return {
          url: local.url,
          publicId: local.public_id,
        };
      })
    );

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Failed to upload files" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
