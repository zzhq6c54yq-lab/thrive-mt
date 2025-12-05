import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Heart, FileCheck, UserCheck, AlertCircle, Phone } from "lucide-react";

const SiteHIPAANotice = () => {
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
              HIPAA Notice of Privacy Practices
            </h1>
          </div>
          <p className="text-white/60">Effective Date: December 5, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#B87333]/10 border border-[#D4A574]/30 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</h2>
            <p className="text-white/80 leading-relaxed">
              ThriveMT is committed to protecting the privacy of your health information. This Notice of Privacy Practices ("Notice") describes how we may use and disclose your Protected Health Information ("PHI") and explains your rights regarding your health information under the Health Insurance Portability and Accountability Act of 1996 ("HIPAA").
            </p>
          </section>

          {/* Our Pledge */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Our Pledge to You
            </h2>
            <p className="text-white/80 leading-relaxed">
              We understand that your mental health information is personal and private. We are committed to protecting your health information and using it only as permitted by law. We are required by law to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4 mt-4">
              <li>Maintain the privacy of your PHI</li>
              <li>Provide you with this Notice of our legal duties and privacy practices</li>
              <li>Follow the terms of this Notice currently in effect</li>
              <li>Notify you if we experience a breach of your unsecured PHI</li>
            </ul>
          </section>

          {/* What is PHI */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">What is Protected Health Information (PHI)?</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              PHI is information that identifies you and relates to your past, present, or future physical or mental health condition, the provision of healthcare to you, or payment for healthcare services. In the context of ThriveMT, PHI may include:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Your name, address, phone number, email, and date of birth</li>
              <li>Mental health assessments and questionnaire responses</li>
              <li>Therapy and coaching session notes</li>
              <li>Treatment plans and progress notes</li>
              <li>Communications with your therapist or coach</li>
              <li>Mood tracking and journal entries</li>
              <li>Billing and payment information</li>
              <li>Insurance information</li>
            </ul>
          </section>

          {/* How We Use PHI */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              How We May Use and Disclose Your PHI
            </h2>
            
            <h3 className="text-xl font-medium text-white mt-4 mb-2">For Treatment</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              We may use and disclose your PHI to provide, coordinate, or manage your mental health treatment. For example, we may share information with your therapist or coach to facilitate your care, or coordinate care with other healthcare providers you have authorized.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">For Payment</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              We may use and disclose your PHI to bill and collect payment for services provided. This may include sharing information with your health insurance company or other payers.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">For Healthcare Operations</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              We may use and disclose your PHI to support our business activities, including quality assessment, training, licensing, and administrative functions.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">With Your Authorization</h3>
            <p className="text-white/80 leading-relaxed">
              Other uses and disclosures of your PHI will be made only with your written authorization. You may revoke your authorization at any time, except to the extent we have already taken action in reliance on it.
            </p>
          </section>

          {/* Special Protections */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Special Protections for Mental Health Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Mental health information, including psychotherapy notes, receives additional protection under HIPAA. We will not disclose psychotherapy notes without your written authorization except in limited circumstances as permitted by law.
            </p>
            <p className="text-white/80 leading-relaxed">
              State laws may provide additional protections for mental health information. Where state law is more protective than HIPAA, we will follow the more protective standard.
            </p>
          </section>

          {/* Disclosures Without Authorization */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Disclosures Without Your Authorization
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We may use or disclose your PHI without your authorization in limited circumstances, including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-3 ml-4">
              <li><strong className="text-white">As Required by Law:</strong> When required by federal, state, or local law</li>
              <li><strong className="text-white">Public Health Activities:</strong> To report diseases, injuries, or vital events as required by law</li>
              <li><strong className="text-white">Abuse or Neglect:</strong> To report suspected abuse, neglect, or domestic violence to appropriate authorities</li>
              <li><strong className="text-white">Health Oversight Activities:</strong> To health agencies for activities authorized by law, such as audits and investigations</li>
              <li><strong className="text-white">Judicial and Administrative Proceedings:</strong> In response to court orders or subpoenas</li>
              <li><strong className="text-white">Law Enforcement:</strong> For limited law enforcement purposes as required by law</li>
              <li><strong className="text-white">Serious Threat to Health or Safety:</strong> To prevent or lessen a serious and imminent threat to the health or safety of a person or the public</li>
              <li><strong className="text-white">Coroners and Medical Examiners:</strong> To identify deceased persons or determine cause of death</li>
              <li><strong className="text-white">Workers' Compensation:</strong> For workers' compensation claims as required by law</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Your Rights Regarding Your PHI
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">Right to Access</h3>
                <p className="text-white/80">You have the right to inspect and obtain a copy of your PHI. We may charge a reasonable fee for copies.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to Amend</h3>
                <p className="text-white/80">You have the right to request that we amend your PHI if you believe it is incorrect or incomplete. We may deny your request in certain circumstances.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to an Accounting of Disclosures</h3>
                <p className="text-white/80">You have the right to receive a list of disclosures we have made of your PHI, except for disclosures for treatment, payment, healthcare operations, and certain other purposes.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to Request Restrictions</h3>
                <p className="text-white/80">You have the right to request that we limit the use or disclosure of your PHI. We are not required to agree to your request, except for disclosures to health plans for payment purposes when you have paid out-of-pocket in full.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to Request Confidential Communications</h3>
                <p className="text-white/80">You have the right to request that we communicate with you in a specific way or at a specific location.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to a Paper Copy</h3>
                <p className="text-white/80">You have the right to receive a paper copy of this Notice upon request.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">Right to Opt-Out of Fundraising</h3>
                <p className="text-white/80">If we contact you for fundraising purposes, you have the right to opt out of receiving such communications.</p>
              </div>
            </div>
          </section>

          {/* Our Duties */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Our Duties</h2>
            <p className="text-white/80 leading-relaxed mb-4">We are required to:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Maintain the privacy of your PHI as required by law</li>
              <li>Provide you with notice of our legal duties and privacy practices with respect to your PHI</li>
              <li>Abide by the terms of this Notice</li>
              <li>Notify you if we cannot accommodate a requested restriction or request</li>
              <li>Accommodate reasonable requests to receive communications by alternative means or at alternative locations</li>
            </ul>
          </section>

          {/* Changes to This Notice */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Changes to This Notice</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to change this Notice and make the revised Notice effective for PHI we already have as well as any PHI we receive in the future. We will post a copy of the current Notice on our website and in our app. The Notice will contain the effective date on the first page.
            </p>
          </section>

          {/* Complaints */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Complaints</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you believe your privacy rights have been violated, you may file a complaint with us or with the Secretary of the U.S. Department of Health and Human Services. You will not be retaliated against for filing a complaint.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">To file a complaint with the U.S. Department of Health and Human Services:</strong><br />
              Office for Civil Rights<br />
              U.S. Department of Health and Human Services<br />
              200 Independence Avenue, S.W.<br />
              Washington, D.C. 20201<br />
              Toll-free: 1-877-696-6775<br />
              Website: <a href="https://www.hhs.gov/ocr" target="_blank" rel="noopener noreferrer" className="text-[#D4A574] hover:underline">www.hhs.gov/ocr</a>
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#B87333]/10 border border-[#D4A574]/30 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Our Privacy Officer
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have questions about this Notice, wish to exercise your rights, or want to file a complaint, please contact:
            </p>
            <div className="space-y-2 text-white/80">
              <p><strong className="text-white">Privacy Officer:</strong> ThriveMT Compliance Department</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@thrive-mental.com" className="text-[#D4A574] hover:underline">privacy@thrive-mental.com</a></p>
              <p><strong className="text-white">Phone:</strong> 1-800-THRIVE-1 (1-800-847-4831)</p>
              <p><strong className="text-white">Mailing Address:</strong></p>
              <p className="ml-4">
                ThriveMT Privacy Officer<br />
                Attention: HIPAA Compliance<br />
                [Business Address]<br />
                United States
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Acknowledgment</h2>
            <p className="text-white/80 leading-relaxed">
              By using ThriveMT's services, you acknowledge that you have received and reviewed this Notice of Privacy Practices. You understand how your Protected Health Information may be used and disclosed by ThriveMT.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SiteHIPAANotice;
