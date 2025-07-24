import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Hotel,
  Star,
  Shield,
  Car,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGov, setSelectedGov] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      id: 1,
      title: "Local Expertise",
      description: "Curated accommodations in prime locations",
      icon: <MapPin size={32} />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Integrated Transport",
      description: "Book accommodation and transport seamlessly",
      icon: <Car size={32} />,
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    },
    {
      id: 3,
      title: "Trusted & Secure",
      description: "Verified properties and secure booking process",
      icon: <Shield size={32} />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Choose Location",
      description: "Select your destination governorate",
      icon: <MapPin size={24} />,
      href: "/governorates",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Browse Hotels",
      description: "Explore available accommodations",
      icon: <Hotel size={24} />,
      href: "/hotels",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 3,
      title: "My Account",
      description: "Manage your bookings and preferences",
      icon: <Star size={24} />,
      href: "/user-orders",
      image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
    },
    {
      id: 4,
      title: "Cars",
      description: "Explore available Cars",
      icon: <Car size={24} />,
      href: "/cars",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2083&q=80",
    },
  ];

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const allImages = [...features, ...quickActions].map(item => item.image);
      const imagePromises = allImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // Continue even if some images fail to load
      }
    };

    loadImages();
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                opacity: 0.1,
              }}
              animate={{
                x: [null, Math.random() * 100 - 50],
                y: [null, Math.random() * 100 - 50],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome Home, <span className="text-blue-200">Expat</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Your seamless gateway to comfortable stays and effortless travel
              arrangements.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-2xl max-w-3xl mx-auto border border-white/20"
            >
              <div className="flex flex-col md:flex-row gap-2 bg-white rounded-lg p-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search hotels, apartments..."
                    className="w-full p-4 pr-12 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Select Governorate"
                    className="w-full p-4 pr-12 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedGov}
                    onChange={(e) => setSelectedGov(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                </div>
                <button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg flex items-center justify-center font-medium transition-all duration-300 hover:shadow-lg"
                  onClick={() => navigate("/hotels")}
                >
                  <Search className="mr-2" size={20} />
                  Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose <span className="text-blue-600">ExpatHome</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We understand the unique needs of expatriates returning home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg h-96 cursor-pointer"
                onHoverStart={() => setHoveredCard(`feature-${feature.id}`)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-600/90 rounded-lg backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>

                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <AnimatePresence>
                    {hoveredCard === `feature-${feature.id}` && (
                      <motion.div
                        className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Start Your <span className="text-blue-600">Journey</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {quickActions.map((action) => (
              <motion.div
                key={action.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg h-80 cursor-pointer"
                onHoverStart={() => setHoveredCard(`action-${action.id}`)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(action.href)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={action.image}
                    alt={action.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-600/90 rounded-lg backdrop-blur-sm">
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold">{action.title}</h3>
                  </div>

                  <p className="text-gray-200 text-sm line-clamp-2">
                    {action.description}
                  </p>

                  {/* Hover Indicator */}
                  <AnimatePresence>
                    {hoveredCard === `action-${action.id}` && (
                      <motion.div
                        className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users size={28} />
            </div>
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              "ExpatHome made my relocation effortless. From finding the perfect
              apartment to arranging transport, everything was seamless."
            </blockquote>
            <div className="text-blue-100 mb-10">— Sarah K., Returning Expat</div>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg shadow-blue-200/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/governorates")}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}