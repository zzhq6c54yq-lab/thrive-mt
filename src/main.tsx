
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Reset onboarding if the URL has forceReset parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('forceReset') === 'true' || urlParams.get('resetOnboarding') === 'true') {
  console.log("[main] Resetting onboarding state due to URL parameter");
  localStorage.removeItem('hasCompletedOnboarding');
  localStorage.removeItem('prevScreenState');
  localStorage.removeItem('introLoaded');
  localStorage.removeItem('stuckDetected');
}

// Clear any potentially problematic localStorage items on fresh load
if (!localStorage.getItem('appInitialized') || window.location.pathname === '/' && urlParams.has('fresh')) {
  console.log("[main] Fresh initialization, clearing potential state conflicts");
  localStorage.setItem('appInitialized', 'true');
  // Only clear these if we're not in the middle of onboarding
  if (!localStorage.getItem('prevScreenState') || localStorage.getItem('prevScreenState') === 'intro') {
    localStorage.removeItem('prevScreenState');
    localStorage.removeItem('introLoaded');
    localStorage.removeItem('stuckDetected');
  }
}

// Debug any URL parameters that might be affecting onboarding
if (urlParams.has('forceHideBadge')) {
  console.log("[main] Note: forceHideBadge parameter detected. This does not affect onboarding flow.");
}

// Add a force reset mechanism for when the app gets stuck
if (localStorage.getItem('stuckDetected') === 'true') {
  console.log("[main] Detected previous stuck state, forcing reset");
  localStorage.removeItem('hasCompletedOnboarding');
  localStorage.removeItem('prevScreenState');
  localStorage.removeItem('stuckDetected');
  localStorage.removeItem('introLoaded');
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
