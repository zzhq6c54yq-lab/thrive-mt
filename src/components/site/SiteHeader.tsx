import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#D4A574]/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/site/home" className="flex items-center gap-3">
            <img 
              src={thriveOutlineLogoImage} 
              alt="ThriveMT" 
              className="w-10 h-10"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
            />
            <span 
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ThriveMT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/site/therapy" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium">
              Therapy
            </Link>
            <Link to="/site/coaching" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium">
              Coaching
            </Link>
            <Link to="/site/pricing" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/site/about" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium">
              About
            </Link>
            <Link to="/site/contact" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574]/10">
                Sign In
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#D4A574] to-[#B87333] hover:from-[#E8D4C0] hover:to-[#D4A574] text-black font-semibold shadow-[0_0_20px_rgba(212,165,116,0.3)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
