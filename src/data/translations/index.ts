
import commonTranslations from './common';
import introTranslations from './intro';
import mentalHealthTranslations from './mentalHealth';
import henryTranslations from './henry';
import userMenuTranslations from './userMenu';
import lawEnforcementTranslations from './lawEnforcement';
import healthcareWorkersTranslations from './healthcareWorkers';

// Combine all translation sections
const translations: Record<string, Record<string, string>> = {
  ...commonTranslations,
  ...introTranslations,
  ...mentalHealthTranslations,
  ...henryTranslations,
  ...userMenuTranslations,
  ...lawEnforcementTranslations,
  ...healthcareWorkersTranslations
};

export default translations;

