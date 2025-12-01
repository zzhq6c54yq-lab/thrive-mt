import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import thriveLogoImage from "@/assets/thrivemt-logo.png";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#B87333]/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/site/home" className="flex items-center gap-3">
            <img 
              src={thriveLogoImage} 
              alt="ThriveMT" 
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#B87333] to-[#8B5A2B] bg-clip-text text-transparent">
              ThriveMT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/site/therapy" className="text-white/70 hover:text-[#B87333] transition-colors font-medium">
              Therapy
            </Link>
            <Link to="/site/coaching" className="text-white/70 hover:text-[#B87333] transition-colors font-medium">
              Coaching
            </Link>
            <Link to="/site/pricing" className="text-white/70 hover:text-[#B87333] transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/site/about" className="text-white/70 hover:text-[#B87333] transition-colors font-medium">
              About
            </Link>
            <Link to="/site/contact" className="text-white/70 hover:text-[#B87333] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10">
                Sign In
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#B87333] to-[#8B5A2B] hover:from-[#CD8B4E] hover:to-[#A06628] text-black font-semibold">
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
