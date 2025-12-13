// Centralized Terms Version Management
// Update CURRENT_TERMS_VERSION when terms change to trigger re-consent

export const CURRENT_TERMS_VERSION = '1.1';
export const TERMS_UPDATED_DATE = '2024-12-13';

export interface TermsChangelogEntry {
  version: string;
  date: string;
  summary: string;
  details?: string[];
}

export const TERMS_CHANGELOG: TermsChangelogEntry[] = [
  {
    version: '1.1',
    date: '2024-12-13',
    summary: 'Added AI processing disclosure and expanded PHI audit logging',
    details: [
      'AI conversations may be processed by third-party AI providers',
      'Enhanced audit logging for HIPAA compliance',
      'Updated data retention policies',
      'Clarified crisis escalation procedures'
    ]
  },
  {
    version: '1.0',
    date: '2024-11-01',
    summary: 'Initial terms of service and privacy policy',
    details: [
      'Terms of service agreement',
      'Privacy policy and data handling',
      'HIPAA compliance notice',
      'User consent requirements'
    ]
  }
];

export const getLatestChanges = (): TermsChangelogEntry | undefined => {
  return TERMS_CHANGELOG[0];
};

export const needsReconsent = (userTermsVersion: string | null): boolean => {
  if (!userTermsVersion) return true;
  return userTermsVersion < CURRENT_TERMS_VERSION;
};
