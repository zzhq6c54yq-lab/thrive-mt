# ThriveMT Audit Procedures Manual

**Document Version:** 1.0  
**Last Updated:** December 13, 2024  
**Classification:** Internal

---

## 1. Purpose

This document outlines procedures for producing audit evidence, responding to user data requests, and demonstrating compliance during internal and external audits.

---

## 2. Audit Log Access Procedures

### 2.1 Accessing PHI Audit Logs

**Location:** Admin Dashboard → Compliance → Audit Trail

**Database Query:**
```sql
-- View recent PHI changes
SELECT 
  created_at,
  user_id,
  action,
  table_name,
  record_id,
  actor_role,
  old_data,
  new_data
FROM audit_logs
ORDER BY created_at DESC
LIMIT 100;

-- Filter by specific table
SELECT * FROM audit_logs
WHERE table_name = 'profiles'
  AND created_at >= NOW() - INTERVAL '30 days';

-- Filter by specific user
SELECT * FROM audit_logs
WHERE user_id = 'user-uuid-here'
ORDER BY created_at DESC;
```

### 2.2 Accessing Authentication Logs

**Supabase Analytics Query:**
```sql
SELECT 
  id, 
  auth_logs.timestamp, 
  event_message, 
  metadata.level, 
  metadata.status, 
  metadata.path
FROM auth_logs
CROSS JOIN UNNEST(metadata) as metadata
ORDER BY timestamp DESC
LIMIT 100;
```

### 2.3 Accessing Edge Function Logs

**Supabase Analytics Query:**
```sql
SELECT 
  id, 
  function_edge_logs.timestamp, 
  event_message, 
  response.status_code, 
  request.method, 
  m.function_id, 
  m.execution_time_ms
FROM function_edge_logs
CROSS JOIN UNNEST(metadata) as m
CROSS JOIN UNNEST(m.response) as response
CROSS JOIN UNNEST(m.request) as request
ORDER BY timestamp DESC
LIMIT 100;
```

---

## 3. User Data Request Procedures

### 3.1 Data Access Request (GDPR Article 15)

**Timeline:** 30 days from request

**Procedure:**
1. Verify user identity via email confirmation
2. Query all user data from relevant tables:

```sql
-- Export all user data
SELECT 'profiles' as source, * FROM profiles WHERE id = 'user-uuid';
SELECT 'daily_check_ins' as source, * FROM daily_check_ins WHERE user_id = 'user-uuid';
SELECT 'mood_entries' as source, * FROM mood_entries WHERE user_id = 'user-uuid';
SELECT 'journal_entries' as source, * FROM journal_entries WHERE user_id = 'user-uuid';
SELECT 'henry_conversations' as source, * FROM henry_conversations WHERE user_id = 'user-uuid';
SELECT 'assessment_results' as source, * FROM assessment_results WHERE user_id = 'user-uuid';
SELECT 'therapy_bookings' as source, * FROM therapy_bookings WHERE user_id = 'user-uuid';
-- Continue for all user tables...
```

3. Compile data into JSON/CSV format
4. Securely deliver to user via encrypted channel
5. Log request completion in `data_access_logs`

### 3.2 Data Deletion Request (GDPR Article 17)

**Timeline:** 30 days from request

**Procedure:**
1. Verify user identity
2. Check for legal retention requirements
3. Execute soft delete (mark as deleted, retain for audit):

```sql
-- Soft delete user data
UPDATE profiles 
SET deleted_at = NOW(), 
    display_name = '[DELETED]',
    email = NULL
WHERE id = 'user-uuid';
```

4. For hard delete (after retention period):

```sql
-- Hard delete after retention period (7 years)
DELETE FROM profiles WHERE id = 'user-uuid' 
  AND deleted_at < NOW() - INTERVAL '7 years';
```

5. Log deletion in `auth_user_audit`:

```sql
INSERT INTO auth_user_audit (user_id, action, details)
VALUES ('user-uuid', 'data_deletion_request', '{"completed_at": "...", "tables_affected": [...]}');
```

### 3.3 Data Rectification Request (GDPR Article 16)

**Timeline:** 30 days from request

**Procedure:**
1. Verify user identity
2. Update incorrect data
3. Log changes via audit trigger (automatic)
4. Confirm changes to user

---

## 4. Compliance Demonstration Walkthrough

### 4.1 Access Control Demonstration

1. **Show RLS Policies:**
   - Navigate to Supabase Dashboard → Database → Policies
   - Demonstrate policies on `profiles`, `henry_conversations`
   - Show that users can only access their own data

2. **Test Access Control:**
```sql
-- As User A, try to access User B's data (should fail)
SELECT * FROM profiles WHERE id = 'user-b-uuid';
-- Expected: Empty result due to RLS
```

### 4.2 Audit Logging Demonstration

1. **Create Test Record:**
```sql
INSERT INTO daily_check_ins (user_id, mood_score, note)
VALUES (auth.uid(), 7, 'Audit test entry');
```

2. **Show Audit Log Entry:**
```sql
SELECT * FROM audit_logs 
WHERE table_name = 'daily_check_ins'
ORDER BY created_at DESC
LIMIT 1;
```

### 4.3 Encryption Demonstration

1. **TLS in Transit:**
   - Show browser developer tools → Security tab
   - Verify TLS 1.3 certificate

2. **Encryption at Rest:**
   - Reference Supabase SOC 2 report
   - AWS RDS encryption documentation

### 4.4 Consent Tracking Demonstration

1. **Show Terms Version Tracking:**
   - Navigate to Admin → Compliance → Consent tab
   - Show users pending re-consent
   - Demonstrate version history

2. **Show Consent Audit:**
```sql
SELECT * FROM auth_user_audit 
WHERE action = 'terms_reconsent'
ORDER BY created_at DESC;
```

---

## 5. Incident Response Procedures

### 5.1 Security Incident Classification

| Level | Description | Example | Response Time |
|-------|-------------|---------|---------------|
| Critical | Active data breach | Unauthorized PHI access | Immediate |
| High | Potential breach | Suspicious login patterns | 1 hour |
| Medium | Policy violation | Failed access attempts | 4 hours |
| Low | Minor issue | Configuration warning | 24 hours |

### 5.2 Incident Response Steps

1. **Identify & Contain**
   - Isolate affected systems
   - Preserve evidence (logs, screenshots)
   - Document timeline

2. **Investigate**
   - Review audit logs
   - Identify scope of impact
   - Determine root cause

3. **Remediate**
   - Apply fixes
   - Update security controls
   - Test remediation

4. **Report**
   - Internal notification (Security Officer)
   - External notification if required (60 days for HIPAA breach)
   - Document lessons learned

### 5.3 Breach Notification

**HIPAA Requirement:** Notify affected individuals within 60 days

**Notification Template:**
```
Subject: Important Security Notice from ThriveMT

Dear [User],

We are writing to inform you of a security incident that may have 
affected your personal information...

[Details of incident]
[Steps we've taken]
[Steps you can take]
[Contact information]

Sincerely,
ThriveMT Security Team
```

---

## 6. Evidence Collection Checklist

### For Annual Audit

- [ ] Export audit_logs for past 12 months
- [ ] Export auth_logs for past 12 months
- [ ] Screenshot RLS policies
- [ ] Document all database migrations
- [ ] Collect signed BAAs from vendors
- [ ] Compile training completion records
- [ ] Generate access review documentation
- [ ] Produce incident response logs
- [ ] Verify backup restoration capability
- [ ] Document encryption configurations

### For User Request

- [ ] Identity verification completed
- [ ] Request logged in system
- [ ] Data compiled from all tables
- [ ] Secure delivery method confirmed
- [ ] Completion logged in audit trail
- [ ] User acknowledgment received

---

## 7. Contact Information

| Role | Contact | Responsibility |
|------|---------|----------------|
| Security Officer | security@thrive-mental.com | Overall security compliance |
| Privacy Officer | privacy@thrive-mental.com | Data protection requests |
| Technical Lead | tech@thrive-mental.com | Technical implementation |
| Legal | legal@thrive-mental.com | BAAs, contracts |

---

## Appendix A: SQL Queries Reference

See `docs/compliance/sql_queries/` for complete query library.

## Appendix B: Evidence Templates

See `docs/compliance/templates/` for report templates.
