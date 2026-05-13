import { readGallery } from "@/lib/galleryStore";

export async function GET() {
  const gallery = await readGallery();

  return Response.json({
    success: true,
    gallery,
  });
}
