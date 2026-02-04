import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import ReservationSection from "@/components/ReservationSection";
import LocationSection from "@/components/LocationSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-fika-bone overflow-x-hidden"
      data-testid="landing-page"
    >
      <AnimatePresence>
        {isLoaded && (
          <>
            <Navbar />
            <main>
              <HeroSection backgroundY={backgroundY} />
              <AboutSection />
              <MenuSection />
              <ReservationSection />
              <LocationSection />
              <InstagramSection />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
