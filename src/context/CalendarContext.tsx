import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { CalendarEvent, CalendarEventInsert, CalendarEventUpdate } from '../lib/database.types';

type ViewType = 'month' | 'week' | 'day';

interface CalendarContextType {
  events: CalendarEvent[];
  currentDate: Date;
  viewType: ViewType;
  selectedEvent: CalendarEvent | null;
  isEventModalOpen: boolean;
  isLoading: boolean;
  setCurrentDate: (date: Date) => void;
  setViewType: (view: ViewType) => void;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  setIsEventModalOpen: (isOpen: boolean) => void;
  createEvent: (event: CalendarEventInsert) => Promise<void>;
  updateEvent: (id: string, event: CalendarEventUpdate) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (event: CalendarEventInsert) => {
    try {
      const { error } = await supabase.from('events').insert([event]);
      if (error) throw error;
      await fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  const updateEvent = async (id: string, event: CalendarEventUpdate) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ ...event, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      await fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const value = {
    events,
    currentDate,
    viewType,
    selectedEvent,
    isEventModalOpen,
    isLoading,
    setCurrentDate,
    setViewType,
    setSelectedEvent,
    setIsEventModalOpen,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: fetchEvents,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
