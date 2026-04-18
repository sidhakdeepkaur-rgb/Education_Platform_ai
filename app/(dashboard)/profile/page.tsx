'use client';

import { useState } from 'react';
import {
  User, Mail, Lock, Bell, Shield, LogOut, Camera, Award, BookOpen,
  Target, Zap, ChevronRight, Check, Globe, Moon, Sun, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

type Tab = 'profile' | 'account' | 'notifications' | 'subscription';

const BADGES = [
  { name: 'First Steps', icon: '🎯', desc: 'Completed first lesson', earned: true },
  { name: 'Quiz Master', icon: '🏆', desc: '10 quizzes completed', earned: true },
  { name: 'Streak 7', icon: '🔥', desc: '7-day study streak', earned: true },
  { name: 'Biology Ace', icon: '🧬', desc: '90%+ in Biology', earned: true },
  { name: 'Speed Learner', icon: '⚡', desc: '5 videos in one day', earned: false },
  { name: 'Century', icon: '💯', desc: 'Perfect quiz score', earned: false },
];

const SUBJECTS_ENROLLED = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];

const NOTIFICATION_SETTINGS = [
  { label: 'Live class reminders', sub: '30 minutes before class starts', key: 'live' },
  { label: 'Daily study reminder', sub: 'Personalized to your schedule', key: 'daily' },
  { label: 'Quiz & challenge alerts', sub: 'New quizzes matching your syllabus', key: 'quiz' },
  { label: 'Streak protection alerts', sub: 'When your streak is at risk', key: 'streak' },
  { label: 'Weekly progress report', sub: 'Summary sent every Sunday', key: 'report' },
  { label: 'Promotional emails', sub: 'Offers, new features, updates', key: 'promo' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul@example.com');
  const [grade, setGrade] = useState('Grade 11');
  const [target, setTarget] = useState('JEE Advanced 2025');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    live: true, daily: true, quiz: true, streak: true, report: true, promo: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: Award },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Profile & Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account, preferences and subscription.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {activeTab === id && <ChevronRight className="ml-auto w-3.5 h-3.5" />}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-5">
          {activeTab === 'profile' && (
            <>
              {/* Avatar + Stats Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-5 flex-wrap">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl">R</div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-0.5">{fullName}</h2>
                    <p className="text-sm text-gray-500 mb-3">{grade} · {target}</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">Level 12</p>
                        <p className="text-xs text-gray-400">Current Level</p>
                      </div>
                      <div className="w-px bg-gray-200" />
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">4,280</p>
                        <p className="text-xs text-gray-400">Total XP</p>
                      </div>
                      <div className="w-px bg-gray-200" />
                      <div className="text-center">
                        <p className="text-xl font-bold text-yellow-500 flex items-center gap-1"><Zap className="w-4 h-4" />18</p>
                        <p className="text-xs text-gray-400">Day Streak</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-gray-500">Level 12 → Level 13</span>
                    <span className="font-semibold text-gray-700">4,280 / 5,000 XP</span>
                  </div>
                  <ProgressBar value={86} className="h-2.5" />
                  <p className="text-xs text-gray-400 mt-1">720 XP to next level</p>
                </div>
              </div>

              {/* Edit Profile */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-5">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 font-medium text-sm">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 rounded-xl border-gray-200 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 font-medium text-sm">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-xl border-gray-200 h-11" type="email" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 font-medium text-sm">Grade / Class</Label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'JEE', 'NEET'].map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-700 font-medium text-sm">Target Exam</Label>
                      <select
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        {['JEE Advanced 2025', 'JEE Mains 2025', 'NEET 2025', 'UPSC 2025', 'SAT', 'Board Exams'].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-700 font-medium text-sm">Enrolled Subjects</Label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS_ENROLLED.map((s) => (
                        <Badge key={s} className="bg-blue-50 text-blue-600 border-blue-200">{s}</Badge>
                      ))}
                      <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">+ Add subject</button>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <Button onClick={handleSave} className="gradient-blue text-white border-0 rounded-xl h-10 gap-2">
                    {saved ? <><Check className="w-4 h-4" />Saved!</> : 'Save Changes'}
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  My Badges ({BADGES.filter((b) => b.earned).length}/{BADGES.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BADGES.map(({ name, icon, desc, earned }) => (
                    <div
                      key={name}
                      className={`rounded-xl p-3 flex items-center gap-3 border ${
                        earned ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-50'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{name}</p>
                        <p className="text-xs text-gray-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'account' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-5">Change Password</h3>
                <div className="space-y-4">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                    <div key={label} className="space-y-1.5">
                      <Label className="text-gray-700 font-medium text-sm">{label}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input type="password" className="pl-10 rounded-xl border-gray-200 h-11" placeholder="••••••••" />
                      </div>
                    </div>
                  ))}
                  <Button className="gradient-blue text-white border-0 rounded-xl h-10">Update Password</Button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-5">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-4 h-4 text-gray-500" /> : <Sun className="w-4 h-4 text-gray-500" />}
                      <div>
                        <p className="text-sm font-medium text-gray-800">Dark Mode</p>
                        <p className="text-xs text-gray-400">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-200'} relative`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${darkMode ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Language</p>
                        <p className="text-xs text-gray-400">Interface and content language</p>
                      </div>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="text-sm rounded-lg border border-gray-200 px-3 py-1.5 bg-white text-gray-700 outline-none"
                    >
                      {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-400">Add extra security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">Enable</Button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                <h3 className="font-semibold text-red-700 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-500 mb-3">Once you delete your account, all your data, progress, and badges will be permanently removed.</p>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl h-9 text-sm">Delete Account</Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {NOTIFICATION_SETTINGS.map(({ label, sub, key }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className={`w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-blue-500' : 'bg-gray-200'} relative shrink-0`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications[key] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-white/20 text-white border-0 mb-2">Current Plan</Badge>
                    <h3 className="text-2xl font-bold">Pro Plan</h3>
                    <p className="text-blue-100 text-sm">₹599/month · Renews on May 14, 2025</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 border-0 h-9 rounded-xl text-sm font-semibold">Manage Plan</Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-9 rounded-xl text-sm">View Invoice</Button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">What&apos;s included in your plan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: BookOpen, label: 'Unlimited Videos', sub: '50,000+ lessons across all grades' },
                    { icon: Target, label: 'Unlimited Quizzes', sub: 'Full question bank + PYQs' },
                    { icon: Zap, label: 'Unlimited AI Doubts', sub: 'Priority 2-hr resolution' },
                    { icon: User, label: 'Parent Dashboard', sub: 'Full progress monitoring' },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Billing History</h3>
                <div className="space-y-3">
                  {[
                    { date: 'Apr 14, 2025', amount: '₹599', status: 'Paid' },
                    { date: 'Mar 14, 2025', amount: '₹599', status: 'Paid' },
                    { date: 'Feb 14, 2025', amount: '₹599', status: 'Paid' },
                  ].map(({ date, amount, status }) => (
                    <div key={date} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Pro Plan - Monthly</p>
                        <p className="text-xs text-gray-400">{date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 text-sm">{amount}</span>
                        <Badge className="bg-green-50 text-green-600 border-green-200 text-xs">{status}</Badge>
                        <button className="text-blue-500 text-xs hover:text-blue-600">PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
