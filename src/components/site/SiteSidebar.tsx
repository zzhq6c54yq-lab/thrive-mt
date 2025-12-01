import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

interface SiteSidebarProps {
  collapsed?: boolean;
}

const SiteSidebar = ({ collapsed = false }: SiteSidebarProps) => {
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
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-black border-r border-[#D4A574]/30 z-40 overflow-y-auto",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6">
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
          <motion.div
            whileHover={{ x: 5 }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-6 transition-colors",
              location.pathname === "/home"
                ? "bg-[#D4A574]/10 text-[#D4A574]" 
                : "text-white/70 hover:text-[#D4A574] hover:bg-[#D4A574]/5"
            )}
          >
            <Home className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Home</span>}
          </motion.div>
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
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      location.pathname === item.path 
                        ? "bg-[#D4A574]/10 text-[#D4A574]" 
                        : "text-white/70 hover:text-[#D4A574] hover:bg-[#D4A574]/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.aside>
  );
};

export default SiteSidebar;
