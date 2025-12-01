import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SiteSidebar from "./SiteSidebar";

const SiteLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/site" && location.pathname.startsWith("/site");

  return (
    <div className="min-h-screen bg-black flex">
      {showSidebar && <SiteSidebar />}
      <div className={`flex-1 flex flex-col ${showSidebar ? "md:ml-64" : ""}`}>
        <main className="flex-1">
          <Outlet />
        </main>
        {showSidebar && <SiteFooter />}
      </div>
    </div>
  );
};

export default SiteLayout;
