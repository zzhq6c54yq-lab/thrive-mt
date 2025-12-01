import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1319]/95 backdrop-blur-lg border-b border-bronze-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/site" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bronze-400 to-bronze-600 flex items-center justify-center">
              <span className="text-xl font-bold text-black">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
              ThriveMT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/site/therapy" className="text-foreground/80 hover:text-bronze-400 transition-colors">
              Therapy
            </Link>
            <Link to="/site/coaching" className="text-foreground/80 hover:text-bronze-400 transition-colors">
              Coaching
            </Link>
            <Link to="/site/pricing" className="text-foreground/80 hover:text-bronze-400 transition-colors">
              Pricing
            </Link>
            <Link to="/site/about" className="text-foreground/80 hover:text-bronze-400 transition-colors">
              About
            </Link>
            <Link to="/site/contact" className="text-foreground/80 hover:text-bronze-400 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
                Sign In
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
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
