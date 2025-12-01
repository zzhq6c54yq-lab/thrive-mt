import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  Heart, 
  DollarSign, 
  Play, 
  Info, 
  Briefcase, 
  TrendingUp, 
  Mail,
  Users,
  Smartphone,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

interface SiteSidebarProps {
  collapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const SiteSidebar = ({ collapsed = false, isOpen = false, onClose }: SiteSidebarProps) => {
  const location = useLocation();

  const navSections = [
    {
      title: "SERVICES",
      items: [
        { icon: Stethoscope, label: "Therapy", path: "/therapy" },
        { icon: Heart, label: "Coaching", path: "/coaching" },
        { icon: Play, label: "Meet Henry", path: "/henry" },
      ]
    },
    {
      title: "PRICING",
      items: [
        { icon: DollarSign, label: "Plans", path: "/pricing" },
      ]
    },
    {
      title: "EXPLORE",
      items: [
        { icon: Smartphone, label: "The App", path: "/the-app" },
        { icon: Play, label: "Live Demo", path: "/demo" },
      ]
    },
    {
      title: "COMPANY",
      items: [
        { icon: Info, label: "About Us", path: "/about" },
        { icon: Briefcase, label: "Careers", path: "/careers" },
        { icon: TrendingUp, label: "Investors", path: "/investors" },
      ]
    },
    {
      title: "CONNECT",
      items: [
        { icon: Mail, label: "Contact", path: "/contact" },
      ]
    }
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-black border-r border-[#D4A574]/30 z-40 overflow-y-auto",
        // Mobile: slide off-screen unless open
        "-translate-x-full transition-transform duration-300 ease-out",
        // Mobile: when open, slide in
        isOpen && "translate-x-0",
        // Tablet/Desktop: always visible
        "md:translate-x-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden p-2 rounded-lg hover:bg-[#D4A574]/10 transition-colors"
        aria-label="Close menu"
      >
        <X className="w-5 h-5 text-[#D4A574]" />
      </button>

      <div className="p-6 pt-16 md:pt-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 mb-8">
          <img 
            src={thriveOutlineLogoImage} 
            alt="ThriveMT" 
            className="w-10 h-10"
            style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
          />
          {!collapsed && (
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
          )}
        </Link>

        {/* Home Link */}
        <Link to="/home">
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-6 transition-colors",
              location.pathname === "/home"
                ? "bg-[#D4A574]/10 text-[#D4A574]" 
                : "text-white/70 hover:text-[#D4A574] hover:bg-[#D4A574]/5"
            )}
          >
            <Home className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Home</span>}
          </div>
        </Link>

        {/* Navigation Sections */}
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <div className="text-xs font-bold text-white/40 mb-3 px-4">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      location.pathname === item.path 
                        ? "bg-[#D4A574]/10 text-[#D4A574]" 
                        : "text-white/70 hover:text-[#D4A574] hover:bg-[#D4A574]/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SiteSidebar;
