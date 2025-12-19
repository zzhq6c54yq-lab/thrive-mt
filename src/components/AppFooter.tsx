import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] border-t border-[#c9a86c]/20">
      {/* Bronze accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a86c]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#c9a86c]" />
              <span className="text-white/90 font-medium text-sm">Thrive MT</span>
            </div>
            <p className="text-white/40 text-xs italic">
              A sanctuary to heal, grow, and be yourself
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-6 text-xs">
            <Link 
              to="/app/contact" 
              className="text-white/50 hover:text-[#c9a86c] transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              to="/app/privacy-policy" 
              className="text-white/50 hover:text-[#c9a86c] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/app/terms" 
              className="text-white/50 hover:text-[#c9a86c] transition-colors"
            >
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © {currentYear} Thrive MT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
