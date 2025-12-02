import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SiteFooter from "./SiteFooter";
import SiteSidebar from "./SiteSidebar";

const SiteLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showSidebar = location.pathname !== "/" && !location.pathname.startsWith("/app");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black flex overflow-x-hidden">
      {/* Mobile Hamburger Button */}
      {showSidebar && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-black/80 border border-[#D4A574]/30 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-[#D4A574]" />
          ) : (
            <Menu className="w-6 h-6 text-[#D4A574]" />
          )}
        </button>
      )}

      {/* Backdrop for mobile */}
      {showSidebar && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless toggled open */}
      {showSidebar && (
        <SiteSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}

      {/* Main content - full width on mobile, offset on desktop */}
      <div className={`flex-1 flex flex-col overflow-x-hidden ${showSidebar ? "md:ml-64" : ""}`}>
        <main className="flex-1">
          <Outlet />
        </main>
        {showSidebar && <SiteFooter />}
      </div>
    </div>
  );
};

export default SiteLayout;
