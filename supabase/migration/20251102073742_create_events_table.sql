/*
  # Create Calendar Events Table

  1. New Tables
    - `events`
      - `id` (uuid, primary key) - Unique identifier for each event
      - `title` (text) - Event title/name
      - `description` (text, nullable) - Event description
      - `start_time` (timestamptz) - Event start date and time
      - `end_time` (timestamptz) - Event end date and time
      - `all_day` (boolean) - Whether event is all-day
      - `location` (text, nullable) - Event location
      - `color` (text) - Event color for display
      - `recurrence_rule` (text, nullable) - iCal-style recurrence rule (future enhancement)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `events` table
    - Add policy for public access (for demo purposes, allows all operations)
    
  3. Indexes
    - Index on start_time for efficient date-based queries
    - Index on end_time for range queries
*/

CREATE TABLE IF NOT EXISTS events (
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
);

CREATE INDEX IF NOT EXISTS events_start_time_idx ON events(start_time);
CREATE INDEX IF NOT EXISTS events_end_time_idx ON events(end_time);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on events"
  ON events
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
