"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TrendingDown, Frown, Clock, Settings } from "lucide-react";

const problems = [
  {
    id: 1,
    title: "Websites that look good but don't convert.",
    description: "Beautiful designs that fail to turn visitors into customers. High bounce rates and missed opportunities.",
    icon: TrendingDown,
    color: "#46C2FF",
  },
  {
    id: 2,
    title: "Brands that feel inconsistent across touchpoints.",
    description: "Your website, social media, and materials don't feel like the same brand. Customers lose trust.",
    icon: Frown,
    color: "#7B5CFF",
  },
  {
    id: 3,
    title: "MVPs that ship late because the scope is unclear.",
    description: "Months of development with no clear end in sight. Features keep getting added, deadlines keep slipping.",
    icon: Clock,
    color: "#FFB454",
  },
  {
    id: 4,
    title: "Internal work done manually because no one builds the system.",
    description: "Hours wasted on repetitive tasks that could be automated. Your team is busy, but not productive.",
    icon: Settings,
    color: "#46C2FF",
  },
];

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.4
  });
  const Icon = problem.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Connector line */}
      {index < problems.length - 1 && (
        <div className="absolute left-6 top-full w-0.5 h-16 bg-gradient-to-b from-[#1F2937] to-transparent hidden md:block" />
      )}

      <div className="flex gap-4 md:gap-6">
        {/* Icon & Number */}
        <div className="flex-shrink-0">
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center relative z-10"
            style={{ 
              backgroundColor: `${problem.color}15`,
              border: `1px solid ${problem.color}30`
            }}
            animate={{
              scale: isInView ? 1 : 0.9,
              boxShadow: isInView ? `0 0 30px ${problem.color}20` : `0 0 0px ${problem.color}00`
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: problem.color }} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8 md:pb-12">
          <motion.div
            initial={false}
            animate={{ 
              x: isInView ? 0 : -20,
              opacity: isInView ? 1 : 0.5 
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span 
              className="font-mono text-xs md:text-sm mb-2 block"
              style={{ color: problem.color }}
            >
              Problem {String(index + 1).padStart(2, "0")}
            </span>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-[#EAEFF5]">
              {problem.title}
            </h3>
            
            <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: '#EAEFF5 !important' }}>
              {problem.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress through the section
      const scrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      // Map to problem index
      const idx = Math.min(Math.floor(progress * 4), 3);
      setCurrentIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative bg-[#0B0F14] min-h-screen"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${problems[currentIndex]?.color || "#46C2FF"}20, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(circle, ${problems[(currentIndex + 2) % 4]?.color || "#7B5CFF"}15, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="font-mono text-sm text-[#46C2FF] mb-4">THE PROBLEM</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-[#EAEFF5]">
            Common challenges we solve
          </h2>
          <p className="text-lg text-[#A9B4C2] max-w-2xl mx-auto">
            These are the pain points that keep businesses from growing. We&apos;ve seen them all.
          </p>

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {problems.map((item, i) => (
              <motion.div
                key={item.id}
                className="h-1 rounded-full transition-all duration-300"
                animate={{
                  width: currentIndex === i ? 32 : 8,
                  backgroundColor: currentIndex >= i ? item.color : "#1F2937",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Problems List - Desktop */}
        <div className="hidden md:block">
          <div className="max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <ProblemCard key={problem.id} problem={problem} index={index} />
            ))}
          </div>
        </div>

        {/* Problems Cards - Mobile */}
        <div className="md:hidden space-y-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                className="bg-[#0F1621] rounded-2xl p-6 border border-[#1F2937]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${problem.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: problem.color }} />
                  </div>
                  <div className="flex-1">
                    <span 
                      className="font-mono text-xs mb-1 block"
                      style={{ color: problem.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 text-[#EAEFF5]">
                      {problem.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#EAEFF5 !important' }}>
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#A9B4C2] mb-4">Sound familiar?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: "#46C2FF15",
              color: "#46C2FF",
              border: "1px solid #46C2FF30"
            }}
          >
            Let&apos;s fix it together
          </a>
        </motion.div>
      </div>
    </section>
  );
}
