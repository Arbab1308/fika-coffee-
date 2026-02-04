import { motion } from "framer-motion";
import { ChevronDown, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ backgroundY }) => {
  const scrollToReserve = () => {
    const element = document.querySelector("#reserve");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMenu = () => {
    const element = document.querySelector("#menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-20"
      data-testid="hero-section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0"
        >
          {/* Decorative shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-fika-terracotta/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-fika-sage/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-fika-cream/50 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 bg-fika-sage rounded-full animate-pulse" />
              <span className="text-sm font-manrope text-fika-coffee/70">
                Open Daily • 8AM - 10PM
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl font-semibold text-fika-coffee leading-tight">
                <span className="block">Where Coffee</span>
                <span className="block text-fika-terracotta">Meets Soul</span>
              </h1>
              <p className="font-manrope text-lg text-fika-coffee/70 max-w-md">
                A Swedish-inspired coffee ritual in the heart of Goa. 
                Take a break, enjoy the moment, and savor every sip.
              </p>
            </div>

            {/* Handwritten Note */}
            <motion.p
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ delay: 0.6 }}
              className="font-caveat text-2xl text-fika-sage italic"
            >
              "Fika - the art of taking a coffee break"
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToReserve}
                size="lg"
                className="bg-fika-terracotta hover:bg-fika-terracotta/90 text-white rounded-full px-8 py-6 text-lg btn-hover"
                data-testid="hero-reserve-btn"
              >
                Reserve a Table
              </Button>
              <Button
                onClick={scrollToMenu}
                variant="outline"
                size="lg"
                className="border-2 border-fika-coffee/20 text-fika-coffee rounded-full px-8 py-6 text-lg hover:bg-fika-cream/50 btn-hover"
                data-testid="hero-menu-btn"
              >
                Explore Menu
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-fika-coffee/60">
                <MapPin size={18} className="text-fika-terracotta" />
                <span className="text-sm">Miramar, Panaji</span>
              </div>
              <div className="flex items-center gap-2 text-fika-coffee/60">
                <Phone size={18} className="text-fika-terracotta" />
                <span className="text-sm">092898 54326</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Grid - Bento Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <motion.div 
                className="col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden image-shine"
                whileHover={{ scale: 1.03, rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/images/cafe/interior-main.png"
                  alt="Fika Coffee Interior - Cozy seating area with orange lanterns"
                  className="w-full h-full object-cover"
                  data-testid="hero-image-main"
                />
              </motion.div>
              
              {/* Smaller Images */}
              <motion.div 
                className="h-40 md:h-48 rounded-2xl overflow-hidden image-shine"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <img
                  src="/images/cafe/latte-art.png"
                  alt="FIKA branded latte art with croissant"
                  className="w-full h-full object-cover"
                  data-testid="hero-image-coffee"
                />
              </motion.div>
              
              <motion.div 
                className="h-40 md:h-48 rounded-2xl overflow-hidden image-shine"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <img
                  src="/images/cafe/ramen-bowl.png"
                  alt="Delicious ramen bowl at Fika Coffee"
                  className="w-full h-full object-cover"
                  data-testid="hero-image-food"
                />
              </motion.div>
            </div>

            {/* Floating Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-fika-cream animate-float animate-glow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-fika-terracotta/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-fika-terracotta" />
                </div>
                <div>
                  <p className="font-fraunces text-lg font-semibold text-fika-coffee">Open Now</p>
                  <p className="text-sm text-fika-coffee/60">8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-sm text-fika-coffee/50">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6 text-fika-terracotta" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
