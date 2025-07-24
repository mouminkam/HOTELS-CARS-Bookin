import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-all group-hover:bg-blue-500">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                ExpatHome
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for comfortable stays around the world. We provide the best accommodations for expats and travelers.
            </p>
            <div className="flex space-x-5">
              <Facebook className="text-gray-400 hover:text-blue-400 cursor-pointer w-5 h-5 transition-colors" />
              <Twitter className="text-gray-400 hover:text-sky-400 cursor-pointer w-5 h-5 transition-colors" />
              <Instagram className="text-gray-400 hover:text-pink-500 cursor-pointer w-5 h-5 transition-colors" />
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/governorates" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/user-orders" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-all"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="text-gray-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  support@expathome.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-gray-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-gray-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  123 Main St, Anytown, USA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        {/* <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ExpatHome. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  )
}