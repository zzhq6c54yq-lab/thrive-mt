import { Link } from "react-router-dom";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

const SiteFooter = () => {
  return (
    <footer className="bg-black border-t border-[#D4A574]/30 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={thriveOutlineLogoImage} 
                alt="ThriveMT" 
                className="w-10 h-10"
                style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
              />
              <h3 
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ThriveMT
              </h3>
            </div>
            <p className="text-white/60 text-sm">
              Modern Mental Health & Wellness
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/site/therapy" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Therapy
                </Link>
              </li>
              <li>
                <Link to="/site/coaching" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/site/pricing" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/site/demo" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Try Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/site/about" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/site/careers" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/site/investors" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/site/contact" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#D4A574] transition-colors">
                  HIPAA Notice
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#D4A574]/30 text-center text-sm text-white/60">
          © 2025 ThriveMT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
