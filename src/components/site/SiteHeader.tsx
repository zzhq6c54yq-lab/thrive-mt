import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";
import { getSignInUrl, getGetStartedUrl, isDevelopment } from "@/lib/domainConfig";

const SiteHeader = () => {
  const signInUrl = getSignInUrl();
  const getStartedUrl = getGetStartedUrl();

  // Use Link for development, anchor for production cross-domain
  const SignInButton = isDevelopment() ? (
    <Link to="/app/auth">
      <Button 
        variant="outline" 
        className="border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574]/10 text-sm md:text-base px-3 md:px-4"
        aria-label="Sign in to your account"
      >
        Sign In
      </Button>
    </Link>
  ) : (
    <a href={signInUrl}>
      <Button 
        variant="outline" 
        className="border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574]/10 text-sm md:text-base px-3 md:px-4"
        aria-label="Sign in to your account"
      >
        Sign In
      </Button>
    </a>
  );

  const GetStartedButton = isDevelopment() ? (
    <Link to="/app" className="hidden sm:block">
      <Button 
        className="bg-gradient-to-r from-[#D4A574] to-[#B87333] hover:from-[#E8D4C0] hover:to-[#D4A574] text-black font-semibold shadow-[0_0_20px_rgba(212,165,116,0.3)] text-sm md:text-base px-3 md:px-4"
        aria-label="Get started with ThriveMT"
      >
        Get Started
      </Button>
    </Link>
  ) : (
    <a href={getStartedUrl} className="hidden sm:block">
      <Button 
        className="bg-gradient-to-r from-[#D4A574] to-[#B87333] hover:from-[#E8D4C0] hover:to-[#D4A574] text-black font-semibold shadow-[0_0_20px_rgba(212,165,116,0.3)] text-sm md:text-base px-3 md:px-4"
        aria-label="Get started with ThriveMT"
      >
        Get Started
      </Button>
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#D4A574]/30" role="banner">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3" aria-label="ThriveMT Home">
            <img 
              src={thriveOutlineLogoImage} 
              alt="ThriveMT Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
              width={40}
              height={40}
              loading="eager"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
            />
            <span 
              className="text-xl md:text-2xl font-bold"
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

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" role="navigation" aria-label="Main navigation">
            <Link to="/therapy" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
              Therapy
            </Link>
            <Link to="/coaching" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
              Coaching
            </Link>
            <Link to="/pricing" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
              Pricing
            </Link>
            <Link to="/about" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
              About
            </Link>
            <Link to="/contact" className="text-white/70 hover:text-[#D4A574] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {SignInButton}
            {GetStartedButton}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
