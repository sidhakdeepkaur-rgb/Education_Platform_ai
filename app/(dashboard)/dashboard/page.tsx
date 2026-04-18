'use client';

import Link from 'next/link';
import { Flame, Zap, BookOpen, Clock, TrendingUp, Brain, ChevronRight, Play, Star, Trophy, Target, ArrowRight, Sparkles, CircleCheck as CheckCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CONTINUE_LEARNING = [
  { subject: 'Mathematics', chapter: 'Quadratic Equations', topic: 'Nature of Roots', progress: 75, color: 'bg-blue-500', subjectIcon: '∑' },
  { subject: 'Physics', chapter: 'Mechanics', topic: "Newton's Laws of Motion", progress: 45, color: 'bg-green-500', subjectIcon: '⚛' },
  { subject: 'Chemistry', chapter: 'Organic Chemistry', topic: 'Hydrocarbons', progress: 20, color: 'bg-yellow-500', subjectIcon: '⚗' },
];

const AI_RECOMMENDATIONS = [
  { type: 'Revise', topic: 'Integration by Parts', subject: 'Mathematics', reason: 'Quiz score was 60%', icon: '📖', color: 'text-blue-600 bg-blue-50' },
  { type: 'Practice', topic: 'Thermodynamics', subject: 'Physics', reason: 'Weak area detected', icon: '⚡', color: 'text-orange-600 bg-orange-50' },
  { type: 'Watch', topic: 'p-Block Elements', subject: 'Chemistry', reason: 'Not started yet', icon: '▶', color: 'text-green-600 bg-green-50' },
];

const UPCOMING_CLASSES = [
  { subject: 'Mathematics', title: 'Matrices & Determinants', teacher: 'Prof. Sharma', time: 'Today, 4:00 PM', students: 342, color: 'bg-blue-500', free: false },
  { subject: 'Physics', title: 'Wave Optics Deep Dive', teacher: 'Dr. Kapoor', time: 'Today, 6:30 PM', students: 198, color: 'bg-green-500', free: true },
  { subject: 'Chemistry', title: 'Organic Reactions', teacher: 'Prof. Mehta', time: 'Tomorrow, 5:00 PM', students: 267, color: 'bg-yellow-500', free: false },
];

const BADGES_EARNED = [
  { icon: '🔥', label: 'Week Warrior', earned: true },
  { icon: '⚡', label: 'XP Hunter', earned: true },
  { icon: '📚', label: 'Curious Learner', earned: true },
  { icon: '🎯', label: 'Quiz Ace', earned: false },
  { icon: '🏆', label: 'Month Master', earned: false },
  { icon: '🧠', label: 'Brain Power', earned: false },
];

const WEAK_AREAS = [
  { subject: 'Mathematics', topic: 'Integration', score: 48, color: 'bg-red-400', textColor: 'text-red-600' },
  { subject: 'Physics', topic: 'Thermodynamics', score: 55, color: 'bg-orange-400', textColor: 'text-orange-600' },
  { subject: 'Chemistry', topic: 'Electrochemistry', score: 62, color: 'bg-yellow-400', textColor: 'text-yellow-600' },
];

const ACTIVITY_WEEKS = [
  [1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1],
];

export default function DashboardPage() {
  const studentName = 'Arjun';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10 text-9xl font-bold">🎓</div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-blue-100 text-sm">{today}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Good morning, {studentName}! 🌟</h1>
          <p className="text-blue-100">You&apos;re on a <strong className="text-yellow-300">7-day streak</strong> — keep it going! Your next milestone is 10 days.</p>
          <div className="flex items-center gap-3 mt-4">
            <Link href="/learn">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 border-0 h-9 text-sm font-semibold rounded-xl shadow-sm">
                Continue Learning <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-9 text-sm rounded-xl">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: 'Total XP', value: '2,840', sub: '+120 today', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Flame, label: 'Day Streak', value: '7 Days', sub: 'Best: 21 days', color: 'text-orange-600', bg: 'bg-orange-50' },
          { icon: BookOpen, label: 'Lessons Done', value: '124', sub: '+3 this week', color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Clock, label: 'Study Time', value: '38h', sub: 'This month', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-4 card-shadow">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className={`text-xs ${color} font-medium`}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-500" /> Continue Learning
            </h2>
            <Link href="/learn" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {CONTINUE_LEARNING.map(({ subject, chapter, topic, progress, color, subjectIcon }) => (
              <Link key={topic} href="/learn">
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0`}>
                    {subjectIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{subject} · {chapter}</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{topic}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-500" />
            <h2 className="font-bold text-gray-900">AI Picks For You</h2>
            <Badge className="ml-auto bg-blue-50 text-blue-600 border-0 text-xs">Smart</Badge>
          </div>
          <div className="space-y-3">
            {AI_RECOMMENDATIONS.map(({ type, topic, subject, reason, icon, color }) => (
              <Link key={topic} href="/learn">
                <div className="p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-sm font-bold shrink-0`}>{icon}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-semibold text-gray-500">{type}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{subject}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{topic}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{reason}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/learn">
            <Button variant="outline" className="w-full mt-3 text-sm h-9 rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50">
              View All Recommendations
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Live Classes */}
        <div className="lg:col-span-2 bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-500" /> Upcoming Live Classes
            </h2>
            <Link href="/live" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {UPCOMING_CLASSES.map(({ subject, title, teacher, time, students, color, free }) => (
              <div key={title} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs text-gray-400">{subject}</p>
                    {free && <Badge className="bg-green-50 text-green-600 border-0 text-xs px-1.5 py-0">Free</Badge>}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
                  <p className="text-xs text-gray-400">{teacher} · {time} · {students} enrolled</p>
                </div>
                <Button className="shrink-0 h-8 px-3 text-xs gradient-blue text-white border-0 rounded-lg">Join</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h2 className="font-bold text-gray-900">Weak Areas</h2>
            <Badge className="ml-auto bg-orange-50 text-orange-600 border-0 text-xs">Focus</Badge>
          </div>
          <div className="space-y-4">
            {WEAK_AREAS.map(({ subject, topic, score, color, textColor }) => (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1.5">
                  <div>
                    <span className="font-medium text-gray-700">{topic}</span>
                    <span className="text-xs text-gray-400 ml-1">({subject})</span>
                  </div>
                  <span className={`font-bold text-xs ${textColor}`}>{score}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/learn">
            <Button className="w-full mt-4 h-9 text-sm gradient-blue text-white border-0 rounded-xl">
              Practice Weak Areas
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" /> Achievements
            </h2>
            <span className="text-sm text-gray-400">3/6 earned</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {BADGES_EARNED.map(({ icon, label, earned }) => (
              <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all ${earned ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50 border-2 border-gray-100 opacity-50 grayscale'}`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-gray-700 leading-tight">{label}</span>
                {earned && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
              </div>
            ))}
          </div>
          <Link href="/leaderboard">
            <Button variant="outline" className="w-full mt-3 text-sm h-9 rounded-xl">View All Badges</Button>
          </Link>
        </div>

        {/* Activity Calendar */}
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-blue-500" />
            <h2 className="font-bold text-gray-900">Study Activity</h2>
            <span className="ml-auto text-sm text-gray-400">Last 28 days</span>
          </div>
          <div className="space-y-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-xs text-gray-300 text-center" />
            ))}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-xs text-gray-400 text-center font-medium">{d}</div>
              ))}
            </div>
            {ACTIVITY_WEEKS.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1">
                {week.map((active, di) => (
                  <div key={di} className={`aspect-square rounded-md transition-all ${active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`} title={active ? 'Studied' : 'No activity'} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {['bg-gray-100', 'bg-blue-200', 'bg-blue-400', 'bg-blue-500', 'bg-blue-700'].map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
              ))}
            </div>
            <span>More</span>
          </div>
          <Link href="/planner">
            <Button variant="outline" className="w-full mt-3 text-sm h-9 rounded-xl">View Study Planner</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
