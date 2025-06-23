
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CancerSupportPortal from "./pages/CancerSupportPortal";
import CareerCoaching from "./pages/CareerCoaching";
import MeditationStudio from "./pages/MeditationStudio";
import AASponsor from "./pages/AASponsor";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cancer-support" element={<CancerSupportPortal />} />
        <Route path="/career-coaching" element={<CareerCoaching />} />
        <Route path="/meditation-studio" element={<MeditationStudio />} />
        <Route path="/aa-sponsor" element={<AASponsor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
