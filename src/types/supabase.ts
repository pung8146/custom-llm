export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // 사용자 프로필
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };

      // 사용자 API 키
      user_api_keys: {
        Row: {
          id: string;
          user_id: string;
          provider: "openai" | "anthropic" | "google" | "custom";
          key_name: string;
          encrypted_key: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: "openai" | "anthropic" | "google" | "custom";
          key_name: string;
          encrypted_key: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: "openai" | "anthropic" | "google" | "custom";
          key_name?: string;
          encrypted_key?: string;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      // 채팅 세션
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          model_provider: "openai" | "anthropic" | "google" | "custom";
          model_name: string;
          system_prompt: string | null;
          created_at: string;
          updated_at: string;
          message_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          model_provider: "openai" | "anthropic" | "google" | "custom";
          model_name: string;
          system_prompt?: string | null;
          created_at?: string;
          updated_at?: string;
          message_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          model_provider?: "openai" | "anthropic" | "google" | "custom";
          model_name?: string;
          system_prompt?: string | null;
          updated_at?: string;
          message_count?: number;
        };
      };

      // 채팅 메시지
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          model_provider: "openai" | "anthropic" | "google" | "custom" | null;
          model_name: string | null;
          tokens_used: number | null;
          cost: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          model_provider?: "openai" | "anthropic" | "google" | "custom" | null;
          model_name?: string | null;
          tokens_used?: number | null;
          cost?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          model_provider?: "openai" | "anthropic" | "google" | "custom" | null;
          model_name?: string | null;
          tokens_used?: number | null;
          cost?: number | null;
        };
      };

      // 사용량 추적
      usage_tracking: {
        Row: {
          id: string;
          user_id: string;
          session_id: string;
          provider: "openai" | "anthropic" | "google" | "custom";
          model_name: string;
          input_tokens: number;
          output_tokens: number;
          total_cost: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id: string;
          provider: "openai" | "anthropic" | "google" | "custom";
          model_name: string;
          input_tokens: number;
          output_tokens: number;
          total_cost: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string;
          provider?: "openai" | "anthropic" | "google" | "custom";
          model_name?: string;
          input_tokens?: number;
          output_tokens?: number;
          total_cost?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      llm_provider: "openai" | "anthropic" | "google" | "custom";
      message_role: "user" | "assistant" | "system";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
