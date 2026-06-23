export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service: string | null
          budget: string | null
          message: string
          status: 'new' | 'replied' | 'closed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'status'>
        Update: Partial<Database['public']['Tables']['contact_messages']['Row']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          category: string | null
          status: 'draft' | 'published'
          views: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>
      }
      portfolio_projects: {
        Row: {
          id: string
          title: string
          category: string
          client: string | null
          description: string | null
          tech: string[]
          results: string[]
          status: 'draft' | 'published'
          display_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['portfolio_projects']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Row']>
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          company: string | null
          rating: number
          text: string
          project: string | null
          status: 'draft' | 'published'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Row']>
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: Database['public']['Tables']['site_settings']['Row']
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>
      }
    }
  }
}
