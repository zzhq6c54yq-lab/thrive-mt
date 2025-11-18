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
        ]
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
      journal_entries: {
        Row: {
          created_at: string | null
          id: string
          mood: string
          mood_score: number | null
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mood: string
          mood_score?: number | null
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mood?: string
          mood_score?: number | null
          notes?: string | null
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          goals: string[] | null
          id: string
          is_therapist: boolean | null
          onboarding_completed: boolean | null
          primary_portal: string | null
          secondary_portal: string | null
          time_preference_minutes: number | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          goals?: string[] | null
          id: string
          is_therapist?: boolean | null
          onboarding_completed?: boolean | null
          primary_portal?: string | null
          secondary_portal?: string | null
          time_preference_minutes?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          goals?: string[] | null
          id?: string
          is_therapist?: boolean | null
          onboarding_completed?: boolean | null
          primary_portal?: string | null
          secondary_portal?: string | null
          time_preference_minutes?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
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
        ]
      }
      therapists: {
        Row: {
          approach: string | null
          bio: string | null
          created_at: string
          experience_years: number | null
          hourly_rate: number
          id: string
          image_url: string | null
          is_active: boolean | null
          license_number: string | null
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
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          license_number?: string | null
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
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          license_number?: string | null
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
