import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#252525] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <HomeButton />
          <h1 className="text-2xl font-light text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#B87333]" />
            Terms of Service
          </h1>
        </div>

        <Card className="bg-[#1e1e24] border-[#B87333]/20">
          <CardHeader>
            <CardTitle className="text-white text-xl font-light">Thrive MT Terms of Service</CardTitle>
            <p className="text-white/50 text-sm">Last updated: February 2026</p>
          </CardHeader>
          <CardContent className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
            <section>
              <h3 className="text-white/90 text-lg font-medium">1. Acceptance of Terms</h3>
              <p>By accessing or using Thrive MT's mental health platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, please do not use our Service.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">2. Description of Service</h3>
              <p>Thrive MT provides a digital mental health and wellness platform offering resources, tools, community support, and connections to licensed mental health professionals. Our AI companion, Henry, provides supportive conversations but is not a substitute for professional mental health treatment.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">3. Not a Substitute for Professional Care</h3>
              <p>Thrive MT is not a replacement for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or 911 immediately.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">4. User Accounts</h3>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate information and to update it as needed.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">5. Privacy & Data Protection</h3>
              <p>Your privacy is paramount. All personal and health data is encrypted and handled in accordance with HIPAA regulations. Please review our Privacy Policy for detailed information about how we collect, use, and protect your data.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">6. Acceptable Use</h3>
              <p>You agree to use the Service only for lawful purposes. You may not use the platform to harass, harm, or impersonate others, or to distribute harmful or misleading content.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">7. Intellectual Property</h3>
              <p>All content, features, and functionality of the Service are owned by Thrive MT and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">8. Limitation of Liability</h3>
              <p>Thrive MT is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to direct, indirect, incidental, or consequential damages.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">9. Changes to Terms</h3>
              <p>We reserve the right to modify these Terms at any time. We will notify you of significant changes. Your continued use of the Service after changes constitutes acceptance of the modified terms.</p>
            </section>

            <section>
              <h3 className="text-white/90 text-lg font-medium">10. Contact</h3>
              <p>For questions about these Terms, please contact us at support@thrive-mental.com.</p>
            </section>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-white/40 text-xs">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant • 256-bit Encrypted • Your data is protected</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
