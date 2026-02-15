"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RhythmCardProps {
  number: string;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function RhythmCard({ number, title, description, color, delay }: RhythmCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      {/* Card */}
      <div className="relative bg-[#0F1621] rounded-2xl border border-[#1F2937] overflow-hidden">
        {/* Animated circles background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border"
                style={{ 
                  borderColor: `${color}20`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3]
                } : {}}
                transition={{
                  duration: 3,
                  delay: delay + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8">
          {/* Number badge */}
          <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 text-xl font-bold"
            style={{ 
              backgroundColor: `${color}15`,
              color: color,
              border: `1px solid ${color}30`
            }}
          >
            {number}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-[#EAEFF5]">{title}</h3>
          
          <p className="text-[#A9B4C2] leading-relaxed">{description}</p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </div>

      {/* Connection lines to next card (except last) */}
      <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-px">
        <svg 
          width="32" 
          height="2" 
          viewBox="0 0 32 2" 
          fill="none"
          className="absolute top-0 left-0"
        >
          <line 
            x1="0" 
            y1="1" 
            x2="32" 
            y2="1" 
            stroke={color}
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default function WeeklyRhythm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const rhythms = [
    {
      number: "01",
      title: "Strategy Call",
      description: "We align on goals, scope, and success metrics. Clear roadmap before we write a single line of code.",
      color: "#46C2FF",
    },
    {
      number: "02",
      title: "Weekly Build",
      description: "Ship features every week. See progress in real-time with live demos and iterative feedback.",
      color: "#7B5CFF",
    },
    {
      number: "03",
      title: "Continuous Improvement",
      description: "Launch is just the beginning. We monitor, optimize, and scale your systems for long-term growth.",
      color: "#FFB454",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 bg-[#0B0F14] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl bg-[#46C2FF]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl bg-[#7B5CFF]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-sm text-[#46C2FF] mb-4">HOW WE WORK</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Weekly Rhythm
          </h2>
          <p className="text-lg text-[#A9B4C2] max-w-2xl mx-auto">
            No surprises. No black boxes. Just consistent progress you can see and measure.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {rhythms.map((rhythm, index) => (
            <RhythmCard
              key={rhythm.number}
              {...rhythm}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Connection line for mobile */}
        <div className="md:hidden mt-8 flex justify-center">
          <div className="w-px h-16 bg-gradient-to-b from-[#46C2FF] via-[#7B5CFF] to-[#FFB454] opacity-30" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[#A9B4C2] mb-4">Ready to start your weekly rhythm?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: "#46C2FF15",
              color: "#46C2FF",
              border: "1px solid #46C2FF30"
            }}
          >
            Book a Strategy Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
