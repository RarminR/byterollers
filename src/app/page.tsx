import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Founders from "@/components/Founders";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F14]">
      <Navigation />
      <Hero />
      <Problem />
      <Services />
      <CaseStudies />
      <Founders />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
