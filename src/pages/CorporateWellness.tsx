
import React from "react";
import { Link } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";

const CorporateWellness = () => {
  return (
    <Page title="Corporate Wellness Programs">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Corporate Wellness Programs</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg mb-4">
            Our corporate wellness programs are designed to support the mental health and wellbeing of employees in organizations of all sizes.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-xl mb-2">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduce workplace stress and burnout</li>
                <li>Improve team morale and productivity</li>
                <li>Provide mental health resources and support</li>
                <li>Enhance employee retention and satisfaction</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CorporateWellness;
