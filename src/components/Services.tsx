"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Palette, Zap, Settings } from "lucide-react";

const services = [
  {
    id: "website",
    icon: Globe,
    title: "Website Builds",
    description: "Conversion-first design + engineering",
    details: [
      "Fast, accessible, SEO-ready",
      "Performance optimized (90+ Lighthouse)",
      "Mobile-first responsive design",
      "Analytics and tracking setup",
    ],
    color: "#46C2FF",
  },
  {
    id: "brand",
    icon: Palette,
    title: "Website + Brand Transformation",
    description: "Visual identity refinement",
    details: [
      "Design system creation",
      "Web implementation",
      "Brand consistency across touchpoints",
      "Asset library and guidelines",
    ],
    color: "#7B5CFF",
  },
  {
    id: "mvp",
    icon: Zap,
    title: "MVP in 6 Weeks",
    description: "Tight scope, weekly demos, launch-ready",
    details: [
      "Product strategy and scoping",
      "Weekly progress updates",
      "User testing and iteration",
      "Launch and handoff support",
    ],
    color: "#FFB454",
  },
  {
    id: "automation",
    icon: Settings,
    title: "Automation & Internal Tools",
    description: "Intake, ops, CRM-like workflows",
    details: [
      "Custom dashboards and workflows",
      "Third-party integrations",
      "Data pipeline automation",
      "Internal tool development",
    ],
    color: "#46C2FF",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-10% 0px -10% 0px"
  });

  useEffect(() => {
    if (isInView) {
      // Add a small delay to prevent rapid toggling
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl bg-[#0F1621] border border-[#1F2937]"
    >
      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${service.color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: service.color }} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-[#A9B4C2]">{service.description}</p>

            {/* Expandable details - opens on scroll */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-[#1F2937]' : 'max-h-0 opacity-0'}`}
            >
              <div ref={contentRef}>
                <ul className="grid gap-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-[#EAEFF5]/80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: service.color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}08, transparent 40%)`,
        }}
      />
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 bg-[#0B0F14]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm text-[#46C2FF] mb-4">WHAT WE DO</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Capabilities
          </h2>
          <p className="text-lg text-[#A9B4C2] max-w-2xl mx-auto">
            Outcome-focused services. No tech jargon, just results.
          </p>
        </motion.div>

        {/* Services grid - each card opens on scroll */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-[#A9B4C2]/60 font-mono">
            Scroll to explore each service
          </p>
        </motion.div>
      </div>
    </section>
  );
}
