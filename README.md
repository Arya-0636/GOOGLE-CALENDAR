# Google Calendar Clone

A high-fidelity, full-stack clone of Google Calendar built with modern web technologies. This application replicates the core functionality and user experience of Google Calendar, featuring smooth animations, interactive UI, and comprehensive calendar management capabilities.

## Features

### Core Functionality
- **Multiple View Types**: Switch seamlessly between Month, Week, and Day views
- **Event Management**: Create, edit, and delete calendar events with full details
- **Interactive UI**: Click on any time slot or day to create new events instantly
- **Event Details**: Add titles, descriptions, locations, times, and custom colors
- **All-Day Events**: Support for both timed and all-day events
- **Real-time Updates**: Instant synchronization with backend database

### User Experience
- **Smooth Animations**: Polished transitions and hover effects throughout
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Google-like UI**: High-fidelity replication of Google Calendar's design language
- **Quick Actions**: Floating action button for rapid event creation
- **Intuitive Navigation**: Easy date navigation with Today button and arrow controls
- **Color Coding**: 7 distinct color options for event categorization

## Technology Stack

### Frontend
- **React 18**: Modern component-based UI framework
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Beautiful, consistent icon set

### Backend
- **Supabase**: PostgreSQL database with real-time capabilities
- **Supabase Client**: Type-safe database operations
- **Row Level Security (RLS)**: Secure database access policies

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting
- **PostCSS & Autoprefixer**: CSS processing and browser compatibility

## Architecture

### Component Structure
```
src/
├── components/
│   ├── CalendarHeader.tsx    # Top navigation and view controls
│   ├── MonthView.tsx          # Monthly grid calendar view
│   ├── WeekView.tsx           # Weekly time-slot view
│   ├── DayView.tsx            # Detailed daily schedule view
│   ├── EventModal.tsx         # Event creation/editing dialog
│   └── FloatingActionButton.tsx # Quick event creation FAB
├── context/
│   └── CalendarContext.tsx    # Global state management
├── lib/
│   ├── supabase.ts            # Supabase client initialization
│   └── database.types.ts      # Generated TypeScript types
├── utils/
│   └── dateUtils.ts           # Date manipulation utilities
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and animations
```

### State Management
The application uses React Context API for centralized state management:
- **CalendarContext**: Manages events, current date, view type, and modal state
- **CRUD Operations**: Abstracted database operations (create, read, update, delete)
- **Real-time Synchronization**: Automatic event refresh after mutations

### Database Schema

#### Events Table
```sql
events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
  title           text NOT NULL
  description     text DEFAULT ''
  start_time      timestamptz NOT NULL
  end_time        timestamptz NOT NULL
  all_day         boolean DEFAULT false
  location        text DEFAULT ''
  color           text DEFAULT '#1a73e8'
  recurrence_rule text
  created_at      timestamptz DEFAULT now()
  updated_at      timestamptz DEFAULT now()
)
```

**Indexes:**
- `events_start_time_idx`: Optimizes date-based queries
- `events_end_time_idx`: Optimizes range queries

**Security:**
- Row Level Security (RLS) enabled
- Public access policy for demo purposes (can be restricted for production)

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works perfectly)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Supabase**

The `.env` file should already contain your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If starting fresh, create a Supabase project at https://supabase.com and update these values.

4. **Run database migrations**

The events table migration has already been applied. The schema includes:
- Events table with all necessary columns
- Indexes for performance optimization
- Row Level Security policies

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Business Logic & Edge Cases

### Date Calculations
- **Month View**: Displays 6 weeks (42 days) to maintain consistent grid layout
- **Week View**: Always starts on Sunday, following US calendar convention
- **Day View**: Shows full 24-hour schedule with hourly granularity

### Event Handling
- **Time Validation**: End time must be after start time
- **All-Day Events**: When enabled, time inputs are hidden
- **Overlapping Events**: Multiple events can exist at the same time
- **Multi-day Events**: Events spanning multiple days show on all affected dates
- **Event Positioning**: Calculated dynamically based on start/end times

### User Interaction
- **Click to Create**: Clicking any calendar cell opens event modal with pre-filled time
- **Click to Edit**: Clicking existing event opens modal in edit mode
- **Modal Overlay**: Click outside modal or close button to cancel
- **Form Validation**: Title is required; times are validated for logical consistency

### Performance Optimizations
- **Memoization**: View components use `useMemo` for expensive calculations
- **Efficient Queries**: Database indexed on timestamp columns
- **Minimal Re-renders**: Context separated from component tree for optimal updates
- **Lazy Loading**: Components rendered conditionally based on view type

## Animations & Interactions

### Implemented Animations
1. **Modal Entry**: Slide-up animation with fade-in (200ms ease-out)
2. **Button Hovers**: Smooth background color transitions
3. **FAB Interaction**: Scale transform on hover with shadow expansion
4. **Event Hovers**: Opacity changes and scale transforms
5. **View Transitions**: Smooth switching between Month/Week/Day views
6. **Color Picker**: Scale animation on selected color

### Interaction Patterns
- **Hover States**: All interactive elements have visual feedback
- **Active States**: Selected view buttons show with white background
- **Focus States**: Form inputs show blue ring on focus
- **Loading States**: Submit buttons disabled during operations
- **Delete Confirmation**: Browser confirm dialog prevents accidental deletions

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Responsive Features
- **Header**: Collapses search bar on mobile, adjusts spacing
- **View Switcher**: Compressed padding and text on mobile
- **Event Cards**: Truncated text prevents overflow
- **Month Grid**: Scales appropriately on all screen sizes
- **Week/Day Views**: Horizontal scroll on mobile if needed
- **FAB Position**: Fixed bottom-right, appropriately sized

## Future Enhancements

### Potential Features
1. **Recurring Events**: Implement iCal-style recurrence rules
2. **Drag & Drop**: Reschedule events by dragging to new time slots
3. **Event Reminders**: Notification system for upcoming events
4. **Calendar Sharing**: Multi-user collaboration features
5. **Search & Filter**: Find events by title, description, or location
6. **Import/Export**: ICS file support for calendar interoperability
7. **Multiple Calendars**: Category-based calendar organization
8. **Time Zone Support**: Handle events across different time zones
9. **Keyboard Shortcuts**: Power-user navigation and actions
10. **Conflict Detection**: Warn when events overlap
11. **Event Categories**: Tags and labels for organization
12. **Mini Calendar**: Side panel with month overview
13. **Dark Mode**: Theme switching capability
14. **Offline Support**: Progressive Web App with service workers

### Technical Improvements
1. **Authentication**: User accounts and personal calendars
2. **Real-time Sync**: WebSocket updates for collaborative editing
3. **Caching Strategy**: Optimistic updates and offline-first architecture
4. **Accessibility**: ARIA labels and keyboard navigation
5. **Internationalization**: Multi-language support
6. **Unit Tests**: Comprehensive test coverage with Vitest
7. **E2E Tests**: Playwright for integration testing
8. **Performance Monitoring**: Analytics and error tracking
9. **Advanced RLS**: User-specific data isolation
10. **API Rate Limiting**: Prevent abuse and ensure stability

## Implementation Choices

### Why React Context?
- Simple state management without external dependencies
- Sufficient for app's scope (single-user, moderate complexity)
- Easy to upgrade to Zustand/Redux if needed

### Why Supabase?
- PostgreSQL with excellent TypeScript support
- Built-in authentication and RLS for security
- Real-time subscriptions available for future enhancements
- Generous free tier for development and demos

### Why Tailwind CSS?
- Rapid UI development with utility classes
- Consistent design system out of the box
- Easy responsive design with breakpoint utilities
- Minimal custom CSS required

### Why Vite?
- Instant hot module replacement during development
- Optimized production builds with tree-shaking
- Native ES modules for faster cold starts
- Superior TypeScript support

## Known Limitations

1. **Single User**: No authentication system (demo mode)
2. **No Recurring Events**: Basic one-time events only
3. **No Drag & Drop**: Events can't be rescheduled by dragging
4. **Limited Time Zones**: Uses browser's local time zone
5. **No Conflict Detection**: Overlapping events allowed
6. **Search Not Functional**: UI present but not connected
7. **No Mobile Gestures**: Swipe navigation not implemented
8. **Browser Support**: Modern browsers only (ES2020+)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type-check without emitting files

### Code Quality
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint Configuration**: React and TypeScript rules enforced
- **Prettier Ready**: Format-on-save compatible
- **No `any` Types**: Fully typed application

## License

This is an educational project built for learning purposes.

## Contributors

Built with assistance from Claude AI and modern development tools.

---

**Note**: This is a clone project for educational purposes and is not affiliated with Google or Google Calendar.
