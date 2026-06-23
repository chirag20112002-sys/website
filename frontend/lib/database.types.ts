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
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service?: string | null
          budget?: string | null
          message: string
          status?: 'new' | 'replied' | 'closed'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service?: string | null
          budget?: string | null
          message?: string
          status?: 'new' | 'replied' | 'closed'
          created_at?: string
        }
        Relationships: []
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
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          category?: string | null
          status?: 'draft' | 'published'
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          category?: string | null
          status?: 'draft' | 'published'
          views?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
        Insert: {
          id?: string
          title: string
          category: string
          client?: string | null
          description?: string | null
          tech?: string[]
          results?: string[]
          status?: 'draft' | 'published'
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          client?: string | null
          description?: string | null
          tech?: string[]
          results?: string[]
          status?: 'draft' | 'published'
          display_order?: number
          created_at?: string
        }
        Relationships: []
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
        Insert: {
          id?: string
          name: string
          role?: string | null
          company?: string | null
          rating?: number
          text: string
          project?: string | null
          status?: 'draft' | 'published'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          company?: string | null
          rating?: number
          text?: string
          project?: string | null
          status?: 'draft' | 'published'
          created_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
