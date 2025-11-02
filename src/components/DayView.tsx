import { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { isSameDay, calculateEventPosition } from '../utils/dateUtils';
import type { CalendarEvent } from '../lib/database.types';

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const period = i < 12 ? 'AM' : 'PM';
  return `${hour} ${period}`;
});

export default function DayView() {
  const { currentDate, events, setSelectedEvent, setIsEventModalOpen } = useCalendar();

  const dayEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStart = new Date(event.start_time);
      return isSameDay(eventStart, currentDate);
    });
  }, [events, currentDate]);

  const handleTimeSlotClick = (hour: number) => {
    const startTime = new Date(currentDate);
    startTime.setHours(hour, 0, 0, 0);
    const endTime = new Date(currentDate);
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
        <div className="flex-1 text-center py-4 border-l border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
          <div className="text-3xl font-normal text-gray-900">
            {currentDate.getDate()}
          </div>
        </div>
      </div>

      <div className="flex relative">
        <div className="w-16 flex-shrink-0">
          {HOURS.map((hour, index) => (
            <div
              key={index}
              className="h-[80px] text-xs text-gray-500 text-right pr-2 -mt-2"
            >
              {index > 0 && hour}
            </div>
          ))}
        </div>

        <div className="flex-1 relative border-l border-gray-200">
          {HOURS.map((_, hourIndex) => (
            <div
              key={hourIndex}
              onClick={() => handleTimeSlotClick(hourIndex)}
              className="h-[80px] border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            ></div>
          ))}

          {dayEvents.map((event) => {
            const startTime = new Date(event.start_time);
            const endTime = new Date(event.end_time);
            const { top, height } = calculateEventPosition(startTime, endTime, 0);

            return (
              <button
                key={event.id}
                onClick={(e) => handleEventClick(event, e)}
                className="absolute left-2 right-2 rounded-lg px-3 py-2 text-sm font-medium shadow-md overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{
                  top: `${(top / 60) * 80}px`,
                  height: `${Math.max((height / 60) * 80, 40)}px`,
                  backgroundColor: event.color,
                  color: 'white',
                  zIndex: 1,
                }}
              >
                <div className="font-semibold truncate">{event.title}</div>
                <div className="text-xs opacity-90 mt-1">
                  {startTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}{' '}
                  -{' '}
                  {endTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
                {event.location && (
                  <div className="text-xs opacity-80 mt-1 truncate">
                    {event.location}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
