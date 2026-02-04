import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Heart, Coffee } from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Artisan Brews",
    description: "Specialty coffee sourced from the finest estates, roasted to perfection"
  },
  {
    icon: Leaf,
    title: "Fresh & Local",
    description: "Farm-to-table ingredients supporting local Goan farmers and producers"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish crafted with passion, every cup poured with care"
  }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 bg-fika-bone"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden image-shine"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img
                src="/images/cafe/staff-serving.png"
                alt="Fika Coffee staff serving customers - showing FIKA wall branding"
                className="w-full h-[400px] md:h-[500px] object-cover object-top"
                data-testid="about-image"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-fika-coffee/20 to-transparent" />
            </motion.div>

            {/* Floating Stats Card with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="absolute -bottom-8 -right-4 md:right-8 bg-white rounded-2xl p-6 shadow-lg border border-fika-cream animate-float-slow"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(44, 36, 32, 0.15)" }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-fraunces text-3xl font-bold text-fika-terracotta">100+</p>
                  <p className="text-sm text-fika-coffee/60">Menu Items</p>
                </div>
                <div className="text-center">
                  <p className="font-fraunces text-3xl font-bold text-fika-sage">5★</p>
                  <p className="text-sm text-fika-coffee/60">Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-block font-caveat text-xl text-fika-terracotta"
            >
              Our Story
            </motion.span>

            {/* Heading */}
            <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-fika-coffee leading-tight">
              A Swedish Tradition,
              <br />
              <span className="text-fika-terracotta">A Goan Soul</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-fika-coffee/70 leading-relaxed">
              <span className="font-semibold text-fika-coffee">Fika</span> is more than just a coffee break —
              it's a Swedish tradition of slowing down, connecting with others, and savoring the moment.
              Nestled in the vibrant heart of Panaji, we bring this beautiful ritual to Goa's sun-kissed shores.
            </p>

            <p className="text-fika-coffee/70 leading-relaxed">
              Our café blends Scandinavian minimalism with tropical warmth,
              offering specialty coffees alongside a menu that celebrates both
              international flavors and local Goan ingredients.
            </p>

            {/* Features */}
            <div className="grid gap-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                  data-testid={`about-feature-${index}`}
                >
                  <div className="w-12 h-12 bg-fika-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-fika-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg font-semibold text-fika-coffee">
                      {feature.title}
                    </h3>
                    <p className="text-fika-coffee/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
