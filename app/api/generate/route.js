import { uploadToR2 } from "@/lib/r2";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let runpodData = null;

    // Try runsync several times because RunPod Flash can return IN_QUEUE when cold
    for (let attempt = 1; attempt <= 6; attempt++) {
      const runpodRes = await fetch(
        `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/runsync`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
          },
          body: JSON.stringify({
            input: {
              prompt,
            },
          }),
        }
      );

      runpodData = await runpodRes.json();

      if (runpodData.status === "COMPLETED") {
        break;
      }

      await sleep(5000);
    }

    if (runpodData.status !== "COMPLETED") {
      return Response.json({
        success: false,
        message: "RunPod job still not completed. Try again after worker is warm.",
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

    return Response.json({
      success: true,
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
