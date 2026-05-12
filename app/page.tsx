"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

{/* VIDEO BACKGROUND */}
<div className="absolute inset-0 overflow-hidden">

  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover opacity-30"
  >
    <source src="/cinematic.mp4" type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40" />

  {/* GLOW */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

</div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="text-sm tracking-[0.4em] text-white/70">
            HALUIN
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#">Gallery</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
          </div>

          <button className="bg-white text-black px-5 py-2 rounded-full text-sm">
            Start Creating
          </button>

        </div>

      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center px-6">

        <div className="text-center z-10 max-w-6xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="uppercase tracking-[0.6em] text-xs text-gray-500 mb-6"
          >
            HALUIN AI STUDIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-[9rem] font-bold leading-[0.9] tracking-tight"
          >
            Create
            <span className="text-white/20"> Cinematic </span>
            AI
            <br />
            Images
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Generate ultra realistic cinematic visuals powered by artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
          >

            <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-all">
              Generate Now
            </button>

            <button className="border border-white/10 px-8 py-4 rounded-full hover:bg-white/5 transition-all">
              Explore Gallery
            </button>

          </motion.div>

        </div>

      </section>

{/* SHOWCASE */}
<section className="relative px-6 pb-40">

  <div className="max-w-7xl mx-auto">

    <div className="mb-16">

      <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-4">
        AI GENERATED VISUALS
      </p>

      <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
        Cinematic Gallery
      </h2>

    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {[
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery3.jpg",
      ].map((img, i) => (

        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5"
        >

          <img
            src={img}
            className="w-full h-[520px] object-cover"
          />

        </motion.div>

      ))}

    </div>

  </div>

</section>

      {/* AI GENERATOR */}
      <section className="relative z-10 px-6 pb-32">

        <div className="max-w-5xl mx-auto bg-white/[0.03] border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl">

          <textarea
            placeholder="A cinematic astronaut standing in Tokyo rain, ultra realistic, anamorphic lens..."
            className="w-full min-h-[180px] bg-transparent outline-none text-lg resize-none placeholder:text-gray-500"
          />

          <div className="mt-8 flex justify-between items-center">

            <div className="text-gray-500 text-sm">
              Powered by Haluin AI
            </div>

            <button className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition">
              Generate Image
            </button>

          </div>

        </div>

      </section>

      {/* FEATURE CARDS */}
      <section className="px-6 pb-40">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

          {[
            "Ultra Realistic",
            "Cinematic Lighting",
            "AI Powered Workflow",
          ].map((item, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
            >

              <div className="w-12 h-12 rounded-full bg-white/10 mb-6" />

              <h3 className="text-2xl font-semibold mb-4">
                {item}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Premium cinematic generation powered by next-generation AI workflows.
              </p>

            </motion.div>

          ))}

        </div>

      </section>

    </main>
  );
}
