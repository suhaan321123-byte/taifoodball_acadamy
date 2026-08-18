CREATE TABLE public.matches (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opponent text NOT NULL,
  competition text NOT NULL DEFAULT 'Friendly',
  kickoff_at timestamp with time zone NOT NULL,
  venue text NOT NULL DEFAULT 'Academy Ground',
  home_away text NOT NULL DEFAULT 'home',
  result text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.matches TO authenticated;
GRANT ALL ON public.matches TO service_role;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view matches" ON public.matches FOR SELECT TO authenticated USING (true);

CREATE TABLE public.attendance (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_title text NOT NULL,
  session_date date NOT NULL,
  status text NOT NULL DEFAULT 'present',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.attendance TO authenticated;
GRANT ALL ON public.attendance TO service_role;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE INDEX attendance_user_date_idx ON public.attendance (user_id, session_date DESC);

CREATE TABLE public.fees (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description text NOT NULL,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  due_date date NOT NULL,
  paid boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fees TO authenticated;
GRANT ALL ON public.fees TO service_role;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own fees" ON public.fees FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE INDEX fees_user_idx ON public.fees (user_id, due_date);
CREATE TRIGGER fees_updated_at BEFORE UPDATE ON public.fees FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.matches (opponent, competition, kickoff_at, venue, home_away, result) VALUES
  ('Coastal United U19', 'Regional Youth League', now() + interval '5 days', 'Academy Ground', 'home', NULL),
  ('Northside FC Academy', 'Regional Youth League', now() + interval '12 days', 'Northside Sports Complex', 'away', NULL),
  ('Harbour City Youth', 'Cup Quarter-Final', now() + interval '19 days', 'Academy Ground', 'home', NULL),
  ('Valley Rangers U19', 'Regional Youth League', now() - interval '6 days', 'Valley Park', 'away', 'W 3-1'),
  ('Metro Sports School', 'Friendly', now() - interval '13 days', 'Academy Ground', 'home', 'D 2-2'),
  ('Eastfield Athletic', 'Regional Youth League', now() - interval '21 days', 'Eastfield Arena', 'away', 'W 4-0');