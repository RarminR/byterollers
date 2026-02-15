"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Rocket, Medal, Target, Code2, LineChart, Users, Zap } from "lucide-react";

const founders = [
  {
    name: "Armin Asgari",
    role: "Business & Strategy",
    tagline: "Turning vision into revenue",
    medals: ["International Economics Olympiad", "National Gold Medalist"],
    expertise: [
      { icon: LineChart, label: "Product Strategy" },
      { icon: Target, label: "Growth Systems" },
      { icon: Users, label: "Client Partnerships" },
    ],
    color: "#46C2FF",
    gradient: "from-[#46C2FF] to-[#7B5CFF]",
    photo: "/images/armin.jpg",
    initials: "AA",
    story: "Started coding at 12, Armin discovered his passion lay in the intersection of technology and business. After winning gold at the International Economics Olympiad, he spent 5 years scaling startups from zero to $1M+ ARR. His approach: systems over hacks, partnerships over transactions.",
  },
  {
    name: "Yusuf Fares",
    role: "Engineering & Architecture",
    tagline: "Building systems that scale",
    medals: ["International Informatics Olympiad", "Robotics Gold Medalist"],
    expertise: [
      { icon: Code2, label: "System Architecture" },
      { icon: Zap, label: "Performance Optimization" },
      { icon: Award, label: "Technical Leadership" },
    ],
    color: "#7B5CFF",
    gradient: "from-[#7B5CFF] to-[#FFB454]",
    photo: "/images/fares.jpg",
    initials: "YF",
    story: "Yusuf's journey began with robotics competitions, where he learned that great engineering is invisible—it just works. After his Informatics Olympiad gold, he architected systems processing 10M+ daily requests. His philosophy: simplicity scales, complexity fails.",
  },
];

const stats = [
  { value: "15+", label: "Companies Transformed", color: "#46C2FF" },
  { value: "$1M+", label: "Capital Raised by Clients", color: "#7B5CFF" },
  { value: "6 Weeks", label: "Average MVP Delivery", color: "#FFB454" },
  { value: "100%", label: "Client Retention", color: "#46C2FF" },
];

export default function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative py-24 md:py-32 bg-[#0B0F14] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl bg-gradient-to-r from-[#46C2FF] to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl bg-gradient-to-l from-[#7B5CFF] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F1621] border border-[#1F2937] mb-6">
            <Medal className="w-4 h-4 text-[#FFB454]" />
            <span className="font-mono text-sm text-[#A9B4C2]">Olympiad Gold Medalists</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Founders
          </h2>
          
          <p className="text-lg md:text-xl text-[#A9B4C2] max-w-3xl mx-auto leading-relaxed">
            Two gold medalists. One shared obsession: building systems that work. 
            Armin architects the business. Fares engineers the infrastructure.
          </p>
        </motion.div>

        {/* Founders cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative h-[420px]"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full h-full group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative bg-gradient-to-br from-[#0F1621] to-[#0B0F14] rounded-3xl border border-[#1F2937] overflow-hidden h-full">
                    {/* Top accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                      style={{ background: `linear-gradient(to right, transparent, ${founder.color}, transparent)` }}
                    />

                    <div className="relative p-8 md:p-10">
                      {/* Header with Photo */}
                      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                        {/* Photo */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="relative flex-shrink-0"
                        >
                          <div 
                            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2"
                            style={{ borderColor: `${founder.color}40` }}
                          >
                            <div 
                              className="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-bold"
                              style={{ 
                                background: `linear-gradient(135deg, ${founder.color}30, ${founder.color}10)`,
                                color: founder.color
                              }}
                            >
                              {founder.initials}
                            </div>
                          </div>
                          {/* Medal badge on photo */}
                          <div 
                            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#0B0F14]"
                            style={{ backgroundColor: founder.color }}
                          >
                            <Medal className="w-5 h-5 text-[#0B0F14]" />
                          </div>
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">{founder.name}</h3>
                          <p className="text-lg font-medium mb-2" style={{ color: founder.color }}>
                            {founder.role}
                          </p>
                          <p className="text-[#A9B4C2]">{founder.tagline}</p>
                        </div>
                      </div>

                      {/* Medals */}
                      <div className="mb-8">
                        <p className="font-mono text-xs text-[#A9B4C2] uppercase tracking-wider mb-3">Medals & Recognition</p>
                        <div className="flex flex-wrap gap-2">
                          {founder.medals.map((medal, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                              style={{ 
                                backgroundColor: `${founder.color}15`,
                                color: founder.color,
                                border: `1px solid ${founder.color}30`
                              }}
                            >
                              <Medal className="w-3.5 h-3.5" />
                              {medal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expertise */}
                      <div>
                        <p className="font-mono text-xs text-[#A9B4C2] uppercase tracking-wider mb-4">Core Expertise</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {founder.expertise.map((item, i) => {
                            const Icon = item.icon;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.5 + i * 0.1 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0F14] border border-[#1F2937]"
                              >
                                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: founder.color }} />
                                <span className="text-sm text-[#EAEFF5]">{item.label}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card - Story */}
                <div 
                  className="absolute inset-0 transition-transform duration-700"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div 
                    className="relative h-full rounded-3xl border overflow-hidden p-8 md:p-10 flex flex-col justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${founder.color}10, #0B0F14)`,
                      borderColor: `${founder.color}40`
                    }}
                  >
                    {/* Top accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                      style={{ background: `linear-gradient(to right, transparent, ${founder.color}, transparent)` }}
                    />

                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{founder.name}</h3>
                      <p className="text-lg font-medium" style={{ color: founder.color }}>
                        {founder.role}
                      </p>
                    </div>

                    <div className="flex-1 flex items-center">
                      <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: '#EAEFF5' }}>
                        {founder.story}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#1F2937]">
                      <p className="font-mono text-xs text-[#A9B4C2] uppercase tracking-wider mb-3 text-center">Their Philosophy</p>
                      <p className="text-center text-[#A9B4C2] italic">
                        "{index === 0 ? "Systems over hacks, partnerships over transactions." : "Simplicity scales, complexity fails."}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-[#0F1621] via-[#0F1621] to-[#0F1621] rounded-2xl border border-[#1F2937] p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <p 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base" style={{ color: '#EAEFF5' }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl text-[#A9B4C2] italic max-w-4xl mx-auto">
            "We don't just build websites. We architect the infrastructure that powers your next phase of growth."
          </blockquote>
          <p className="mt-4 font-mono text-sm text-[#46C2FF]">— ByteRollers Philosophy</p>
        </motion.div>
      </div>
    </section>
  );
}
