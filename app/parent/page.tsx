'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, TrendingUp, Clock, Target, CircleAlert as AlertCircle, BookOpen, Award, ChartBar as BarChart2, Calendar, Bell, ChevronRight, Users, Zap, CircleCheck as CheckCircle, Circle as XCircle, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

const SUBJECTS = [
  { name: 'Mathematics', score: 82, change: +5, color: 'bg-blue-500', sessions: 14 },
  { name: 'Physics', score: 68, change: -3, color: 'bg-sky-500', sessions: 9 },
  { name: 'Chemistry', score: 75, change: +8, color: 'bg-yellow-500', sessions: 11 },
  { name: 'Biology', score: 91, change: +2, color: 'bg-green-500', sessions: 16 },
  { name: 'English', score: 88, change: +1, color: 'bg-orange-500', sessions: 7 },
];

const WEAK_AREAS = [
  { topic: 'Wave Optics', subject: 'Physics', score: 42, attempts: 3 },
  { topic: 'Integration', subject: 'Mathematics', score: 55, attempts: 5 },
  { topic: 'Organic Chemistry', subject: 'Chemistry', score: 58, attempts: 4 },
];

const RECENT_ACTIVITY = [
  { type: 'quiz', label: 'Completed Quiz: Matrices', time: '2 hours ago', score: '8/10', positive: true },
  { type: 'video', label: 'Watched: Wave Optics - Diffraction', time: '5 hours ago', score: null, positive: true },
  { type: 'doubt', label: 'Asked AI doubt: Integration by parts', time: 'Yesterday, 9 PM', score: null, positive: true },
  { type: 'live', label: 'Attended Live Class: Physics', time: 'Yesterday, 6 PM', score: null, positive: true },
  { type: 'quiz', label: 'Quiz: Organic Chemistry', time: '2 days ago', score: '5/10', positive: false },
];

const WEEKLY_HOURS = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1 },
];
const maxHours = Math.max(...WEEKLY_HOURS.map((d) => d.hours));

const GOALS = [
  { label: 'JEE Advanced 2025', progress: 62, deadline: 'Mar 2025', status: 'on-track' },
  { label: 'Physics Chapter 8', progress: 45, deadline: 'This week', status: 'at-risk' },
  { label: 'Mathematics Mock Test', progress: 90, deadline: 'Tomorrow', status: 'on-track' },
];

const ALERTS = [
  { type: 'warning', message: 'Physics score dropped by 3% this week. Consider extra practice.' },
  { type: 'info', message: 'Rahul missed 2 scheduled study sessions this week.' },
  { type: 'success', message: 'Rahul earned the "Biology Champion" badge!' },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'activity'>('overview');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">P</div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Parent View</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 gap-1.5">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Child Selector + Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Monitoring progress for</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">R</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rahul Sharma</h1>
                <p className="text-sm text-gray-500">Grade 11 · JEE Aspirant · Level 12</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-700">18-day streak</span>
            </div>
            <Badge className="bg-green-50 text-green-600 border-green-200 text-sm">Active today</Badge>
          </div>
        </div>

        {/* Alerts */}
        {ALERTS.map((alert, i) => (
          <div
            key={i}
            className={`mb-3 rounded-xl px-4 py-3 flex items-start gap-3 text-sm ${
              alert.type === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-800' :
              alert.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
              'bg-blue-50 border border-blue-200 text-blue-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{alert.message}</span>
          </div>
        ))}

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
          {[
            { label: 'Study Time This Week', value: '14.5 hrs', sub: '+2.5 vs last week', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Overall Avg Score', value: '80.8%', sub: '+3.2% this month', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Quizzes Completed', value: '47', sub: '12 this week', icon: Target, color: 'text-yellow-500', bg: 'bg-yellow-50' },
            { label: 'Badges Earned', value: '9', sub: '2 new this week', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
          ].map(({ label, value, sub, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 w-fit mb-6">
          {(['overview', 'subjects', 'activity'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Study Hours */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Weekly Study Hours</h2>
                <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">This week: 14.5 hrs</Badge>
              </div>
              <div className="flex items-end justify-between gap-2 h-36">
                {WEEKLY_HOURS.map(({ day, hours }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500">{hours}h</span>
                    <div className="w-full rounded-t-lg bg-blue-500 transition-all" style={{ height: `${(hours / maxHours) * 100}%`, minHeight: '4px' }} />
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Study Goals</h2>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-5">
                {GOALS.map(({ label, progress, deadline, status }) => (
                  <div key={label}>
                    <div className="flex items-start justify-between mb-1.5">
                      <p className="text-sm font-medium text-gray-800">{label}</p>
                      <Badge className={`text-xs border-0 ${status === 'on-track' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {status === 'on-track' ? 'On Track' : 'At Risk'}
                      </Badge>
                    </div>
                    <ProgressBar value={progress} className="h-2 mb-1" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{progress}% complete</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h2 className="font-semibold text-gray-900">Areas Needing Attention</h2>
              </div>
              <div className="space-y-4">
                {WEAK_AREAS.map(({ topic, subject, score, attempts }) => (
                  <div key={topic} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{topic}</p>
                      <p className="text-xs text-gray-400">{subject} · {attempts} attempts</p>
                      <div className="mt-1.5">
                        <ProgressBar value={score} className="h-1.5" />
                        <p className="text-xs text-red-500 mt-0.5">{score}% accuracy</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 h-8 text-xs rounded-lg">
                      Help
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-blue-500 text-sm font-medium flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      a.type === 'quiz' ? 'bg-blue-50' :
                      a.type === 'video' ? 'bg-sky-50' :
                      a.type === 'doubt' ? 'bg-purple-50' : 'bg-green-50'
                    }`}>
                      {a.type === 'quiz' ? <Target className="w-4 h-4 text-blue-500" /> :
                       a.type === 'video' ? <BookOpen className="w-4 h-4 text-sky-500" /> :
                       a.type === 'doubt' ? <BarChart2 className="w-4 h-4 text-purple-500" /> :
                       <Users className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{a.label}</p>
                      <p className="text-xs text-gray-400">{a.time}</p>
                    </div>
                    {a.score && (
                      <div className={`flex items-center gap-1 text-xs font-semibold ${a.positive ? 'text-green-600' : 'text-red-500'}`}>
                        {a.positive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {a.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-4">
            {SUBJECTS.map(({ name, score, change, color, sessions }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{name}</p>
                    <div className={`text-sm font-bold flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      <TrendingUp className={`w-3.5 h-3.5 ${change < 0 ? 'rotate-180' : ''}`} />
                      {change >= 0 ? '+' : ''}{change}%
                    </div>
                  </div>
                  <ProgressBar value={score} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Avg Score: <strong className="text-gray-700">{score}%</strong></span>
                    <span>{sessions} sessions this month</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 rounded-xl text-xs h-8">
                  Details <ChevronRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Full Activity Log</h2>
            <div className="space-y-3">
              {[...RECENT_ACTIVITY, ...RECENT_ACTIVITY].map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    a.type === 'quiz' ? 'bg-blue-50' : a.type === 'video' ? 'bg-sky-50' : a.type === 'doubt' ? 'bg-purple-50' : 'bg-green-50'
                  }`}>
                    {a.type === 'quiz' ? <Target className="w-4 h-4 text-blue-500" /> :
                     a.type === 'video' ? <BookOpen className="w-4 h-4 text-sky-500" /> :
                     a.type === 'doubt' ? <BarChart2 className="w-4 h-4 text-purple-500" /> :
                     <Users className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{a.label}</p>
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                  {a.score && (
                    <Badge className={`text-xs border-0 ${a.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {a.score}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
