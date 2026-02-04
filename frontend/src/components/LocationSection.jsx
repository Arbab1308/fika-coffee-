import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="location"
      ref={ref}
      className="py-20 md:py-32 bg-fika-latte/30"
      data-testid="location-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-caveat text-xl text-fika-terracotta">
            Find Us
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-fika-coffee mt-2">
            Visit Our Café
          </h2>
          <p className="text-fika-coffee/60 mt-4 max-w-2xl mx-auto">
            Located in the heart of Panaji, just a stone's throw from Miramar Beach.
            Come find your perfect corner.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="map-container aspect-video lg:aspect-[4/3] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.123456789!2d73.8!3d15.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc0686d3e2e7d%3A0xf9d3e7b8c9a1b2c3!2sFika%20Coffee!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fika Coffee Location"
                data-testid="google-map-iframe"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/WTeEUTjxHCeeEYst7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-fika-terracotta hover:text-fika-terracotta/80 transition-colors"
              data-testid="google-maps-link"
            >
              <Navigation className="w-4 h-4" />
              Open in Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Contact Info - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-fika-cream">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-fika-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-fika-terracotta" />
                </div>
                <div>
                  <h3 className="font-fraunces text-lg font-semibold text-fika-coffee">
                    Address
                  </h3>
                  <p className="text-fika-coffee/70 mt-1 text-sm leading-relaxed">
                    Ground Floor, B1, next to BR Commercial Complex,
                    <br />
                    Campal, Miramar, Panaji,
                    <br />
                    Goa 403001
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 border border-fika-cream">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-fika-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-fika-sage" />
                </div>
                <div>
                  <h3 className="font-fraunces text-lg font-semibold text-fika-coffee">
                    Phone
                  </h3>
                  <a
                    href="tel:+919289854326"
                    className="text-fika-terracotta hover:text-fika-terracotta/80 mt-1 block text-lg font-medium"
                    data-testid="phone-link"
                  >
                    092898 54326
                  </a>
                  <p className="text-fika-coffee/50 text-sm mt-1">
                    Call for reservations & inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-fika-cream">
              <h3 className="font-fraunces text-lg font-semibold text-fika-coffee mb-4">
                Opening Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-fika-coffee/70">Monday - Friday</span>
                  <span className="font-medium text-fika-coffee">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-fika-coffee/70">Saturday - Sunday</span>
                  <span className="font-medium text-fika-coffee">8:00 AM - 10:00 PM</span>
                </div>
                <div className="pt-3 border-t border-fika-cream">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-fika-sage rounded-full animate-pulse" />
                    <span className="text-sm text-fika-sage font-medium">Open Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full bg-fika-terracotta hover:bg-fika-terracotta/90 text-white rounded-full py-6 btn-hover"
            >
              <a href="#reserve" data-testid="location-reserve-btn">
                Reserve a Table
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
