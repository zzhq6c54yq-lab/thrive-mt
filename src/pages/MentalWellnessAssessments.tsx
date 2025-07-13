import React from 'react';
import Page from '@/components/Page';
import ComprehensiveAssessmentsGrid from '@/components/mental-wellness/ComprehensiveAssessmentsGrid';

const MentalWellnessAssessments: React.FC = () => {
  return (
    <Page title="Mental Health Quiz and Assessments" showBackButton={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <ComprehensiveAssessmentsGrid />
      </div>
    </Page>
  );
};

export default MentalWellnessAssessments;