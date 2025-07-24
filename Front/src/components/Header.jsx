import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Home, MapPin, Hotel, Car, CalendarCheck } from "lucide-react";
import { useAuth } from "../Auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { userdata, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/governorates", label: "Locations", icon: <MapPin size={18} /> },
    { to: "/hotels", label: "Hotels", icon: <Hotel size={18} /> },
    { to: "/cars", label: "Cars", icon: <Car size={18} /> },
    { to: "/user-orders", label: "My Bookings", icon: <CalendarCheck size={18} /> },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 border-b border-gray-100/50">
          {/* Logo - Left Side */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md"
              >
                <span className="text-white font-bold text-lg">E</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-100 shadow-sm">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-[15px] flex items-center space-x-1.5"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Right Side - Auth Controls */}
          <div className="flex items-center space-x-2">
            {!userdata ? (
              <>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-[15px] flex items-center space-x-1.5"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-[15px]"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                {userdata.role === "admin" && (
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/admin"
                      className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-[15px]"
                    >
                      Admin
                    </Link>
                  </motion.div>
                )}
                <div className="relative group">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-medium">
                      {userdata.fullname.charAt(0)}
                    </div>
                    <ChevronDown size={16} className="text-gray-500 transition-transform group-hover:rotate-180" />
                  </motion.button>
                  
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {userdata.fullname}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pb-4 space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium flex items-center space-x-3"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}

              <div className="pt-2 border-t border-gray-100">
                {!userdata ? (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium flex items-center space-x-3"
                      >
                        <User size={18} />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                    >
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block mt-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium text-center shadow-md"
                      >
                        Register
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {userdata.role === "admin" && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Link
                          to="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                        >
                          Admin Dashboard
                        </Link>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-medium">
                          {userdata.fullname.charAt(0)}
                        </div>
                        <span className="text-gray-800 font-medium">
                          {userdata.fullname}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <LogOut size={18} />
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}