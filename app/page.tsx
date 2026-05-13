"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type GalleryItem = {
  url: string;
  type: "image" | "video";
  width: number;
  height: number;
  prompt: string;
  createdAt: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState(
    "cinematic photo of Jakarta at night, neon lights, rain, 35mm film"
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [lastImage, setLastImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
  async function loadGallery() {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();

      if (data.success && Array.isArray(data.gallery)) {
        setGallery(data.gallery);
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadGallery();
}, []);

  async function generateImage() {
    try {
      setLoading(true);
      setStatus("Starting generation...");

      const startRes = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const startData = await startRes.json();

      if (!startData.success || !startData.jobId) {
        setStatus("Failed to start generation.");
        console.log(startData);
        setLoading(false);
        return;
      }

      setStatus("Generating image on RunPod...");

      let completed = false;

      for (let i = 0; i < 40; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const statusRes = await fetch("/api/generate/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: startData.jobId,
            prompt,
          }),
        });

        const statusData = await statusRes.json();

        if (statusData.completed && statusData.item) {
  setLastImage(statusData.item);
  setGallery((prev) => [statusData.item, ...prev]);
  setStatus("Image generated and uploaded to gallery.");
  completed = true;
  break;
}

        setStatus(`Still generating... ${statusData.status || "waiting"}`);
      }

      if (!completed) {
        setStatus("Generation is taking too long. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/cinematic.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-sm tracking-[0.4em] text-white/70">
            HALUIN
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#generator">Generator</a>
            <a href="#gallery">Gallery</a>
            <a href="#features">Features</a>
          </div>
        </div>
      </nav>

      {/* HERO / GENERATOR */}
      <section
        id="generator"
        className="relative z-10 min-h-screen flex items-center px-6 pt-28"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs tracking-[0.5em] text-white/40 mb-6">
              CINEMATIC AI GENERATOR
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
              Generate cinematic visuals with Haluin.
            </h1>

            <p className="text-gray-400 leading-relaxed max-w-xl mb-8">
              Premium cinematic generation powered by RunPod Flash and
              Cloudflare R2 public gallery storage.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl max-w-2xl">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your cinematic image..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none resize-none placeholder:text-white/30"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={generateImage}
                  disabled={loading}
                  className="px-6 py-3 rounded-2xl bg-white text-black font-semibold disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Image"}
                </button>

                <div className="text-sm text-white/50 flex items-center">
                  {status}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="hidden lg:block"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-white/5 border border-white/10 overflow-hidden relative">
  {lastImage ? (
    <>
      <img
        src={lastImage.url}
        alt={lastImage.prompt}
        className="w-full h-full object-contain bg-black"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-sm text-white/70 line-clamp-2">
          {lastImage.prompt}
        </p>

        <a
          href={lastImage.url}
          target="_blank"
          className="inline-block mt-2 text-xs text-white underline underline-offset-4"
        >
          Open / Download
        </a>
      </div>
    </>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-white/40 text-center p-8">
      Your latest generated image will appear here.
    </div>
  )}
</div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs tracking-[0.5em] text-white/40 mb-3">
                PUBLIC GALLERY
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold">
                Latest generations
              </h2>
            </div>
          </div>

          {gallery.length === 0 ? (
            <div className="border border-white/10 bg-white/5 rounded-3xl p-10 text-white/40">
              No generated images yet. Create your first image above.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {gallery.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  className="break-inside-avoid mb-4 rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-auto block bg-black"
                      style={{
                        aspectRatio: `${item.width} / ${item.height}`,
                      }}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.prompt}
                      className="w-full h-auto block bg-black"
                      style={{
                        aspectRatio: `${item.width} / ${item.height}`,
                      }}
                    />
                  )}

                  <div className="p-4">
                    <p className="text-sm text-white/60 line-clamp-3">
                      {item.prompt}
                    </p>

                    <a
                      href={item.url}
                      target="_blank"
                      className="inline-block mt-3 text-sm text-white underline underline-offset-4"
                    >
                      Download / Open
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
