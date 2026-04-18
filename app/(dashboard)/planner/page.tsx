'use client';

import { useState } from 'react';
import { Sparkles, Calendar, Clock, Target, CircleCheck as CheckCircle, Circle, ChevronRight, Zap, Brain, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ProgressBar({ value, className = '', white = false }: { value: number; className?: string; white?: boolean }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full rounded-full overflow-hidden ${white ? 'bg-white/20' : 'bg-gray-200'} ${className}`}>
      <div className={`h-full rounded-full transition-all ${white ? 'bg-white' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PLAN = [
  {
    day: 'Mon',
    date: '14 Apr',
    isToday: true,
    sessions: [
      { time: '6:00 - 7:30 AM', subject: 'Mathematics', topic: 'Integration by Substitution', duration: 90, done: true, type: 'study', priority: 'high' },
      { time: '4:00 - 5:00 PM', subject: 'Physics', topic: 'Wave Optics - Interference', duration: 60, done: true, type: 'video', priority: 'medium' },
      { time: '7:00 - 8:00 PM', subject: 'Chemistry', topic: 'Organic Mechanisms Quiz', duration: 60, done: false, type: 'quiz', priority: 'high' },
    ],
  },
  {
    day: 'Tue',
    date: '15 Apr',
    isToday: false,
    sessions: [
      { time: '6:00 - 7:00 AM', subject: 'Physics', topic: 'Diffraction & Young\'s Experiment', duration: 60, done: false, type: 'study', priority: 'high' },
      { time: '5:00 - 6:30 PM', subject: 'Mathematics', topic: 'Integration by Parts', duration: 90, done: false, type: 'study', priority: 'medium' },
      { time: '8:00 - 8:30 PM', subject: 'Biology', topic: 'Human Physiology Revision', duration: 30, done: false, type: 'revision', priority: 'low' },
    ],
  },
  {
    day: 'Wed',
    date: '16 Apr',
    isToday: false,
    sessions: [
      { time: '6:30 - 8:00 AM', subject: 'Chemistry', topic: 'd-Block Elements', duration: 90, done: false, type: 'study', priority: 'high' },
      { time: '4:00 - 5:00 PM', subject: 'Physics', topic: 'Live Class: Optics', duration: 60, done: false, type: 'live', priority: 'high' },
      { time: '7:30 - 8:00 PM', subject: 'Mathematics', topic: 'Problem Set: Integration', duration: 30, done: false, type: 'quiz', priority: 'medium' },
    ],
  },
  {
    day: 'Thu',
    date: '17 Apr',
    isToday: false,
    sessions: [
      { time: '6:00 - 7:30 AM', subject: 'Biology', topic: 'Endocrine System Deep Dive', duration: 90, done: false, type: 'study', priority: 'medium' },
      { time: '5:00 - 6:00 PM', subject: 'Chemistry', topic: 'Organic Reactions Practice', duration: 60, done: false, type: 'quiz', priority: 'high' },
    ],
  },
  {
    day: 'Fri',
    date: '18 Apr',
    isToday: false,
    sessions: [
      { time: '6:00 - 8:00 AM', subject: 'Mathematics', topic: 'Definite Integrals Applications', duration: 120, done: false, type: 'study', priority: 'high' },
      { time: '4:00 - 5:00 PM', subject: 'Physics', topic: 'Full Chapter Revision', duration: 60, done: false, type: 'revision', priority: 'medium' },
    ],
  },
  {
    day: 'Sat',
    date: '19 Apr',
    isToday: false,
    sessions: [
      { time: '9:00 - 12:00 PM', subject: 'All Subjects', topic: 'Weekly Mock Test (Full Syllabus)', duration: 180, done: false, type: 'quiz', priority: 'high' },
      { time: '3:00 - 5:00 PM', subject: 'Weak Areas', topic: 'Revision: Physics + Organic Chemistry', duration: 120, done: false, type: 'revision', priority: 'high' },
    ],
  },
  {
    day: 'Sun',
    date: '20 Apr',
    isToday: false,
    sessions: [
      { time: '10:00 - 11:00 AM', subject: 'All Subjects', topic: 'Weekly Review + Plan Adjustment', duration: 60, done: false, type: 'revision', priority: 'medium' },
    ],
  },
];

const AI_INSIGHTS = [
  { icon: Brain, color: 'bg-blue-50 text-blue-500', text: 'Your focus score peaks between 6–8 AM. High-priority topics are scheduled then.' },
  { icon: Target, color: 'bg-red-50 text-red-500', text: 'Wave Optics appears 3x this week — AI detected it as your weakest topic.' },
  { icon: Zap, color: 'bg-yellow-50 text-yellow-500', text: 'You\'re on pace to complete 18 hrs of study this week, up from 14.5 last week.' },
  { icon: RotateCcw, color: 'bg-green-50 text-green-500', text: 'Spaced repetition is applied: Biology chapters revisited every 3 days for retention.' },
];

const TYPE_COLORS: Record<string, string> = {
  study: 'bg-blue-50 border-blue-200 text-blue-700',
  video: 'bg-sky-50 border-sky-200 text-sky-700',
  quiz: 'bg-orange-50 border-orange-200 text-orange-700',
  live: 'bg-red-50 border-red-200 text-red-700',
  revision: 'bg-green-50 border-green-200 text-green-700',
};

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-yellow-400',
  low: 'bg-green-400',
};

export default function PlannerPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set(['Mon-0', 'Mon-1']));

  const toggleSession = (key: string) => {
    setCompletedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalSessions = PLAN.reduce((acc, d) => acc + d.sessions.length, 0);
  const completedCount = completedSessions.size;
  const weekProgress = Math.round((completedCount / totalSessions) * 100);

  const dayData = PLAN[selectedDay];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            AI Study Planner
          </h1>
          <p className="text-gray-500 text-sm">Your personalized weekly schedule, built by AI based on your goals and weak areas.</p>
        </div>
        <Button className="gradient-blue text-white border-0 rounded-xl h-10 gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Regenerate Plan</span>
        </Button>
      </div>

      {/* Week Progress + AI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-medium">This Week</p>
              <h2 className="text-2xl font-bold mt-0.5">Week Plan Progress</h2>
            </div>
            <Badge className="bg-white/20 text-white border-0">{completedCount}/{totalSessions} done</Badge>
          </div>
          <ProgressBar value={weekProgress} className="h-2.5 mb-3" white />
          <div className="flex items-center justify-between text-sm text-blue-100">
            <span>{weekProgress}% completed</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />~22 hrs total</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">This Week Focus</p>
          <div className="space-y-2.5">
            {[
              { label: 'Mathematics', pct: 35, color: 'bg-blue-500' },
              { label: 'Physics', pct: 30, color: 'bg-sky-500' },
              { label: 'Chemistry', pct: 25, color: 'bg-yellow-500' },
              { label: 'Biology', pct: 10, color: 'bg-green-500' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
                <span className="text-xs text-gray-600 flex-1">{label}</span>
                <span className="text-xs font-semibold text-gray-700">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AI_INSIGHTS.map(({ icon: Icon, color, text }, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg ${color.split(' ')[0]} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${color.split(' ')[1]}`} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {PLAN.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center py-4 transition-all border-b-2 ${
                selectedDay === i
                  ? 'border-blue-500 bg-blue-50'
                  : d.isToday
                  ? 'border-blue-200 bg-blue-50/50'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <span className={`text-xs font-medium mb-1 ${selectedDay === i ? 'text-blue-600' : 'text-gray-400'}`}>{d.day}</span>
              <span className={`text-sm font-bold ${selectedDay === i ? 'text-blue-700' : d.isToday ? 'text-blue-500' : 'text-gray-700'}`}>
                {d.date.split(' ')[0]}
              </span>
              {d.isToday && <span className="text-xs text-blue-400 mt-0.5">Today</span>}
              <div className="flex gap-0.5 mt-1.5">
                {d.sessions.map((_, si) => (
                  <div
                    key={si}
                    className={`w-1.5 h-1.5 rounded-full ${
                      completedSessions.has(`${d.day}-${si}`) ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Day Sessions */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {dayData.isToday ? 'Today' : dayData.day} · {dayData.date}
            </h3>
            <span className="text-sm text-gray-500">
              {dayData.sessions.reduce((a, s) => a + s.duration, 0)} min total
            </span>
          </div>

          <div className="space-y-3">
            {dayData.sessions.map((session, si) => {
              const key = `${dayData.day}-${si}`;
              const done = completedSessions.has(key);
              return (
                <div
                  key={si}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    done ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <button onClick={() => toggleSession(key)} className="mt-0.5 shrink-0">
                    {done ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className={`font-semibold text-sm ${done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {session.topic}
                      </p>
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${PRIORITY_DOT[session.priority]}`} />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{session.time}
                      </span>
                      <span className="text-xs text-gray-400">{session.duration} min</span>
                      <Badge className={`text-xs border px-2 py-0 h-5 ${TYPE_COLORS[session.type]}`}>
                        {session.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium text-gray-600">{session.subject}</p>
                    {!done && (
                      <button className="text-blue-500 text-xs flex items-center gap-0.5 mt-1 ml-auto hover:text-blue-600">
                        Start <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add custom session
          </button>
        </div>
      </div>

      {/* Exam Countdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-400" />
          <h2 className="font-semibold text-gray-900">Exam Countdown</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { exam: 'JEE Advanced 2025', days: 352, progress: 62, color: 'from-blue-500 to-blue-600' },
            { exam: 'JEE Mains 2025', days: 180, progress: 74, color: 'from-sky-500 to-blue-500' },
          ].map(({ exam, days, progress, color }) => (
            <div key={exam} className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white`}>
              <p className="text-white/80 text-sm mb-1">{exam}</p>
              <div className="flex items-end justify-between mb-3">
                <span className="text-4xl font-bold">{days}</span>
                <span className="text-white/70 text-sm mb-1">days left</span>
              </div>
              <ProgressBar value={progress} className="h-2 mb-2" white />
              <p className="text-white/70 text-xs">{progress}% syllabus covered</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
