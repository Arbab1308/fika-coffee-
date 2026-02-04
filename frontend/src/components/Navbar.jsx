import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Reserve", href: "#reserve" },
  { name: "Location", href: "#location" },
  { name: "Instagram", href: "#instagram" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "navbar-glass shadow-sm" : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              data-testid="navbar-logo"
            >
              <Coffee className="w-8 h-8 text-fika-terracotta" />
              <span className="font-fraunces text-2xl font-semibold text-fika-coffee">
                Fika Coffee
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="font-manrope text-fika-coffee/80 hover:text-fika-terracotta transition-colors link-underline"
                  whileHover={{ y: -2 }}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <Button
                onClick={() => scrollToSection("#reserve")}
                className="bg-fika-terracotta hover:bg-fika-terracotta/90 text-white rounded-full px-6 btn-hover"
                data-testid="nav-reserve-btn"
              >
                Book a Table
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-fika-coffee p-2"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-fika-bone pt-24 px-6 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-fraunces text-2xl text-fika-coffee text-left py-2 border-b border-fika-cream"
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <Button
                onClick={() => scrollToSection("#reserve")}
                className="bg-fika-terracotta hover:bg-fika-terracotta/90 text-white rounded-full py-6 text-lg mt-4"
                data-testid="mobile-reserve-btn"
              >
                Book a Table
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
