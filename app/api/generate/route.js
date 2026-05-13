export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const runpodRes = await fetch(
      `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/run`,
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

    const runpodData = await runpodRes.json();

    return Response.json({
      success: true,
      jobId: runpodData.id,
      status: runpodData.status,
      prompt,
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
