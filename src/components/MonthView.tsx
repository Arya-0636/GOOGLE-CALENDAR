import { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { getMonthDays, isSameDay, isToday } from '../utils/dateUtils';
import type { CalendarEvent } from '../lib/database.types';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MonthView() {
  const { currentDate, events, setSelectedEvent, setIsEventModalOpen } = useCalendar();

  const days = useMemo(() => {
    return getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventStart = new Date(event.start_time);
      const eventEnd = new Date(event.end_time);

      if (event.all_day) {
        return isSameDay(eventStart, date);
      }

      return (
        isSameDay(eventStart, date) ||
        isSameDay(eventEnd, date) ||
        (eventStart < date && eventEnd > date)
      );
    });
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleDayClick = (date: Date) => {
    const startTime = new Date(date);
    startTime.setHours(12, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(13, 0, 0, 0);

    setSelectedEvent({
      id: '',
      title: '',
      description: '',
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      all_day: false,
      location: '',
      color: '#1a73e8',
      recurrence_rule: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  return (
    <div className="flex-1 bg-white">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 flex-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const today = isToday(day);
          const currentMonth = isCurrentMonth(day);

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`min-h-[120px] border-r border-b border-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                !currentMonth ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex justify-start mb-1">
                <span
                  className={`text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full ${
                    today
                      ? 'bg-blue-600 text-white'
                      : currentMonth
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <button
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className="w-full text-left px-2 py-1 rounded text-xs font-medium truncate transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: event.color + '20',
                      color: event.color,
                      borderLeft: `3px solid ${event.color}`,
                    }}
                  >
                    {new Date(event.start_time).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}{' '}
                    {event.title}
                  </button>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
