export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievement_badges: {
        Row: {
          badge_key: string
          category: string
          created_at: string | null
          description: string
          icon_name: string
          id: string
          points_value: number | null
          requirement_type: string
          requirement_value: number
          tier: string | null
          title: string
        }
        Insert: {
          badge_key: string
          category: string
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          points_value?: number | null
          requirement_type: string
          requirement_value: number
          tier?: string | null
          title: string
        }
        Update: {
          badge_key?: string
          category?: string
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          points_value?: number | null
          requirement_type?: string
          requirement_value?: number
          tier?: string | null
          title?: string
        }
        Relationships: []
      }
      activities_catalog: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          estimated_minutes: number
          goal_tags: string[] | null
          icon_name: string | null
          id: string
          is_featured: boolean | null
          points_reward: number | null
          portal_tags: string[] | null
          route_path: string | null
          slug: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          estimated_minutes: number
          goal_tags?: string[] | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          points_reward?: number | null
          portal_tags?: string[] | null
          route_path?: string | null
          slug: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          estimated_minutes?: number
          goal_tags?: string[] | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          points_reward?: number | null
          portal_tags?: string[] | null
          route_path?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_match_logs: {
        Row: {
          algorithm_version: string | null
          created_at: string | null
          id: string
          match_reasons: Json | null
          match_score: number | null
          override_by: string | null
          override_reason: string | null
          therapist_id: string | null
          user_id: string | null
          user_preferences: Json | null
          user_satisfaction_rating: number | null
          was_overridden: boolean | null
        }
        Insert: {
          algorithm_version?: string | null
          created_at?: string | null
          id?: string
          match_reasons?: Json | null
          match_score?: number | null
          override_by?: string | null
          override_reason?: string | null
          therapist_id?: string | null
          user_id?: string | null
          user_preferences?: Json | null
          user_satisfaction_rating?: number | null
          was_overridden?: boolean | null
        }
        Update: {
          algorithm_version?: string | null
          created_at?: string | null
          id?: string
          match_reasons?: Json | null
          match_score?: number | null
          override_by?: string | null
          override_reason?: string | null
          therapist_id?: string | null
          user_id?: string | null
          user_preferences?: Json | null
          user_satisfaction_rating?: number | null
          was_overridden?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_match_logs_override_by_fkey"
            columns: ["override_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_match_logs_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_match_logs_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_match_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_recommendations: {
        Row: {
          clicked_at: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          reasoning: Json | null
          recommendation_type: string | null
          recommended_item_id: string | null
          recommended_item_type: string | null
          user_feedback: string | null
          user_id: string | null
          was_clicked: boolean | null
          was_completed: boolean | null
        }
        Insert: {
          clicked_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          reasoning?: Json | null
          recommendation_type?: string | null
          recommended_item_id?: string | null
          recommended_item_type?: string | null
          user_feedback?: string | null
          user_id?: string | null
          was_clicked?: boolean | null
          was_completed?: boolean | null
        }
        Update: {
          clicked_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          reasoning?: Json | null
          recommendation_type?: string | null
          recommended_item_id?: string | null
          recommended_item_type?: string | null
          user_feedback?: string | null
          user_id?: string | null
          was_clicked?: boolean | null
          was_completed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_session_summaries: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          generated_at: string | null
          id: string
          key_topics: string[] | null
          mood_trend: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_flags: string[] | null
          summary_type: string | null
          therapist_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          generated_at?: string | null
          id?: string
          key_topics?: string[] | null
          mood_trend?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_flags?: string[] | null
          summary_type?: string | null
          therapist_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          generated_at?: string | null
          id?: string
          key_topics?: string[] | null
          mood_trend?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_flags?: string[] | null
          summary_type?: string | null
          therapist_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_session_summaries_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "henry_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_session_summaries_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_session_summaries_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_session_summaries_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_session_summaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string | null
          last_used_at: string | null
          partner_name: string
          rate_limit: number | null
          scopes: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix?: string | null
          last_used_at?: string | null
          partner_name: string
          rate_limit?: number | null
          scopes?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string | null
          last_used_at?: string | null
          partner_name?: string
          rate_limit?: number | null
          scopes?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_usage_logs: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown
          method: string | null
          response_time_ms: number | null
          status_code: number | null
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: unknown
          method?: string | null
          response_time_ms?: number | null
          status_code?: number | null
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown
          method?: string | null
          response_time_ms?: number | null
          status_code?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      art_therapy_gallery: {
        Row: {
          art_type: string | null
          created_at: string | null
          description: string | null
          file_path: string | null
          file_url: string | null
          id: string
          is_shared: boolean | null
          mood_expressed: string | null
          title: string
          user_id: string
        }
        Insert: {
          art_type?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_shared?: boolean | null
          mood_expressed?: string | null
          title: string
          user_id: string
        }
        Update: {
          art_type?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_shared?: boolean | null
          mood_expressed?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      assessment_results: {
        Row: {
          assessment_type: string
          created_at: string | null
          id: string
          responses: Json
          score: number
          severity: string | null
          shared_with_therapist: boolean | null
          user_id: string
        }
        Insert: {
          assessment_type: string
          created_at?: string | null
          id?: string
          responses: Json
          score: number
          severity?: string | null
          shared_with_therapist?: boolean | null
          user_id: string
        }
        Update: {
          assessment_type?: string
          created_at?: string | null
          id?: string
          responses?: Json
          score?: number
          severity?: string | null
          shared_with_therapist?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          assigned_at: string | null
          created_at: string | null
          ended_at: string | null
          id: string
          notes: string | null
          organization_id: string | null
          patient_id: string
          provider_id: string
          provider_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          created_at?: string | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          patient_id: string
          provider_id: string
          provider_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          created_at?: string | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          patient_id?: string
          provider_id?: string
          provider_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_role: string | null
          created_at: string | null
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          actor_role?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          actor_role?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      auth_user_audit: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          operator: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          operator?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          operator?: string | null
          user_id?: string
        }
        Relationships: []
      }
      barter_applications: {
        Row: {
          availability: string[] | null
          can_contribute: number | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          income_range: string | null
          notes: string | null
          phone: string | null
          preferred_service: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          session_cost: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          availability?: string[] | null
          can_contribute?: number | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          income_range?: string | null
          notes?: string | null
          phone?: string | null
          preferred_service?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_cost?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          availability?: string[] | null
          can_contribute?: number | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          income_range?: string | null
          notes?: string | null
          phone?: string | null
          preferred_service?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_cost?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      binaural_favorites: {
        Row: {
          created_at: string | null
          frequency_name: string
          frequency_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          frequency_name: string
          frequency_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          frequency_name?: string
          frequency_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      binaural_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number
          frequency_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes: number
          frequency_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          frequency_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      breathing_sessions: {
        Row: {
          created_at: string | null
          duration_seconds: number
          id: string
          pattern_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds: number
          id?: string
          pattern_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number
          id?: string
          pattern_type?: string
          user_id?: string
        }
        Relationships: []
      }
      buddy_matches: {
        Row: {
          created_at: string | null
          ended_at: string | null
          goals_shared: Json | null
          id: string
          matched_at: string | null
          status: string | null
          user_1_id: string
          user_2_id: string
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          goals_shared?: Json | null
          id?: string
          matched_at?: string | null
          status?: string | null
          user_1_id: string
          user_2_id: string
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          goals_shared?: Json | null
          id?: string
          matched_at?: string | null
          status?: string | null
          user_1_id?: string
          user_2_id?: string
        }
        Relationships: []
      }
      buddy_messages: {
        Row: {
          created_at: string | null
          id: string
          match_id: string
          message: string
          read: boolean | null
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_id: string
          message: string
          read?: boolean | null
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          match_id?: string
          message?: string
          read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "buddy_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "buddy_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      buddy_volunteers: {
        Row: {
          availability_hours: string | null
          created_at: string
          email: string
          experience_description: string | null
          full_name: string
          id: string
          motivation: string | null
          phone: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          specialties: string[] | null
          status: string
          training_background: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability_hours?: string | null
          created_at?: string
          email: string
          experience_description?: string | null
          full_name: string
          id?: string
          motivation?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialties?: string[] | null
          status?: string
          training_background?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability_hours?: string | null
          created_at?: string
          email?: string
          experience_description?: string | null
          full_name?: string
          id?: string
          motivation?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialties?: string[] | null
          status?: string
          training_background?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_analytics: {
        Row: {
          bounce_count: number | null
          campaign_id: string | null
          clicked_count: number | null
          converted_count: number | null
          delivered_count: number | null
          id: string
          opened_count: number | null
          recorded_at: string | null
          revenue_generated: number | null
          sent_count: number
          unsubscribed_count: number | null
        }
        Insert: {
          bounce_count?: number | null
          campaign_id?: string | null
          clicked_count?: number | null
          converted_count?: number | null
          delivered_count?: number | null
          id?: string
          opened_count?: number | null
          recorded_at?: string | null
          revenue_generated?: number | null
          sent_count: number
          unsubscribed_count?: number | null
        }
        Update: {
          bounce_count?: number | null
          campaign_id?: string | null
          clicked_count?: number | null
          converted_count?: number | null
          delivered_count?: number | null
          id?: string
          opened_count?: number | null
          recorded_at?: string | null
          revenue_generated?: number | null
          sent_count?: number
          unsubscribed_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_recipients: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          conversion_value: number | null
          converted: boolean | null
          id: string
          opened_at: string | null
          sent_at: string | null
          unsubscribed: boolean | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          unsubscribed?: boolean | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          unsubscribed?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      career_assessments: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          resource_type: Database["public"]["Enums"]["career_resource_type"]
          responses: Json | null
          results: Json | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          resource_type: Database["public"]["Enums"]["career_resource_type"]
          responses?: Json | null
          results?: Json | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          resource_type?: Database["public"]["Enums"]["career_resource_type"]
          responses?: Json | null
          results?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      career_coaching_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string
          module_name: string
          notes: Json | null
          progress_percentage: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id: string
          module_name: string
          notes?: Json | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string
          module_name?: string
          notes?: Json | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      career_module_progress: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          module_type: Database["public"]["Enums"]["career_module_type"]
          progress: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          module_type: Database["public"]["Enums"]["career_module_type"]
          progress?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          module_type?: Database["public"]["Enums"]["career_module_type"]
          progress?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chatbot_conversations: {
        Row: {
          conversation_duration_seconds: number | null
          created_at: string | null
          escalated_to_human: boolean | null
          escalation_reason: string | null
          id: string
          message_count: number | null
          resolved_without_human: boolean | null
          satisfaction_rating: number | null
          sentiment_score: number | null
          session_id: string
          topics: string[] | null
          user_id: string | null
        }
        Insert: {
          conversation_duration_seconds?: number | null
          created_at?: string | null
          escalated_to_human?: boolean | null
          escalation_reason?: string | null
          id?: string
          message_count?: number | null
          resolved_without_human?: boolean | null
          satisfaction_rating?: number | null
          sentiment_score?: number | null
          session_id: string
          topics?: string[] | null
          user_id?: string | null
        }
        Update: {
          conversation_duration_seconds?: number | null
          created_at?: string | null
          escalated_to_human?: boolean | null
          escalation_reason?: string | null
          id?: string
          message_count?: number | null
          resolved_without_human?: boolean | null
          satisfaction_rating?: number | null
          sentiment_score?: number | null
          session_id?: string
          topics?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      churn_predictions: {
        Row: {
          churn_probability: number | null
          created_at: string | null
          id: string
          intervention_sent: boolean | null
          intervention_suggested: string | null
          predicted_churn_date: string | null
          prediction_model_version: string | null
          risk_factors: Json | null
          risk_level: string | null
          user_id: string | null
        }
        Insert: {
          churn_probability?: number | null
          created_at?: string | null
          id?: string
          intervention_sent?: boolean | null
          intervention_suggested?: string | null
          predicted_churn_date?: string | null
          prediction_model_version?: string | null
          risk_factors?: Json | null
          risk_level?: string | null
          user_id?: string | null
        }
        Update: {
          churn_probability?: number | null
          created_at?: string | null
          id?: string
          intervention_sent?: boolean | null
          intervention_suggested?: string | null
          predicted_churn_date?: string | null
          prediction_model_version?: string | null
          risk_factors?: Json | null
          risk_level?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "churn_predictions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_documents: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          session_date: string | null
          shared_with_client: boolean | null
          therapist_id: string
          title: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          session_date?: string | null
          shared_with_client?: boolean | null
          therapist_id: string
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          session_date?: string | null
          shared_with_client?: boolean | null
          therapist_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_documents_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_documents_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          approach: string | null
          availability_hours: string | null
          bio: string | null
          certifications: string[] | null
          communication_styles: string[] | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          languages: string[] | null
          name: string
          rating: number | null
          specialties: string[]
          title: string
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          weekly_text_rate: number | null
        }
        Insert: {
          approach?: string | null
          availability_hours?: string | null
          bio?: string | null
          certifications?: string[] | null
          communication_styles?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          languages?: string[] | null
          name: string
          rating?: number | null
          specialties?: string[]
          title: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          weekly_text_rate?: number | null
        }
        Update: {
          approach?: string | null
          availability_hours?: string | null
          bio?: string | null
          certifications?: string[] | null
          communication_styles?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          languages?: string[] | null
          name?: string
          rating?: number | null
          specialties?: string[]
          title?: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          weekly_text_rate?: number | null
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          additional_notes: string | null
          created_at: string | null
          focus_area: string
          id: string
          preferred_date: string
          preferred_time: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          focus_area: string
          id?: string
          preferred_date: string
          preferred_time: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          focus_area?: string
          id?: string
          preferred_date?: string
          preferred_time?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      community_group_messages: {
        Row: {
          content: string
          created_at: string
          group_id: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          group_id: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          group_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_group_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      community_groups: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          member_count: number | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          member_count?: number | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          member_count?: number | null
          name?: string
        }
        Relationships: []
      }
      community_impact: {
        Row: {
          anonymous_quote: string | null
          created_at: string | null
          id: string
          impact_type: string
          source_post_id: string | null
          user_id: string
        }
        Insert: {
          anonymous_quote?: string | null
          created_at?: string | null
          id?: string
          impact_type: string
          source_post_id?: string | null
          user_id: string
        }
        Update: {
          anonymous_quote?: string | null
          created_at?: string | null
          id?: string
          impact_type?: string
          source_post_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      community_service_hours: {
        Row: {
          barter_application_id: string | null
          created_at: string | null
          credit_value: number | null
          hours_logged: number
          id: string
          service_date: string
          service_description: string
          user_id: string
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          barter_application_id?: string | null
          created_at?: string | null
          credit_value?: number | null
          hours_logged: number
          id?: string
          service_date: string
          service_description: string
          user_id: string
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          barter_application_id?: string | null
          created_at?: string | null
          credit_value?: number | null
          hours_logged?: number
          id?: string
          service_date?: string
          service_description?: string
          user_id?: string
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_service_hours_barter_application_id_fkey"
            columns: ["barter_application_id"]
            isOneToOne: false
            referencedRelation: "barter_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_violations: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          user_id: string | null
          violation_type: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          user_id?: string | null
          violation_type: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          user_id?: string | null
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_violations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      constellation_data: {
        Row: {
          activity_type: string
          brightness: number | null
          color: string | null
          date_created: string | null
          id: string
          metadata: Json | null
          star_name: string
          user_id: string
          x_position: number
          y_position: number
        }
        Insert: {
          activity_type: string
          brightness?: number | null
          color?: string | null
          date_created?: string | null
          id?: string
          metadata?: Json | null
          star_name: string
          user_id: string
          x_position: number
          y_position: number
        }
        Update: {
          activity_type?: string
          brightness?: number | null
          color?: string | null
          date_created?: string | null
          id?: string
          metadata?: Json | null
          star_name?: string
          user_id?: string
          x_position?: number
          y_position?: number
        }
        Relationships: []
      }
      content_analytics: {
        Row: {
          action: string
          content_id: string | null
          created_at: string | null
          id: string
          session_duration_seconds: number | null
          user_id: string | null
        }
        Insert: {
          action: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          session_duration_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          action?: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          session_duration_seconds?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_analytics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_library: {
        Row: {
          category: string | null
          content_body: string | null
          content_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          file_url: string | null
          id: string
          portal_tags: string[] | null
          published_at: string | null
          reviewed_by: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          category?: string | null
          content_body?: string | null
          content_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          portal_tags?: string[] | null
          published_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          category?: string | null
          content_body?: string | null
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          portal_tags?: string[] | null
          published_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_library_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_library_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          changed_by: string | null
          changes: Json | null
          content_id: string | null
          created_at: string | null
          id: string
          version: number
        }
        Insert: {
          changed_by?: string | null
          changes?: Json | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          version: number
        }
        Update: {
          changed_by?: string | null
          changes?: Json | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_type: Database["public"]["Enums"]["career_course_type"]
          created_at: string | null
          enrolled_at: string | null
          id: string
          progress: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_type: Database["public"]["Enums"]["career_course_type"]
          created_at?: string | null
          enrolled_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_type?: Database["public"]["Enums"]["career_course_type"]
          created_at?: string | null
          enrolled_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      crisis_escalations: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          notes: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crisis_escalations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_escalations_v2: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          notes: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          trigger_data: Json | null
          trigger_source: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          trigger_data?: Json | null
          trigger_source: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          trigger_data?: Json | null
          trigger_source?: string
          user_id?: string | null
        }
        Relationships: []
      }
      crisis_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          source: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          source?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          source?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cross_dashboard_notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          notification_type: string
          read: boolean | null
          recipient_id: string
          sender_id: string | null
          sender_type: string
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          notification_type: string
          read?: boolean | null
          recipient_id: string
          sender_id?: string | null
          sender_type: string
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          notification_type?: string
          read?: boolean | null
          recipient_id?: string
          sender_id?: string | null
          sender_type?: string
          title?: string
        }
        Relationships: []
      }
      custom_reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          filters: Json | null
          format: string | null
          id: string
          last_generated_at: string | null
          metrics: Json | null
          name: string
          recipients: string[] | null
          report_type: string | null
          schedule: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          format?: string | null
          id?: string
          last_generated_at?: string | null
          metrics?: Json | null
          name: string
          recipients?: string[] | null
          report_type?: string | null
          schedule?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          format?: string | null
          id?: string
          last_generated_at?: string | null
          metrics?: Json | null
          name?: string
          recipients?: string[] | null
          report_type?: string | null
          schedule?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_reports_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_check_ins: {
        Row: {
          created_at: string
          id: string
          mood_label: string | null
          mood_score: number
          note: string | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_label?: string | null
          mood_score: number
          note?: string | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_label?: string | null
          mood_score?: number
          note?: string | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      daily_plans: {
        Row: {
          activities: Json
          generated_at: string | null
          id: string
          metadata: Json | null
          plan_date: string
          user_id: string
        }
        Insert: {
          activities: Json
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          plan_date: string
          user_id: string
        }
        Update: {
          activities?: Json
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          plan_date?: string
          user_id?: string
        }
        Relationships: []
      }
      dashboard_layout_preferences: {
        Row: {
          created_at: string | null
          id: string
          is_custom: boolean | null
          is_locked: boolean | null
          last_auto_adjustment: string | null
          learning_enabled: boolean | null
          section_order: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_custom?: boolean | null
          is_locked?: boolean | null
          last_auto_adjustment?: string | null
          learning_enabled?: boolean | null
          section_order: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_custom?: boolean | null
          is_locked?: boolean | null
          last_auto_adjustment?: string | null
          learning_enabled?: boolean | null
          section_order?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      dashboard_section_analytics: {
        Row: {
          created_at: string | null
          date: string
          engagement_score: number | null
          id: string
          interaction_count: number | null
          section_id: string
          total_time_seconds: number | null
          total_views: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          engagement_score?: number | null
          id?: string
          interaction_count?: number | null
          section_id: string
          total_time_seconds?: number | null
          total_views?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          engagement_score?: number | null
          id?: string
          interaction_count?: number | null
          section_id?: string
          total_time_seconds?: number | null
          total_views?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      dashboard_section_interactions: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          interaction_type: string
          metadata: Json | null
          section_id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          section_id: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          section_id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      data_access_logs: {
        Row: {
          access_reason: string | null
          accessed_user_id: string | null
          accessor_id: string
          created_at: string | null
          data_type: string
          id: string
          ip_address: unknown
          user_agent: string | null
        }
        Insert: {
          access_reason?: string | null
          accessed_user_id?: string | null
          accessor_id: string
          created_at?: string | null
          data_type: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Update: {
          access_reason?: string | null
          accessed_user_id?: string | null
          accessor_id?: string
          created_at?: string | null
          data_type?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Relationships: []
      }
      data_retention_policies: {
        Row: {
          auto_purge: boolean | null
          created_at: string | null
          data_type: string
          id: string
          retention_days: number
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          auto_purge?: boolean | null
          created_at?: string | null
          data_type: string
          id?: string
          retention_days?: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_purge?: boolean | null
          created_at?: string | null
          data_type?: string
          id?: string
          retention_days?: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_retention_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          created_at: string | null
          event_date: string
          event_title: string
          event_type: string
          id: string
          registered_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_date: string
          event_title: string
          event_type: string
          id?: string
          registered_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_date?: string
          event_title?: string
          event_type?: string
          id?: string
          registered_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feature_achievements: {
        Row: {
          achievement_data: Json | null
          achievement_type: string
          feature_name: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_data?: Json | null
          achievement_type: string
          feature_name: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_data?: Json | null
          achievement_type?: string
          feature_name?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          id: string
          message: string
          rating: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          rating?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      garden_progress: {
        Row: {
          activity_category: string
          created_at: string | null
          days_grown: number | null
          growth_stage: string
          id: string
          last_watered_at: string | null
          metadata: Json | null
          plant_type: string
          planted_at: string | null
          user_id: string
        }
        Insert: {
          activity_category: string
          created_at?: string | null
          days_grown?: number | null
          growth_stage?: string
          id?: string
          last_watered_at?: string | null
          metadata?: Json | null
          plant_type: string
          planted_at?: string | null
          user_id: string
        }
        Update: {
          activity_category?: string
          created_at?: string | null
          days_grown?: number | null
          growth_stage?: string
          id?: string
          last_watered_at?: string | null
          metadata?: Json | null
          plant_type?: string
          planted_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      golden_years_progress: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          lesson_id: number
          module_type: string
          responses: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id: number
          module_type: string
          responses?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: number
          module_type?: string
          responses?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gratitude_entries: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      group_memberships: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_answers: {
        Row: {
          answer_text: string
          author: string
          created_at: string | null
          id: string
          published_at: string | null
          question_id: string
          updated_at: string | null
        }
        Insert: {
          answer_text: string
          author?: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          question_id: string
          updated_at?: string | null
        }
        Update: {
          answer_text?: string
          author?: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          question_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "henry_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_qa_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "henry_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_appreciations: {
        Row: {
          created_at: string | null
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_appreciations_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_qa_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "henry_appreciations_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_bookmarks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_qa_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "henry_bookmarks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "henry_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_conversations: {
        Row: {
          current_risk_level: string | null
          id: string
          last_message_at: string | null
          message_count: number | null
          metadata: Json | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          current_risk_level?: string | null
          id?: string
          last_message_at?: string | null
          message_count?: number | null
          metadata?: Json | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          current_risk_level?: string | null
          id?: string
          last_message_at?: string | null
          message_count?: number | null
          metadata?: Json | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      henry_messages: {
        Row: {
          agent_type: string | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          intent_classification: Json | null
          risk_assessment: Json | null
          role: string
        }
        Insert: {
          agent_type?: string | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          intent_classification?: Json | null
          risk_assessment?: Json | null
          role: string
        }
        Update: {
          agent_type?: string | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          intent_classification?: Json | null
          risk_assessment?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "henry_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_messages_v2: {
        Row: {
          agent_type: string | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          intent_classification: Json | null
          risk_assessment: Json | null
          role: string
        }
        Insert: {
          agent_type?: string | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          intent_classification?: Json | null
          risk_assessment?: Json | null
          role: string
        }
        Update: {
          agent_type?: string | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          intent_classification?: Json | null
          risk_assessment?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_messages_v2_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "henry_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_mood_trends: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          id: string
          mood_score: number | null
          sentiment: string | null
          topics: string[] | null
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          mood_score?: number | null
          sentiment?: string | null
          topics?: string[] | null
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          mood_score?: number | null
          sentiment?: string | null
          topics?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_mood_trends_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "henry_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      henry_questions: {
        Row: {
          category: Database["public"]["Enums"]["henry_category"]
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          question_text: string
          status: Database["public"]["Enums"]["henry_status"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["henry_category"]
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          question_text: string
          status?: Database["public"]["Enums"]["henry_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["henry_category"]
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          question_text?: string
          status?: Database["public"]["Enums"]["henry_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      henry_risk_assessments: {
        Row: {
          confidence_score: number | null
          conversation_id: string
          created_at: string | null
          id: string
          message_id: string | null
          recommended_action: string | null
          risk_factors: string[] | null
          risk_level: string
        }
        Insert: {
          confidence_score?: number | null
          conversation_id: string
          created_at?: string | null
          id?: string
          message_id?: string | null
          recommended_action?: string | null
          risk_factors?: string[] | null
          risk_level: string
        }
        Update: {
          confidence_score?: number | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_id?: string | null
          recommended_action?: string | null
          risk_factors?: string[] | null
          risk_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "henry_risk_assessments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "henry_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "henry_risk_assessments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "henry_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_tasks: {
        Row: {
          assigned_by: string
          assigned_to: string
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          organization_id: string | null
          priority: string | null
          resources: Json | null
          status: string | null
          task_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string | null
          priority?: string | null
          resources?: Json | null
          status?: string | null
          task_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string | null
          priority?: string | null
          resources?: Json | null
          status?: string | null
          task_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homework_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homework_tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      insight_tokens: {
        Row: {
          created_at: string | null
          id: string
          tokens_earned: number | null
          total_appreciations: number | null
          total_bookmarks: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          tokens_earned?: number | null
          total_appreciations?: number | null
          total_bookmarks?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          tokens_earned?: number | null
          total_appreciations?: number | null
          total_bookmarks?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      insights_cache: {
        Row: {
          generated_at: string | null
          id: string
          insight_text: string
          insight_type: string
          metadata: Json | null
          user_id: string
          valid_until: string
        }
        Insert: {
          generated_at?: string | null
          id?: string
          insight_text: string
          insight_type: string
          metadata?: Json | null
          user_id: string
          valid_until: string
        }
        Update: {
          generated_at?: string | null
          id?: string
          insight_text?: string
          insight_type?: string
          metadata?: Json | null
          user_id?: string
          valid_until?: string
        }
        Relationships: []
      }
      integration_sync_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          errors_encountered: number | null
          id: string
          integration_id: string | null
          records_synced: number | null
          sync_duration_seconds: number | null
          sync_status: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          errors_encountered?: number | null
          id?: string
          integration_id?: string | null
          records_synced?: number | null
          sync_duration_seconds?: number | null
          sync_status?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          errors_encountered?: number | null
          id?: string
          integration_id?: string | null
          records_synced?: number | null
          sync_duration_seconds?: number | null
          sync_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_sync_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string | null
          error_log: Json | null
          id: string
          last_sync_at: string | null
          name: string
          provider: string | null
          status: string | null
          sync_frequency: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          error_log?: Json | null
          id?: string
          last_sync_at?: string | null
          name: string
          provider?: string | null
          status?: string | null
          sync_frequency?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          error_log?: Json | null
          id?: string
          last_sync_at?: string | null
          name?: string
          provider?: string | null
          status?: string | null
          sync_frequency?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          mood: string
          mood_score: number | null
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          mood: string
          mood_score?: number | null
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          mood?: string
          mood_score?: number | null
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      journey_milestones: {
        Row: {
          achieved_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          metadata: Json | null
          milestone_type: string
          title: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          metadata?: Json | null
          milestone_type: string
          title: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          metadata?: Json | null
          milestone_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      life_transition_programs: {
        Row: {
          category: string
          cover_image_url: string | null
          created_at: string | null
          description: string
          duration_weeks: number
          id: string
          slug: string
          title: string
          weekly_content: Json
        }
        Insert: {
          category: string
          cover_image_url?: string | null
          created_at?: string | null
          description: string
          duration_weeks: number
          id?: string
          slug: string
          title: string
          weekly_content: Json
        }
        Update: {
          category?: string
          cover_image_url?: string | null
          created_at?: string | null
          description?: string
          duration_weeks?: number
          id?: string
          slug?: string
          title?: string
          weekly_content?: Json
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          body: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          scheduled_for: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          target_segment: Json | null
          target_user_count: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          target_segment?: Json | null
          target_user_count?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          target_segment?: Json | null
          target_user_count?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_campaigns_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meditation_favorites: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          meditation_id: string
          meditation_title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          meditation_id: string
          meditation_title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          meditation_id?: string
          meditation_title?: string
          user_id?: string
        }
        Relationships: []
      }
      meditation_sessions: {
        Row: {
          audio_file_url: string | null
          category: string
          completed: boolean | null
          created_at: string | null
          duration_seconds: number
          id: string
          session_title: string
          user_id: string
        }
        Insert: {
          audio_file_url?: string | null
          category: string
          completed?: boolean | null
          created_at?: string | null
          duration_seconds: number
          id?: string
          session_title: string
          user_id: string
        }
        Update: {
          audio_file_url?: string | null
          category?: string
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number
          id?: string
          session_title?: string
          user_id?: string
        }
        Relationships: []
      }
      mini_sessions: {
        Row: {
          anxiety: number | null
          coaching: string | null
          created_at: string
          energy: number | null
          focus: string
          id: string
          mood: number | null
          shared_with_therapist: boolean | null
          summary: string | null
          tags: string[] | null
          urge_level: number | null
          user_id: string
          user_text_primary: string | null
          user_text_secondary: string | null
        }
        Insert: {
          anxiety?: number | null
          coaching?: string | null
          created_at?: string
          energy?: number | null
          focus: string
          id?: string
          mood?: number | null
          shared_with_therapist?: boolean | null
          summary?: string | null
          tags?: string[] | null
          urge_level?: number | null
          user_id: string
          user_text_primary?: string | null
          user_text_secondary?: string | null
        }
        Update: {
          anxiety?: number | null
          coaching?: string | null
          created_at?: string
          energy?: number | null
          focus?: string
          id?: string
          mood?: number | null
          shared_with_therapist?: boolean | null
          summary?: string | null
          tags?: string[] | null
          urge_level?: number | null
          user_id?: string
          user_text_primary?: string | null
          user_text_secondary?: string | null
        }
        Relationships: []
      }
      mini_wins: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      model_performance: {
        Row: {
          dataset_size: number | null
          id: string
          is_production: boolean | null
          metric_name: string | null
          metric_value: number | null
          model_name: string
          notes: string | null
          recorded_at: string | null
          training_date: string | null
          version: string | null
        }
        Insert: {
          dataset_size?: number | null
          id?: string
          is_production?: boolean | null
          metric_name?: string | null
          metric_value?: number | null
          model_name: string
          notes?: string | null
          recorded_at?: string | null
          training_date?: string | null
          version?: string | null
        }
        Update: {
          dataset_size?: number | null
          id?: string
          is_production?: boolean | null
          metric_name?: string | null
          metric_value?: number | null
          model_name?: string
          notes?: string | null
          recorded_at?: string | null
          training_date?: string | null
          version?: string | null
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string | null
          id: string
          mood_label: string | null
          mood_score: number
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mood_label?: string | null
          mood_score: number
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mood_label?: string | null
          mood_score?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      music_therapy_recordings: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          file_path: string | null
          file_url: string | null
          id: string
          instrument: string
          mood_after: string | null
          mood_before: string | null
          notes: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          instrument: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          instrument?: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      parent_connections: {
        Row: {
          accepted_at: string | null
          connection_type: string
          created_at: string | null
          id: string
          nickname: string | null
          notes: string | null
          recipient_id: string
          requester_id: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          connection_type: string
          created_at?: string | null
          id?: string
          nickname?: string | null
          notes?: string | null
          recipient_id: string
          requester_id: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          connection_type?: string
          created_at?: string | null
          id?: string
          nickname?: string | null
          notes?: string | null
          recipient_id?: string
          requester_id?: string
          status?: string
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          currency: string | null
          failure_reason: string | null
          gateway_transaction_id: string | null
          id: string
          metadata: Json | null
          payment_gateway: string | null
          payment_method: string
          refund_amount: number | null
          refunded_at: string | null
          status: string
          subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          gateway_transaction_id?: string | null
          id?: string
          metadata?: Json | null
          payment_gateway?: string | null
          payment_method: string
          refund_amount?: number | null
          refunded_at?: string | null
          status: string
          subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          gateway_transaction_id?: string | null
          id?: string
          metadata?: Json | null
          payment_gateway?: string | null
          payment_method?: string
          refund_amount?: number | null
          refunded_at?: string | null
          status?: string
          subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "therapy_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_calls: {
        Row: {
          call_sid: string
          client_id: string | null
          created_at: string
          direction: string | null
          duration_seconds: number | null
          ended_at: string | null
          from_number: string
          id: string
          status: string
          therapist_id: string | null
          to_number: string
        }
        Insert: {
          call_sid: string
          client_id?: string | null
          created_at?: string
          direction?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          from_number: string
          id?: string
          status?: string
          therapist_id?: string | null
          to_number: string
        }
        Update: {
          call_sid?: string
          client_id?: string | null
          created_at?: string
          direction?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          from_number?: string
          id?: string
          status?: string
          therapist_id?: string | null
          to_number?: string
        }
        Relationships: []
      }
      plan_generation_analytics: {
        Row: {
          ai_cost_usd: number | null
          avg_generation_time_ms: number | null
          errors: Json | null
          failed_generations: number
          generated_at: string | null
          id: string
          successful_generations: number
          total_users: number
        }
        Insert: {
          ai_cost_usd?: number | null
          avg_generation_time_ms?: number | null
          errors?: Json | null
          failed_generations: number
          generated_at?: string | null
          id?: string
          successful_generations: number
          total_users: number
        }
        Update: {
          ai_cost_usd?: number | null
          avg_generation_time_ms?: number | null
          errors?: Json | null
          failed_generations?: number
          generated_at?: string | null
          id?: string
          successful_generations?: number
          total_users?: number
        }
        Relationships: []
      }
      platform_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at: string | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at?: string | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          recorded_at?: string | null
        }
        Relationships: []
      }
      points_ledger: {
        Row: {
          change: number
          created_at: string | null
          id: string
          metadata: Json | null
          reason: string | null
          user_id: string | null
        }
        Insert: {
          change: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          change?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          assigned_therapist_id: string | null
          avatar_url: string | null
          consent_accepted_at: string | null
          created_at: string | null
          deleted_at: string | null
          display_name: string | null
          email: string | null
          financial_aid_amount: number | null
          financial_aid_eligible: boolean | null
          goals: string[] | null
          id: string
          is_therapist: boolean | null
          last_activity_at: string | null
          onboarding_completed: boolean | null
          primary_portal: string | null
          risk_level: string | null
          secondary_portal: string | null
          terms_version: string | null
          time_preference_minutes: number | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          assigned_therapist_id?: string | null
          avatar_url?: string | null
          consent_accepted_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          email?: string | null
          financial_aid_amount?: number | null
          financial_aid_eligible?: boolean | null
          goals?: string[] | null
          id: string
          is_therapist?: boolean | null
          last_activity_at?: string | null
          onboarding_completed?: boolean | null
          primary_portal?: string | null
          risk_level?: string | null
          secondary_portal?: string | null
          terms_version?: string | null
          time_preference_minutes?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          assigned_therapist_id?: string | null
          avatar_url?: string | null
          consent_accepted_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_name?: string | null
          email?: string | null
          financial_aid_amount?: number | null
          financial_aid_eligible?: boolean | null
          goals?: string[] | null
          id?: string
          is_therapist?: boolean | null
          last_activity_at?: string | null
          onboarding_completed?: boolean | null
          primary_portal?: string | null
          risk_level?: string | null
          secondary_portal?: string | null
          terms_version?: string | null
          time_preference_minutes?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_assigned_therapist_id_fkey"
            columns: ["assigned_therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_assigned_therapist_id_fkey"
            columns: ["assigned_therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          applicable_plans: string[] | null
          code: string
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_purchase_amount: number | null
        }
        Insert: {
          applicable_plans?: string[] | null
          code: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_amount?: number | null
        }
        Update: {
          applicable_plans?: string[] | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_tracking: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          referral_code: string | null
          referred_user_id: string | null
          referrer_id: string | null
          reward_amount: number | null
          reward_given: boolean | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code?: string | null
          referred_user_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          reward_given?: boolean | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code?: string | null
          referred_user_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          reward_given?: boolean | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_tracking_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      replies: {
        Row: {
          content: string
          created_at: string
          hearts: number | null
          id: string
          whisper_id: string
        }
        Insert: {
          content: string
          created_at?: string
          hearts?: number | null
          id?: string
          whisper_id: string
        }
        Update: {
          content?: string
          created_at?: string
          hearts?: number | null
          id?: string
          whisper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "replies_whisper_id_fkey"
            columns: ["whisper_id"]
            isOneToOne: false
            referencedRelation: "whispers"
            referencedColumns: ["id"]
          },
        ]
      }
      reply_hearts: {
        Row: {
          created_at: string | null
          id: string
          reply_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reply_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reply_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_hearts_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
        ]
      }
      response_templates: {
        Row: {
          body: string
          category: string | null
          created_at: string | null
          created_by: string | null
          id: string
          merge_fields: string[] | null
          title: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          body: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          merge_fields?: string[] | null
          title: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          body?: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          merge_fields?: string[] | null
          title?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "response_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_forecasts: {
        Row: {
          assumptions: Json | null
          confidence_interval_high: number | null
          confidence_interval_low: number | null
          created_at: string | null
          forecast_date: string
          forecast_method: string | null
          id: string
          predicted_revenue: number | null
        }
        Insert: {
          assumptions?: Json | null
          confidence_interval_high?: number | null
          confidence_interval_low?: number | null
          created_at?: string | null
          forecast_date: string
          forecast_method?: string | null
          id?: string
          predicted_revenue?: number | null
        }
        Update: {
          assumptions?: Json | null
          confidence_interval_high?: number | null
          confidence_interval_low?: number | null
          created_at?: string | null
          forecast_date?: string
          forecast_method?: string | null
          id?: string
          predicted_revenue?: number | null
        }
        Relationships: []
      }
      reward_transactions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          points: number
          source: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          points: number
          source: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          points?: number
          source?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      rewards_wallet: {
        Row: {
          copay_credits_usd: number | null
          current_points: number | null
          lifetime_earned: number | null
          lifetime_redeemed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          copay_credits_usd?: number | null
          current_points?: number | null
          lifetime_earned?: number | null
          lifetime_redeemed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          copay_credits_usd?: number | null
          current_points?: number | null
          lifetime_earned?: number | null
          lifetime_redeemed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      session_analytics: {
        Row: {
          avg_session_duration_minutes: number | null
          date: string
          feature_usage: Json | null
          hour_of_day: number | null
          id: string
          portal_breakdown: Json | null
          recorded_at: string | null
          total_active_users: number | null
          total_sessions: number | null
        }
        Insert: {
          avg_session_duration_minutes?: number | null
          date: string
          feature_usage?: Json | null
          hour_of_day?: number | null
          id?: string
          portal_breakdown?: Json | null
          recorded_at?: string | null
          total_active_users?: number | null
          total_sessions?: number | null
        }
        Update: {
          avg_session_duration_minutes?: number | null
          date?: string
          feature_usage?: Json | null
          hour_of_day?: number | null
          id?: string
          portal_breakdown?: Json | null
          recorded_at?: string | null
          total_active_users?: number | null
          total_sessions?: number | null
        }
        Relationships: []
      }
      shared_activities: {
        Row: {
          activity_type: string
          assigned_to: string | null
          child_name: string | null
          completed: boolean | null
          completed_at: string | null
          connection_id: string
          created_at: string | null
          creator_id: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          activity_type: string
          assigned_to?: string | null
          child_name?: string | null
          completed?: boolean | null
          completed_at?: string | null
          connection_id: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          activity_type?: string
          assigned_to?: string | null
          child_name?: string | null
          completed?: boolean | null
          completed_at?: string | null
          connection_id?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shared_activities_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "parent_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_calendar_events: {
        Row: {
          child_name: string | null
          color: string | null
          connection_id: string
          created_at: string | null
          creator_id: string
          description: string | null
          end_time: string | null
          event_type: string
          id: string
          is_recurring: boolean | null
          location: string | null
          recurrence_rule: string | null
          reminder_minutes: number | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          child_name?: string | null
          color?: string | null
          connection_id: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          end_time?: string | null
          event_type: string
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          reminder_minutes?: number | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          child_name?: string | null
          color?: string | null
          connection_id?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          reminder_minutes?: number | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shared_calendar_events_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "parent_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_media: {
        Row: {
          child_name: string | null
          connection_id: string
          created_at: string | null
          description: string | null
          event_date: string | null
          file_url: string
          id: string
          is_favorite: boolean | null
          media_type: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          uploader_id: string
        }
        Insert: {
          child_name?: string | null
          connection_id: string
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          file_url: string
          id?: string
          is_favorite?: boolean | null
          media_type: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          uploader_id: string
        }
        Update: {
          child_name?: string | null
          connection_id?: string
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          file_url?: string
          id?: string
          is_favorite?: boolean | null
          media_type?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_media_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "parent_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_tracker_entries: {
        Row: {
          bed_time: string
          created_at: string | null
          date: string
          duration: number
          factors: string[] | null
          id: string
          notes: string | null
          quality: number
          sleep_time: string | null
          user_id: string
          wake_time: string
        }
        Insert: {
          bed_time: string
          created_at?: string | null
          date: string
          duration: number
          factors?: string[] | null
          id?: string
          notes?: string | null
          quality: number
          sleep_time?: string | null
          user_id: string
          wake_time: string
        }
        Update: {
          bed_time?: string
          created_at?: string | null
          date?: string
          duration?: number
          factors?: string[] | null
          id?: string
          notes?: string | null
          quality?: number
          sleep_time?: string | null
          user_id?: string
          wake_time?: string
        }
        Relationships: []
      }
      sms_check_ins: {
        Row: {
          created_at: string | null
          id: string
          mood_score: number | null
          parsed_sentiment: string | null
          responded_at: string | null
          response_text: string | null
          sent_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mood_score?: number | null
          parsed_sentiment?: string | null
          responded_at?: string | null
          response_text?: string | null
          sent_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mood_score?: number | null
          parsed_sentiment?: string | null
          responded_at?: string | null
          response_text?: string | null
          sent_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sms_checkin_responses: {
        Row: {
          id: string
          message_sent: string | null
          mood_extracted: number | null
          responded_at: string | null
          sent_at: string | null
          subscription_id: string
          user_response: string | null
        }
        Insert: {
          id?: string
          message_sent?: string | null
          mood_extracted?: number | null
          responded_at?: string | null
          sent_at?: string | null
          subscription_id: string
          user_response?: string | null
        }
        Update: {
          id?: string
          message_sent?: string | null
          mood_extracted?: number | null
          responded_at?: string | null
          sent_at?: string | null
          subscription_id?: string
          user_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_checkin_responses_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "sms_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          client_id: string | null
          created_at: string
          direction: string | null
          from_number: string
          id: string
          message_body: string
          message_sid: string
          status: string
          template_used: string | null
          therapist_id: string | null
          to_number: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          direction?: string | null
          from_number: string
          id?: string
          message_body: string
          message_sid: string
          status?: string
          template_used?: string | null
          therapist_id?: string | null
          to_number: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          direction?: string | null
          from_number?: string
          id?: string
          message_body?: string
          message_sid?: string
          status?: string
          template_used?: string | null
          therapist_id?: string | null
          to_number?: string
        }
        Relationships: []
      }
      sms_preferences: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          frequency: string | null
          id: string
          phone_number: string | null
          preferred_time: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          frequency?: string | null
          id?: string
          phone_number?: string | null
          preferred_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          frequency?: string | null
          id?: string
          phone_number?: string | null
          preferred_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sms_subscriptions: {
        Row: {
          created_at: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          phone_number: string
          phone_verified: boolean | null
          preferred_time: string | null
          timezone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          phone_number: string
          phone_verified?: boolean | null
          preferred_time?: string | null
          timezone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string
          phone_verified?: boolean | null
          preferred_time?: string | null
          timezone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sobriety_tracking: {
        Row: {
          created_at: string | null
          current_streak_days: number | null
          id: string
          longest_streak_days: number | null
          milestones_achieved: Json | null
          sobriety_date: string
          substance_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak_days?: number | null
          id?: string
          longest_streak_days?: number | null
          milestones_achieved?: Json | null
          sobriety_date: string
          substance_type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak_days?: number | null
          id?: string
          longest_streak_days?: number | null
          milestones_achieved?: Json | null
          sobriety_date?: string
          substance_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sponsor_connections: {
        Row: {
          connection_status: string | null
          created_at: string | null
          id: string
          notes: string | null
          sponsor_contact: string | null
          sponsor_name: string | null
          sponsor_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          connection_status?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          sponsor_contact?: string | null
          sponsor_name?: string | null
          sponsor_type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          connection_status?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          sponsor_contact?: string | null
          sponsor_name?: string | null
          sponsor_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sso_configurations: {
        Row: {
          config: Json | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          provider: string | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          provider?: string | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          provider?: string | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sso_configurations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_files: {
        Row: {
          bucket: string
          created_at: string | null
          id: string
          mime_type: string | null
          path: string
          size: number | null
          user_id: string | null
        }
        Insert: {
          bucket: string
          created_at?: string | null
          id?: string
          mime_type?: string | null
          path: string
          size?: number | null
          user_id?: string | null
        }
        Update: {
          bucket?: string
          created_at?: string | null
          id?: string
          mime_type?: string | null
          path?: string
          size?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          billing_cycle: string
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string | null
          currency: string | null
          id: string
          next_billing_date: string | null
          payment_method: string | null
          plan_tier: string
          promo_code_id: string | null
          started_at: string | null
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          billing_cycle: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          next_billing_date?: string | null
          payment_method?: string | null
          plan_tier: string
          promo_code_id?: string | null
          started_at?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          billing_cycle?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          next_billing_date?: string | null
          payment_method?: string | null
          plan_tier?: string
          promo_code_id?: string | null
          started_at?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      success_stories: {
        Row: {
          challenge_type: string[] | null
          created_at: string | null
          featured: boolean | null
          id: string
          is_anonymous: boolean | null
          is_approved: boolean | null
          story: string
          title: string
          user_id: string | null
        }
        Insert: {
          challenge_type?: string[] | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          is_anonymous?: boolean | null
          is_approved?: boolean | null
          story: string
          title: string
          user_id?: string | null
        }
        Update: {
          challenge_type?: string[] | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          is_anonymous?: boolean | null
          is_approved?: boolean | null
          story?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      support_circle_members: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          id: string
          invite_token: string | null
          invited_at: string | null
          member_email: string
          member_name: string
          relationship: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          invite_token?: string | null
          invited_at?: string | null
          member_email: string
          member_name: string
          relationship?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          invite_token?: string | null
          invited_at?: string | null
          member_email?: string
          member_name?: string
          relationship?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_circle_permissions: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          member_id: string
          permission_type: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          member_id: string
          permission_type: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          member_id?: string
          permission_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_circle_permissions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "support_circle_members"
            referencedColumns: ["id"]
          },
        ]
      }
      support_circles: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          closed_at: string | null
          created_at: string | null
          description: string
          escalated_at: string | null
          first_response_at: string | null
          id: string
          is_crisis: boolean | null
          priority: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          therapist_id: string | null
          ticket_number: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: string
          closed_at?: string | null
          created_at?: string | null
          description: string
          escalated_at?: string | null
          first_response_at?: string | null
          id?: string
          is_crisis?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          therapist_id?: string | null
          ticket_number: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          closed_at?: string | null
          created_at?: string | null
          description?: string
          escalated_at?: string | null
          first_response_at?: string | null
          id?: string
          is_crisis?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          therapist_id?: string | null
          ticket_number?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_wall: {
        Row: {
          bookmark_count: number | null
          category: Database["public"]["Enums"]["support_wall_category"]
          comment_count: number | null
          content: string
          created_at: string | null
          hearts: number | null
          id: string
          is_flagged: boolean | null
          is_pinned: boolean | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          bookmark_count?: number | null
          category?: Database["public"]["Enums"]["support_wall_category"]
          comment_count?: number | null
          content: string
          created_at?: string | null
          hearts?: number | null
          id?: string
          is_flagged?: boolean | null
          is_pinned?: boolean | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          bookmark_count?: number | null
          category?: Database["public"]["Enums"]["support_wall_category"]
          comment_count?: number | null
          content?: string
          created_at?: string | null
          hearts?: number | null
          id?: string
          is_flagged?: boolean | null
          is_pinned?: boolean | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      support_wall_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_wall_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "support_wall"
            referencedColumns: ["id"]
          },
        ]
      }
      support_wall_comment_hearts: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_wall_comment_hearts_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "support_wall_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      support_wall_comments: {
        Row: {
          content: string
          created_at: string | null
          hearts: number | null
          id: string
          is_flagged: boolean | null
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          hearts?: number | null
          id?: string
          is_flagged?: boolean | null
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          hearts?: number | null
          id?: string
          is_flagged?: boolean | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_wall_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "support_wall"
            referencedColumns: ["id"]
          },
        ]
      }
      support_wall_hearts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_wall_hearts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "support_wall"
            referencedColumns: ["id"]
          },
        ]
      }
      support_wall_reports: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          reason: string
          reported_by: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          reason: string
          reported_by: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          reason?: string
          reported_by?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_wall_reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "support_wall"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_users: {
        Row: {
          added_at: string | null
          id: string
          role: string | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          current_user_count: number | null
          custom_domain: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          max_users: number | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          settings: Json | null
          subdomain: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_user_count?: number | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          max_users?: number | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          subdomain?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_user_count?: number | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          max_users?: number | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          subdomain?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      therapist_access_reset_tokens: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          ip_address: string
          is_valid: boolean | null
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          ip_address: string
          is_valid?: boolean | null
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          ip_address?: string
          is_valid?: boolean | null
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      therapist_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean | null
          start_time: string
          therapist_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_available?: boolean | null
          start_time: string
          therapist_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_availability_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_availability_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_client_notes: {
        Row: {
          client_id: string
          content: string
          created_at: string | null
          id: string
          note_type: string
          therapist_id: string
          updated_at: string | null
          visible_to_client: boolean | null
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string | null
          id?: string
          note_type: string
          therapist_id: string
          updated_at?: string | null
          visible_to_client?: boolean | null
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string | null
          id?: string
          note_type?: string
          therapist_id?: string
          updated_at?: string | null
          visible_to_client?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_client_notes_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_client_notes_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_credentials: {
        Row: {
          created_at: string | null
          credential_type: string
          expiry_date: string | null
          file_url: string
          id: string
          therapist_id: string | null
          updated_at: string | null
          verified: boolean | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          credential_type: string
          expiry_date?: string | null
          file_url: string
          id?: string
          therapist_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          credential_type?: string
          expiry_date?: string | null
          file_url?: string
          id?: string
          therapist_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_credentials_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_credentials_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_messages: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          is_urgent: boolean | null
          message_text: string
          sender_type: string
          therapist_id: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          is_urgent?: boolean | null
          message_text: string
          sender_type: string
          therapist_id?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          is_urgent?: boolean | null
          message_text?: string
          sender_type?: string
          therapist_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_messages_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_messages_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_payouts: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          net_payout: number | null
          notes: string | null
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          period_end: string
          period_start: string
          platform_fee: number | null
          session_count: number | null
          status: string | null
          therapist_id: string | null
          total_hours: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          net_payout?: number | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          period_end: string
          period_start: string
          platform_fee?: number | null
          session_count?: number | null
          status?: string | null
          therapist_id?: string | null
          total_hours?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          net_payout?: number | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          period_end?: string
          period_start?: string
          platform_fee?: number | null
          session_count?: number | null
          status?: string | null
          therapist_id?: string | null
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_payouts_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_payouts_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_requests: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          priority: string
          request_type: string
          responded_at: string | null
          status: string
          therapist_id: string | null
          updated_at: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          priority?: string
          request_type: string
          responded_at?: string | null
          status?: string
          therapist_id?: string | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          priority?: string
          request_type?: string
          responded_at?: string | null
          status?: string
          therapist_id?: string | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_requests_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_requests_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapists: {
        Row: {
          approach: string | null
          background_check_status: string | null
          bio: string | null
          burnout_risk_score: number | null
          created_at: string
          current_caseload: number | null
          experience_years: number | null
          hourly_rate: number
          id: string
          image_url: string | null
          is_active: boolean | null
          license_expiry: string | null
          license_number: string | null
          match_score_factors: Json | null
          max_caseload: number | null
          name: string
          rating: number | null
          specialties: string[]
          title: string
          total_reviews: number | null
          updated_at: string
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          approach?: string | null
          background_check_status?: string | null
          bio?: string | null
          burnout_risk_score?: number | null
          created_at?: string
          current_caseload?: number | null
          experience_years?: number | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          match_score_factors?: Json | null
          max_caseload?: number | null
          name: string
          rating?: number | null
          specialties?: string[]
          title: string
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          approach?: string | null
          background_check_status?: string | null
          bio?: string | null
          burnout_risk_score?: number | null
          created_at?: string
          current_caseload?: number | null
          experience_years?: number | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          match_score_factors?: Json | null
          max_caseload?: number | null
          name?: string
          rating?: number | null
          specialties?: string[]
          title?: string
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      therapy_bookings: {
        Row: {
          appointment_date: string
          concerns: string[] | null
          created_at: string
          duration_minutes: number
          id: string
          notes: string | null
          payment_amount: number
          payment_method: string | null
          payment_status: string
          promo_code: string | null
          session_type: string
          status: string
          therapist_id: string
          updated_at: string
          user_id: string
          video_room_id: string | null
        }
        Insert: {
          appointment_date: string
          concerns?: string[] | null
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          payment_amount: number
          payment_method?: string | null
          payment_status?: string
          promo_code?: string | null
          session_type?: string
          status?: string
          therapist_id: string
          updated_at?: string
          user_id: string
          video_room_id?: string | null
        }
        Update: {
          appointment_date?: string
          concerns?: string[] | null
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          payment_amount?: number
          payment_method?: string | null
          payment_status?: string
          promo_code?: string | null
          session_type?: string
          status?: string
          therapist_id?: string
          updated_at?: string
          user_id?: string
          video_room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapy_bookings_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapy_bookings_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      therapy_sessions: {
        Row: {
          booking_id: string
          client_notes: string | null
          created_at: string
          duration_minutes: number
          homework_assigned: string | null
          id: string
          next_session_goals: string | null
          progress_rating: number | null
          session_date: string
          therapist_id: string
          therapist_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_id: string
          client_notes?: string | null
          created_at?: string
          duration_minutes: number
          homework_assigned?: string | null
          id?: string
          next_session_goals?: string | null
          progress_rating?: number | null
          session_date: string
          therapist_id: string
          therapist_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_id?: string
          client_notes?: string | null
          created_at?: string
          duration_minutes?: number
          homework_assigned?: string | null
          id?: string
          next_session_goals?: string | null
          progress_rating?: number | null
          session_date?: string
          therapist_id?: string
          therapist_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_sessions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "therapy_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapy_sessions_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapy_sessions_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists_directory"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_responses: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          id: string
          is_internal: boolean | null
          message: string
          responder_id: string | null
          responder_type: string | null
          ticket_id: string | null
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message: string
          responder_id?: string | null
          responder_type?: string | null
          ticket_id?: string | null
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message?: string
          responder_id?: string | null
          responder_type?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_responses_responder_id_fkey"
            columns: ["responder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_sla_tracking: {
        Row: {
          actual_first_response_minutes: number | null
          actual_resolution_hours: number | null
          created_at: string | null
          id: string
          priority_level: string
          sla_breached: boolean | null
          target_first_response_minutes: number | null
          target_resolution_hours: number | null
          ticket_id: string | null
        }
        Insert: {
          actual_first_response_minutes?: number | null
          actual_resolution_hours?: number | null
          created_at?: string | null
          id?: string
          priority_level: string
          sla_breached?: boolean | null
          target_first_response_minutes?: number | null
          target_resolution_hours?: number | null
          ticket_id?: string | null
        }
        Update: {
          actual_first_response_minutes?: number | null
          actual_resolution_hours?: number | null
          created_at?: string | null
          id?: string
          priority_level?: string
          sla_breached?: boolean | null
          target_first_response_minutes?: number | null
          target_resolution_hours?: number | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_sla_tracking_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      toolkit_category_interactions: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          interaction_type: string
          timestamp: string | null
          tool_name: string | null
          user_id: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          interaction_type: string
          timestamp?: string | null
          tool_name?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          interaction_type?: string
          timestamp?: string | null
          tool_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_name: string
          activity_type: string
          completed_at: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_name: string
          activity_type: string
          completed_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_name?: string
          activity_type?: string
          completed_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity_stream: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          user_id: string
          visible_to_admin: boolean | null
          visible_to_therapist: boolean | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          user_id: string
          visible_to_admin?: boolean | null
          visible_to_therapist?: boolean | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
          visible_to_admin?: boolean | null
          visible_to_therapist?: boolean | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          completed: boolean | null
          earned_at: string | null
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          badge_key: string
          completed?: boolean | null
          earned_at?: string | null
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          badge_key?: string
          completed?: boolean | null
          earned_at?: string | null
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_cohorts: {
        Row: {
          avg_ltv: number | null
          avg_session_count: number | null
          cohort_name: string
          created_at: string | null
          id: string
          portal_filter: string | null
          retention_rate_30d: number | null
          retention_rate_60d: number | null
          retention_rate_90d: number | null
          signup_period: string | null
          updated_at: string | null
          user_count: number | null
        }
        Insert: {
          avg_ltv?: number | null
          avg_session_count?: number | null
          cohort_name: string
          created_at?: string | null
          id?: string
          portal_filter?: string | null
          retention_rate_30d?: number | null
          retention_rate_60d?: number | null
          retention_rate_90d?: number | null
          signup_period?: string | null
          updated_at?: string | null
          user_count?: number | null
        }
        Update: {
          avg_ltv?: number | null
          avg_session_count?: number | null
          cohort_name?: string
          created_at?: string | null
          id?: string
          portal_filter?: string | null
          retention_rate_30d?: number | null
          retention_rate_60d?: number | null
          retention_rate_90d?: number | null
          signup_period?: string | null
          updated_at?: string | null
          user_count?: number | null
        }
        Relationships: []
      }
      user_earned_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          category: string | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current: number | null
          deadline: string | null
          description: string | null
          goal_type: string
          id: string
          target: number
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current?: number | null
          deadline?: string | null
          description?: string | null
          goal_type: string
          id?: string
          target: number
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current?: number | null
          deadline?: string | null
          description?: string | null
          goal_type?: string
          id?: string
          target?: number
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_health_connections: {
        Row: {
          access_token: string | null
          created_at: string
          enabled: boolean
          id: string
          last_sync_at: string | null
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_sync_at?: string | null
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_sync_at?: string | null
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_insights: {
        Row: {
          confidence_score: number | null
          generated_at: string | null
          id: string
          insight_text: string
          insight_type: string
          supporting_data: Json | null
          user_id: string
          viewed: boolean | null
        }
        Insert: {
          confidence_score?: number | null
          generated_at?: string | null
          id?: string
          insight_text: string
          insight_type: string
          supporting_data?: Json | null
          user_id: string
          viewed?: boolean | null
        }
        Update: {
          confidence_score?: number | null
          generated_at?: string | null
          id?: string
          insight_text?: string
          insight_type?: string
          supporting_data?: Json | null
          user_id?: string
          viewed?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_segments: {
        Row: {
          created_at: string | null
          created_by: string | null
          criteria: Json
          description: string | null
          id: string
          last_calculated_at: string | null
          name: string
          user_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          criteria: Json
          description?: string | null
          id?: string
          last_calculated_at?: string | null
          name: string
          user_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          last_calculated_at?: string | null
          name?: string
          user_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sound_preferences: {
        Row: {
          ambient_sound: string | null
          created_at: string | null
          haptics_enabled: boolean | null
          sounds_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ambient_sound?: string | null
          created_at?: string | null
          haptics_enabled?: boolean | null
          sounds_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ambient_sound?: string | null
          created_at?: string | null
          haptics_enabled?: boolean | null
          sounds_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_transition_enrollments: {
        Row: {
          completed_at: string | null
          current_week: number | null
          enrolled_at: string | null
          id: string
          program_id: string
          progress: Json | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          current_week?: number | null
          enrolled_at?: string | null
          id?: string
          program_id: string
          progress?: Json | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          current_week?: number | null
          enrolled_at?: string | null
          id?: string
          program_id?: string
          progress?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_transition_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_week: number | null
          id: string
          notes: Json | null
          program_id: string
          started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_week?: number | null
          id?: string
          notes?: Json | null
          program_id: string
          started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_week?: number | null
          id?: string
          notes?: Json | null
          program_id?: string
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_transition_progress_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "life_transition_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      video_call_invites: {
        Row: {
          client_id: string
          created_at: string
          id: string
          session_id: string
          status: string
          therapist_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          session_id: string
          status?: string
          therapist_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          session_id?: string
          status?: string
          therapist_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      video_diary_entries: {
        Row: {
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          file_path: string
          file_url: string | null
          id: string
          is_private: boolean | null
          mood_tag: string | null
          shared_with_therapist: boolean | null
          thumbnail_url: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_path: string
          file_url?: string | null
          id?: string
          is_private?: boolean | null
          mood_tag?: string | null
          shared_with_therapist?: boolean | null
          thumbnail_url?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_path?: string
          file_url?: string | null
          id?: string
          is_private?: boolean | null
          mood_tag?: string | null
          shared_with_therapist?: boolean | null
          thumbnail_url?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      video_diary_recordings: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          thumbnail_url: string | null
          title: string
          transcription: string | null
          user_id: string
          video_url: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          thumbnail_url?: string | null
          title: string
          transcription?: string | null
          user_id: string
          video_url: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          transcription?: string | null
          user_id?: string
          video_url?: string
        }
        Relationships: []
      }
      video_session_chat: {
        Row: {
          created_at: string | null
          id: string
          message: string
          sender_id: string
          sender_type: string
          session_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          sender_id: string
          sender_type: string
          session_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          sender_id?: string
          sender_type?: string
          session_id?: string
        }
        Relationships: []
      }
      video_session_files: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          session_id: string
          uploader_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          session_id: string
          uploader_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          session_id?: string
          uploader_id?: string
        }
        Relationships: []
      }
      video_session_logs: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      video_session_notes: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          notes: string
          session_id: string
          therapist_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          notes: string
          session_id: string
          therapist_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          notes?: string
          session_id?: string
          therapist_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      voice_notes_future: {
        Row: {
          audio_url: string
          created_at: string | null
          delivered: boolean | null
          delivered_at: string | null
          delivery_date: string
          id: string
          message: string | null
          recording_date: string | null
          reply_audio_url: string | null
          title: string
          user_id: string
        }
        Insert: {
          audio_url: string
          created_at?: string | null
          delivered?: boolean | null
          delivered_at?: string | null
          delivery_date: string
          id?: string
          message?: string | null
          recording_date?: string | null
          reply_audio_url?: string | null
          title: string
          user_id: string
        }
        Update: {
          audio_url?: string
          created_at?: string | null
          delivered?: boolean | null
          delivered_at?: string | null
          delivery_date?: string
          id?: string
          message?: string | null
          recording_date?: string | null
          reply_audio_url?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      waitlist_signups: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      wearable_data: {
        Row: {
          data_type: string | null
          id: string
          recorded_date: string | null
          source: string | null
          synced_at: string | null
          user_id: string | null
          value: Json | null
        }
        Insert: {
          data_type?: string | null
          id?: string
          recorded_date?: string | null
          source?: string | null
          synced_at?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Update: {
          data_type?: string | null
          id?: string
          recorded_date?: string | null
          source?: string | null
          synced_at?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "wearable_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wellness_metrics: {
        Row: {
          created_at: string | null
          id: string
          metric_type: string
          metric_unit: string | null
          metric_value: number
          recorded_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metric_type: string
          metric_unit?: string | null
          metric_value: number
          recorded_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metric_type?: string
          metric_unit?: string | null
          metric_value?: number
          recorded_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      whisper_hearts: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          whisper_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
          whisper_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
          whisper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whisper_hearts_whisper_id_fkey"
            columns: ["whisper_id"]
            isOneToOne: false
            referencedRelation: "whispers"
            referencedColumns: ["id"]
          },
        ]
      }
      whispers: {
        Row: {
          content: string
          created_at: string
          hearts: number
          id: string
          mood: string | null
          reply_count: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          hearts?: number
          id?: string
          mood?: string | null
          reply_count?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          hearts?: number
          id?: string
          mood?: string | null
          reply_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      henry_qa_feed: {
        Row: {
          answer_id: string | null
          answer_text: string | null
          appreciation_count: number | null
          author: string | null
          category: Database["public"]["Enums"]["henry_category"] | null
          created_at: string | null
          id: string | null
          is_anonymous: boolean | null
          published_at: string | null
          question_text: string | null
        }
        Relationships: []
      }
      therapists_directory: {
        Row: {
          approach: string | null
          bio: string | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          name: string | null
          rating: number | null
          specialties: string[] | null
          title: string | null
          total_reviews: number | null
          video_url: string | null
        }
        Insert: {
          approach?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          rating?: number | null
          specialties?: string[] | null
          title?: string | null
          total_reviews?: number | null
          video_url?: string | null
        }
        Update: {
          approach?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          rating?: number | null
          specialties?: string[] | null
          title?: string | null
          total_reviews?: number | null
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_expired_admin_sessions: { Args: never; Returns: undefined }
      cleanup_expired_reset_tokens: { Args: never; Returns: undefined }
      decrement_bookmark_count: {
        Args: { post_id: string }
        Returns: undefined
      }
      decrement_comment_count: { Args: { post_id: string }; Returns: undefined }
      decrement_comment_hearts: {
        Args: { comment_id: string }
        Returns: undefined
      }
      decrement_hearts: { Args: { post_id: string }; Returns: undefined }
      get_anonymized_leaderboard: {
        Args: { limit_count?: number }
        Returns: {
          is_current_user: boolean
          rank: number
          tokens_earned: number
          total_appreciations: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_bookmark_count: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_comment_count: { Args: { post_id: string }; Returns: undefined }
      increment_comment_hearts: {
        Args: { comment_id: string }
        Returns: undefined
      }
      increment_hearts: { Args: { post_id: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      career_course_type:
        | "leadership_fundamentals"
        | "strategic_communication"
        | "remote_team_management"
      career_module_type:
        | "career_development"
        | "leadership_skills"
        | "resume_building"
        | "goal_setting"
      career_resource_type:
        | "career_assessment"
        | "template_library"
        | "interview_simulator"
        | "goal_planner"
      henry_category:
        | "anxiety"
        | "relationships"
        | "self-esteem"
        | "depression"
        | "purpose"
        | "trauma"
        | "motivation"
      henry_status: "pending" | "approved" | "answered" | "rejected"
      support_wall_category:
        | "celebration"
        | "struggling"
        | "gratitude"
        | "question"
        | "resource"
        | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      career_course_type: [
        "leadership_fundamentals",
        "strategic_communication",
        "remote_team_management",
      ],
      career_module_type: [
        "career_development",
        "leadership_skills",
        "resume_building",
        "goal_setting",
      ],
      career_resource_type: [
        "career_assessment",
        "template_library",
        "interview_simulator",
        "goal_planner",
      ],
      henry_category: [
        "anxiety",
        "relationships",
        "self-esteem",
        "depression",
        "purpose",
        "trauma",
        "motivation",
      ],
      henry_status: ["pending", "approved", "answered", "rejected"],
      support_wall_category: [
        "celebration",
        "struggling",
        "gratitude",
        "question",
        "resource",
        "general",
      ],
    },
  },
} as const
