import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Leaf, ChefHat, PawPrint } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categoryIcons = {
  "Fresh Squeeze": "🍊",
  "Cold": "🧊",
  "Hot": "☕",
  "Specials": "✨",
  "Manual Brew": "🫖",
  "Affogato": "🍨",
  "Spill The Tea": "🍵",
  "All Day Breakfast": "🍳",
  "Wafflin Around": "🧇",
  "Ssup Hot Cakes": "🥞",
  "Burgers": "🍔",
  "House Classics": "🥪",
  "Toasties": "🍞",
  "Sourdough Sammy": "🥖",
  "Smoothie Bowl": "🥣",
  "Pizza Palooza": "🍕",
  "Bowls": "🥗",
  "Pasta": "🍝",
  "Tapas": "🍢",
  "Mighty Munchies": "🍟",
  "Salad Bar": "🥬",
  "Indian Affair": "🍛",
  "Sides and Staples": "🍚",
  "Desserts": "🧁",
  "Pawsome": "🐾"
};

const MenuSection = () => {
  const [menuData, setMenuData] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      const data = response.data.categories;
      setMenuData(data);
      const cats = Object.keys(data);
      setCategories(cats);
      if (cats.length > 0) {
        setActiveCategory(cats[0]);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = searchQuery
    ? Object.entries(menuData).flatMap(([category, items]) =>
      items
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item) => ({ ...item, category }))
    )
    : menuData[activeCategory] || [];

  return (
    <section
      id="menu"
      ref={ref}
      className="py-20 md:py-32 bg-fika-latte/30"
      data-testid="menu-section"
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
            Taste the Difference
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-fika-coffee mt-2">
            Our Menu
          </h2>
          <p className="text-fika-coffee/60 mt-4 max-w-2xl mx-auto">
            From specialty coffees to hearty breakfasts, discover dishes crafted
            with love and the finest ingredients.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fika-coffee/40" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full bg-white border-fika-cream focus:border-fika-terracotta focus:ring-fika-terracotta/20"
              data-testid="menu-search-input"
            />
          </div>
        </motion.div>

        {/* Category Pills */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-3 pb-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap spring-hover ${activeCategory === category
                        ? "bg-fika-terracotta text-white shadow-lg animate-glow"
                        : "bg-white text-fika-coffee/70 hover:bg-fika-cream border border-fika-cream"
                      }`}
                    data-testid={`category-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span>{categoryIcons[category] || "🍽️"}</span>
                    {category}
                  </motion.button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
        )}

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-fika-cream rounded w-3/4 mb-3" />
                  <div className="h-3 bg-fika-cream rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              key={searchQuery || activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-testid="menu-items-grid"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 150, damping: 20 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 35px rgba(44, 36, 32, 0.12)",
                    borderColor: "rgba(217, 119, 87, 0.4)"
                  }}
                  className="menu-card bg-white rounded-2xl p-6 border border-fika-cream will-change-hover"
                  data-testid={`menu-item-${index}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-fraunces text-lg font-medium text-fika-coffee">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-fika-coffee/50 mt-1">
                          {item.description}
                        </p>
                      )}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {item.dietary.includes("veg") && (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <Leaf className="w-3 h-3" /> Veg
                            </span>
                          )}
                          {item.dietary.includes("non-veg") && (
                            <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              <ChefHat className="w-3 h-3" /> Non-Veg
                            </span>
                          )}
                        </div>
                      )}
                      {searchQuery && item.category && (
                        <span className="inline-block mt-2 text-xs bg-fika-cream text-fika-coffee/60 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {item.price ? (
                        <span className="font-fraunces text-xl font-semibold text-fika-terracotta">
                          ₹{item.price}
                        </span>
                      ) : (
                        <span className="text-sm text-fika-coffee/50 italic">
                          Ask
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet Friendly Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-fika-sage/10 rounded-full px-6 py-3">
            <PawPrint className="w-5 h-5 text-fika-sage" />
            <span className="text-fika-coffee/70">
              We're pet-friendly! Check our <span className="font-medium text-fika-sage">Pawsome</span> menu
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
