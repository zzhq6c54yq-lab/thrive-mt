import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const SitePrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#D4A574]/20 py-8">
        <div className="container mx-auto px-6">
          <Link 
            to="/home" 
            className="inline-flex items-center text-[#D4A574] hover:text-[#E8D4C0] transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#D4A574]" />
            <h1 
              className="text-3xl md:text-4xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Privacy Policy
            </h1>
          </div>
          <p className="text-white/60">Last Updated: December 5, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Introduction
            </h2>
            <p className="text-white/80 leading-relaxed">
              ThriveMT ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental health and wellness platform, including our website, mobile applications, and related services (collectively, the "Services").
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              We understand the sensitive nature of mental health information and take our responsibility to protect your data seriously. Our practices are designed to comply with applicable federal and state privacy laws, including the Health Insurance Portability and Accountability Act (HIPAA) where applicable.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-medium text-white mt-4 mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Name, email address, phone number, and date of birth</li>
              <li>Account credentials and authentication information</li>
              <li>Payment and billing information (processed securely through third-party providers)</li>
              <li>Emergency contact information</li>
              <li>Insurance information (if applicable)</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-6 mb-2">Health Information</h3>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Mental health assessments and questionnaire responses</li>
              <li>Mood tracking data and journal entries</li>
              <li>Therapy session notes and progress records</li>
              <li>Communication with therapists and coaches</li>
              <li>Treatment plans and goals</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-6 mb-2">Technical Information</h3>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and feature interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              How We Use Your Information
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Provide, maintain, and improve our mental health services</li>
              <li>Match you with appropriate therapists and coaches</li>
              <li>Personalize your experience and provide tailored recommendations</li>
              <li>Process payments and manage your subscription</li>
              <li>Communicate with you about your account, appointments, and services</li>
              <li>Send important health-related notifications and reminders</li>
              <li>Conduct research and analytics to improve our services (using de-identified data)</li>
              <li>Ensure the safety and security of our platform</li>
              <li>Comply with legal obligations and respond to legal requests</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Information Sharing and Disclosure</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-3 ml-4">
              <li><strong className="text-white">With Your Therapist or Coach:</strong> To facilitate your care and enable effective treatment</li>
              <li><strong className="text-white">Service Providers:</strong> With trusted third parties who assist us in operating our platform (e.g., payment processors, hosting providers)</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect the safety of individuals</li>
              <li><strong className="text-white">Emergency Situations:</strong> To appropriate authorities when there is imminent risk of harm to you or others</li>
              <li><strong className="text-white">With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Data Security</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We implement robust security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>End-to-end encryption for all communications</li>
              <li>Secure, HIPAA-compliant data storage</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Multi-factor authentication options</li>
              <li>Strict access controls and employee training</li>
              <li>Automatic session timeouts and secure logout</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Your Rights
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
              <li><strong className="text-white">Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong className="text-white">Opt-Out:</strong> Opt out of marketing communications</li>
              <li><strong className="text-white">Restrict Processing:</strong> Request limitation of how we use your data</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@thrive-mental.com" className="text-[#D4A574] hover:underline">privacy@thrive-mental.com</a>.
            </p>
          </section>

          {/* Data Retention */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Data Retention</h2>
            <p className="text-white/80 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Health records may be retained for periods required by applicable healthcare regulations (typically 7-10 years after the last treatment date). You may request deletion of your account and associated data at any time, though certain information may be retained as required by law.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Children's Privacy</h2>
            <p className="text-white/80 leading-relaxed">
              Our Services are not intended for individuals under 13 years of age. For users between 13-18 years old, parental or guardian consent is required. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Changes to This Policy</h2>
            <p className="text-white/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#B87333]/10 border border-[#D4A574]/30 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="space-y-2 text-white/80">
              <p><strong className="text-white">Privacy Officer:</strong> ThriveMT Privacy Team</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@thrive-mental.com" className="text-[#D4A574] hover:underline">privacy@thrive-mental.com</a></p>
              <p><strong className="text-white">General Support:</strong> <a href="mailto:support@thrive-mental.com" className="text-[#D4A574] hover:underline">support@thrive-mental.com</a></p>
              <p><strong className="text-white">Phone:</strong> 1-800-THRIVE-1 (1-800-847-4831)</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SitePrivacyPolicy;
