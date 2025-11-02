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
      events: {
        Row: {
          id: string
          title: string
          description: string
          start_time: string
          end_time: string
          all_day: boolean
          location: string
          color: string
          recurrence_rule: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          start_time: string
          end_time: string
          all_day?: boolean
          location?: string
          color?: string
          recurrence_rule?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          start_time?: string
          end_time?: string
          all_day?: boolean
          location?: string
          color?: string
          recurrence_rule?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type CalendarEvent = Database['public']['Tables']['events']['Row'];
export type CalendarEventInsert = Database['public']['Tables']['events']['Insert'];
export type CalendarEventUpdate = Database['public']['Tables']['events']['Update'];
