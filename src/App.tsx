
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Index from "./pages/Index";
import MilitaryWorkshops from "./pages/MilitaryWorkshops";
import CorporateWellness from "./pages/CorporateWellness";
import Workshops from "./pages/Workshops";
import MindfulnessSleep from "./pages/MindfulnessSleep";
import MySponsor from "./pages/MySponsor";
import BinauralBeats from "./pages/BinauralBeats";
import CrisisSupport from "./pages/CrisisSupport";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/military-workshop/:workshopId" element={<MilitaryWorkshops />} />
          <Route path="/corporate-wellness" element={<CorporateWellness />} />
          <Route path="/workshop/:workshopId" element={<Workshops />} />
          <Route path="/workshop/mindful-communication" element={<Workshops />} />
          <Route path="/workshop/emotional-regulation" element={<Workshops />} />
          <Route path="/workshop/stress-management" element={<Workshops />} />
          <Route path="/mindfulness" element={<MindfulnessSleep />} />
          <Route path="/my-sponsor" element={<MySponsor />} />
          <Route path="/binaural-beats" element={<BinauralBeats />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
