
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Reset onboarding if the URL has forceReset parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('forceReset') === 'true' || urlParams.get('resetOnboarding') === 'true') {
  localStorage.removeItem('hasCompletedOnboarding');
}

// For investment demo purposes, ensure onboarding shows on fresh visits
// Only skip onboarding if explicitly completed
const hasExplicitOnboarding = localStorage.getItem('hasCompletedOnboarding');

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
