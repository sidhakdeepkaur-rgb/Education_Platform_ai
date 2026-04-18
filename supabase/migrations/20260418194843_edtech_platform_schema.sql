
/*
  # EduAI Platform - Complete Database Schema

  ## Overview
  Full EdTech platform schema supporting Grades 1-12 and competitive exam prep.

  ## Tables Created
  1. **profiles** - Extended user profiles with grade, subscription, XP, streaks
  2. **grades** - Grade levels (1-12 + JEE, NEET, UPSC, SAT, GRE, GMAT)
  3. **subjects** - Subjects per grade (Math, Science, etc.)
  4. **chapters** - Chapters within subjects
  5. **topics** - Topics within chapters
  6. **videos** - Video content linked to topics
  7. **quizzes** - Quiz sets linked to topics/chapters
  8. **quiz_questions** - Individual questions (MCQ, drag-drop, fill-up, image)
  9. **user_progress** - Tracks completion per topic/chapter/subject
  10. **user_xp_log** - XP events log for gamification
  11. **badges** - Badge definitions
  12. **user_badges** - Badges earned by users
  13. **live_classes** - Scheduled live sessions
  14. **class_enrollments** - User enrollments in live classes
  15. **doubts** - AI doubt solver threads
  16. **doubt_messages** - Messages in doubt threads
  17. **subscriptions** - User subscription plans
  18. **study_plans** - AI-generated study schedules
  19. **leaderboard_cache** - Cached leaderboard scores

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Public read on grades, subjects, chapters, topics, videos, quizzes (published)
*/

-- ============================================================
-- GRADES
-- ============================================================
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  display_name text NOT NULL,
  category text NOT NULL DEFAULT 'school', -- 'school' | 'competitive'
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Grades are publicly readable" ON grades FOR SELECT USING (true);

INSERT INTO grades (name, display_name, category, order_index) VALUES
  ('grade_1', 'Grade 1', 'school', 1),
  ('grade_2', 'Grade 2', 'school', 2),
  ('grade_3', 'Grade 3', 'school', 3),
  ('grade_4', 'Grade 4', 'school', 4),
  ('grade_5', 'Grade 5', 'school', 5),
  ('grade_6', 'Grade 6', 'school', 6),
  ('grade_7', 'Grade 7', 'school', 7),
  ('grade_8', 'Grade 8', 'school', 8),
  ('grade_9', 'Grade 9', 'school', 9),
  ('grade_10', 'Grade 10', 'school', 10),
  ('grade_11', 'Grade 11', 'school', 11),
  ('grade_12', 'Grade 12', 'school', 12),
  ('jee', 'JEE Main & Advanced', 'competitive', 13),
  ('neet', 'NEET UG', 'competitive', 14),
  ('upsc', 'UPSC Civil Services', 'competitive', 15),
  ('sat', 'SAT', 'competitive', 16),
  ('gre', 'GRE', 'competitive', 17),
  ('gmat', 'GMAT', 'competitive', 18)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SUBJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id uuid REFERENCES grades(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_name text NOT NULL,
  icon text DEFAULT 'book',
  color text DEFAULT '#3B82F6',
  description text,
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published subjects are publicly readable" ON subjects FOR SELECT USING (is_published = true);

-- ============================================================
-- CHAPTERS
-- ============================================================
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_name text NOT NULL,
  description text,
  order_index integer DEFAULT 0,
  estimated_hours numeric(4,1) DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published chapters are publicly readable" ON chapters FOR SELECT USING (is_published = true);

-- ============================================================
-- TOPICS
-- ============================================================
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_name text NOT NULL,
  description text,
  order_index integer DEFAULT 0,
  difficulty text DEFAULT 'medium', -- 'easy' | 'medium' | 'hard'
  estimated_minutes integer DEFAULT 15,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published topics are publicly readable" ON topics FOR SELECT USING (is_published = true);

-- ============================================================
-- VIDEOS
-- ============================================================
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_url text,
  thumbnail_url text,
  duration_seconds integer DEFAULT 0,
  language text DEFAULT 'en',
  has_subtitles boolean DEFAULT false,
  view_count integer DEFAULT 0,
  order_index integer DEFAULT 0,
  is_free boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published videos are publicly readable" ON videos FOR SELECT USING (is_published = true);

-- ============================================================
-- QUIZZES
-- ============================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE SET NULL,
  chapter_id uuid REFERENCES chapters(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  quiz_type text DEFAULT 'practice', -- 'practice' | 'test' | 'adaptive'
  time_limit_minutes integer,
  total_marks integer DEFAULT 0,
  passing_marks integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published quizzes are publicly readable" ON quizzes FOR SELECT USING (is_published = true);

-- ============================================================
-- QUIZ QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'mcq', -- 'mcq' | 'fill_blank' | 'drag_drop' | 'image_based'
  options jsonb, -- array of {id, text, is_correct}
  correct_answer text,
  explanation text,
  marks integer DEFAULT 1,
  negative_marks numeric(3,1) DEFAULT 0,
  image_url text,
  difficulty text DEFAULT 'medium',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz questions are publicly readable" ON quiz_questions FOR SELECT USING (true);

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  grade_id uuid REFERENCES grades(id) ON DELETE SET NULL,
  phone text,
  parent_name text,
  parent_phone text,
  city text,
  board text DEFAULT 'CBSE', -- CBSE | ICSE | State
  target_exam text,
  xp_total integer DEFAULT 0,
  xp_level integer DEFAULT 1,
  streak_current integer DEFAULT 0,
  streak_longest integer DEFAULT 0,
  streak_last_active date,
  subscription_plan text DEFAULT 'free', -- 'free' | 'basic' | 'pro'
  subscription_expires_at timestamptz,
  onboarding_completed boolean DEFAULT false,
  preferred_language text DEFAULT 'en',
  dark_mode boolean DEFAULT false,
  role text DEFAULT 'student', -- 'student' | 'parent' | 'admin'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- ============================================================
-- USER PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE SET NULL,
  watch_percentage numeric(5,2) DEFAULT 0,
  is_completed boolean DEFAULT false,
  quiz_score numeric(5,2),
  time_spent_seconds integer DEFAULT 0,
  last_accessed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- USER XP LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS user_xp_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  xp_earned integer NOT NULL DEFAULT 0,
  reason text NOT NULL, -- 'video_watched' | 'quiz_passed' | 'streak' | 'badge'
  reference_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_xp_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own XP log" ON user_xp_log FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own XP" ON user_xp_log FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- BADGES
-- ============================================================
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  display_name text NOT NULL,
  description text,
  icon text,
  color text DEFAULT '#3B82F6',
  xp_reward integer DEFAULT 0,
  condition_type text, -- 'streak' | 'xp' | 'quiz' | 'videos'
  condition_value integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are publicly readable" ON badges FOR SELECT USING (true);

INSERT INTO badges (name, display_name, description, icon, color, xp_reward, condition_type, condition_value) VALUES
  ('first_video', 'First Step', 'Watched your first video', 'play', '#3B82F6', 50, 'videos', 1),
  ('streak_7', 'Week Warrior', '7-day learning streak', 'flame', '#F97316', 100, 'streak', 7),
  ('streak_30', 'Month Master', '30-day learning streak', 'zap', '#EAB308', 300, 'streak', 30),
  ('quiz_ace', 'Quiz Ace', 'Scored 100% on a quiz', 'star', '#22C55E', 150, 'quiz', 100),
  ('xp_1000', 'XP Hunter', 'Earned 1000 XP', 'trophy', '#F59E0B', 200, 'xp', 1000),
  ('videos_10', 'Curious Learner', 'Watched 10 videos', 'video', '#8B5CF6', 100, 'videos', 10),
  ('videos_50', 'Knowledge Seeker', 'Watched 50 videos', 'book-open', '#3B82F6', 250, 'videos', 50)
ON CONFLICT DO NOTHING;

-- ============================================================
-- USER BADGES
-- ============================================================
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- LIVE CLASSES
-- ============================================================
CREATE TABLE IF NOT EXISTS live_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  instructor_name text NOT NULL,
  instructor_avatar text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  max_students integer DEFAULT 500,
  enrolled_count integer DEFAULT 0,
  meeting_url text,
  recording_url text,
  is_free boolean DEFAULT false,
  status text DEFAULT 'upcoming', -- 'upcoming' | 'live' | 'completed' | 'cancelled'
  created_at timestamptz DEFAULT now()
);

ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Live classes are publicly readable" ON live_classes FOR SELECT USING (true);

-- ============================================================
-- CLASS ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS class_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES live_classes(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  attended boolean DEFAULT false,
  UNIQUE(user_id, class_id)
);

ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON class_enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in classes" ON class_enrollments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- DOUBTS
-- ============================================================
CREATE TABLE IF NOT EXISTS doubts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE SET NULL,
  title text NOT NULL,
  status text DEFAULT 'open', -- 'open' | 'resolved'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own doubts" ON doubts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create doubts" ON doubts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own doubts" ON doubts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- DOUBT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS doubt_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doubt_id uuid REFERENCES doubts(id) ON DELETE CASCADE,
  sender text NOT NULL DEFAULT 'user', -- 'user' | 'ai'
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doubt_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages for own doubts" ON doubt_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM doubts WHERE doubts.id = doubt_messages.doubt_id AND doubts.user_id = auth.uid()));
CREATE POLICY "Users can insert messages for own doubts" ON doubt_messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM doubts WHERE doubts.id = doubt_messages.doubt_id AND doubts.user_id = auth.uid()));

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  plan text NOT NULL, -- 'basic' | 'pro'
  billing_cycle text DEFAULT 'monthly', -- 'monthly' | 'annual'
  amount_paise integer NOT NULL DEFAULT 0,
  currency text DEFAULT 'INR',
  status text DEFAULT 'active', -- 'active' | 'cancelled' | 'expired' | 'trial'
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  payment_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- STUDY PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  goal text,
  target_date date,
  daily_hours numeric(3,1) DEFAULT 2,
  plan_data jsonb, -- AI-generated schedule
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own study plans" ON study_plans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create study plans" ON study_plans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study plans" ON study_plans FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score numeric(5,2) DEFAULT 0,
  total_marks integer DEFAULT 0,
  time_taken_seconds integer DEFAULT 0,
  answers jsonb, -- {question_id: selected_answer}
  is_passed boolean DEFAULT false,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_subjects_grade ON subjects(grade_id);
CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_chapter ON topics(chapter_id);
CREATE INDEX IF NOT EXISTS idx_videos_topic ON videos(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_topic ON user_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_xp_user ON user_xp_log(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_doubts_user ON doubts(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON profiles(grade_id);
