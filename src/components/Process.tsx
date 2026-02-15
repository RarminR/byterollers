"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Code2, Rocket, CheckCircle, Terminal, Bug, Play, TrendingUp } from "lucide-react";

interface ConnectedCardProps {
  step: string;
  title: string;
  description: string;
  color: string;
  animation: "graph" | "coding" | "launch";
  delay: number;
}

// Week 1: Strategy & Architecture - Mind Map from Idea
function GraphAnimation({ color, isInView }: { color: string; isInView: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([0]);
  
  // Different colors for each node
  const nodeColors = ["#46C2FF", "#7B5CFF", "#FFB454", "#4ade80", "#f472b6"];
  
  // Mind map layout - Idea in center, 4 nodes around it
  const nodes = [
    { id: 0, cx: 115, cy: 60, label: "Idea", color: nodeColors[0], delay: 0, radius: 24 },
    { id: 1, cx: 55, cy: 30, label: "Research", color: nodeColors[1], delay: 1.2, radius: 20 },
    { id: 2, cx: 175, cy: 30, label: "Reqs", color: nodeColors[2], delay: 2.0, radius: 16 },
    { id: 3, cx: 60, cy: 90, label: "Arch", color: nodeColors[3], delay: 2.8, radius: 16 },
    { id: 4, cx: 170, cy: 90, label: "Plan", color: nodeColors[4], delay: 3.6, radius: 16 },
  ];
  
  // Only 4 connections: Idea to each of the other nodes
  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
  ];

  // Reveal nodes one by one
  useEffect(() => {
    if (isInView) {
      nodes.forEach((node, index) => {
        if (index > 0) {
          setTimeout(() => {
            setVisibleNodes(prev => [...prev, node.id]);
          }, node.delay * 1000);
        }
      });
    }
  }, [isInView]);

  return (
    <div className="relative w-full h-full flex items-center justify-center"
    >
      <svg width="100%" height="120" viewBox="0 0 230 120" fill="none" className="w-full"
        style={{ minHeight: '120px' }}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <defs>
          {nodeColors.map((c, i) => (
            <filter key={`glow-${i}`} id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>
        
        {/* Connection lines - only show when both nodes are visible */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          const isVisible = visibleNodes.includes(conn.from) && visibleNodes.includes(conn.to);
          
          return (
            <g key={`line-${i}`} style={{ opacity: isVisible ? 1 : 0 }}>
              {/* Background line */}
              <motion.line
                x1={fromNode.cx}
                y1={fromNode.cy}
                x2={toNode.cx}
                y2={toNode.cy}
                stroke={`${color}15`}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              {/* Animated flowing line */}
              <motion.line
                x1={fromNode.cx}
                y1={fromNode.cy}
                x2={toNode.cx}
                y2={toNode.cy}
                stroke={color}
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={isVisible ? { 
                  pathLength: 1,
                  strokeDashoffset: [0, -12]
                } : {}}
                transition={{ 
                  pathLength: { duration: 1.2, delay: 0.3 },
                  strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" }
                }}
              />
            </g>
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g 
            key={node.id}
            onMouseEnter={() => setHoveredNode(i)}
            style={{ 
              cursor: 'pointer',
              opacity: visibleNodes.includes(node.id) ? 1 : 0
            }}
          >
            {/* Outer glow ring */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.radius + 8}
              fill={`${node.color}15`}
              initial={{ scale: 0, opacity: 0 }}
              animate={visibleNodes.includes(node.id) ? { 
                scale: hoveredNode === i ? [1, 1.2, 1] : [1, 1.1, 1],
                opacity: hoveredNode === i ? 0.5 : 0.25
              } : {}}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: node.delay + 0.5
              }}
            />
            
            {/* Main node circle */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.radius}
              fill={hoveredNode === i ? node.color : "#0B0F14"}
              stroke={node.color}
              strokeWidth="2.5"
              filter={hoveredNode === i ? `url(#glow-${i})` : undefined}
              initial={{ scale: 0, opacity: 0 }}
              animate={visibleNodes.includes(node.id) ? { 
                scale: hoveredNode === i ? 1.1 : 1,
                opacity: 1,
                cx: [node.cx, node.cx + (i % 2 === 0 ? 1.5 : -1.5), node.cx],
                cy: [node.cy, node.cy + (i % 2 === 0 ? -1 : 1), node.cy]
              } : {}}
              transition={{ 
                scale: { duration: 0.4 },
                opacity: { duration: 0.8, delay: node.delay },
                cx: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                cy: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }
              }}
            />
            
            {/* Node label - positioned absolutely to follow the animated circle */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={visibleNodes.includes(node.id) ? { 
                opacity: 1,
                x: [0, (i % 2 === 0 ? 1.5 : -1.5), 0],
                y: [0, (i % 2 === 0 ? -1 : 1), 0]
              } : {}}
              transition={{ 
                opacity: { duration: 0.5, delay: node.delay + 0.3 },
                x: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }
              }}
            >
              <text
                x={node.cx}
                y={node.cy}
                dy="0.35em"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={hoveredNode === i ? "#ffffff" : node.color}
                fontSize={i === 0 ? "10" : i === 1 ? "8" : "7"}
                fontWeight={i === 0 ? "700" : "600"}
                fontFamily="Space Grotesk, sans-serif"
                style={{ pointerEvents: 'none' }}
              >
                {node.label}
              </text>
            </motion.g>
          </g>
        ))}
        
        {/* Pulsing rings on Idea node */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={nodes[0].cx}
            cy={nodes[0].cy}
            r={nodes[0].radius}
            stroke={nodes[0].color}
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={isInView ? { 
              scale: [1, 2.5, 3],
              opacity: [0.5, 0.15, 0]
            } : {}}
            transition={{ 
              duration: 3, 
              delay: 0.5 + i * 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </svg>
      
      {hoveredNode !== null && visibleNodes.includes(nodes[hoveredNode].id) && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap z-20"
          style={{
            backgroundColor: `${nodes[hoveredNode].color}20`,
            border: `1px solid ${nodes[hoveredNode].color}40`,
            color: '#EAEFF5'
          }}
        >
          {nodes[hoveredNode].label}
        </motion.div>
      )}
    </div>
  );
}

// Weeks 2-5: Coding & Testing with binary and terminal
function CodingAnimation({ color, isInView }: { color: string; isInView: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [testStatus, setTestStatus] = useState<"running" | "passed" | "failed">("running");
  
  const codeSnippets = [
    "const app = createApp();",
    "app.use(router);",
    "app.mount('#root');",
    "// Testing...",
    "expect(result).toBe(true);",
    "// All tests passing ✓",
  ];
  
  const binaryChars = "01";
  // Pre-defined binary strings to avoid hydration mismatch
  const binaryStrings = [
    "10110100101101001011",
    "01001011010010110100",
    "11001100110011001100",
    "00110011001100110011",
    "11110000111100001111",
    "00001111000011110000",
    "10101010101010101010",
    "01010101010101010101"
  ];
  
  useEffect(() => {
    if (isInView) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < codeSnippets.length) {
          setLines(prev => [...prev, codeSnippets[currentLine]]);
          currentLine++;
        } else {
          setTestStatus("passed");
          clearInterval(interval);
        }
      }, 600);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Background binary rain */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[8px] font-mono"
            style={{ 
              color,
              left: `${10 + i * 12}%`,
              top: -20
            }}
            animate={isInView ? {
              y: [0, 150],
              opacity: [0, 1, 0]
            } : {}}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {binaryStrings[i]}
          </motion.div>
        ))}
      </div>
      
      {/* Terminal Window */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[200px] bg-[#0B0F14] rounded-lg border border-[#1F2937] overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="h-4 bg-[#1F2937] flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[7px] text-[#A9B4C2] font-mono">terminal — zsh</span>
        </div>
        
        {/* Terminal Content */}
        <div className="p-1.5 font-mono text-[8px] space-y-0.5 overflow-hidden">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-1 overflow-hidden"
            >
              <span className="text-[#46C2FF] flex-shrink-0">$</span>
              <span className="truncate" style={{ color: line?.includes('✓') ? '#4ade80' : '#EAEFF5' }}>{line}</span>
            </motion.div>
          ))}
          
          {/* Cursor */}
          <motion.span
            className="inline-block w-1.5 h-2.5 rounded-sm"
            style={{ backgroundColor: color }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
        
        {/* Test Status Bar */}
        <div className="h-3.5 bg-[#1F2937] flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            <Bug className="w-3 h-3" style={{ color }} />
            <span className="text-[8px] text-[#A9B4C2]">Tests</span>
          </div>
          
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {testStatus === "passed" ? (
              <>
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-[8px] text-green-400">Passed</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 animate-pulse" style={{ color }} />
                <span className="text-[8px]" style={{ color }}>Running...</span>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Week 6: Launch - Laptop with rocket launching
function LaunchAnimation({ color, isInView }: { color: string; isInView: boolean }) {
  const [launched, setLaunched] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setLaunched(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Laptop */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Laptop Screen */}
        <div className="relative w-36 h-24 bg-[#0B0F14] rounded-t-lg border-2 border-[#1F2937] border-b-0 overflow-hidden">
          {/* Website Content */}
          <div className="absolute inset-0">
            {/* Browser Header */}
            <div className="h-4 bg-[#1F2937] flex items-center px-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-2 h-2 bg-[#0B0F14] rounded text-[6px] flex items-center justify-center text-[#A9B4C2]">
                byte-rollers.com
              </div>
            </div>
            
            {/* Website Hero */}
            <div className="p-2 space-y-1.5">
              <motion.div
                className="h-5 rounded w-full flex items-center justify-center text-[8px] font-bold"
                style={{ backgroundColor: `${color}30`, color }}
                initial={{ scale: 0.8 }}
                animate={launched ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {launched ? "🚀 LIVE" : "Deploying..."}
              </motion.div>
              
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded bg-[#1F2937]" />
                <div className="flex-1 space-y-0.5">
                  <div className="h-1.5 rounded w-full bg-[#1F2937]" />
                  <div className="h-1.5 rounded w-2/3 bg-[#1F2937]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Rocket Animation */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ bottom: 20, opacity: 0 }}
            animate={launched ? { 
              bottom: 100, 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8]
            } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Rocket className="w-8 h-8" style={{ color }} />
            
            {/* Rocket trail */}
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 w-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ height: 0, opacity: 0 }}
              animate={launched ? { height: 40, opacity: [0, 1, 0] } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>
          
          {/* Live Analytics */}
          <motion.div
            className="absolute bottom-2 left-0 right-0 flex justify-center px-2"
            initial={{ opacity: 0 }}
            animate={launched ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <div className="bg-[#0B0F14]/90 backdrop-blur-sm rounded-lg border border-[#1F2937] p-2 w-full mx-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[6px] text-[#A9B4C2] font-mono">Live Analytics</span>
                <motion.span 
                  className="text-[5px] text-[#46C2FF] font-mono"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Refreshing in 5s
                </motion.span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[7px] text-[#EAEFF5] font-bold">Active Users</span>
                </div>
                <motion.span 
                  className="text-[8px] font-bold text-green-400 font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  animate={launched ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  10,284
                </motion.span>
              </div>
              
              {/* Mini chart */}
              <div className="flex items-end gap-0.5 mt-1.5 h-3">
                {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-green-400/60 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Laptop Base */}
        <div className="w-36 h-3 bg-[#1F2937] rounded-b-lg mx-auto -mt-0.5 border-x-2 border-b-2 border-[#1F2937]" />
        
        <div className="w-20 h-1 bg-[#1F2937] mx-auto rounded-b" />
      </motion.div>
      
      {/* Launch particles */}
      <div className="absolute inset-0 pointer-events-none">
        {launched && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              backgroundColor: color,
              left: '50%',
              bottom: '40%'
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: (i - 3) * 30,
              y: -((i * 7) % 50) - 20
            }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectedCard({ step, title, description, color, animation, delay }: ConnectedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const renderAnimation = () => {
    switch (animation) {
      case "graph":
        return <GraphAnimation color={color} isInView={isInView} />;
      case "coding":
        return <CodingAnimation color={color} isInView={isInView} />;
      case "launch":
        return <LaunchAnimation color={color} isInView={isInView} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <div className="bg-[#0F1621] rounded-2xl border border-[#1F2937] overflow-hidden h-full">
        <div className="relative h-40 bg-[#0B0F14] border-b border-[#1F2937]">
          <div className="absolute inset-0 p-4">
            {renderAnimation()}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              {step}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 text-[#EAEFF5]">{title}</h3>
          
          <p className="text-[#A9B4C2] text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const processSteps = [
    {
      step: "Week 1",
      title: "Strategy & Architecture",
      description: "Deep dive into your goals, user needs, and technical requirements. We define the scope and build the foundation for success.",
      color: "#46C2FF",
      animation: "graph" as const,
    },
    {
      step: "Weeks 2-5",
      title: "Ideate & Prototype",
      description: "Transform ideas into working prototypes. Continuous coding, testing, and iteration based on your feedback.",
      color: "#7B5CFF",
      animation: "coding" as const,
    },
    {
      step: "Week 6",
      title: "Build & Launch",
      description: "Final development sprint. Code optimization, testing, and production deployment. Your product goes live!",
      color: "#FFB454",
      animation: "launch" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 bg-[#0B0F14] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-[#46C2FF] mb-4">OUR PROCESS</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How We Work
          </h2>
          <p className="text-lg text-[#A9B4C2] max-w-2xl mx-auto">
            From strategy to launch in 6 weeks. Transparent, iterative, and designed for speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <ConnectedCard
              key={step.step}
              {...step}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
