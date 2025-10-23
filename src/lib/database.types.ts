export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: 'buyer' | 'creator'
          display_name: string
          profile_picture_url: string | null
          bio: string | null
          rating: number
          total_completed_jobs: number
          response_time: string
          satisfaction_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          user_type: 'buyer' | 'creator'
          display_name: string
          profile_picture_url?: string | null
          bio?: string | null
          rating?: number
          total_completed_jobs?: number
          response_time?: string
          satisfaction_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: 'buyer' | 'creator'
          display_name?: string
          profile_picture_url?: string | null
          bio?: string | null
          rating?: number
          total_completed_jobs?: number
          response_time?: string
          satisfaction_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          content_type: 'voice' | 'photo' | 'video'
          thumbnail_url: string | null
          photo1_url: string | null
          photo2_url: string | null
          photo3_url: string | null
          starting_price: number
          rating: number
          total_reviews: number
          is_instant_buy: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          content_type: 'voice' | 'photo' | 'video'
          thumbnail_url?: string | null
          photo1_url?: string | null
          photo2_url?: string | null
          photo3_url?: string | null
          starting_price: number
          rating?: number
          total_reviews?: number
          is_instant_buy?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          content_type?: 'voice' | 'photo' | 'video'
          thumbnail_url?: string | null
          photo1_url?: string | null
          photo2_url?: string | null
          photo3_url?: string | null
          starting_price?: number
          rating?: number
          total_reviews?: number
          is_instant_buy?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          seller_id: string
          listing_id: string
          tier_id: string | null
          instant_buy_id: string | null
          order_type: 'custom' | 'instant_buy'
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
          amount: number
          platform_fee: number
          creator_earnings: number
          instructions: string | null
          delivery_url: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          buyer_id: string
          seller_id: string
          listing_id: string
          tier_id?: string | null
          instant_buy_id?: string | null
          order_type: 'custom' | 'instant_buy'
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
          amount: number
          platform_fee: number
          creator_earnings: number
          instructions?: string | null
          delivery_url?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          buyer_id?: string
          seller_id?: string
          listing_id?: string
          tier_id?: string | null
          instant_buy_id?: string | null
          order_type?: 'custom' | 'instant_buy'
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
          amount?: number
          platform_fee?: number
          creator_earnings?: number
          instructions?: string | null
          delivery_url?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

