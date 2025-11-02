Google Calendar Clone

A high-fidelity, full-stack version of Google Calendar built using modern web technologies.
This app works like Google Calendar, with smooth animations, a user-friendly interface, and all the main features of a calendar app.

Features:

Core Functionality:
- Change between Month, Week, and Day views easily
- Add, edit, and delete events with all the details
- Click on any time slot or day to quickly make a new event
- Add titles, descriptions, locations, times, and pick custom colors for events
- Create events that last all day or have specific start and end times
- Events update instantly as changes happen in the database

User Experience:
- Smooth transitions and hover effects make the app look polished
- Works well on desktops, tablets, and phones
- Looks and feels just like Google Calendar
- Quick event creation with a floating action button
- Easy to navigate dates using the Today button and arrows
- Choose from 7 different colors to help organize events

Technology Stack:

Frontend:
- React 18: A modern tool for building user interfaces
- TypeScript: Adds type safety to the code
- Vite: Fast tool for building and running the app
- Tailwind CSS: Makes it easy to style the app with utility classes
- Lucide React: Provides a set of beautiful icons

Backend:
- Supabase: A database with real-time features that uses PostgreSQL
- Supabase Client: Helps with database operations in a type-safe way
- Row Level Security (RLS): Controls who can access what data

Development Tools:
- ESLint: Checks the code for quality and consistency
- TypeScript ESLint: Checks for issues specific to TypeScript
- PostCSS & Autoprefixer: Helps with CSS and makes it work across different browsers

Architecture:

Component Structure:
src/
components/
CalendarHeader.tsx: Top part of the app with navigation and controls
MonthView.tsx: Displays the calendar in a monthly grid
WeekView.tsx: Shows a weekly view with time slots
DayView.tsx: Detailed schedule for each day
EventModal.tsx: Window to create or edit events
FloatingActionButton.tsx: Quick button to create events
context/
CalendarContext.tsx: Manages the app's state throughout
lib/
supabase.ts: Initializes the Supabase client
database.types.ts: Defines TypeScript types for the database
utils/
dateUtils.ts: Tools for working with dates
App.tsx: Main component of the app
main.tsx: Where the app starts
index.css: Styles and animations for the whole app

State Management:
The app uses React's Context API to manage the state:
- CalendarContext: Keeps track of events, current date, view type, and modal status
- CRUD Operations: Handles adding, reading, updating, and deleting events
- Real-time Synchronization: Events update automatically when changes happen

Database Schema:

Events Table:
```sql
events (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
title text NOT NULL,
description text DEFAULT '',
start_time timestamptz NOT NULL,
end_time timestamptz NOT NULL,
all_day boolean DEFAULT false,
location text DEFAULT '',
color text DEFAULT '#1a73e8',
recurrence_rule text,
created_at timestamptz DEFAULT now(),
updated_at timestamptz DEFAULT now()
)
```

Indexes:
- events_start_time_idx: Helps with queries based on dates
- events_end_time_idx: Makes range queries faster

Security:
- Row Level Security (RLS) is enabled to protect data
- Public access policy is set up for the demo (can be adjusted for production)

Setup Instructions:

Prerequisites:
- Node.js 18 or newer and npm
- A Supabase account (free tier is enough)

Installation:

1.
Clone the repo:
```bash
git clone <repository-url>
cd <project-directory>
```

2.
Install the dependencies:
```bash
npm install
```

3.
Configure Supabase:
Update the `.
env` file with your Supabase URL and Anon Key:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If starting from scratch, create a project at https://supabase.com and update these values.


4.
Run database migrations:
The events table has already been created with all needed columns.

- Indexes are set up for better performance
- Row Level Security policies are in place

5.
Start the development server:
```bash
npm run dev
```

The app will run at http://localhost:5173

Build for Production:
```bash
npm run build
npm run preview
```

## Business Logic & Edge Cases

### Date Calculations
- **Month View**: Shows 6 weeks (42 days) to keep the layout the same every time
- **Week View**: Starts every week on Sunday, like the US calendar
- **Day View**: Displays a full day with time slots every hour

### Event Handling
- **Time Validation**: End time must be later than the start time
- **All-Day Events**: When turned on, you don't see time fields
- **Overlapping Events**: You can have more than one event at the same time
- **Multi-day Events**: Shows up on all the days it covers
- **Event Positioning**: Changes based on the time the event starts and ends

### User Interaction
- **Click to Create**: Clicking on any day on the calendar brings up a form with the time already filled in
- **Click to Edit**: Clicking on an event opens the form to change it
- **Modal Overlay**: Click outside the form or the close button to cancel
- **Form Validation**: You must fill in the title, and time fields are checked for sense

### Performance Optimizations
- **Memoization**: Use of `useMemo` to make calculations faster
- **Efficient Queries**: Database has indexes on time fields for quicker searches
- **Minimal Re-renders**: Keeps the component tree simple to update faster
- **Lazy Loading**: Only loads components when they are needed

## Animations & Interactions

### Implemented Animations
1.
**Modal Entry**: Slides up and fades in (200ms ease-out)
2.
**Button Hovers**: Smooth change in background color
3.
**FAB Interaction**: Makes the floating action button bigger and adds a shadow when hovered
4.
**Event Hovers**: Changes the look by making the event slightly bigger and more transparent
5.
**View Transitions**: Smooth switch between viewing the month, week, or day
6.
**Color Picker**: Makes the chosen color bigger when selected

### Interaction Patterns
- **Hover States**: Every button and option has a visual change when hovered
- **Active States**: Selected buttons show a white background
- **Focus States**: When you click on a form field, it shows a blue ring around it
- **Loading States**: Submit buttons are turned off while doing something
- **Delete Confirmation**: A pop-up asks for confirmation to prevent mistakes

## Responsive Design

### Breakpoints
- **Mobile**: Screens smaller than 640px (sm)
- **Tablet**: Between 640px and 1024px (md/lg)
- **Desktop**: Screens larger than 1024px (xl)

### Responsive Features
- **Header**: On smaller screens, the search bar hides, and spacing is adjusted
- **View Switcher**: On mobile, padding and text are smaller
- **Event Cards**: Text is cut off if it's too long
- **Month Grid**: Works well on all screen sizes
- **Week/Day Views**: Can have horizontal scrolling on small screens
- **FAB Position**: Stays fixed in the bottom right corner and is the right size

## Future Enhancements

### Potential Features
1.
**Recurring Events**: Let users set events to happen regularly according to iCal rules
2.
**Drag & Drop**: Reschedule events by dragging them to a new time
3.
**Event Reminders**: Send reminders for upcoming events
4.
**Calendar Sharing**: Allow multiple users to work on the same calendar
5.
**Search & Filter**: Find events by their name, description, or place
6.
**Import/Export**: Support for ICS files to share calendars with others
7.
**Multiple Calendars**: Use categories to organize calendars
8.
**Time Zone Support**: Handle events in different time zones
9.
**Keyboard Shortcuts**: Enable faster navigation for power users
10.
**Conflict Detection**: Alert about overlapping events
11.
**Event Categories**: Use tags and labels to organize events
12.
**Mini Calendar**: A side panel with a monthly view
13.
**Dark Mode**: Option to switch between light and dark themes
14.
**Offline Support**: Work with the app without an internet connection using service workers

### Technical Improvements
1.
**Authentication**: Add user accounts and personal calendars
2.
**Real-time Sync**: Use WebSocket for real-time updates when working together
3.
**Caching Strategy**: Store data optimistically and support working offline
4.
**Accessibility**: Use ARIA labels and ensure the app can be controlled with a keyboard
5.
**Internationalization**: Support various languages
6.
**Unit Tests**: Cover all parts of the code with Vitest
7.
**E2E Tests**: Use Playwright to test the app as a whole
8.
**Performance Monitoring**: Track usage and errors with analytics
9.
**Advanced RLS**: Ensure data is only visible to the right people
10.
**API Rate Limiting**: Prevent misuse and keep the app stable

## Implementation Choices

### Why React Context?

- Easy way to manage state without using extra libraries
- Works well for this app's needs (single user, not too complex)
- Can be upgraded to Zustand or Redux if needed

### Why Supabase?

- Uses PostgreSQL and works well with TypeScript
- Has built-in authentication and data security
- Offers real-time updates for future features
- Has a free tier for development and demos

### Why Tailwind CSS?

- Speeds up UI development using utility classes
- Provides a consistent look right from the start
- Easier to make the app responsive with breakpoint utilities
- Needs little custom CSS

### Why Vite?

- Fast development with hot module replacement
- Optimizes builds and uses tree shaking
- Uses native ES modules for quick setup
- Works well with TypeScript

## Known Limitations

1.
**Single User**: No login system (just for demo)
2.
**No Recurring Events**: Only handles one-time events
3.
**No Drag & Drop**: Events can't be moved by dragging
4.
**Limited Time Zones**: Uses the device's local time zone
5.
**No Conflict Detection**: Allows events to overlap
6.
**Search Not Functional**: Looks good but doesn't work
7.
**No Mobile Gestures**: No swipe navigation
8.
**Browser Support**: Works on modern browsers (ES2020+)

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Prepare the app for production
- `npm run preview` - See how the app looks in production
- `npm run lint` - Check code for issues
- `npm run typecheck` - Check for errors in TypeScript without making files

### Code Quality

- **TypeScript Strict Mode**: Ensures maximum type safety
- **ESLint Configuration**: Enforces rules for clean and readable code
- **Prettier Ready**: Formats code automatically when saved
- **No `any` Types**: Every part of the app is typed

## License

This project is for learning purposes only.


## Contributors

Built with help from Claude AI and modern tools.


---

**Note**: This is a cloned project for learning purposes and has no connection with Google or Google Calendar.
