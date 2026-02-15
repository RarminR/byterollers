"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, Users, Calendar, BookOpen, ChevronLeft, ChevronRight, Monitor, ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    id: "younichoice",
    title: "YouNiChoice Academy",
    domain: "academy.younichoice.com",
    icon: Users,
    metric: "10,000+",
    metricLabel: "Active users",
    description: "A comprehensive learning management system built for an educational platform serving thousands of students.",
    context: "Educational platform needing scalable course delivery",
    built: "Custom LMS with video streaming, progress tracking, assessments, and certification",
    outcome: "10,000+ active users with 95%+ uptime and sub-2s load times",
    tags: ["Education", "LMS", "Video", "Scale"],
    color: "#46C2FF",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop&q=60",
  },
  {
    id: "vitruvian",
    title: "Vitruvian Wellness",
    domain: "vitruvianwellness.me",
    icon: Calendar,
    metric: "1,000+",
    metricLabel: "Monthly bookings",
    description: "Appointment booking system for a wellness clinic with automated patient flow management.",
    context: "Wellness clinic needing modern booking + patient management",
    built: "Appointment system with automated reminders, intake forms, and admin dashboard",
    outcome: "1,000+ monthly bookings, reduced no-shows by 40%",
    tags: ["Healthcare", "Booking", "Automation", "CRM"],
    color: "#7B5CFF",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&q=60",
  },
  {
    id: "finlab",
    title: "FinLab",
    domain: "finlab.ro",
    icon: BookOpen,
    metric: "Live",
    metricLabel: "Platform",
    description: "Finance course platform with interactive learning modules and progress tracking.",
    context: "Finance education startup launching course platform",
    built: "Course platform with interactive modules, quizzes, and student analytics",
    outcome: "Successfully launched with engaged user base and positive retention",
    tags: ["Finance", "EdTech", "Analytics", "Growth"],
    color: "#FFB454",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=60",
  },
];

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    const section = document.getElementById('work');
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setSelectedStudy(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentStudy = caseStudies[currentIndex];
  const Icon = currentStudy.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative py-16 md:py-32 bg-[#0B0F14] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="font-mono text-xs md:text-sm text-[#46C2FF] mb-3 md:mb-4">PROOF OF WORK</p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6">
              Case Studies
            </h2>
            <p className="text-base md:text-lg text-[#A9B4C2] max-w-2xl mx-auto px-4">
              Real projects, real outcomes. No fabricated metrics.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Carousel - Reduced height on mobile */}
            <div id="case-studies-carousel" className="relative min-h-[580px] sm:min-h-[620px] md:min-h-[500px] overflow-hidden rounded-2xl md:rounded-3xl bg-[#0F1621] border border-[#1F2937]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.3, ease: "easeOut" },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <div className="flex flex-col md:grid md:grid-cols-2 h-full">
                    {/* Image Section - Smaller on mobile */}
                    <div className="relative h-44 sm:h-52 md:h-full overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentStudy.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1621] via-[#0F1621]/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0F1621]/90 md:via-[#0F1621]/50" />
                      
                      {/* Floating metric badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-3 left-3 md:top-6 md:bottom-auto px-2.5 py-1 md:px-4 md:py-2 rounded-full bg-[#0B0F14]/80 backdrop-blur-sm border border-[#1F2937]"
                      >
                        <span className="text-base md:text-2xl font-bold" style={{ color: currentStudy.color }}>
                          {currentStudy.metric}
                        </span>
                        <span className="text-xs text-[#A9B4C2] ml-1 md:ml-2">{currentStudy.metricLabel}</span>
                      </motion.div>

                      {/* Browser mockup - Desktop */}
                      <div className="hidden md:block absolute bottom-6 left-6 right-6 md:right-auto md:w-80">
                        <a 
                          href={`https://${currentStudy.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-[#0B0F14] rounded-xl border border-[#1F2937] overflow-hidden shadow-2xl hover:border-[#46C2FF]/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2 px-3 py-2 bg-[#1F2937]/50 border-b border-[#1F2937]">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B0F14] text-xs text-[#A9B4C2] group-hover:text-[#46C2FF] transition-colors">
                                <Monitor className="w-3 h-3" />
                                <span className="truncate max-w-[100px] md:max-w-[120px]">{currentStudy.domain}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 md:p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${currentStudy.color}15` }}
                              >
                                <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: currentStudy.color }} />
                              </div>
                              <div>
                                <p className="font-semibold text-xs md:text-sm">{currentStudy.title}</p>
                                <p className="text-xs text-[#A9B4C2]">{currentStudy.domain}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-1.5 md:h-2 bg-[#1F2937] rounded-full w-full" />
                              <div className="h-1.5 md:h-2 bg-[#1F2937] rounded-full w-4/5" />
                              <div className="h-1.5 md:h-2 bg-[#1F2937] rounded-full w-3/5" />
                            </div>
                            {/* Loading indicator */}
                            <div className="mt-3 pt-3 border-t border-[#1F2937] flex items-center justify-between">
                              <span className="text-[10px] text-[#A9B4C2] animate-pulse">loading...</span>
                              <span className="text-[10px] text-[#46C2FF]">Designed by ByteRollers</span>
                            </div>
                          </div>
                        </a>
                      </div>

                      {/* Browser mockup - Mobile (over the image) */}
                      <a 
                        href={`https://${currentStudy.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:hidden absolute bottom-3 right-3 left-3"
                      >
                        <div className="bg-[#0B0F14]/95 backdrop-blur-md rounded-xl border border-[#1F2937] overflow-hidden shadow-2xl active:scale-[0.98] transition-transform">
                          <div className="flex items-center gap-2 px-3 py-2 bg-[#1F2937]/50 border-b border-[#1F2937]">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-500/80" />
                              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                              <div className="w-2 h-2 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B0F14] text-[10px] text-[#A9B4C2]">
                                <Monitor className="w-3 h-3" />
                                <span className="truncate max-w-[120px]">{currentStudy.domain}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${currentStudy.color}15` }}
                              >
                                <Icon className="w-3.5 h-3.5" style={{ color: currentStudy.color }} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-xs truncate">{currentStudy.title}</p>
                                <p className="text-[10px] text-[#A9B4C2] truncate">{currentStudy.domain}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Content Section - Compact on mobile */}
                    <div className="p-4 sm:p-5 md:p-8 lg:p-12 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Tags - Smaller on mobile */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-6">
                          {currentStudy.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium rounded-full border"
                              style={{ 
                                borderColor: `${currentStudy.color}30`,
                                color: currentStudy.color,
                                backgroundColor: `${currentStudy.color}10`,
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                          {currentStudy.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-lg mb-3 md:mb-6" style={{ color: '#EAEFF5' }}>
                          {currentStudy.description}
                        </p>

                        {/* Quick stats - Single column on mobile */}
                        <div className="grid grid-cols-1 gap-2 md:gap-4 mb-4 md:mb-8">
                          <div className="p-2.5 md:p-4 rounded-xl bg-[#0B0F14] border border-[#1F2937]">
                            <p className="text-xs text-[#A9B4C2] mb-0.5">Context</p>
                            <p className="text-xs md:text-sm">{currentStudy.context}</p>
                          </div>
                          <div className="p-2.5 md:p-4 rounded-xl bg-[#0B0F14] border border-[#1F2937]">
                            <p className="text-xs text-[#A9B4C2] mb-0.5">Outcome</p>
                            <p className="text-xs md:text-sm">{currentStudy.outcome}</p>
                          </div>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => setSelectedStudy(currentStudy)}
                          className="group inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all text-sm"
                          style={{ 
                            backgroundColor: `${currentStudy.color}15`,
                            color: currentStudy.color,
                          }}
                        >
                          View full case study
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
              <button
                onClick={prevSlide}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#1F2937] flex items-center justify-center text-[#A9B4C2] hover:text-[#EAEFF5] hover:border-[#EAEFF5]/30 transition-all"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="flex items-center gap-1.5 md:gap-2">
                {caseStudies.map((study, index) => (
                  <button
                    key={study.id}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-4 md:w-6" : "w-1.5 md:w-2"
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? study.color : "#1F2937",
                    }}
                    aria-label={`Go to case study ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#1F2937] flex items-center justify-center text-[#A9B4C2] hover:text-[#EAEFF5] hover:border-[#EAEFF5]/30 transition-all"
                aria-label="Next case study"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Counter */}
            <div className="text-center mt-3 md:mt-4">
              <p className="font-mono text-xs text-[#A9B4C2]">
                {String(currentIndex + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal - Centered popup style */}
      <AnimatePresence>
        {selectedStudy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedStudy(null)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-lg max-h-[85vh] bg-[#0F1621] rounded-2xl border border-[#1F2937] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Close button - floating */}
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0B0F14]/90 backdrop-blur-sm border border-[#1F2937] hover:bg-[#1F2937] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="overflow-y-auto flex-1">
                  {/* Hero image */}
                  <div className="relative h-36 sm:h-44">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${selectedStudy.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1621] via-[#0F1621]/30 to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${selectedStudy.color}15` }}
                      >
                        <selectedStudy.icon
                          className="w-5 h-5"
                          style={{ color: selectedStudy.color }}
                        />
                      </div>
                      <div>
                        <h2 id="modal-title" className="text-lg sm:text-xl font-semibold">
                          {selectedStudy.title}
                        </h2>
                        <p className="font-mono text-xs text-[#A9B4C2]">{selectedStudy.domain}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Metric highlight */}
                      <div
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: `${selectedStudy.color}10` }}
                      >
                        <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: selectedStudy.color }}>
                          {selectedStudy.metric}
                        </p>
                        <p className="text-xs text-[#A9B4C2]">{selectedStudy.metricLabel}</p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-mono text-[10px] sm:text-xs text-[#46C2FF] mb-1.5 uppercase tracking-wider">Context</h3>
                          <p className="text-sm" style={{ color: '#EAEFF5' }}>{selectedStudy.context}</p>
                        </div>

                        <div>
                          <h3 className="font-mono text-[10px] sm:text-xs text-[#46C2FF] mb-1.5 uppercase tracking-wider">What We Built</h3>
                          <p className="text-sm" style={{ color: '#EAEFF5' }}>{selectedStudy.built}</p>
                        </div>

                        <div>
                          <h3 className="font-mono text-[10px] sm:text-xs text-[#46C2FF] mb-1.5 uppercase tracking-wider">Outcome</h3>
                          <p className="text-sm" style={{ color: '#EAEFF5' }}>{selectedStudy.outcome}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1F2937]">
                        {selectedStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${selectedStudy.color}15`,
                              color: selectedStudy.color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
