
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Index from "./pages/Index";
import MilitaryWorkshop from "./pages/MilitaryWorkshop";
import CorporateWellness from "./pages/CorporateWellness";
import WorkshopPage from "./pages/WorkshopPage";
import MindfulnessSleep from "./pages/MindfulnessSleep";
import MySponsor from "./pages/MySponsor";
import BinauralBeats from "./pages/BinauralBeats";
import CollegePortal from "./pages/CollegePortal";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/military-workshop/:workshopId" element={<MilitaryWorkshop />} />
          <Route path="/corporate-wellness" element={<CorporateWellness />} />
          <Route path="/workshop/:workshopId" element={<WorkshopPage />} />
          <Route path="/workshop/mindful-communication" element={<WorkshopPage />} />
          <Route path="/workshop/emotional-regulation" element={<WorkshopPage />} />
          <Route path="/workshop/stress-management" element={<WorkshopPage />} />
          <Route path="/mindfulness" element={<MindfulnessSleep />} />
          <Route path="/my-sponsor" element={<MySponsor />} />
          <Route path="/binaural-beats" element={<BinauralBeats />} />
          <Route path="/college-portal" element={<CollegePortal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
