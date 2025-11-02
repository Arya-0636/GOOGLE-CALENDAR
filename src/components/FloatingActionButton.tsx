import { Plus } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

export default function FloatingActionButton() {
  const { setSelectedEvent, setIsEventModalOpen, currentDate } = useCalendar();

  const handleClick = () => {
    const now = new Date();
    const startTime = new Date(currentDate);
    startTime.setHours(now.getHours() + 1, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

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

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
      aria-label="Create event"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
