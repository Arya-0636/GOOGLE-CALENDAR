import { ChevronLeft, ChevronRight, Menu, Search } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { formatMonthYear, addMonths, addWeeks, addDays } from '../utils/dateUtils';

export default function CalendarHeader() {
  const { currentDate, setCurrentDate, viewType, setViewType } = useCalendar();

  const handlePrevious = () => {
    if (viewType === 'month') {
      setCurrentDate(addMonths(currentDate, -1));
    } else if (viewType === 'week') {
      setCurrentDate(addWeeks(currentDate, -1));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (viewType === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewType === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDateLabel = () => {
    if (viewType === 'month') {
      return formatMonthYear(currentDate);
    } else if (viewType === 'week') {
      return formatMonthYear(currentDate);
    } else {
      return currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-6">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center space-x-2 md:space-x-4">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234285f4'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z'/%3E%3C/svg%3E"
              alt="Calendar"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-lg md:text-xl text-gray-700 font-normal hidden sm:block">Calendar</h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 md:mt-4 gap-2 md:gap-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={handleToday}
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Today
          </button>

          <div className="flex items-center space-x-1 md:space-x-2">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <h2 className="text-base md:text-xl text-gray-700 font-normal">
            {getDateLabel()}
          </h2>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewType('day')}
            className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded transition-colors ${
              viewType === 'day'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setViewType('week')}
            className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded transition-colors ${
              viewType === 'week'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewType('month')}
            className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded transition-colors ${
              viewType === 'month'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Month
          </button>
        </div>
      </div>
    </header>
  );
}
