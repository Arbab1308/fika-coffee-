import { motion } from "framer-motion";
import { Coffee, MapPin, Phone, Mail, Instagram, Clock, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-fika-coffee text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <Coffee className="w-8 h-8 text-fika-terracotta" />
              <span className="font-fraunces text-2xl font-semibold">
                Fika Coffee
              </span>
            </motion.div>
            <p className="text-white/70 leading-relaxed">
              A Swedish-inspired coffee ritual in the heart of Goa. 
              Take a break, enjoy the moment, and savor every sip.
            </p>
            <p className="font-caveat text-xl text-fika-terracotta italic">
              "Fika - the art of taking a coffee break"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fraunces text-lg font-semibold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#about" },
                { name: "Our Menu", href: "#menu" },
                { name: "Reserve Table", href: "#reserve" },
                { name: "Find Us", href: "#location" },
                { name: "Instagram", href: "#instagram" }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-fika-terracotta transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-fraunces text-lg font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fika-terracotta flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Ground Floor, B1, next to BR Commercial Complex,
                  Campal, Miramar, Panaji, Goa 403001
                </span>
              </li>
              <li>
                <a
                  href="tel:+919289854326"
                  className="flex items-center gap-3 text-white/70 hover:text-fika-terracotta transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone className="w-5 h-5 text-fika-terracotta" />
                  092898 54326
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Clock className="w-5 h-5 text-fika-terracotta" />
                Daily: 8AM - 10PM
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 className="font-fraunces text-lg font-semibold mb-6">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-6">
              <motion.a
                href="https://www.instagram.com/fikacoffeeco_/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-fika-terracotta transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
            <a
              href="https://maps.app.goo.gl/WTeEUTjxHCeeEYst7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-fika-terracotta hover:bg-fika-terracotta/90 text-white px-6 py-3 rounded-full transition-all btn-hover"
              data-testid="footer-directions"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} Fika Coffee Co. All rights reserved.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-fika-terracotta fill-current" /> in Goa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
