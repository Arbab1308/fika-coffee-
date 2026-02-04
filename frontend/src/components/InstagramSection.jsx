import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Authentic Fika Coffee Instagram-style feed
const instagramPosts = [
  {
    id: 1,
    image: "/images/cafe/latte-art.png",
    likes: 234,
    comments: 18,
    alt: "FIKA latte art with croissant"
  },
  {
    id: 2,
    image: "/images/cafe/coffee-croissant.png",
    likes: 456,
    comments: 32,
    alt: "FIKA branded coffee cup"
  },
  {
    id: 3,
    image: "/images/cafe/pasta-dish.png",
    likes: 189,
    comments: 14,
    alt: "Delicious pasta at Fika"
  },
  {
    id: 4,
    image: "/images/cafe/interior-tables.png",
    likes: 567,
    comments: 45,
    alt: "Fika cafe interior"
  },
  {
    id: 5,
    image: "/images/cafe/espresso-pour.png",
    likes: 321,
    comments: 27,
    alt: "Espresso pour shot"
  },
  {
    id: 6,
    image: "/images/cafe/cup-of-love.png",
    likes: 412,
    comments: 38,
    alt: "A cup made with love"
  }
];

const InstagramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="instagram"
      ref={ref}
      className="py-20 md:py-32 bg-fika-bone"
      data-testid="instagram-section"
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
            Follow Our Journey
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-fika-coffee mt-2">
            @fikacoffeeco_
          </h2>
          <p className="text-fika-coffee/60 mt-4 max-w-2xl mx-auto">
            Join our community for daily coffee inspiration, behind-the-scenes moments,
            and the latest from our kitchen.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          data-testid="instagram-grid"
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/fikacoffeeco_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 150 }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                zIndex: 10,
                boxShadow: "0 20px 40px rgba(44, 36, 32, 0.2)"
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden image-shine will-change-hover"
              data-testid={`instagram-post-${index}`}
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
              />

              {/* Hover Overlay with smooth animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-fika-coffee/80 via-fika-coffee/40 to-transparent flex items-end justify-center pb-6"
              >
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.comments}</span>
                  </div>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 text-white rounded-full px-8 py-6 btn-hover"
          >
            <a
              href="https://www.instagram.com/fikacoffeeco_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
              data-testid="follow-instagram-btn"
            >
              <Instagram className="w-5 h-5" />
              Follow @fikacoffeeco_
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
