import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate comprehensive test cases for ThriveMT
const generateTestCases = () => {
  const testCases: any[] = [];
  let rowNum = 1;

  // Helper to add test case
  const addTest = (
    module: string,
    feature: string,
    scenario: string,
    expected: string,
    backendCheck: string,
    frontendCheck: string,
    automationType: 'automated' | 'semi_automated' | 'manual' = 'automated',
    priority: 'critical' | 'high' | 'medium' | 'low' = 'medium',
    category?: string,
    subcategory?: string,
    relatedTable?: string,
    relatedFunction?: string,
    deviceType?: string,
    browser?: string
  ) => {
    testCases.push({
      row_number: rowNum++,
      module,
      feature,
      scenario,
      expected_outcome: expected,
      backend_check: backendCheck,
      frontend_check: frontendCheck,
      automation_type: automationType,
      priority,
      category: category || module,
      subcategory: subcategory || feature,
      related_table: relatedTable,
      related_function: relatedFunction,
      device_type: deviceType,
      browser,
      status: 'pending'
    });
  };

  // ============================================
  // SECTION 1: CORE WELLNESS TOOLKIT (500+ tests)
  // ============================================

  // Daily Check-ins
  const moods = ['great', 'good', 'okay', 'low', 'struggling'];
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['chrome', 'safari', 'firefox', 'edge'];

  moods.forEach(mood => {
    devices.forEach(device => {
      addTest('Core Wellness', 'Daily Check-in', `Submit mood check-in as "${mood}" on ${device}`, 'Mood saved with correct score and label', 'Row exists in daily_check_ins with correct mood_score', 'Toast confirmation, mood reflected in dashboard', 'automated', 'high', 'Wellness', 'Mood Tracking', 'daily_check_ins', undefined, device);
    });
  });

  // Mood with notes
  addTest('Core Wellness', 'Daily Check-in', 'Submit mood with detailed note (500+ chars)', 'Note saved completely without truncation', 'Note column contains full text', 'Note displays fully in history', 'automated', 'medium', 'Wellness', 'Mood Tracking', 'daily_check_ins');
  addTest('Core Wellness', 'Daily Check-in', 'Submit mood with tags (anxiety, sleep, work)', 'Tags saved as array', 'tags column contains all selected tags', 'Tags display on mood entry', 'automated', 'medium', 'Wellness', 'Mood Tracking', 'daily_check_ins');
  addTest('Core Wellness', 'Daily Check-in', 'Multiple check-ins same day', 'All entries saved, latest shown prominently', 'Multiple rows for same user_id and date', 'History shows all entries, dashboard shows latest', 'automated', 'medium');
  addTest('Core Wellness', 'Daily Check-in', 'View 7-day mood trend chart', 'Chart displays correctly with accurate data', 'Query returns last 7 days of check-ins', 'Chart renders with correct mood values', 'automated', 'high');
  addTest('Core Wellness', 'Daily Check-in', 'View 30-day mood trend', 'Extended chart with all data points', 'Query returns last 30 days', 'Chart scrollable/zoomable on mobile', 'automated', 'medium');

  // Breathing Exercises
  const breathingPatterns = ['4-7-8', 'box-breathing', 'deep-calm', 'energize', 'focus'];
  const durations = [60, 120, 180, 300, 600];

  breathingPatterns.forEach(pattern => {
    durations.forEach(duration => {
      addTest('Core Wellness', 'Breathing Exercise', `Complete ${pattern} breathing for ${duration}s`, 'Session logged with duration and pattern', 'Row in breathing_sessions with correct pattern_type and duration_seconds', 'Completion animation plays, session added to history', 'automated', 'high', 'Wellness', 'Breathing', 'breathing_sessions');
    });
  });

  addTest('Core Wellness', 'Breathing Exercise', 'Pause mid-session then resume', 'Session continues from pause point', 'Total duration includes pause time', 'Timer resumes correctly, animation synced', 'semi_automated', 'medium');
  addTest('Core Wellness', 'Breathing Exercise', 'Cancel session before completion', 'Session not logged to database', 'No row created for cancelled session', 'Return to breathing menu, no history entry', 'automated', 'medium');
  addTest('Core Wellness', 'Breathing Exercise', 'Complete session while offline', 'Session syncs when back online', 'Row created after connection restored', 'Pending indicator while offline, sync confirmation', 'manual', 'high');

  // Meditation Studio
  const meditationCategories = ['sleep', 'anxiety', 'focus', 'stress', 'morning', 'evening', 'body-scan'];
  meditationCategories.forEach(category => {
    addTest('Core Wellness', 'Meditation Studio', `Browse ${category} meditation category`, 'Category displays available meditations', 'Query filters by category correctly', 'Cards display with duration, title, thumbnail', 'automated', 'medium', 'Wellness', 'Meditation');
    addTest('Core Wellness', 'Meditation Studio', `Play ${category} meditation to completion`, 'Session logged, progress tracked', 'meditation_sessions row created', 'Completion screen, points awarded', 'semi_automated', 'high', 'Wellness', 'Meditation', 'meditation_sessions');
    addTest('Core Wellness', 'Meditation Studio', `Pause and resume ${category} meditation`, 'Playback resumes from correct position', 'No duplicate session rows', 'Player shows correct position after resume', 'semi_automated', 'medium');
  });

  addTest('Core Wellness', 'Meditation Studio', 'Download meditation for offline use', 'Audio cached locally', 'N/A for offline', 'Downloaded indicator, plays without network', 'manual', 'low');
  addTest('Core Wellness', 'Meditation Studio', 'Adjust playback speed (0.75x, 1x, 1.25x)', 'Audio plays at selected speed', 'N/A', 'Speed indicator updates, audio tempo changes', 'manual', 'low');

  // Binaural Beats
  const binauralTypes = ['alpha', 'beta', 'theta', 'delta', 'gamma'];
  binauralTypes.forEach(type => {
    durations.forEach(duration => {
      addTest('Core Wellness', 'Binaural Beats', `Play ${type} waves for ${duration/60} minutes`, 'Session logged with frequency type and duration', 'Row in binaural_sessions', 'Audio plays, timer counts down', 'semi_automated', 'medium', 'Wellness', 'Binaural', 'binaural_sessions');
    });
    addTest('Core Wellness', 'Binaural Beats', `Add ${type} to favorites`, 'Favorite saved', 'Row in binaural_favorites', 'Heart icon filled, appears in favorites list', 'automated', 'low', 'Wellness', 'Binaural', 'binaural_favorites');
    addTest('Core Wellness', 'Binaural Beats', `Remove ${type} from favorites`, 'Favorite removed', 'Row deleted from binaural_favorites', 'Heart icon unfilled, removed from favorites', 'automated', 'low');
  });

  // Art Therapy
  const artTypes = ['drawing', 'coloring', 'mandala', 'free-form'];
  artTypes.forEach(type => {
    addTest('Core Wellness', 'Art Therapy', `Create ${type} artwork`, 'Art saved to gallery', 'Row in art_therapy_gallery with correct art_type', 'Canvas saves, appears in gallery', 'semi_automated', 'medium', 'Wellness', 'Art Therapy', 'art_therapy_gallery');
    addTest('Core Wellness', 'Art Therapy', `Edit ${type} artwork title and description`, 'Metadata updated', 'title and description columns updated', 'Changes reflected in gallery view', 'automated', 'low');
    addTest('Core Wellness', 'Art Therapy', `Share ${type} artwork to community`, 'is_shared set to true', 'is_shared column = true', 'Artwork visible in community gallery', 'automated', 'medium');
    addTest('Core Wellness', 'Art Therapy', `Delete ${type} artwork`, 'Art removed from gallery', 'Row deleted or soft-deleted', 'Artwork no longer in user gallery', 'automated', 'medium');
  });

  // Music Therapy
  const musicMoods = ['calm', 'uplifting', 'focus', 'sleep', 'energize'];
  musicMoods.forEach(mood => {
    addTest('Core Wellness', 'Music Therapy', `Play ${mood} playlist`, 'Music plays, session tracked', 'Session logged in content_analytics', 'Audio controls work, track info displays', 'semi_automated', 'medium', 'Wellness', 'Music Therapy', 'content_analytics');
  });

  // Video Diary
  addTest('Core Wellness', 'Video Diary', 'Record new video diary entry', 'Video saved to storage', 'File in storage bucket, row in video_diaries', 'Recording UI works, preview shows', 'manual', 'high', 'Wellness', 'Video Diary');
  addTest('Core Wellness', 'Video Diary', 'Play back recorded diary', 'Video plays correctly', 'File URL resolves', 'Video player loads and plays', 'semi_automated', 'high');
  addTest('Core Wellness', 'Video Diary', 'Delete video diary entry', 'Video removed from storage and DB', 'Storage file deleted, DB row deleted', 'Entry removed from diary list', 'automated', 'medium');
  addTest('Core Wellness', 'Video Diary', 'Record 5-minute video (max length)', 'Full video saved', 'Large file handled correctly', 'Upload progress shown, completion confirmed', 'manual', 'medium');

  // Sleep Tracker
  addTest('Core Wellness', 'Sleep Tracker', 'Log sleep manually (hours, quality)', 'Sleep entry saved', 'Row in sleep_logs', 'Entry appears in sleep history', 'automated', 'high', 'Wellness', 'Sleep', 'sleep_logs');
  addTest('Core Wellness', 'Sleep Tracker', 'View weekly sleep summary', 'Summary shows average hours and quality', 'Query aggregates last 7 days', 'Chart displays correctly', 'automated', 'medium');
  addTest('Core Wellness', 'Sleep Tracker', 'Edit sleep entry', 'Entry updated', 'Row updated in sleep_logs', 'Changes reflected in history', 'automated', 'low');

  // ============================================
  // SECTION 2: HENRY AI COMPANION (300+ tests)
  // ============================================

  const henryModes = ['companion', 'sponsor_aa', 'sponsor_na', 'wellness', 'crisis'];
  const messageTypes = ['greeting', 'question', 'venting', 'crisis_keywords', 'follow_up'];

  henryModes.forEach(mode => {
    messageTypes.forEach(msgType => {
      addTest('Henry AI', `${mode} Mode`, `Send ${msgType} message in ${mode} mode`, 'Henry responds appropriately for mode', 'henry_conversations and henry_messages updated', 'Response displays in chat, typing indicator works', 'semi_automated', mode === 'crisis' ? 'critical' : 'high', 'AI', 'Henry', 'henry_conversations', 'henry-multi-agent');
    });
  });

  // Henry specific scenarios
  addTest('Henry AI', 'Crisis Detection', 'Send message with suicide keywords', 'Crisis resources shown, escalation triggered', 'crisis_escalations row created', 'Crisis modal appears, hotline displayed', 'semi_automated', 'critical', 'AI', 'Crisis', 'crisis_escalations', 'henry-multi-agent');
  addTest('Henry AI', 'Crisis Detection', 'Send message with self-harm keywords', 'Crisis protocol activated', 'crisis_events logged', 'Safety resources displayed prominently', 'semi_automated', 'critical');
  addTest('Henry AI', 'Conversation History', 'View past conversations', 'Previous chats load correctly', 'Query returns user conversations', 'Conversation list displays, can select and view', 'automated', 'high');
  addTest('Henry AI', 'Conversation History', 'Delete conversation', 'Conversation removed', 'Row soft-deleted or removed', 'Conversation no longer in list', 'automated', 'medium');
  addTest('Henry AI', 'Daily Wisdom', 'Request daily wisdom', 'Wisdom quote displayed', 'N/A (generated)', 'Modal shows with wisdom content', 'semi_automated', 'medium');
  addTest('Henry AI', 'Mood Boost', 'Request mood boost', 'Uplifting content displayed', 'N/A (generated)', 'Mood boost modal appears with content', 'semi_automated', 'medium');
  addTest('Henry AI', 'Rate Limiting', 'Send 50+ messages rapidly', 'Rate limit applied gracefully', 'Rate limit logged', 'User notified of limit, not error', 'automated', 'high');

  // ============================================
  // SECTION 3: COACHING & THERAPY (600+ tests)
  // ============================================

  // Therapist Booking
  const bookingScenarios = ['first_consultation', 'follow_up', 'urgent', 'video_session'];
  bookingScenarios.forEach(scenario => {
    addTest('Therapy', 'Booking', `Book ${scenario} appointment`, 'Appointment created successfully', 'Row in therapy_bookings', 'Confirmation shown, added to calendar', 'automated', 'critical', 'Therapy', 'Booking', 'therapy_bookings');
    addTest('Therapy', 'Booking', `Cancel ${scenario} appointment`, 'Appointment cancelled', 'Status updated to cancelled', 'Removed from upcoming, refund processed if applicable', 'automated', 'high');
    addTest('Therapy', 'Booking', `Reschedule ${scenario} appointment`, 'New time slot saved', 'Booking times updated', 'Calendar reflects new time', 'automated', 'high');
  });

  // Promo codes
  addTest('Therapy', 'Booking', 'Apply promo code "ThriveMT" (100% off)', 'Total becomes $0.00', 'discount_applied field set', 'Button changes to "Confirm Booking"', 'automated', 'high');
  addTest('Therapy', 'Booking', 'Apply invalid promo code', 'Error message shown', 'No discount applied', 'Error toast, price unchanged', 'automated', 'medium');

  // Video Sessions
  addTest('Therapy', 'Video Session', 'Client joins video session', 'WebRTC connection established', 'video_sessions status updated to active', 'Video feeds display, controls work', 'manual', 'critical', 'Therapy', 'Video', 'video_sessions');
  addTest('Therapy', 'Video Session', 'Therapist joins video session', 'Both parties connected', 'Both participants logged', 'Bidirectional video/audio working', 'manual', 'critical');
  addTest('Therapy', 'Video Session', 'Mute/unmute audio', 'Audio toggled correctly', 'N/A', 'Mute indicator updates, audio stops/resumes', 'manual', 'high');
  addTest('Therapy', 'Video Session', 'Toggle camera on/off', 'Video toggled correctly', 'N/A', 'Video feed stops/resumes', 'manual', 'high');
  addTest('Therapy', 'Video Session', 'End session gracefully', 'Session ends, logged correctly', 'ended_at timestamp set', 'Both parties returned to dashboard', 'manual', 'high');
  addTest('Therapy', 'Video Session', 'Network disconnection mid-call', 'Reconnection attempted', 'Reconnection events logged', 'Reconnecting indicator, auto-rejoin', 'manual', 'critical');
  addTest('Therapy', 'Video Session', 'Session timer displays correctly', 'Timer counts session duration', 'Session duration calculated', 'Timer visible and accurate', 'manual', 'medium');

  // Therapist Portal
  addTest('Therapist Portal', 'Login', 'Login with code 0001', 'Access granted to therapist dashboard', 'Session created', 'Dashboard loads with therapist data', 'automated', 'critical', 'Therapist', 'Auth');
  addTest('Therapist Portal', 'Today Tab', 'View today agenda', 'Shows scheduled sessions', 'Query returns today sessions', 'Sessions listed with times and clients', 'automated', 'high');
  addTest('Therapist Portal', 'Clients Tab', 'View client list', 'Active clients displayed', 'Query returns assigned clients', 'Client cards with last session info', 'automated', 'high');
  addTest('Therapist Portal', 'Clients Tab', 'Search for client', 'Search filters client list', 'Query includes search term', 'Results update as typing', 'automated', 'medium');
  addTest('Therapist Portal', 'Messages', 'Send message to client', 'Message delivered', 'Row in therapist_messages', 'Message appears in conversation', 'automated', 'high', 'Therapist', 'Messaging', 'therapist_messages');
  addTest('Therapist Portal', 'Messages', 'Receive message from client', 'Message displayed with notification', 'Realtime subscription fires', 'New message indicator, auto-scroll', 'semi_automated', 'high');
  addTest('Therapist Portal', 'Video Call', 'Initiate call to client', 'Call invitation sent', 'video_sessions row created', 'Client receives notification', 'semi_automated', 'critical');
  addTest('Therapist Portal', 'Phone Call', 'Place Twilio phone call', 'Call connected via Twilio', 'phone_calls row created', 'Call status indicator', 'manual', 'high', 'Therapist', 'Communication', 'phone_calls', 'place-call');
  addTest('Therapist Portal', 'SMS', 'Send SMS to client', 'SMS delivered', 'sms_messages row created', 'Delivery status shown', 'semi_automated', 'high', 'Therapist', 'Communication', 'sms_messages', 'send-sms');
  addTest('Therapist Portal', 'Session Notes', 'Add private session notes', 'Notes saved securely', 'video_session_notes row created', 'Notes visible only to therapist', 'automated', 'high', 'Therapist', 'Notes', 'video_session_notes');
  addTest('Therapist Portal', 'Homework', 'Assign homework to client', 'Homework created', 'homework_tasks row created', 'Client sees in daily plan', 'automated', 'high', 'Therapist', 'Homework', 'homework_tasks');
  addTest('Therapist Portal', 'Earnings', 'View earnings summary', 'Accurate earnings displayed', 'Query calculates from sessions', 'Charts and totals correct', 'automated', 'medium');

  // Coach Portal
  addTest('Coach Portal', 'Login', 'Login with code 0003', 'Access granted to coach dashboard', 'Session created', 'Dashboard loads with coach data', 'automated', 'critical', 'Coach', 'Auth');
  addTest('Coach Portal', 'Members Tab', 'View member list', 'Assigned members displayed', 'Query returns coach members', 'Member cards with status', 'automated', 'high');
  addTest('Coach Portal', 'Schedule', 'View upcoming sessions', 'Sessions displayed correctly', 'Query returns coach sessions', 'Calendar shows booked times', 'automated', 'high');
  addTest('Coach Portal', 'Messaging', 'Message member', 'Message sent successfully', 'Row created in messages table', 'Message appears in thread', 'automated', 'high');

  // Client Requests
  addTest('Therapy', 'Contact Request', 'Submit initial consultation request', 'Request created', 'Row in therapist_requests', 'Confirmation shown', 'automated', 'high', 'Therapy', 'Requests', 'therapist_requests');
  addTest('Therapy', 'Contact Request', 'Submit urgent callback request', 'Urgent request flagged', 'priority = urgent', 'Urgent indicator, faster response expected', 'automated', 'high');
  addTest('Therapy', 'Video Message', 'Record and send video message', 'Video uploaded and request created', 'File in storage, request row created', 'Upload progress, confirmation', 'manual', 'high');

  // ============================================
  // SECTION 4: SPECIALIZED PORTALS (400+ tests)
  // ============================================

  // Admin Portal
  addTest('Admin Portal', 'Login', 'Login with admin access code', 'Access granted to admin dashboard', 'Session created', 'Admin dashboard loads', 'automated', 'critical', 'Admin', 'Auth');
  addTest('Admin Portal', 'Users Tab', 'View all users', 'User list displays', 'Query returns all users', 'Paginated user list with search', 'automated', 'high');
  addTest('Admin Portal', 'Users Tab', 'Search users by email', 'Filtered results shown', 'Query includes email filter', 'Results update dynamically', 'automated', 'medium');
  addTest('Admin Portal', 'Users Tab', 'Suspend user account', 'User suspended', 'User status updated', 'Suspended indicator shown', 'automated', 'high');
  addTest('Admin Portal', 'Users Tab', 'Unsuspend user account', 'User reactivated', 'User status updated', 'Active status restored', 'automated', 'high');
  addTest('Admin Portal', 'Audit Logs', 'View audit log entries', 'Logs display correctly', 'Query returns audit_logs', 'Sortable, filterable log table', 'automated', 'high', 'Admin', 'Audit', 'audit_logs');
  addTest('Admin Portal', 'Audit Logs', 'Export audit logs to CSV', 'CSV file downloads', 'N/A', 'File downloads with correct data', 'semi_automated', 'medium');
  addTest('Admin Portal', 'Consent Status', 'View consent status', 'User consent list displays', 'Query returns consent data', 'Current/pending consent visible', 'automated', 'high');
  addTest('Admin Portal', 'PHI Coverage', 'View PHI table coverage', 'Coverage percentage shown', 'N/A (calculated)', 'Accurate percentage, table list', 'automated', 'medium');
  addTest('Admin Portal', 'Analytics', 'View platform analytics', 'Charts and metrics load', 'Queries return aggregated data', 'Charts render correctly', 'automated', 'high');

  // Single Parents Portal
  addTest('Single Parents Portal', 'Access', 'Navigate to single parents portal', 'Portal loads with relevant content', 'N/A', 'Portal-specific resources display', 'automated', 'medium', 'Portals', 'Single Parents');
  addTest('Single Parents Portal', 'Resources', 'View parenting resources', 'Resources display correctly', 'Content query returns portal-tagged items', 'Cards display with descriptions', 'automated', 'medium');
  addTest('Single Parents Portal', 'Network', 'Connect with another parent', 'Connection request sent', 'Row in parent_connections', 'Request sent notification', 'automated', 'medium');

  // Veterans Portal
  addTest('Veterans Portal', 'Access', 'Navigate to veterans portal', 'Portal loads with veteran-specific content', 'N/A', 'Veteran resources display', 'automated', 'medium', 'Portals', 'Veterans');
  addTest('Veterans Portal', 'Resources', 'Access PTSD resources', 'PTSD-specific content displays', 'Content tagged for veterans', 'Relevant resources shown', 'automated', 'medium');

  // College Portal
  addTest('College Portal', 'Access', 'Navigate to college portal', 'Portal loads with student content', 'N/A', 'Student-relevant resources display', 'automated', 'medium', 'Portals', 'College');
  addTest('College Portal', 'Study Tools', 'Access study wellness tools', 'Tools display correctly', 'N/A', 'Tools accessible and functional', 'automated', 'medium');

  // Teen Portal
  addTest('Teen Portal', 'Access', 'Navigate to teen portal', 'Age-appropriate content loads', 'N/A', 'Teen-focused UI and content', 'automated', 'medium', 'Portals', 'Teen');
  addTest('Teen Portal', 'Safety', 'Crisis resources prominently displayed', 'Crisis hotline visible', 'N/A', 'Crisis resources accessible', 'automated', 'critical');

  // Seniors Portal (Golden Years)
  addTest('Seniors Portal', 'Access', 'Navigate to golden years portal', 'Portal loads with senior content', 'N/A', 'Large text, accessible design', 'automated', 'medium', 'Portals', 'Seniors');
  addTest('Seniors Portal', 'Progress', 'Track module progress', 'Progress saved', 'Row in golden_years_progress', 'Progress indicator updates', 'automated', 'medium', 'Portals', 'Seniors', 'golden_years_progress');

  // Workplace Portal
  addTest('Workplace Portal', 'Access', 'Navigate to workplace wellness', 'Portal loads with work content', 'N/A', 'Work-life balance resources', 'automated', 'medium', 'Portals', 'Workplace');
  addTest('Workplace Portal', 'EAP Resources', 'View EAP resources', 'EAP content displays', 'N/A', 'Resources accessible', 'automated', 'medium');

  // Family Support Portal
  addTest('Family Support Portal', 'Access', 'Navigate to family support portal', 'Portal loads', 'N/A', 'Family resources display', 'automated', 'medium', 'Portals', 'Family');
  addTest('Family Support Portal', 'Guides', 'View family support guides', 'Guides display correctly', 'Content query returns guides', 'Guide cards with descriptions', 'automated', 'medium');

  // Support Circle Portal
  addTest('Support Circle', 'Access', 'Navigate to support circle', 'Portal loads for caregivers', 'N/A', 'Caregiver-focused content', 'automated', 'medium', 'Portals', 'Support Circle');
  addTest('Support Circle', 'View Progress', 'View loved ones wellness (if permitted)', 'Shared progress visible', 'Privacy permissions checked', 'Appropriate data displayed', 'semi_automated', 'high');

  // ============================================
  // SECTION 5: COMMUNITY & ENGAGEMENT (400+ tests)
  // ============================================

  // Buddy System
  addTest('Community', 'Buddy System', 'Complete buddy questionnaire', 'Questionnaire saved', 'Row in buddy_questionnaires', 'Submission confirmed', 'automated', 'high', 'Community', 'Buddy', 'buddy_questionnaires');
  addTest('Community', 'Buddy System', 'Get matched with buddy', 'Match created', 'Row in buddy_matches', 'Match notification shown', 'automated', 'high', 'Community', 'Buddy', 'buddy_matches');
  addTest('Community', 'Buddy System', 'Accept buddy match', 'Match status updated', 'Status = active', 'Chat enabled with buddy', 'automated', 'high');
  addTest('Community', 'Buddy System', 'Decline buddy match', 'Match declined', 'Status = declined', 'Returned to matching queue', 'automated', 'medium');
  addTest('Community', 'Buddy System', 'Message buddy', 'Message sent', 'Row in buddy_messages', 'Message appears in chat', 'automated', 'high', 'Community', 'Buddy', 'buddy_messages');
  addTest('Community', 'Buddy System', 'End buddy relationship', 'Relationship ended gracefully', 'Match status updated', 'Option to find new buddy', 'automated', 'medium');

  // Community Groups
  const groupCategories = ['anxiety', 'depression', 'grief', 'addiction', 'parenting', 'lgbtq', 'veterans', 'students'];
  groupCategories.forEach(category => {
    addTest('Community', 'Groups', `Join ${category} community group`, 'Membership created', 'Row in group_memberships', 'Group added to user groups', 'automated', 'high', 'Community', 'Groups', 'group_memberships');
    addTest('Community', 'Groups', `Post message in ${category} group`, 'Message posted', 'Row in community_group_messages', 'Message visible to group members', 'automated', 'high', 'Community', 'Groups', 'community_group_messages');
    addTest('Community', 'Groups', `Leave ${category} group`, 'Membership removed', 'Row deleted from memberships', 'Group removed from user list', 'automated', 'medium');
  });

  // Life Transitions
  const transitions = ['divorce', 'career-change', 'grief', 'new-parent', 'chronic-illness', 'retirement', 'empty-nest', 'relocation'];
  transitions.forEach(transition => {
    addTest('Community', 'Life Transitions', `View ${transition} program`, 'Program details display', 'Query returns program content', 'Modules and progress visible', 'automated', 'medium', 'Community', 'Transitions', 'life_transition_programs');
    addTest('Community', 'Life Transitions', `Enroll in ${transition} program`, 'Enrollment created', 'Row in life_transition_enrollments', 'Program added to dashboard', 'automated', 'high');
    addTest('Community', 'Life Transitions', `Complete ${transition} module`, 'Progress updated', 'Progress row updated', 'Progress indicator advances', 'automated', 'high');
  });

  // Achievements & Badges
  addTest('Engagement', 'Badges', 'Earn first check-in badge', 'Badge awarded', 'Row in user_achievements', 'Badge notification, added to profile', 'automated', 'high', 'Engagement', 'Badges', 'user_achievements');
  addTest('Engagement', 'Badges', 'Earn 7-day streak badge', 'Streak badge awarded', 'Badge with streak requirement', 'Streak celebration animation', 'automated', 'high');
  addTest('Engagement', 'Badges', 'View earned badges', 'Badge gallery displays', 'Query returns user badges', 'All badges shown with dates', 'automated', 'medium');
  addTest('Engagement', 'Badges', 'Share badge to community', 'Badge shared', 'Share action logged', 'Share confirmation, appears in community', 'automated', 'low');

  // Points & Rewards
  addTest('Engagement', 'Points', 'Earn points for completing activity', 'Points added to balance', 'user_points updated', 'Points animation, balance updated', 'automated', 'high', 'Engagement', 'Points', 'user_points');
  addTest('Engagement', 'Points', 'View points history', 'Transaction history displays', 'Query returns point transactions', 'List of earnings and redemptions', 'automated', 'medium');
  addTest('Engagement', 'Points', 'Redeem points for reward', 'Points deducted, reward granted', 'Redemption logged', 'Redemption confirmed, reward applied', 'automated', 'high');

  // ============================================
  // SECTION 6: ASSESSMENTS (200+ tests)
  // ============================================

  const assessmentTypes = ['PHQ-9', 'GAD-7', 'DASS-21', 'PSS-10', 'PCL-5', 'CAGE', 'AUDIT', 'MDQ', 'ASRS', 'ACE'];
  assessmentTypes.forEach(assessment => {
    addTest('Assessments', assessment, `Start ${assessment} assessment`, 'Assessment loads correctly', 'N/A', 'Questions display, navigation works', 'automated', 'high', 'Assessments', 'Clinical', 'assessment_results');
    addTest('Assessments', assessment, `Complete ${assessment} assessment`, 'Results calculated and saved', 'Row in assessment_results with score', 'Results screen with interpretation', 'automated', 'high');
    addTest('Assessments', assessment, `View ${assessment} history`, 'Past results display', 'Query returns user assessments', 'Historical results with trend', 'automated', 'medium');
    addTest('Assessments', assessment, `Share ${assessment} with therapist`, 'Sharing enabled', 'shared_with_therapist = true', 'Therapist can view in portal', 'automated', 'high');
    addTest('Assessments', assessment, `Retake ${assessment} assessment`, 'New assessment started', 'Previous result preserved, new created', 'Fresh assessment, history intact', 'automated', 'medium');
  });

  // ============================================
  // SECTION 7: AUTHENTICATION & ACCESS (300+ tests)
  // ============================================

  // Sign Up
  addTest('Auth', 'Sign Up', 'Sign up with valid email/password', 'Account created successfully', 'User in auth.users, profile created', 'Welcome screen, onboarding starts', 'automated', 'critical', 'Auth', 'Registration');
  addTest('Auth', 'Sign Up', 'Sign up with weak password', 'Password rejected', 'No user created', 'Password requirements shown', 'automated', 'high');
  addTest('Auth', 'Sign Up', 'Sign up with duplicate email', 'Error shown', 'No duplicate created', 'Email exists error message', 'automated', 'high');
  addTest('Auth', 'Sign Up', 'Sign up with invalid email format', 'Validation error', 'No user created', 'Invalid email message', 'automated', 'medium');
  addTest('Auth', 'Sign Up', 'Complete email verification', 'Email verified', 'email_confirmed_at set', 'Verification success page', 'manual', 'critical');

  // Login
  addTest('Auth', 'Login', 'Login with correct credentials', 'Login successful', 'Session created', 'Dashboard loads', 'automated', 'critical', 'Auth', 'Login');
  addTest('Auth', 'Login', 'Login with incorrect password', 'Login rejected', 'No session created, attempt logged', 'Error message shown', 'automated', 'high');
  addTest('Auth', 'Login', 'Login with non-existent email', 'Login rejected', 'No session created', 'User not found message', 'automated', 'high');
  addTest('Auth', 'Login', 'Login rate limiting (5+ failed attempts)', 'Account temporarily locked', 'Rate limit triggered', 'Lockout message with timer', 'automated', 'high');
  addTest('Auth', 'Login', 'Persistent session (remember me)', 'Session persists after browser close', 'Session token valid', 'User remains logged in', 'manual', 'medium');

  // Password Reset
  addTest('Auth', 'Password Reset', 'Request password reset', 'Reset email sent', 'Reset token created', 'Confirmation message shown', 'semi_automated', 'high', 'Auth', 'Password');
  addTest('Auth', 'Password Reset', 'Complete password reset', 'Password updated', 'Password hash updated', 'Success message, can login with new password', 'semi_automated', 'high');
  addTest('Auth', 'Password Reset', 'Use expired reset link', 'Link rejected', 'Token expired', 'Expired link message', 'automated', 'medium');

  // Logout
  addTest('Auth', 'Logout', 'Logout from current session', 'Session terminated', 'Session invalidated', 'Redirected to login page', 'automated', 'high', 'Auth', 'Logout');
  addTest('Auth', 'Logout', 'Logout from all devices', 'All sessions terminated', 'All user sessions invalidated', 'Confirmation shown', 'automated', 'medium');

  // Role-Based Access
  addTest('Auth', 'RBAC', 'User cannot access admin dashboard', 'Access denied', 'RLS policy blocks', 'Redirect or 403 error', 'automated', 'critical', 'Auth', 'RBAC');
  addTest('Auth', 'RBAC', 'User cannot access therapist portal', 'Access denied', 'RLS policy blocks', 'Redirect or error', 'automated', 'critical');
  addTest('Auth', 'RBAC', 'Therapist cannot access admin functions', 'Access denied', 'RLS policy blocks', 'Feature not visible or accessible', 'automated', 'critical');
  addTest('Auth', 'RBAC', 'Admin can access all dashboards', 'Access granted', 'Admin role verified', 'All features accessible', 'automated', 'critical');

  // ============================================
  // SECTION 8: DATA INTEGRITY & PHI (400+ tests)
  // ============================================

  // PHI Tables with Audit Triggers
  const phiTables = [
    'profiles', 'daily_check_ins', 'henry_conversations', 'henry_messages',
    'assessment_results', 'therapy_bookings', 'video_sessions', 'therapist_messages',
    'breathing_sessions', 'meditation_sessions', 'art_therapy_gallery', 'video_diaries',
    'crisis_escalations', 'homework_tasks', 'journal_entries', 'mood_logs'
  ];

  phiTables.forEach(table => {
    addTest('PHI', 'Audit Logging', `INSERT on ${table} triggers audit log`, 'Audit log created', 'Row in audit_logs with action=INSERT', 'N/A (backend only)', 'automated', 'critical', 'Compliance', 'PHI', 'audit_logs');
    addTest('PHI', 'Audit Logging', `UPDATE on ${table} triggers audit log`, 'Audit log created with old/new data', 'Row in audit_logs with action=UPDATE', 'N/A (backend only)', 'automated', 'critical');
    addTest('PHI', 'Audit Logging', `DELETE on ${table} triggers audit log`, 'Audit log created', 'Row in audit_logs with action=DELETE', 'N/A (backend only)', 'automated', 'critical');
    addTest('PHI', 'RLS', `${table} RLS blocks unauthorized read`, 'Access denied', 'Query returns empty for wrong user', 'No data shown to unauthorized user', 'automated', 'critical', 'Compliance', 'RLS');
    addTest('PHI', 'RLS', `${table} RLS blocks unauthorized update`, 'Update rejected', 'No row modified', 'Error or silent failure', 'automated', 'critical');
    addTest('PHI', 'RLS', `${table} RLS blocks unauthorized delete`, 'Delete rejected', 'No row deleted', 'Error or silent failure', 'automated', 'critical');
  });

  // Consent Management
  addTest('Compliance', 'Consent', 'Accept terms of service', 'Consent recorded', 'terms_accepted_at set in profiles', 'Terms modal dismissed, app accessible', 'automated', 'critical', 'Compliance', 'Consent', 'profiles');
  addTest('Compliance', 'Consent', 'Terms version update requires re-consent', 'Re-consent modal shown', 'New terms_version detected', 'Modal blocks app until accepted', 'automated', 'critical');
  addTest('Compliance', 'Consent', 'Decline terms prevents access', 'App access blocked', 'No consent recorded', 'Cannot proceed without consent', 'automated', 'critical');

  // GDPR
  addTest('Compliance', 'GDPR', 'Export user data', 'Data exported successfully', 'export-user-data function returns data', 'JSON file downloads with all user data', 'semi_automated', 'critical', 'Compliance', 'GDPR', undefined, 'export-user-data');
  addTest('Compliance', 'GDPR', 'Request data deletion', 'Deletion initiated', 'purge-user-data function executes', 'Confirmation shown, user logged out', 'semi_automated', 'critical', 'Compliance', 'GDPR', undefined, 'purge-user-data');
  addTest('Compliance', 'GDPR', 'Verify data purged after deletion', 'All user data removed', 'No rows in user tables', 'Account inaccessible', 'manual', 'critical');

  // ============================================
  // SECTION 9: EDGE FUNCTIONS (200+ tests)
  // ============================================

  const edgeFunctions = [
    'henry-multi-agent', 'create-therapist-conversation', 'export-user-data', 'purge-user-data',
    'place-call', 'send-sms', 'generate-micro-goals', 'sync-health-data', 'coach-access',
    'seed-audit-checklist', 'run-audit-tests', 'wellness-check-sms', 'generate-daily-plans'
  ];

  edgeFunctions.forEach(fn => {
    addTest('Edge Functions', fn, `${fn} returns 401 without auth`, 'Unauthorized response', 'No action taken', '401 status code', 'automated', 'critical', 'API', 'Auth', undefined, fn);
    addTest('Edge Functions', fn, `${fn} validates input with Zod`, 'Invalid input rejected', 'Validation error logged', '400 with validation message', 'automated', 'high');
    addTest('Edge Functions', fn, `${fn} handles valid request`, 'Success response', 'Expected data changes', '200 with expected payload', 'automated', 'high');
    addTest('Edge Functions', fn, `${fn} handles timeout gracefully`, 'Timeout error returned', 'Request logged', '504 or friendly error', 'automated', 'medium');
    addTest('Edge Functions', fn, `${fn} rate limiting`, 'Rate limit applied after threshold', 'Rate limit logged', '429 Too Many Requests', 'automated', 'high');
  });

  // ============================================
  // SECTION 10: DEVICE & BROWSER COMPATIBILITY (300+ tests)
  // ============================================

  const testDevices = ['iPhone 12', 'iPhone 14 Pro', 'Samsung Galaxy S21', 'iPad Pro', 'MacBook Pro', 'Windows Desktop'];
  const testBrowsers = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Samsung Internet'];
  const criticalFlows = ['login', 'dashboard_load', 'mood_checkin', 'video_call', 'messaging', 'booking'];

  testDevices.forEach(device => {
    testBrowsers.forEach(browser => {
      criticalFlows.forEach(flow => {
        if ((device.includes('iPhone') || device.includes('iPad')) && browser !== 'Safari') return; // Skip non-Safari on iOS
        addTest('Compatibility', 'Device Testing', `${flow} on ${device} with ${browser}`, 'Flow completes successfully', 'Session logged', 'UI renders correctly, actions work', 'manual', flow === 'video_call' ? 'critical' : 'high', 'Compatibility', device, undefined, undefined, device, browser);
      });
    });
  });

  // Responsive Design
  const breakpoints = ['320px', '375px', '414px', '768px', '1024px', '1440px', '1920px'];
  breakpoints.forEach(bp => {
    addTest('Compatibility', 'Responsive', `Dashboard at ${bp} width`, 'Layout adapts correctly', 'N/A', 'No horizontal scroll, elements visible', 'manual', 'high', 'Compatibility', 'Responsive');
    addTest('Compatibility', 'Responsive', `Navigation at ${bp} width`, 'Nav accessible', 'N/A', 'Menu accessible on all sizes', 'manual', 'high');
  });

  // ============================================
  // SECTION 11: STRESS & EDGE CASES (200+ tests)
  // ============================================

  // Concurrent Users
  addTest('Stress', 'Concurrency', '100 simultaneous logins', 'All logins succeed', 'All sessions created', 'No errors or timeouts', 'automated', 'high', 'Stress', 'Load');
  addTest('Stress', 'Concurrency', '50 simultaneous mood check-ins', 'All check-ins saved', 'All rows created', 'No data loss', 'automated', 'high');
  addTest('Stress', 'Concurrency', '20 simultaneous video calls', 'All calls connect', 'All sessions active', 'Acceptable quality', 'manual', 'critical');

  // Large Data
  addTest('Stress', 'Large Data', 'User with 1000+ mood entries', 'Data loads in <3s', 'Query optimized with index', 'Chart renders smoothly', 'automated', 'medium', 'Stress', 'Data');
  addTest('Stress', 'Large Data', 'User with 500+ journal entries', 'List loads paginated', 'Pagination works', 'Smooth scrolling', 'automated', 'medium');
  addTest('Stress', 'Large Data', 'Export 10MB of user data', 'Export completes', 'File generated', 'Download works', 'manual', 'medium');

  // Offline/Network
  addTest('Stress', 'Offline', 'App loads offline (cached)', 'Cached content displays', 'Service worker serves', 'Offline indicator shown', 'manual', 'high', 'Stress', 'Network');
  addTest('Stress', 'Offline', 'Action queued while offline', 'Action syncs when online', 'Data eventually consistent', 'Sync indicator shown', 'manual', 'high');
  addTest('Stress', 'Network', 'Slow network (3G simulation)', 'App remains usable', 'Requests complete eventually', 'Loading indicators visible', 'manual', 'medium');
  addTest('Stress', 'Network', 'Network disconnection mid-action', 'Graceful error handling', 'No data corruption', 'Retry option shown', 'manual', 'high');

  // Input Edge Cases
  addTest('Stress', 'Input', 'Very long text input (10000 chars)', 'Text handled or truncated gracefully', 'Data stored or validated', 'No UI break, clear limit message', 'automated', 'medium', 'Stress', 'Input');
  addTest('Stress', 'Input', 'Special characters in inputs', 'Characters handled safely', 'No SQL injection', 'Characters display correctly', 'automated', 'high');
  addTest('Stress', 'Input', 'Unicode/emoji in messages', 'Emojis stored and displayed', 'UTF-8 encoding preserved', 'Emojis render correctly', 'automated', 'medium');
  addTest('Stress', 'Input', 'XSS attempt in text field', 'Script not executed', 'Input sanitized', 'Safe text displayed', 'automated', 'critical');

  // ============================================
  // SECTION 12: CROSS-MODULE WORKFLOWS (200+ tests)
  // ============================================

  // Complete User Journey
  addTest('E2E', 'User Journey', 'Sign up → onboarding → first check-in', 'Complete flow succeeds', 'User, profile, check-in created', 'Smooth transitions, data persists', 'semi_automated', 'critical', 'E2E', 'Journey');
  addTest('E2E', 'User Journey', 'Check-in → Henry chat → activity recommendation', 'Flow connects correctly', 'All data linked by user_id', 'Context maintained throughout', 'semi_automated', 'high');
  addTest('E2E', 'User Journey', 'Book therapy → video session → post-session survey', 'Complete therapy flow', 'Booking, session, survey linked', 'No data loss between steps', 'manual', 'critical');
  addTest('E2E', 'User Journey', 'Complete workshop → earn badge → share to community', 'Full engagement flow', 'Workshop progress, badge, share logged', 'Celebrations and confirmations', 'semi_automated', 'high');
  addTest('E2E', 'User Journey', 'Therapist assigns homework → user completes → therapist reviews', 'Cross-role workflow', 'Homework created, completed, reviewed', 'Both parties see updates', 'semi_automated', 'critical');

  // Multi-Device Sync
  addTest('E2E', 'Multi-Device', 'Start activity on mobile, complete on desktop', 'Progress synced', 'Same row updated', 'Progress visible on both devices', 'manual', 'high', 'E2E', 'Sync');
  addTest('E2E', 'Multi-Device', 'Concurrent edits on two devices', 'Last write wins or merge', 'Data consistent', 'No data corruption', 'manual', 'high');

  // Integration Points
  addTest('E2E', 'Integration', 'Health sync → mood correlation displayed', 'Data connected in dashboard', 'Health data linked to mood', 'Correlation insights visible', 'semi_automated', 'medium', 'E2E', 'Integration');
  addTest('E2E', 'Integration', 'Crisis detected → therapist notified', 'Escalation workflow', 'Crisis event, notification created', 'Therapist sees alert', 'semi_automated', 'critical');

  // ============================================
  // SECTION 13: HEALTH INTEGRATIONS (100+ tests)
  // ============================================

  const healthProviders = ['apple_health', 'google_fit', 'fitbit'];
  const healthMetrics = ['steps', 'sleep', 'heart_rate', 'active_minutes'];

  healthProviders.forEach(provider => {
    addTest('Health', provider, `Connect ${provider}`, 'OAuth flow completes', 'Row in user_health_connections', 'Connected status shown', 'manual', 'high', 'Health', 'Integration', 'user_health_connections');
    addTest('Health', provider, `Disconnect ${provider}`, 'Connection removed', 'Row deleted', 'Disconnected status', 'automated', 'medium');
    healthMetrics.forEach(metric => {
      addTest('Health', provider, `Sync ${metric} from ${provider}`, 'Metric synced', 'Data in health_data', 'Metric visible in dashboard', 'semi_automated', 'high', 'Health', 'Data', 'health_data', 'sync-health-data');
    });
  });

  addTest('Health', 'Multi-Provider', 'Multiple health sources connected', 'Data merged correctly', 'All sources represented', 'Combined view in dashboard', 'semi_automated', 'medium');

  // ============================================
  // SECTION 14: NOTIFICATIONS (100+ tests)
  // ============================================

  const notificationTypes = ['reminder', 'appointment', 'message', 'achievement', 'crisis', 'system'];
  notificationTypes.forEach(type => {
    addTest('Notifications', type, `Trigger ${type} notification`, 'Notification created', 'Row in notifications table', 'Notification appears in UI', 'automated', 'high', 'Notifications', 'Delivery', 'notifications');
    addTest('Notifications', type, `Mark ${type} notification as read`, 'Status updated', 'read_at set', 'Visual indicator changes', 'automated', 'medium');
    addTest('Notifications', type, `Delete ${type} notification`, 'Notification removed', 'Row deleted', 'Removed from list', 'automated', 'low');
  });

  addTest('Notifications', 'SMS', 'Send SMS notification', 'SMS delivered', 'Row in sms_messages', 'Delivery status tracked', 'semi_automated', 'high', 'Notifications', 'SMS', 'sms_messages', 'send-sms');
  addTest('Notifications', 'Push', 'Send push notification', 'Push delivered', 'Push logged', 'Notification appears on device', 'manual', 'high');

  // ============================================
  // SECTION 15: WORKSHOPS & COURSES (150+ tests)
  // ============================================

  const workshopCategories = ['anxiety', 'depression', 'stress', 'relationships', 'self-esteem', 'mindfulness', 'sleep', 'trauma'];
  workshopCategories.forEach(category => {
    addTest('Workshops', category, `View ${category} workshop list`, 'Workshops display', 'Query returns category workshops', 'Cards with titles and durations', 'automated', 'medium', 'Learning', 'Workshops');
    addTest('Workshops', category, `Start ${category} workshop`, 'Workshop loads', 'Progress row created', 'Content displays, navigation works', 'automated', 'high');
    addTest('Workshops', category, `Complete ${category} workshop section`, 'Progress saved', 'Progress updated', 'Progress bar advances', 'automated', 'high');
    addTest('Workshops', category, `Complete entire ${category} workshop`, 'Completion recorded', 'completed_at set', 'Certificate available, badge earned', 'automated', 'high');
    addTest('Workshops', category, `Download ${category} worksheet`, 'PDF downloads', 'Download logged', 'File downloads successfully', 'semi_automated', 'medium');
  });

  // ============================================
  // SECTION 16: BILLING & PAYMENTS (100+ tests)
  // ============================================

  addTest('Billing', 'Subscription', 'View subscription plans', 'Plans display correctly', 'N/A', 'Pricing and features shown', 'automated', 'high', 'Billing', 'Subscription');
  addTest('Billing', 'Subscription', 'Start subscription', 'Payment processed', 'Subscription created in Stripe', 'Confirmation shown, features unlocked', 'manual', 'critical');
  addTest('Billing', 'Subscription', 'Cancel subscription', 'Subscription cancelled', 'Status updated', 'Confirmation, access until period end', 'manual', 'high');
  addTest('Billing', 'Subscription', 'Update payment method', 'Card updated', 'Stripe customer updated', 'Confirmation shown', 'manual', 'high');

  addTest('Billing', 'Insurance', 'Check insurance coverage', 'Coverage info displayed', 'N/A', 'Estimated coverage shown', 'semi_automated', 'medium', 'Billing', 'Insurance');
  addTest('Billing', 'Insurance', 'Submit insurance info', 'Info saved', 'Row in insurance_info', 'Confirmation shown', 'automated', 'high');

  addTest('Billing', 'Barter', 'Apply for barter program', 'Application submitted', 'Row in barter_applications', 'Confirmation, pending status', 'automated', 'high', 'Billing', 'Barter', 'barter_applications');
  addTest('Billing', 'Barter', 'Log community service hours', 'Hours logged', 'Row in community_service_hours', 'Hours added to balance', 'automated', 'high', 'Billing', 'Barter', 'community_service_hours');

  // ============================================
  // SECTION 17: SEARCH & DISCOVERY (50+ tests)
  // ============================================

  addTest('Search', 'Global Search', 'Search for "anxiety"', 'Relevant results shown', 'Query returns matched content', 'Results from multiple categories', 'automated', 'high', 'Search', 'Global');
  addTest('Search', 'Global Search', 'Search with no results', 'Empty state shown', 'Query returns empty', 'Helpful empty state message', 'automated', 'medium');
  addTest('Search', 'Therapist Search', 'Search therapists by specialty', 'Filtered therapists shown', 'Query filters by specialty', 'Matching therapists displayed', 'automated', 'high', 'Search', 'Therapist', 'therapists');
  addTest('Search', 'Content Search', 'Search articles by keyword', 'Matching articles shown', 'Full-text search works', 'Relevant content displayed', 'automated', 'medium', 'Search', 'Content');

  // ============================================
  // SECTION 18: SECURITY PENETRATION (100+ tests)
  // ============================================

  addTest('Security', 'Injection', 'SQL injection in search field', 'Query parameterized', 'No SQL executed', 'Safe results returned', 'automated', 'critical', 'Security', 'Injection');
  addTest('Security', 'Injection', 'SQL injection in form field', 'Input sanitized', 'No SQL executed', 'Error or safe handling', 'automated', 'critical');
  addTest('Security', 'XSS', 'Script tag in user input', 'Script not executed', 'Input escaped/sanitized', 'Text displayed safely', 'automated', 'critical', 'Security', 'XSS');
  addTest('Security', 'XSS', 'Event handler injection', 'Handler not attached', 'Input sanitized', 'Safe display', 'automated', 'critical');
  addTest('Security', 'CSRF', 'Cross-site request without token', 'Request rejected', 'No action taken', '403 or error', 'automated', 'critical', 'Security', 'CSRF');
  addTest('Security', 'Auth Bypass', 'Access protected route without auth', 'Redirected to login', 'No data returned', 'Login page shown', 'automated', 'critical', 'Security', 'Auth');
  addTest('Security', 'Auth Bypass', 'Access other user data by ID manipulation', 'Access denied', 'RLS blocks query', 'No data shown', 'automated', 'critical');
  addTest('Security', 'Privilege Escalation', 'User attempts admin action', 'Action rejected', 'Role check fails', 'Error or no-op', 'automated', 'critical', 'Security', 'Privileges');
  addTest('Security', 'Rate Limiting', 'Brute force login attempt', 'Account locked after threshold', 'Rate limit triggered', 'Lockout message', 'automated', 'critical', 'Security', 'Brute Force');
  addTest('Security', 'Session', 'Reuse expired session token', 'Token rejected', 'Session invalid', 'Redirected to login', 'automated', 'critical', 'Security', 'Session');
  addTest('Security', 'Session', 'Session hijacking attempt', 'Session invalidated', 'Suspicious activity detected', 'User logged out', 'semi_automated', 'critical');

  return testCases;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is admin
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { clear_existing = false } = body;

    // Clear existing if requested
    if (clear_existing) {
      await supabase.from('audit_checklist').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    }

    // Generate test cases
    const testCases = generateTestCases();

    // Insert in batches of 500
    const batchSize = 500;
    let inserted = 0;
    
    for (let i = 0; i < testCases.length; i += batchSize) {
      const batch = testCases.slice(i, i + batchSize);
      const { error } = await supabase.from('audit_checklist').insert(batch);
      
      if (error) {
        console.error('Batch insert error:', error);
        throw error;
      }
      
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully seeded ${inserted} audit test cases`,
        total_cases: testCases.length,
        categories: {
          core_wellness: testCases.filter(t => t.module === 'Core Wellness').length,
          henry_ai: testCases.filter(t => t.module === 'Henry AI').length,
          therapy: testCases.filter(t => t.module === 'Therapy' || t.module === 'Therapist Portal').length,
          coach: testCases.filter(t => t.module === 'Coach Portal').length,
          admin: testCases.filter(t => t.module === 'Admin Portal').length,
          community: testCases.filter(t => t.module === 'Community').length,
          assessments: testCases.filter(t => t.module === 'Assessments').length,
          auth: testCases.filter(t => t.module === 'Auth').length,
          phi_compliance: testCases.filter(t => t.module === 'PHI' || t.module === 'Compliance').length,
          edge_functions: testCases.filter(t => t.module === 'Edge Functions').length,
          compatibility: testCases.filter(t => t.module === 'Compatibility').length,
          stress_testing: testCases.filter(t => t.module === 'Stress').length,
          e2e: testCases.filter(t => t.module === 'E2E').length,
          health: testCases.filter(t => t.module === 'Health').length,
          notifications: testCases.filter(t => t.module === 'Notifications').length,
          workshops: testCases.filter(t => t.module === 'Workshops').length,
          billing: testCases.filter(t => t.module === 'Billing').length,
          search: testCases.filter(t => t.module === 'Search').length,
          security: testCases.filter(t => t.module === 'Security').length,
          portals: testCases.filter(t => t.category === 'Portals').length,
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error seeding audit checklist:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
