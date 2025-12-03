
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { initSentry } from './lib/sentry';

// Initialize Sentry error tracking
initSentry();

const queryClient = new QueryClient();

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
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
