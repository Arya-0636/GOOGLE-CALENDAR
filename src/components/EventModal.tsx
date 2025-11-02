import { useState, useEffect } from 'react';
import { X, Clock, MapPin, AlignLeft, Trash2 } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

const EVENT_COLORS = [
  { name: 'Blue', value: '#1a73e8' },
  { name: 'Red', value: '#d93025' },
  { name: 'Green', value: '#188038' },
  { name: 'Yellow', value: '#f9ab00' },
  { name: 'Orange', value: '#fa903e' },
  { name: 'Purple', value: '#9334e6' },
  { name: 'Gray', value: '#5f6368' },
];

export default function EventModal() {
  const {
    selectedEvent,
    isEventModalOpen,
    setIsEventModalOpen,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useCalendar();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('#1a73e8');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setAllDay(selectedEvent.all_day);
      setLocation(selectedEvent.location);
      setColor(selectedEvent.color);

      const start = new Date(selectedEvent.start_time);
      const end = new Date(selectedEvent.end_time);

      setStartDate(start.toISOString().split('T')[0]);
      setStartTime(
        start.toTimeString().slice(0, 5)
      );
      setEndDate(end.toISOString().split('T')[0]);
      setEndTime(
        end.toTimeString().slice(0, 5)
      );
    }
  }, [selectedEvent]);

  const handleClose = () => {
    setIsEventModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setAllDay(false);
    setLocation('');
    setColor('#1a73e8');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter an event title');
      return;
    }

    setIsSubmitting(true);

    try {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      if (endDateTime <= startDateTime) {
        alert('End time must be after start time');
        setIsSubmitting(false);
        return;
      }

      const eventData = {
        title: title.trim(),
        description,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        all_day: allDay,
        location,
        color,
      };

      if (selectedEvent?.id) {
        await updateEvent(selectedEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }

      handleClose();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent?.id) return;

    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsSubmitting(true);
      try {
        await deleteEvent(selectedEvent.id);
        handleClose();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isEventModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-slideUp">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-900">
            {selectedEvent?.id ? 'Edit Event' : 'Create Event'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="w-full text-2xl font-normal border-none outline-none focus:ring-0 placeholder-gray-400"
              autoFocus
            />
          </div>

          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                {!allDay && (
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
              </div>
              <div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                {!allDay && (
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pl-9">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">All day</span>
            </label>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-start space-x-4">
            <AlignLeft className="w-5 h-5 text-gray-500 flex-shrink-0 mt-2" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              rows={4}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 flex-shrink-0"></div>
            <div className="flex space-x-2">
              {EVENT_COLORS.map((eventColor) => (
                <button
                  key={eventColor.value}
                  type="button"
                  onClick={() => setColor(eventColor.value)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    color === eventColor.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: eventColor.value }}
                  title={eventColor.name}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              {selectedEvent?.id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
