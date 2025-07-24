import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GovernoratesPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const governorates = [
    {
      id: 1,
      name: "Damascus",
      description:
        "The vibrant capital city with a rich history and modern amenities.",
      cities: ["Cairo", "New Cairo", "6th of October"],
      hotelsCount: 120,
      image:
        "https://syriascopetravel.com/wp-content/uploads/2024/07/ummayed-mosque-in-Damascus.jpg",
    },
    {
      id: 2,
      name: "Hama",
      description:
        "The Pearl of the Mediterranean with stunning coastal views.",
      cities: ["Alexandria", "Borg El Arab"],
      hotelsCount: 80,
      image:
        "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 3,
      name: "Homs",
      description: "Home to the ancient pyramids and Sphinx.",
      cities: ["Giza", "Dokki", "Haram"],
      hotelsCount: 60,
      image: "http://images1.naharnet.com/images/265255/w460.jpg?1733609434",
    },
    {
      id: 4,
      name: "Daraa",
      description: "The world's greatest open-air museum of ancient monuments.",
      cities: ["Luxor"],
      hotelsCount: 45,
      image:
        "https://www.omandaily.om/uploads/imported_images/uploads/2018/11/1052688.gif",
    },
    {
      id: 5,
      name: "Aleppo",
      description: "Nubian culture and the beautiful Nile river landscape.",
      cities: ["Aswan"],
      hotelsCount: 35,
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/161213141219-pre-war-aleppo-1.jpg?q=w_2000,h_1335,x_0,y_0,c_fill",
    },
    {
      id: 6,
      name: "Latakia",
      description:
        "Red Sea resort town known for its sandy beaches and coral reefs.",
      cities: ["Sharm El Sheikh", "Naama Bay"],
      hotelsCount: 90,
      image:
        "https://static-cdn.toi-media.com/blogs/uploads/2024/12/latakia.jpg",
    },
  ];
  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = governorates.map((gov) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = gov.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // الاستمرار حتى لو فشل تحميل بعض الصور
      }
    };

    loadImages();
  }, []);

  const handleCardClick = (governorateId) => {
    navigate(`/hotels?governorate=${governorateId}`);
  };

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading destinations...</p>
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
              Explore <span className="text-blue-200">Syria</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Select your destination governorate to discover premium
              accommodations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Governorates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {governorates.map((governorate) => (
              <motion.div
                key={governorate.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg h-96 cursor-pointer"
                onHoverStart={() => setHoveredCard(governorate.id)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(governorate.id)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={governorate.image}
                    alt={governorate.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-600/90 rounded-lg backdrop-blur-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold">{governorate.name}</h3>
                  </div>

                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {governorate.description}
                  </p>

                  <div className="flex justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {governorate.cities.length}{" "}
                        {governorate.cities.length === 1 ? "city" : "cities"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Hotel className="w-4 h-4" />
                      <span>{governorate.hotelsCount} properties</span>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <AnimatePresence>
                    {hoveredCard === governorate.id && (
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
    </div>
  );
}
