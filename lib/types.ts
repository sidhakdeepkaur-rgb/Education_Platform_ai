export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  grade_id: string | null;
  xp_total: number;
  xp_level: number;
  streak_current: number;
  streak_longest: number;
  subscription_plan: 'free' | 'basic' | 'pro';
  onboarding_completed: boolean;
  role: 'student' | 'parent' | 'admin';
  board: string;
  city: string | null;
}

export interface Grade {
  id: string;
  name: string;
  display_name: string;
  category: 'school' | 'competitive';
  order_index: number;
}

export interface Subject {
  id: string;
  grade_id: string;
  name: string;
  display_name: string;
  icon: string;
  color: string;
  description: string | null;
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  display_name: string;
  description: string | null;
  order_index: number;
  estimated_hours: number;
}

export interface Topic {
  id: string;
  chapter_id: string;
  name: string;
  display_name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_minutes: number;
}

export interface Video {
  id: string;
  topic_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration_seconds: number;
  is_free: boolean;
}

export interface Badge {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  color: string;
  xp_reward: number;
}

export interface LiveClass {
  id: string;
  title: string;
  description: string | null;
  instructor_name: string;
  instructor_avatar: string | null;
  scheduled_at: string;
  duration_minutes: number;
  enrolled_count: number;
  is_free: boolean;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'mcq' | 'fill_blank' | 'drag_drop' | 'image_based';
  options: { id: string; text: string; is_correct: boolean }[] | null;
  correct_answer: string | null;
  explanation: string | null;
  marks: number;
  image_url: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type PlanType = 'free' | 'basic' | 'pro';

export interface Doubt {
  id: string;
  user_id: string;
  title: string;
  status: 'open' | 'resolved';
  created_at: string;
}

export interface DoubtMessage {
  id: string;
  doubt_id: string;
  sender: 'user' | 'ai';
  content: string;
  image_url: string | null;
  created_at: string;
}
