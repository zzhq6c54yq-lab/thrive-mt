
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Reset onboarding if the URL has forceReset parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('forceReset') === 'true' || urlParams.get('resetOnboarding') === 'true') {
  console.log("[main] Resetting onboarding state due to URL parameter");
  localStorage.removeItem('hasCompletedOnboarding');
}

// For investment demo purposes, ensure onboarding shows on fresh visits
// Only skip onboarding if explicitly completed
const hasExplicitOnboarding = localStorage.getItem('hasCompletedOnboarding');
if (!hasExplicitOnboarding) {
  console.log("[main] Fresh visit detected - onboarding will be shown");
}

// Ensure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
