import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="bg-[#141921] border-t border-bronze-500/20 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent mb-4">
              ThriveMT
            </h3>
            <p className="text-foreground/60 text-sm">
              Modern Mental Health & Wellness
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/site/therapy" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Therapy
                </Link>
              </li>
              <li>
                <Link to="/site/coaching" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/site/pricing" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/site/demo" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Try Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/site/about" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/site/careers" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/site/investors" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/site/contact" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-bronze-400 transition-colors">
                  HIPAA Notice
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-bronze-500/20 text-center text-sm text-foreground/60">
          © 2025 ThriveMT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
