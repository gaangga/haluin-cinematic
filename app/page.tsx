"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/cinematic.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-sm font-medium tracking-[0.5em] text-white/80">
          HALUIN
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <span>AI Visual Studio</span>
          <span>Coming Soon</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-6 text-xs uppercase tracking-[0.6em] text-white/45">
            Cinematic AI Generator
          </div>

          <h1 className="mx-auto max-w-5xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-8xl lg:text-9xl">
            Under develop
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/70 md:text-xl">
            Haluin is being crafted as a cinematic AI creation platform for
            generating premium images, videos, and visual stories. We are
            building the experience carefully before opening it to the public.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm text-white/70 backdrop-blur-xl">
              Private beta in progress
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm text-white/70 backdrop-blur-xl">
              Powered by AI image and video generation
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
