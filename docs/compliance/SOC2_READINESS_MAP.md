# ThriveMT SOC 2 Readiness Map

**Document Version:** 1.0  
**Last Updated:** December 13, 2024  
**Target Framework:** SOC 2 Type II (Trust Services Criteria)

---

## Overview

This document maps ThriveMT's controls to SOC 2 Trust Services Criteria (TSC). SOC 2 compliance demonstrates our commitment to security, availability, confidentiality, processing integrity, and privacy.

---

## 1. Security (Common Criteria)

### CC1: Control Environment

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC1.1 | COSO Principle 1 - Integrity & Ethics | Code of conduct, security policies | Policy documents |
| CC1.2 | COSO Principle 2 - Board Oversight | Security governance structure | Org chart, meeting minutes |
| CC1.3 | COSO Principle 3 - Management Structure | Defined security roles | Role documentation |
| CC1.4 | COSO Principle 4 - Competence | Security training program | Training records |
| CC1.5 | COSO Principle 5 - Accountability | Performance management | Review documentation |

### CC2: Communication and Information

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC2.1 | Internal Communication | Security awareness program | Training materials |
| CC2.2 | External Communication | Privacy policy, terms of service | Published policies |
| CC2.3 | Security Policies | Documented security standards | Policy repository |

### CC3: Risk Assessment

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC3.1 | Risk Objectives | Security objectives defined | Risk assessment docs |
| CC3.2 | Risk Identification | Annual security assessments | Assessment reports |
| CC3.3 | Fraud Risk | Fraud controls in place | Control documentation |
| CC3.4 | Change Analysis | Change impact assessment | Change logs |

### CC4: Monitoring Activities

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC4.1 | Ongoing Monitoring | Real-time security monitoring | Sentry integration |
| CC4.2 | Deficiency Evaluation | Issue tracking and remediation | GitHub issues |

### CC5: Control Activities

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC5.1 | Control Selection | Risk-based control design | Control matrix |
| CC5.2 | Technology Controls | Automated security controls | Technical documentation |
| CC5.3 | Control Deployment | Controls implemented in code | Source code review |

### CC6: Logical and Physical Access

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC6.1 | Access Security | Supabase Auth, JWT tokens | Auth configuration |
| CC6.2 | User Registration | Email verification required | Auth flow |
| CC6.3 | Access Removal | Account deactivation procedures | Admin controls |
| CC6.4 | Access Review | Quarterly access reviews | Review logs |
| CC6.5 | Physical Access | Supabase/AWS facilities | SOC 2 reports |
| CC6.6 | Logical Access | RLS policies on all tables | Migration files |
| CC6.7 | Transmission Protection | TLS 1.3 encryption | SSL configuration |
| CC6.8 | Malware Prevention | Dependency scanning | CI/CD pipeline |

### CC7: System Operations

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC7.1 | Vulnerability Detection | Supabase linter, code scanning | Scan reports |
| CC7.2 | Security Monitoring | Audit logs, Sentry alerts | Log exports |
| CC7.3 | Incident Response | Documented IR procedures | IR runbook |
| CC7.4 | Incident Recovery | Backup restoration procedures | DR documentation |
| CC7.5 | Security Events | Event logging to audit_logs | Database queries |

### CC8: Change Management

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC8.1 | Change Authorization | Pull request approvals | GitHub history |

### CC9: Risk Mitigation

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| CC9.1 | Business Continuity | Supabase redundancy | Architecture docs |
| CC9.2 | Vendor Management | BAA tracking, vendor reviews | BAA_STATUS.md |

---

## 2. Availability

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| A1.1 | Capacity Planning | Supabase auto-scaling | Plan documentation |
| A1.2 | Recovery Procedures | Point-in-time recovery | Backup configuration |
| A1.3 | Recovery Testing | Quarterly DR tests | Test reports |

---

## 3. Confidentiality

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| C1.1 | Confidential Info ID | PHI data classification | Data inventory |
| C1.2 | Confidential Info Disposal | Soft delete + GDPR purge | Data retention policy |

---

## 4. Processing Integrity

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| PI1.1 | Processing Objectives | Input validation (Zod) | Schema definitions |
| PI1.2 | System Inputs | Data validation on all forms | Component code |
| PI1.3 | Processing Activities | Database constraints | Migration files |
| PI1.4 | System Outputs | Response validation | Edge functions |
| PI1.5 | Data Storage | Integrity verification | Database checks |

---

## 5. Privacy

| Criteria | Control | Implementation | Evidence |
|----------|---------|----------------|----------|
| P1.0 | Privacy Notice | Privacy policy published | Website |
| P2.0 | Choice & Consent | Consent checkbox, terms acceptance | Auth flow |
| P3.0 | Collection | Minimum necessary data | Data model |
| P4.0 | Use & Retention | 7-year retention policy | Policy documentation |
| P5.0 | Access | User data export capability | Profile settings |
| P6.0 | Disclosure | BAA requirements | Vendor agreements |
| P7.0 | Quality | Data validation | Zod schemas |
| P8.0 | Monitoring | Privacy audits | Audit schedule |

---

## Control Mapping Summary

| Category | Total Controls | Implemented | Gap |
|----------|---------------|-------------|-----|
| Security (CC) | 32 | 30 | 2 |
| Availability (A) | 3 | 3 | 0 |
| Confidentiality (C) | 2 | 2 | 0 |
| Processing Integrity (PI) | 5 | 5 | 0 |
| Privacy (P) | 9 | 8 | 1 |
| **Total** | **51** | **48** | **3** |

---

## Identified Gaps & Remediation

| Gap | Criteria | Risk | Remediation | Owner | Due Date |
|-----|----------|------|-------------|-------|----------|
| Leaked password protection | CC6.1 | Medium | Enable in Supabase | Security | Immediate |
| Vendor BAA completion | CC9.2 | High | Obtain Together AI BAA | Legal | 30 days |
| Privacy monitoring schedule | P8.0 | Low | Establish quarterly reviews | Privacy | 60 days |

---

## Evidence Repository

All compliance evidence is maintained in:
- **Documentation:** `docs/compliance/`
- **Database Migrations:** `supabase/migrations/`
- **Audit Logs:** `public.audit_logs` table
- **Source Control:** GitHub repository history
- **Monitoring:** Sentry dashboard

---

## Attestation

This SOC 2 readiness assessment has been prepared based on current system implementation and controls as of December 13, 2024.

**Prepared by:** ThriveMT Engineering Team  
**Review Date:** December 13, 2024  
**Audit Period Target:** Q1 2025
