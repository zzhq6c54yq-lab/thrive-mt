
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Reset onboarding if the URL has forceReset parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('forceReset') === 'true') {
  console.log("Resetting onboarding state due to URL parameter");
  localStorage.removeItem('hasCompletedOnboarding');
  localStorage.removeItem('prevScreenState');
}

// Debug any URL parameters that might be affecting onboarding
if (urlParams.has('forceHideBadge')) {
  console.log("Note: forceHideBadge parameter detected. This does not affect onboarding flow.");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
