"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 bg-[#0B0F14] border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#hero" className="text-2xl font-bold tracking-tight inline-block mb-4">
              Byte
              <span className="text-[#46C2FF]">Rollers</span>
            </a>
            <p className="text-[#A9B4C2] max-w-md mb-6">
              Premium websites, MVPs, and internal systems built with precision and product thinking.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#A9B4C2]">
              <span className="w-2 h-2 rounded-full bg-[#46C2FF] animate-pulse" />
              Available for projects
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#A9B4C2] hover:text-[#EAEFF5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@byterollers.com"
                  className="text-[#A9B4C2] hover:text-[#EAEFF5] transition-colors"
                >
                  hello@byterollers.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A9B4C2] hover:text-[#EAEFF5] transition-colors inline-flex items-center gap-1"
                >
                  WhatsApp
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li className="text-[#A9B4C2]">
                Australia + US
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A9B4C2]">
            © {currentYear} Byte Rollers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-[#A9B4C2] hover:text-[#EAEFF5] transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
