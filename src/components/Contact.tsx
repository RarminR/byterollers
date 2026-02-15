"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 bg-[#0B0F14] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#46C2FF]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F1621] border border-[#46C2FF]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#46C2FF] animate-pulse" />
            <span className="font-mono text-sm text-[#A9B4C2]">Ready to start</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-semibold mb-6">
            Let's build something
            <br />
            <span className="text-gradient">that scales.</span>
          </h2>

          {/* Supporting text */}
          <p className="text-xl text-[#A9B4C2] max-w-2xl mx-auto mb-12">
            Tell us what you're trying to achieve. We'll reply with a plan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://cal.com/byte-rollers"
              target="_blank"
              rel="noopener noreferrer"
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
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#A9B4C2]">
            <a
              href="mailto:hello@byterollers.com"
              className="flex items-center gap-2 hover:text-[#46C2FF] transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@byterollers.com
            </a>
            <span className="hidden sm:block text-[#1F2937]">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Australia + US
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
