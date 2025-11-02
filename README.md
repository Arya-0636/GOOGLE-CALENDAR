Google Calendar Clone

A detailed, full-stack version of Google Calendar built with modern web technologies. This app functions like Google Calendar, featuring smooth animations, an intuitive interface, and all the main features of a calendar app.

Features:

Core Functionality:
- Switch between Month, Week, and Day views easily.
- Add, edit, and delete events with all necessary details.
- Click on any time slot or day to quickly create a new event.
- Include titles, descriptions, locations, times, and choose custom colors for events.
- Create all-day events or set specific start and end times.
- Events update instantly when changes occur in the database.

User Experience:
- Smooth transitions and hover effects give the app a polished look.
- Works well on desktops, tablets, and phones.
- Looks and feels just like Google Calendar.
- Quickly create events with a floating action button.
- Easily navigate dates using the Today button and arrows.
- Choose from seven colors to help organize events.

Technology Stack:

Frontend:
- React 18: A modern tool for building user interfaces.
- TypeScript: Adds type safety to the code.
- Vite: A fast tool for building and running the app.
- Tailwind CSS: Simplifies styling the app with utility classes.
- Lucide React: Provides a set of attractive icons.

Backend:
- Supabase: A database with real-time features that uses PostgreSQL.
- Supabase Client: Aids with database operations in a type-safe manner.
- Row Level Security (RLS): Manages who can access what data.

Development Tools:
- ESLint: Checks the code for quality and consistency.
- TypeScript ESLint: Identifies issues specific to TypeScript.
- PostCSS & Autoprefixer: Helps with CSS and ensures it works across various browsers.

Architecture:

Component Structure:
src/
components/
CalendarHeader.tsx: The top part of the app with navigation and controls.
MonthView.tsx: Displays the calendar in a monthly layout.
WeekView.tsx: Shows a weekly view with time slots.
DayView.tsx: Detailed schedule for each day.
EventModal.tsx: Window for creating or editing events.
FloatingActionButton.tsx: Quick button to create events.
context/
CalendarContext.tsx: Manages the app's state throughout.
lib/
supabase.ts: Initializes the Supabase client.
database.types.ts: Defines TypeScript types for the database.
utils/
dateUtils.ts: Offers tools for date management.
App.tsx: Main component of the app.
main.tsx: Where the app starts.
index.css: Styles and animations for the entire app.

State Management:
The app uses React's Context API for state management:
- CalendarContext: Tracks events, current date, view type, and modal status.
- CRUD Operations: Manages adding, reading, updating, and deleting events.
- Real-time Synchronization: Events update automatically when changes occur.

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
- events_start_time_idx: Assists with queries based on dates.
- events_end_time_idx: Speeds up range queries.

Security:
- Row Level Security (RLS) is enabled to safeguard data.
- A public access policy is set up for the demo, which can be adjusted for production.

Setup Instructions:

Prerequisites:
- Node.js 18 or newer and npm.
- A Supabase account (a free tier is sufficient).

Installation:

1. Clone the repo:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install the dependencies:
```bash
npm install
```

3. Configure Supabase:
Update the `.env` file with your Supabase URL and Anon Key:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If starting from scratch, create a project at https://supabase.com and update these values.

4. Run database migrations:
The events table has already been created with all necessary columns.
- Indexes are set up for improved performance.
- Row Level Security policies are established.

5. Start the development server:
```bash
npm run dev
```

The app will run at http://localhost:5173.

Build for Production:
```bash
npm run build
npm run preview
```

## Business Logic & Edge Cases

### Date Calculations
- **Month View**: Displays 6 weeks (42 days) to ensure consistent layout.
- **Week View**: Starts every week on Sunday, like the US calendar.
- **Day View**: Shows a complete day with time slots for each hour.

### Event Handling
- **Time Validation**: End time must be later than the start time.
- **All-Day Events**: When this is enabled, time fields are hidden.
- **Overlapping Events**: You can have multiple events at the same time.
- **Multi-day Events**: Appear on all days they cover.
- **Event Positioning**: Adjusts based on the event's start and end times.

### User Interaction
- **Click to Create**: Clicking on any day opens a form with pre-filled time.
- **Click to Edit**: Clicking on an event brings up the form to modify it.
- **Modal Overlay**: Click outside the form or the close button to cancel.
- **Form Validation**: A title is required, and time fields must make sense.

### Performance Optimizations
- **Memoization**: Uses `useMemo` for faster calculations.
- **Efficient Queries**: Database has indexes on time fields for quicker searches.
- **Minimal Re-renders**: Keeps the component tree simple for faster updates.
- **Lazy Loading**: Loads components only when needed.

## Animations & Interactions

### Implemented Animations
1. **Modal Entry**: Slides up and fades in (200ms ease-out).
2. **Button Hovers**: Smooth background color changes.
3. **FAB Interaction**: Enlarges the floating action button and adds a shadow on hover.
4. **Event Hovers**: Makes the event slightly bigger and more transparent.
5. **View Transitions**: Smooth changes between month, week, or day views.
6. **Color Picker**: Enlarges the selected color.

### Interaction Patterns
- **Hover States**: Every button and option changes visually when hovered over.
- **Active States**: Selected buttons have a white background.
- **Focus States**: Clicking on a field shows a blue ring around it.
- **Loading States**: Submit buttons are disabled while processing.
- **Delete Confirmation**: A pop-up requests confirmation to prevent errors.

## Responsive Design

### Breakpoints
- **Mobile**: Screens smaller than 640px.
- **Tablet**: Between 640px and 1024px.
- **Desktop**: Screens larger than 1024px.

### Responsive Features
- **Header**: On smaller screens, the search bar hides, and spacing changes.
- **View Switcher**: On mobile, padding and text are smaller.
- **Event Cards**: Text is truncated if too long.
- **Month Grid**: Functions well on all screen sizes.
- **Week/Day Views**: Allow horizontal scrolling on small screens.
- **FAB Position**: Remains fixed in the bottom right corner and is appropriately sized.

## Future Enhancements

### Potential Features
1. **Recurring Events**: Allow users to set events to repeat according to iCal rules.
2. **Drag & Drop**: Reschedule events by dragging them.
3. **Event Reminders**: Send alerts for upcoming events.
4. **Calendar Sharing**: Enable collaboration on the same calendar.
5. **Search & Filter**: Locate events by name, description, or location.
6. **Import/Export**: Support for ICS files for calendar sharing.
7. **Multiple Calendars**: Use categories to organize different calendars.
8. **Time Zone Support**: Manage events across different time zones.
9. **Keyboard Shortcuts**: Enable quicker navigation for power users.
10. **Conflict Detection**: Notify about overlapping events.
11. **Event Categories**: Utilize tags and labels for organizing events.
12. **Mini Calendar**: A side panel with a monthly view.
13. **Dark Mode**: Option to toggle between light and dark themes.
14. **Offline Support**: Use the app without an internet connection through service workers.

### Technical Improvements
1. **Authentication**: Add user accounts and personal calendars.
2. **Real-time Sync**: Use WebSocket for live updates while collaborating.
3. **Caching Strategy**: Store data optimistically and allow offline work.
4. **Accessibility**: Implement ARIA labels and ensure keyboard navigation.
5. **Internationalization**: Support multiple languages.
6. **Unit Tests**: Cover all aspects of the code with Vitest.
7. **E2E Tests**: Employ Playwright for holistic app testing.
8. **Performance Monitoring**: Track usage and errors with analytics.
9. **Advanced RLS**: Ensure data visibility is restricted to the right users.
10. **API Rate Limiting**: Prevent abuse and maintain app stability.

## Implementation Choices

### Why React Context?
- A simple way to manage state without using additional libraries.
- Fits well with the app's needs (single user, not overly complex).
- Can be upgraded to Zustand or Redux if required.

### Why Supabase?
- Uses PostgreSQL, compatible with TypeScript.
- Combines built-in user authentication and data protection.
- Provides real-time updates for future features.
- Offers a free tier for development and demos.

### Why Tailwind CSS?
- Accelerates UI development with utility classes.
- Ensures a consistent look from the start.
- Eases responsiveness with breakpoint utilities.
- Requires minimal custom CSS.

### Why Vite?
- Enables fast development with hot module replacement.
- Optimizes builds and utilizes tree shaking.
- Employs native ES modules for swift setup.
- Works seamlessly with TypeScript.

## Known Limitations

1. **Single User**: Lacks a login system (for demo purposes only).
2. **No Recurring Events**: Currently supports only one-time events.
3. **No Drag & Drop**: Events cannot be moved by dragging.
4. **Limited Time Zones**: Uses the device's local time zone.
5. **No Conflict Detection**: Permits overlapping events.
6. **Search Not Functional**: Appears operational but does not work.
7. **No Mobile Gestures**: Lacks swipe navigation.
8. **Browser Support**: Works on modern browsers (ES2020+).

## Development

### Available Scripts
- `npm run dev` - Initiates the development server.
- `npm run build` - Prepares the app for production.
- `npm run preview` - Provides a preview of the app in production.
- `npm run lint` - Checks the code for problems.
- `npm run typecheck` - Validates TypeScript for errors without generating files.

### Code Quality
- **TypeScript Strict Mode**: Maximizes type safety.
- **ESLint Configuration**: Enforces rules for clean, understandable code.
- **Prettier Ready**: Automatically formats code when saved.
- **No `any` Types**: Every part of the app is strictly typed.

## License
This project is for educational purposes only.

## Contributors
Built with support from Claude AI and modern tools.

**Note**: This is a cloned project for educational purposes and is not associated with Google or Google Calendar.
