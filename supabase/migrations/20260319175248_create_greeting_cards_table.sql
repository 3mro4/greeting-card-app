/*
  # Create greeting cards table

  1. New Tables
    - `greeting_cards`
      - `card_id` (text, primary key) - short alphanumeric ID used in shared URLs
      - `image` (text) - base64 data URL of the card background image
      - `image_width` (integer) - original image width in pixels
      - `image_height` (integer) - original image height in pixels
      - `name_position_x` (real) - horizontal name position as percentage (0-100)
      - `name_position_y` (real) - vertical name position as percentage (0-100)
      - `font_family` (text) - font family name for the recipient name
      - `font_size` (integer) - font size in pixels
      - `text_color` (text) - hex color for the name text
      - `rtl` (boolean) - whether the text direction is right-to-left
      - `custom_font_data` (text, nullable) - base64 data URL for uploaded custom font
      - `custom_font_name` (text, nullable) - name of the custom font
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on `greeting_cards` table
    - Add policy for anyone to read cards (shared links must be publicly accessible)
    - Add policy for anyone to insert cards (no auth required for card creation)

  3. Notes
    - Cards are public by design: a designer creates a card and shares the link with recipients
    - No authentication is used in this app, so policies allow anonymous access
    - The card_id is an 8-character random string that serves as an unguessable token
*/

CREATE TABLE IF NOT EXISTS greeting_cards (
  card_id text PRIMARY KEY,
  image text NOT NULL,
  image_width integer NOT NULL DEFAULT 0,
  image_height integer NOT NULL DEFAULT 0,
  name_position_x real NOT NULL DEFAULT 50,
  name_position_y real NOT NULL DEFAULT 70,
  font_family text NOT NULL DEFAULT 'Inter',
  font_size integer NOT NULL DEFAULT 32,
  text_color text NOT NULL DEFAULT '#ffffff',
  rtl boolean NOT NULL DEFAULT false,
  custom_font_data text,
  custom_font_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE greeting_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read greeting cards"
  ON greeting_cards
  FOR SELECT
  TO anon
  USING (card_id IS NOT NULL);

CREATE POLICY "Anyone can create greeting cards"
  ON greeting_cards
  FOR INSERT
  TO anon
  WITH CHECK (card_id IS NOT NULL);
