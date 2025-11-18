-- Phase 2, 3, 4: Content, Billing, Support, AI, Marketing, Analytics, Enterprise
-- All tables with RLS policies and indexes

-- ==========================================
-- PHASE 2: Content Management System
-- ==========================================

CREATE TABLE content_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content_type text NOT NULL CHECK (content_type IN ('worksheet', 'meditation', 'video', 'article', 'infographic')),
  file_url text,
  content_body text,
  tags text[],
  portal_tags text[],
  category text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  version integer DEFAULT 1,
  created_by uuid REFERENCES profiles(id),
  reviewed_by uuid REFERENCES profiles(id),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content_library(id) ON DELETE CASCADE,
  version integer NOT NULL,
  changes jsonb,
  changed_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content_library(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  action text NOT NULL CHECK (action IN ('view', 'download', 'complete', 'share')),
  session_duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 2: Billing & Revenue Management
-- ==========================================

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  plan_tier text NOT NULL CHECK (plan_tier IN ('basic', 'premium', 'enterprise')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused', 'expired')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  next_billing_date date,
  payment_method text,
  stripe_subscription_id text,
  promo_code_id uuid,
  started_at timestamptz DEFAULT now(),
  cancelled_at timestamptz,
  cancellation_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  booking_id uuid REFERENCES therapy_bookings(id),
  subscription_id uuid REFERENCES subscriptions(id),
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_method text NOT NULL,
  payment_gateway text,
  gateway_transaction_id text,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'disputed')),
  failure_reason text,
  refund_amount numeric(10,2),
  refunded_at timestamptz,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE therapist_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES therapists(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  period_start date NOT NULL,
  period_end date NOT NULL,
  session_count integer,
  total_hours numeric(5,2),
  platform_fee numeric(10,2),
  net_payout numeric(10,2),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  payment_method text,
  payment_reference text,
  paid_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value numeric(10,2) NOT NULL,
  max_uses integer,
  current_uses integer DEFAULT 0,
  applicable_plans text[],
  min_purchase_amount numeric(10,2),
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 2: Support Ticketing System
-- ==========================================

CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES profiles(id),
  therapist_id uuid REFERENCES therapists(id),
  subject text NOT NULL,
  description text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_user', 'resolved', 'closed')),
  category text NOT NULL CHECK (category IN ('billing', 'technical', 'clinical', 'general', 'crisis')),
  assigned_to uuid REFERENCES profiles(id),
  is_crisis boolean DEFAULT false,
  escalated_at timestamptz,
  first_response_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE ticket_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  responder_id uuid REFERENCES profiles(id),
  responder_type text CHECK (responder_type IN ('admin', 'user', 'therapist', 'system')),
  message text NOT NULL,
  is_internal boolean DEFAULT false,
  attachments text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE response_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  body text NOT NULL,
  merge_fields text[],
  usage_count integer DEFAULT 0,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE ticket_sla_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  priority_level text NOT NULL,
  target_first_response_minutes integer,
  actual_first_response_minutes integer,
  target_resolution_hours integer,
  actual_resolution_hours integer,
  sla_breached boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 3: AI & Automation Oversight
-- ==========================================

CREATE TABLE ai_match_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  therapist_id uuid REFERENCES therapists(id),
  match_score numeric(5,2),
  match_reasons jsonb,
  user_preferences jsonb,
  algorithm_version text,
  was_overridden boolean DEFAULT false,
  override_reason text,
  override_by uuid REFERENCES profiles(id),
  user_satisfaction_rating integer CHECK (user_satisfaction_rating >= 1 AND user_satisfaction_rating <= 5),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  session_id text NOT NULL,
  message_count integer,
  resolved_without_human boolean DEFAULT false,
  escalated_to_human boolean DEFAULT false,
  escalation_reason text,
  sentiment_score numeric(3,2),
  topics text[],
  satisfaction_rating integer CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  conversation_duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  recommendation_type text CHECK (recommendation_type IN ('content', 'activity', 'therapist')),
  recommended_item_id uuid,
  recommended_item_type text,
  reasoning jsonb,
  confidence_score numeric(5,2),
  was_clicked boolean DEFAULT false,
  clicked_at timestamptz,
  was_completed boolean DEFAULT false,
  user_feedback text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE model_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text NOT NULL,
  version text,
  metric_name text,
  metric_value numeric(5,4),
  dataset_size integer,
  training_date date,
  is_production boolean DEFAULT false,
  notes text,
  recorded_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 3: Marketing & Engagement Tools
-- ==========================================

CREATE TABLE marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'push', 'sms', 'in_app')),
  subject text,
  body text,
  target_segment jsonb,
  target_user_count integer,
  scheduled_for timestamptz,
  sent_at timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE campaign_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  converted boolean DEFAULT false,
  conversion_value numeric(10,2),
  unsubscribed boolean DEFAULT false
);

CREATE TABLE campaign_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  sent_count integer NOT NULL,
  delivered_count integer,
  opened_count integer,
  clicked_count integer,
  converted_count integer,
  unsubscribed_count integer,
  bounce_count integer,
  revenue_generated numeric(10,2),
  recorded_at timestamptz DEFAULT now()
);

CREATE TABLE user_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  criteria jsonb NOT NULL,
  user_count integer,
  last_calculated_at timestamptz,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE referral_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES profiles(id),
  referred_user_id uuid REFERENCES profiles(id),
  referral_code text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  reward_given boolean DEFAULT false,
  reward_amount numeric(10,2),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- ==========================================
-- PHASE 3: Predictive Analytics
-- ==========================================

CREATE TABLE churn_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  churn_probability numeric(5,2),
  risk_level text CHECK (risk_level IN ('low', 'medium', 'high')),
  risk_factors jsonb,
  predicted_churn_date date,
  intervention_suggested text,
  intervention_sent boolean DEFAULT false,
  prediction_model_version text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE user_cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_name text NOT NULL,
  signup_period text,
  portal_filter text,
  user_count integer,
  retention_rate_30d numeric(5,2),
  retention_rate_60d numeric(5,2),
  retention_rate_90d numeric(5,2),
  avg_ltv numeric(10,2),
  avg_session_count numeric(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE session_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  hour_of_day integer CHECK (hour_of_day >= 0 AND hour_of_day <= 23),
  total_active_users integer,
  total_sessions integer,
  avg_session_duration_minutes numeric(10,2),
  feature_usage jsonb,
  portal_breakdown jsonb,
  recorded_at timestamptz DEFAULT now()
);

CREATE TABLE revenue_forecasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  forecast_date date NOT NULL,
  predicted_revenue numeric(10,2),
  confidence_interval_low numeric(10,2),
  confidence_interval_high numeric(10,2),
  forecast_method text,
  assumptions jsonb,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 4: Integration Hub
-- ==========================================

CREATE TABLE integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('ehr', 'wearable', 'calendar', 'crm', 'api')),
  provider text,
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error', 'pending')),
  config jsonb,
  last_sync_at timestamptz,
  sync_frequency text,
  error_log jsonb,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE integration_sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id uuid REFERENCES integrations(id) ON DELETE CASCADE,
  sync_status text CHECK (sync_status IN ('success', 'partial', 'failed')),
  records_synced integer,
  errors_encountered integer,
  sync_duration_seconds integer,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_hash text NOT NULL,
  key_prefix text,
  partner_name text NOT NULL,
  scopes text[],
  rate_limit integer DEFAULT 1000,
  is_active boolean DEFAULT true,
  last_used_at timestamptz,
  expires_at timestamptz,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE api_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id uuid REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  method text,
  status_code integer,
  response_time_ms integer,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE wearable_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  source text,
  data_type text,
  value jsonb,
  recorded_date date,
  synced_at timestamptz DEFAULT now()
);

-- ==========================================
-- PHASE 4: Enterprise Features
-- ==========================================

CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subdomain text UNIQUE,
  custom_domain text,
  logo_url text,
  primary_color text DEFAULT '#B87333',
  secondary_color text DEFAULT '#E5C5A1',
  is_active boolean DEFAULT true,
  subscription_tier text CHECK (subscription_tier IN ('basic', 'professional', 'enterprise')),
  max_users integer,
  current_user_count integer DEFAULT 0,
  settings jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE tenant_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text,
  added_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, user_id)
);

CREATE TABLE custom_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  description text,
  report_type text,
  metrics jsonb,
  filters jsonb,
  schedule text,
  recipients text[],
  format text,
  last_generated_at timestamptz,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE sso_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  provider text,
  config jsonb,
  is_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- Content Library
ALTER TABLE content_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage content library" ON content_library FOR ALL USING (is_admin());
CREATE POLICY "Users can view published content" ON content_library FOR SELECT USING (status = 'published');

ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view content versions" ON content_versions FOR SELECT USING (is_admin());

ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert own content analytics" ON content_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all content analytics" ON content_analytics FOR SELECT USING (is_admin());

-- Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all subscriptions" ON subscriptions FOR ALL USING (is_admin());

ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON payment_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON payment_transactions FOR SELECT USING (is_admin());

ALTER TABLE therapist_payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Therapists can view own payouts" ON therapist_payouts FOR SELECT USING (
  therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can manage payouts" ON therapist_payouts FOR ALL USING (is_admin());

ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage promo codes" ON promo_codes FOR ALL USING (is_admin());
CREATE POLICY "Users can view active promo codes" ON promo_codes FOR SELECT USING (is_active = true);

-- Support Tickets
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tickets" ON support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all tickets" ON support_tickets FOR ALL USING (is_admin());

ALTER TABLE ticket_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view non-internal responses on own tickets" ON ticket_responses FOR SELECT USING (
  ticket_id IN (SELECT id FROM support_tickets WHERE user_id = auth.uid()) AND is_internal = false
);
CREATE POLICY "Admins can view all responses" ON ticket_responses FOR SELECT USING (is_admin());
CREATE POLICY "Admins can create responses" ON ticket_responses FOR INSERT WITH CHECK (is_admin());

ALTER TABLE response_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage templates" ON response_templates FOR ALL USING (is_admin());

ALTER TABLE ticket_sla_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view SLA tracking" ON ticket_sla_tracking FOR SELECT USING (is_admin());

-- AI Systems
ALTER TABLE ai_match_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view AI match logs" ON ai_match_logs FOR SELECT USING (is_admin());

ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversations" ON chatbot_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all conversations" ON chatbot_conversations FOR SELECT USING (is_admin());

ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own recommendations" ON ai_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all recommendations" ON ai_recommendations FOR SELECT USING (is_admin());

ALTER TABLE model_performance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage model performance" ON model_performance FOR ALL USING (is_admin());

-- Marketing
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage campaigns" ON marketing_campaigns FOR ALL USING (is_admin());

ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own campaign receipts" ON campaign_recipients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage recipients" ON campaign_recipients FOR ALL USING (is_admin());

ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view campaign analytics" ON campaign_analytics FOR SELECT USING (is_admin());

ALTER TABLE user_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage segments" ON user_segments FOR ALL USING (is_admin());

ALTER TABLE referral_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own referrals" ON referral_tracking FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id);
CREATE POLICY "Admins can manage referrals" ON referral_tracking FOR ALL USING (is_admin());

-- Analytics
ALTER TABLE churn_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view churn predictions" ON churn_predictions FOR SELECT USING (is_admin());

ALTER TABLE user_cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage cohorts" ON user_cohorts FOR ALL USING (is_admin());

ALTER TABLE session_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view session analytics" ON session_analytics FOR SELECT USING (is_admin());

ALTER TABLE revenue_forecasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view revenue forecasts" ON revenue_forecasts FOR SELECT USING (is_admin());

-- Integrations
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage integrations" ON integrations FOR ALL USING (is_admin());

ALTER TABLE integration_sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view sync logs" ON integration_sync_logs FOR SELECT USING (is_admin());

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage API keys" ON api_keys FOR ALL USING (is_admin());

ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view API usage" ON api_usage_logs FOR SELECT USING (is_admin());

ALTER TABLE wearable_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wearable data" ON wearable_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wearable data" ON wearable_data FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enterprise
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage tenants" ON tenants FOR ALL USING (is_admin());

ALTER TABLE tenant_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant users can view own membership" ON tenant_users FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage tenant users" ON tenant_users FOR ALL USING (is_admin());

ALTER TABLE custom_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage custom reports" ON custom_reports FOR ALL USING (is_admin());

ALTER TABLE sso_configurations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage SSO" ON sso_configurations FOR ALL USING (is_admin());

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX idx_content_library_status ON content_library(status);
CREATE INDEX idx_content_library_tags ON content_library USING GIN(tags);
CREATE INDEX idx_content_analytics_content_id ON content_analytics(content_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_ai_match_logs_user_id ON ai_match_logs(user_id);
CREATE INDEX idx_marketing_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_campaign_recipients_campaign_id ON campaign_recipients(campaign_id);
CREATE INDEX idx_churn_predictions_user_id ON churn_predictions(user_id);
CREATE INDEX idx_churn_predictions_risk_level ON churn_predictions(risk_level);
CREATE INDEX idx_integrations_status ON integrations(status);
CREATE INDEX idx_api_usage_logs_api_key_id ON api_usage_logs(api_key_id);
CREATE INDEX idx_wearable_data_user_id ON wearable_data(user_id);
CREATE INDEX idx_tenant_users_tenant_id ON tenant_users(tenant_id);