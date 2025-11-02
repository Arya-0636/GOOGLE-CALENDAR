import { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { getWeekDays, isSameDay, isToday, calculateEventPosition } from '../utils/dateUtils';
import type { CalendarEvent } from '../lib/database.types';

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const period = i < 12 ? 'AM' : 'PM';
  return `${hour} ${period}`;
});

export default function WeekView() {
  const { currentDate, events, setSelectedEvent, setIsEventModalOpen } = useCalendar();

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventStart = new Date(event.start_time);
      return isSameDay(eventStart, date);
    });
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const startTime = new Date(date);
    startTime.setHours(hour, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(hour + 1, 0, 0, 0);

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
    <div className="flex-1 bg-white overflow-auto">
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="w-16 flex-shrink-0"></div>
        {weekDays.map((day, index) => {
          const today = isToday(day);
          return (
            <div
              key={index}
              className="flex-1 text-center py-3 border-l border-gray-200"
            >
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div
                className={`text-2xl font-normal inline-flex items-center justify-center w-10 h-10 rounded-full ${
                  today ? 'bg-blue-600 text-white' : 'text-gray-900'
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex relative">
        <div className="w-16 flex-shrink-0">
          {HOURS.map((hour, index) => (
            <div
              key={index}
              className="h-[60px] text-xs text-gray-500 text-right pr-2 -mt-2"
            >
              {index > 0 && hour}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={dayIndex}
                className="absolute top-0 bottom-0 border-l border-gray-200"
                style={{
                  left: `${(dayIndex / 7) * 100}%`,
                  width: `${100 / 7}%`,
                }}
              >
                {HOURS.map((_, hourIndex) => (
                  <div
                    key={hourIndex}
                    onClick={() => handleTimeSlotClick(day, hourIndex)}
                    className="h-[60px] border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  ></div>
                ))}

                {dayEvents.map((event) => {
                  const startTime = new Date(event.start_time);
                  const endTime = new Date(event.end_time);
                  const { top, height } = calculateEventPosition(startTime, endTime);

                  return (
                    <button
                      key={event.id}
                      onClick={(e) => handleEventClick(event, e)}
                      className="absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium overflow-hidden transition-opacity hover:opacity-80"
                      style={{
                        top: `${top}px`,
                        height: `${Math.max(height, 20)}px`,
                        backgroundColor: event.color,
                        color: 'white',
                        zIndex: 1,
                      }}
                    >
                      <div className="truncate font-medium">{event.title}</div>
                      <div className="text-xs opacity-90">
                        {startTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
