"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Three.js background to avoid SSR issues
const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#0B0F14]" />,
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ pointerEvents: 'auto' }}>
      {/* Three.js Animated Background with Nodes */}
      <div style={{ pointerEvents: 'none' }}>
        <HeroBackground />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F14]/50 to-[#0B0F14] z-10 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F1621] border border-[#46C2FF]/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#46C2FF] animate-pulse" />
            <span className="font-mono text-sm text-[#A9B4C2]">Available for projects</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              We design brands
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block text-gradient"
            >
              and engineer products
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block"
            >
              that scale.
            </motion.span>
          </h1>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-[#A9B4C2] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium websites, MVPs, and internal systems. Built fast, shipped clean, improved weekly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="btn-primary group"
            >
              Book a Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 font-mono text-sm text-[#A9B4C2]/60"
          >
            Built for clinics, founders, and ambitious brands. Australia + US.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F14] to-transparent z-20 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
