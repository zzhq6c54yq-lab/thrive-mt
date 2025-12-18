/**
 * Domain Configuration for ThriveMT
 * 
 * thrive-mental.com - Marketing site + Demo only
 * thrive-mental.app - Full app with landing, onboarding, auth, dashboard
 */

export const MARKETING_DOMAIN = 'thrive-mental.com';
export const APP_DOMAIN = 'thrive-mental.app';

/**
 * Check if current hostname is the marketing domain (.com)
 * Also returns true for localhost and lovable.app domains (for development)
 */
export const isMarketingDomain = (): boolean => {
  const hostname = window.location.hostname;
  return (
    hostname === MARKETING_DOMAIN ||
    hostname === `www.${MARKETING_DOMAIN}` ||
    hostname === 'localhost' ||
    hostname.endsWith('.lovable.app') // Development/staging
  );
};

/**
 * Check if current hostname is the app domain (.app)
 */
export const isAppDomain = (): boolean => {
  const hostname = window.location.hostname;
  return (
    hostname === APP_DOMAIN ||
    hostname === `www.${APP_DOMAIN}`
  );
};

/**
 * Check if we're in development/staging environment
 */
export const isDevelopment = (): boolean => {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname.endsWith('.lovable.app');
};

/**
 * Get the full URL for the app domain
 */
export const getAppUrl = (path: string = '/app'): string => {
  // In development, use relative paths
  if (isDevelopment()) {
    return path;
  }
  return `https://${APP_DOMAIN}${path}`;
};

/**
 * Get the full URL for the marketing domain
 */
export const getMarketingUrl = (path: string = '/'): string => {
  // In development, use relative paths
  if (isDevelopment()) {
    return path;
  }
  return `https://${MARKETING_DOMAIN}${path}`;
};

/**
 * Get the sign-in URL (always points to .app domain in production)
 */
export const getSignInUrl = (): string => {
  return getAppUrl('/app/auth');
};

/**
 * Get the get-started URL (always points to .app domain in production)
 */
export const getGetStartedUrl = (): string => {
  return getAppUrl('/app');
};
