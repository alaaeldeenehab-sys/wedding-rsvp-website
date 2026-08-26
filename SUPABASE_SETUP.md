# Supabase Setup Guide / دليل إعداد Supabase

## إنشاء قاعدة البيانات

### 1. SQL Query to Run in Supabase SQL Editor

انسخ والصق هذا الكود في **SQL Editor** في Supabase:

```sql
-- Create the main RSVP responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count >= 1 AND guest_count <= 10),
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT
CREATE POLICY "Allow anyone to insert RSVP" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Policy: Allow anyone to SELECT
CREATE POLICY "Allow anyone to select RSVP" ON rsvp_responses
  FOR SELECT USING (true);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses(created_at DESC);

-- Create an index on attending for faster filtering
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp_responses(attending);
```

### 2. Get Your Credentials

1. Go to **Project Settings → API** in Supabase
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_PASSWORD=your_secure_password_here
```

---

## Database Schema Explanation

### Table: `rsvp_responses`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `full_name` | TEXT | Guest's full name |
| `guest_count` | INTEGER | Number of guests (1-10) |
| `attending` | BOOLEAN | true = attending, false = declining |
| `created_at` | TIMESTAMP | When the RSVP was submitted |

### Indexes

- `idx_rsvp_created_at`: For sorting by date
- `idx_rsvp_attending`: For filtering by attendance status

### Row Level Security (RLS)

- ✅ Anyone can INSERT (submit RSVP)
- ✅ Anyone can SELECT (for admin to read with password)
- ❌ UPDATE/DELETE disabled (data integrity)

---

## Security Notes

1. **Public Anon Key**: Used in frontend (it's safe, it's public)
2. **Service Role Key**: Keep this SECRET - never expose it
3. **Admin Password**: Set in `VITE_ADMIN_PASSWORD` - only in GitHub Secrets
4. **RLS Policies**: Restrict data access at database level

---

## Testing the Connection

1. Run `npm run dev`
2. Fill the RSVP form
3. Check Supabase Dashboard → Table Editor → `rsvp_responses`
4. You should see your submission!

---

## Backing Up Your Data

### Via Supabase Dashboard
1. Go to Project Settings
2. Click "Database" → "Backups"
3. Download manual backup

### Via SQL Query
Run this in SQL Editor to get CSV export:

```sql
COPY rsvp_responses TO STDOUT WITH CSV HEADER;
```

---

## Troubleshooting

**Q: RSVP not saving?**
A: Check browser console for errors. Verify Supabase keys in .env

**Q: Admin can't see data?**
A: Verify RLS policies are created. Check password is correct.

**Q: Getting errors?**
A: Check console for actual error messages. Verify table exists.

---

## Advanced: Custom Queries

### Get Statistics

```sql
-- Total confirmed
SELECT COUNT(*) as total_confirmed FROM rsvp_responses WHERE attending = true;

-- Total guests
SELECT SUM(guest_count) as total_guests FROM rsvp_responses WHERE attending = true;

-- Total declined
SELECT COUNT(*) as total_declined FROM rsvp_responses WHERE attending = false;

-- By date
SELECT DATE(created_at) as date, COUNT(*) as count FROM rsvp_responses GROUP BY DATE(created_at);
```

---

✅ You're all set! Enjoy your wedding RSVP system!
