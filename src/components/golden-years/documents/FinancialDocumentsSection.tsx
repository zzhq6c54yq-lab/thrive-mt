
import React from "react";
import { Button } from "@/components/ui/button";
import { FileKey, Receipt, CreditCard, Building, Wallet, Calendar, Landmark, PiggyBank, Briefcase, TrendingUp } from "lucide-react";

const FinancialDocumentsSection = () => {
  return (
    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
      <div className="flex items-center mb-2">
        <FileKey className="h-5 w-5 mr-2 text-[#D4AF37]" />
        <h4 className="text-lg font-medium text-[#F5DEB3]">Financial Documents</h4>
      </div>
      <div className="space-y-3">
        <FinancialSubSection
          title="Insurance Policies"
          items={[
            { icon: <Receipt className="h-4 w-4 text-[#D4AF37]" />, text: "Life Insurance Policy Numbers" },
            { icon: <CreditCard className="h-4 w-4 text-[#D4AF37]" />, text: "Insurance Contact Information" },
          ]}
        />
        
        <FinancialSubSection
          title="Banking & Investments"
          items={[
            { icon: <Building className="h-4 w-4 text-[#D4AF37]" />, text: "Bank Account Details" },
            { icon: <Wallet className="h-4 w-4 text-[#D4AF37]" />, text: "401(k) & Investment Accounts" },
          ]}
        />
        
        <FinancialSubSection
          title="Earned Income"
          items={[
            { icon: <Landmark className="h-4 w-4 text-[#D4AF37]" />, text: "Social Security Benefits" },
            { icon: <PiggyBank className="h-4 w-4 text-[#D4AF37]" />, text: "Pension Payments" },
            { icon: <Briefcase className="h-4 w-4 text-[#D4AF37]" />, text: "Part-Time Work Earnings" },
            { icon: <TrendingUp className="h-4 w-4 text-[#D4AF37]" />, text: "Investment Income" },
          ]}
        />
        
        <FinancialSubSection
          title="Regular Bills & Payments"
          items={[
            { icon: <Calendar className="h-4 w-4 text-[#D4AF37]" />, text: "Payment Due Dates" },
            { icon: <Receipt className="h-4 w-4 text-[#D4AF37]" />, text: "Monthly Payment Amounts" },
          ]}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Download Financial Document Templates <Receipt className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface FinancialSubSectionProps {
  title: string;
  items: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

const FinancialSubSection: React.FC<FinancialSubSectionProps> = ({ title, items }) => {
  return (
    <div className="bg-[#1A1811]/30 p-3 rounded border border-[#D4AF37]/10">
      <h5 className="text-sm font-medium text-[#F5DEB3] mb-2">{title}</h5>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialDocumentsSection;
