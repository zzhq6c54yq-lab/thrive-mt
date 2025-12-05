import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard, Ban, Gavel } from "lucide-react";

const SiteTermsOfService = () => {
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
            <FileText className="h-8 w-8 text-[#D4A574]" />
            <h1 
              className="text-3xl md:text-4xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Terms of Service
            </h1>
          </div>
          <p className="text-white/60">Last Updated: December 5, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Acceptance */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Acceptance of Terms
            </h2>
            <p className="text-white/80 leading-relaxed">
              By accessing or using ThriveMT's services, website, or mobile applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              These Terms constitute a legally binding agreement between you and ThriveMT, LLC ("ThriveMT," "we," "our," or "us"). Please read them carefully before using our Services.
            </p>
          </section>

          {/* Description of Services */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Description of Services</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              ThriveMT provides a digital mental health and wellness platform that includes:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Connection with licensed therapists and certified coaches</li>
              <li>Self-guided mental wellness tools and assessments</li>
              <li>AI-powered wellness companion (Henry)</li>
              <li>Mood tracking and journaling features</li>
              <li>Educational workshops and resources</li>
              <li>Community support features</li>
              <li>Video and messaging therapy sessions</li>
            </ul>
          </section>

          {/* Important Medical Disclaimer */}
          <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Medical Disclaimer
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              <strong className="text-white">ThriveMT is not a substitute for emergency services.</strong> If you are experiencing a medical or mental health emergency, please call 911 or go to your nearest emergency room immediately.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              <strong className="text-white">Crisis Resources:</strong>
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>Emergency Services: 911</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              The content and services provided by ThriveMT are for informational and therapeutic purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.
            </p>
          </section>

          {/* Eligibility */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Eligibility</h2>
            <p className="text-white/80 leading-relaxed mb-4">To use our Services, you must:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Be at least 18 years old, or between 13-17 with parental/guardian consent</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Reside in a jurisdiction where our Services are available</li>
              <li>Provide accurate and complete registration information</li>
              <li>Not have been previously banned from using our Services</li>
            </ul>
          </section>

          {/* Account Responsibilities */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Account Responsibilities</h2>
            <p className="text-white/80 leading-relaxed mb-4">You are responsible for:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information remains accurate and up-to-date</li>
              <li>Using the Services in compliance with all applicable laws</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Terms
            </h2>
            <h3 className="text-xl font-medium text-white mt-4 mb-2">Subscription Services</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Some of our Services require a paid subscription. By subscribing, you agree to pay all applicable fees as described at the time of purchase. Subscriptions automatically renew unless cancelled before the renewal date.
            </p>
            
            <h3 className="text-xl font-medium text-white mt-4 mb-2">Therapy and Coaching Sessions</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Individual therapy and coaching sessions are billed separately or as part of a package. Cancellations must be made at least 24 hours in advance to avoid cancellation fees.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">Refund Policy</h3>
            <p className="text-white/80 leading-relaxed">
              Refunds for subscription services may be requested within 7 days of initial purchase. Refunds for individual sessions are not available for completed sessions. Financial assistance and sliding scale options are available for those who qualify.
            </p>
          </section>

          {/* Prohibited Conduct */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Prohibited Conduct
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Use the Services for any unlawful purpose</li>
              <li>Harass, abuse, or harm other users or our staff</li>
              <li>Impersonate any person or entity</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload malicious code or interfere with the Services</li>
              <li>Use automated systems to access the Services without permission</li>
              <li>Violate the intellectual property rights of ThriveMT or others</li>
              <li>Record or share therapy sessions without consent</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Intellectual Property</h2>
            <p className="text-white/80 leading-relaxed">
              All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of ThriveMT or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes only.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Disclaimers</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-white/80 leading-relaxed">
              We do not warrant that the Services will be uninterrupted, error-free, or completely secure. While we strive to provide high-quality mental health services, outcomes cannot be guaranteed as they depend on many factors including individual engagement and circumstances.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Limitation of Liability</h2>
            <p className="text-white/80 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THRIVEMT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              Our total liability for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid to ThriveMT in the twelve (12) months preceding the claim.
            </p>
          </section>

          {/* Indemnification */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Indemnification</h2>
            <p className="text-white/80 leading-relaxed">
              You agree to indemnify, defend, and hold harmless ThriveMT, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Services, violation of these Terms, or violation of any rights of another party.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Governing Law & Dispute Resolution
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            <p className="text-white/80 leading-relaxed">
              Any disputes arising from these Terms or your use of the Services shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules.
            </p>
          </section>

          {/* Termination */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Termination</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. You may terminate your account at any time by contacting us. Upon termination, your right to use the Services will immediately cease, though certain provisions of these Terms will survive termination.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Changes to These Terms</h2>
            <p className="text-white/80 leading-relaxed">
              We may modify these Terms at any time by posting the revised Terms on our website. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. We will notify you of material changes via email or through the Services.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#B87333]/10 border border-[#D4A574]/30 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-white/80">
              <p><strong className="text-white">Email:</strong> <a href="mailto:legal@thrive-mental.com" className="text-[#D4A574] hover:underline">legal@thrive-mental.com</a></p>
              <p><strong className="text-white">General Support:</strong> <a href="mailto:support@thrive-mental.com" className="text-[#D4A574] hover:underline">support@thrive-mental.com</a></p>
              <p><strong className="text-white">Phone:</strong> 1-800-THRIVE-1 (1-800-847-4831)</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SiteTermsOfService;
