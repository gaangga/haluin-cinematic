import { uploadToR2 } from "@/lib/r2";
import { addGalleryItem } from "@/lib/galleryStore";

export async function POST(req) {
  try {
    const { jobId, prompt } = await req.json();

    if (!jobId) {
      return Response.json(
        { success: false, error: "jobId is required" },
        { status: 400 }
      );
    }

    const statusRes = await fetch(
      `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/status/${jobId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
        },
      }
    );

    const runpodData = await statusRes.json();

    if (runpodData.status !== "COMPLETED") {
      return Response.json({
        success: true,
        completed: false,
        status: runpodData.status,
        runpodData,
      });
    }

    const imageBase64 = runpodData.output?.image_base64;
    const width = runpodData.output?.width || 512;
    const height = runpodData.output?.height || 512;
    const format = runpodData.output?.format || "png";

    if (!imageBase64) {
      return Response.json(
        {
          success: false,
          error: "No image_base64 returned from RunPod",
          runpodData,
        },
        { status: 500 }
      );
    }

    const imageBuffer = Buffer.from(imageBase64, "base64");

    const fileKey = `generated/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${format}`;

    const publicUrl = await uploadToR2({
      key: fileKey,
      body: imageBuffer,
      contentType: `image/${format}`,
    });

    const item = {
  url: publicUrl,
  type: "image",
  width,
  height,
  prompt,
  createdAt: new Date().toISOString(),
};

await addGalleryItem(item);

return Response.json({
  success: true,
  completed: true,
  item,
});
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
