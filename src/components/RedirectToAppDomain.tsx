import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_DOMAIN, isDevelopment } from '@/lib/domainConfig';
import { Loader2 } from 'lucide-react';

/**
 * Redirects users from the marketing domain (.com) to the app domain (.app)
 * when they try to access /app/* routes on .com
 */
const RedirectToAppDomain = () => {
  const location = useLocation();

  useEffect(() => {
    // In development, just redirect to the path (same domain)
    if (isDevelopment()) {
      // Don't redirect in dev - let the routes handle it normally
      return;
    }

    // In production, redirect to the .app domain with the same path
    const targetUrl = `https://${APP_DOMAIN}${location.pathname}${location.search}${location.hash}`;
    window.location.href = targetUrl;
  }, [location]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-bronze-400 animate-spin mx-auto mb-4" />
        <p className="text-foreground/80 text-lg">Redirecting to the app...</p>
        <p className="text-foreground/60 text-sm mt-2">
          Taking you to thrive-mental.app
        </p>
      </div>
    </div>
  );
};

export default RedirectToAppDomain;
