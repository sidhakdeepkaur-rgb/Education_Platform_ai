'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Play, Brain, Zap, Star, Users, Trophy, Video, CircleCheck as CheckCircle, ArrowRight, Menu, X, Flame, Target, ChartBar as BarChart3, MessageSquare, Clock, Shield, Globe, Sparkles, ChevronRight, GraduationCap, Award, TrendingUp, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '#about' },
];

const STATS = [
  { value: '2M+', label: 'Students', icon: Users },
  { value: '50K+', label: 'Video Lessons', icon: Video },
  { value: '98%', label: 'Pass Rate', icon: CheckCircle },
  { value: '4.9★', label: 'Avg Rating', icon: Star },
];

const FEATURES = [
  { icon: Play, color: 'bg-blue-50 text-blue-600', title: 'Structured Video Learning', desc: 'Grade → Subject → Chapter → Topic. Subtitles, speed control, offline caching.' },
  { icon: Brain, color: 'bg-green-50 text-green-600', title: 'AI Personalization', desc: 'Adaptive learning paths powered by GPT-4. Your AI tutor remembers your progress.' },
  { icon: MessageSquare, color: 'bg-yellow-50 text-yellow-600', title: 'AI Doubt Solver', desc: 'Snap a photo of your doubt. Socratic AI guides you step-by-step to the answer.' },
  { icon: Zap, color: 'bg-orange-50 text-orange-600', title: 'Adaptive Quiz Engine', desc: 'MCQ, drag-drop, image-based. Difficulty adjusts to keep you in the learning zone.' },
  { icon: Video, color: 'bg-blue-50 text-blue-600', title: 'Live Classes', desc: 'Interactive sessions with expert teachers. Polls, whiteboard, Q&A, recordings.' },
  { icon: Trophy, color: 'bg-green-50 text-green-600', title: 'Gamified Learning', desc: 'Earn XP, unlock badges, maintain streaks, climb leaderboards with classmates.' },
  { icon: BarChart3, color: 'bg-yellow-50 text-yellow-600', title: 'Parent Dashboard', desc: 'Real-time progress, weak area analysis, time reports for informed parenting.' },
  { icon: Target, color: 'bg-orange-50 text-orange-600', title: 'AI Study Planner', desc: 'Set your goal + exam date. AI creates a personalized daily schedule.' },
];

const SUBJECTS = [
  { name: 'Mathematics', icon: '∑', color: 'from-blue-500 to-blue-600', count: '2,400+ topics' },
  { name: 'Physics', icon: '⚛', color: 'from-sky-500 to-blue-600', count: '1,800+ topics' },
  { name: 'Chemistry', icon: '⚗', color: 'from-yellow-500 to-orange-500', count: '1,600+ topics' },
  { name: 'Biology', icon: '🌿', color: 'from-emerald-500 to-green-600', count: '1,400+ topics' },
  { name: 'English', icon: 'A', color: 'from-sky-400 to-sky-600', count: '900+ topics' },
  { name: 'History', icon: '📜', color: 'from-amber-500 to-yellow-600', count: '700+ topics' },
  { name: 'Geography', icon: '🌍', color: 'from-teal-500 to-green-600', count: '600+ topics' },
  { name: 'Computer Sc.', icon: '{;}', color: 'from-blue-600 to-blue-800', count: '800+ topics' },
];

const EXAMS = ['JEE Main & Advanced', 'NEET UG', 'UPSC CSE', 'SAT', 'GRE', 'GMAT'];

const TESTIMONIALS = [
  { name: 'Priya Sharma', grade: 'Class 12 | JEE Aspirant', avatar: 'PS', color: 'bg-blue-500', text: 'EduAI completely transformed my JEE prep. The AI doubt solver is like having a personal tutor at 2 AM. Got AIR 847!', rating: 5 },
  { name: 'Arjun Mehta', grade: 'Class 10 | CBSE', avatar: 'AM', color: 'bg-green-500', text: 'The streak system kept me going even when I wanted to quit. Scored 95% in boards after 3 months on EduAI.', rating: 5 },
  { name: 'Sunita Rao', grade: 'Parent | Mumbai', avatar: 'SR', color: 'bg-yellow-500', text: 'The parent dashboard is incredible. I can see exactly where my daughter struggles and how much time she spends daily.', rating: 5 },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Set Your Goal', desc: 'Tell us your grade, board, target exam, and daily study time. Takes 2 minutes.', icon: Target },
  { step: '02', title: 'AI Builds Your Path', desc: 'Our AI analyzes your strengths and creates a personalized learning roadmap.', icon: Sparkles },
  { step: '03', title: 'Learn, Practice, Excel', desc: 'Watch videos, solve quizzes, attend live classes, and track your growth daily.', icon: TrendingUp },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">{l.label}</Link>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login"><Button variant="ghost" className="text-gray-700 hover:text-blue-600">Sign In</Button></Link>
              <Link href="/register"><Button className="gradient-blue text-white border-0 hover:opacity-90 shadow-sm">Start Free Trial</Button></Link>
            </div>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {NAV_LINKS.map((l) => (<Link key={l.label} href={l.href} className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{l.label}</Link>))}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login"><Button variant="outline" className="w-full">Sign In</Button></Link>
              <Link href="/register"><Button className="w-full gradient-blue text-white border-0">Start Free Trial</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative gradient-hero pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-700 font-medium">AI-Powered Learning for India&apos;s Future</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Learn Smarter,{' '}
              <span className="text-gradient-blue">Score Higher</span>
              <br />with Your AI Tutor
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Adaptive learning paths, AI doubt solving, live classes, and gamified quizzes for Grades 1–12 and competitive exams. Start your 7-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/register">
                <Button size="lg" className="gradient-blue text-white border-0 hover:opacity-90 shadow-lg shadow-blue-200 text-base px-8 py-6 h-auto rounded-xl">
                  Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50">
                  <Play className="mr-2 w-5 h-5 text-blue-500" /> Watch Demo
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              {['No credit card required', '7-day free trial', 'Cancel anytime'].map((t) => (
                <span key={t} className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" />{t}</span>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-gray-100 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400 text-center">eduai.app/dashboard</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { label: 'XP Points', value: '2,840', color: 'bg-blue-500', icon: '⚡' },
                    { label: 'Day Streak', value: '14 Days', color: 'bg-orange-500', icon: '🔥' },
                    { label: 'Completed', value: '67%', color: 'bg-green-500', icon: '✅' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                      <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-lg`}>{s.icon}</div>
                      <div>
                        <p className="text-xs text-gray-500">{s.label}</p>
                        <p className="text-lg font-bold text-gray-800">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Continue Learning</p>
                    {['Quadratic Equations', 'Cell Biology', 'Organic Chemistry'].map((t, i) => (
                      <div key={t} className="flex items-center gap-3 py-2 border-b last:border-0 border-gray-50">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className="text-sm text-gray-700 flex-1">{t}</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${i === 0 ? 'bg-blue-500 w-3/4' : i === 1 ? 'bg-green-500 w-1/2' : 'bg-yellow-500 w-1/4'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-3">AI Recommendations</p>
                    {['Practice: Integration', "Revise: Newton's Laws", 'Quiz: Periodic Table'].map((t) => (
                      <div key={t} className="flex items-center gap-3 py-2 border-b last:border-0 border-gray-50">
                        <Brain className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="text-sm text-gray-700">{t}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">{value}</span>
                </div>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 mb-4 text-sm">Everything You Need</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">A Complete Learning Ecosystem</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From video lessons to AI tutoring to live classes — everything a student needs, in one platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200 group">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-50 text-green-700 border-green-100 mb-4 text-sm">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Start Learning in Minutes</h2>
            <p className="text-gray-500 text-lg">No complicated setup. Just sign up, set your goal, and start learning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="text-center">
                <div className={`w-24 h-24 rounded-2xl mx-auto mb-6 flex flex-col items-center justify-center shadow-lg ${i === 0 ? 'gradient-blue' : i === 1 ? 'gradient-green' : 'gradient-yellow'}`}>
                  <Icon className={`w-8 h-8 ${i === 2 ? 'text-yellow-800' : 'text-white'} mb-1`} />
                  <span className={`text-xs font-bold ${i === 2 ? 'text-yellow-800' : 'text-white'} opacity-80`}>{step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 mb-4 text-sm">Comprehensive Coverage</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">All Subjects, All Grades</h2>
            <p className="text-gray-500 text-lg">Covering every CBSE, ICSE, and State board subject from Grade 1 to 12.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {SUBJECTS.map(({ name, icon, color, count }) => (
              <Link key={name} href="/learn">
                <div className="bg-white rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer group text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl text-white mx-auto mb-3 group-hover:scale-110 transition-transform font-bold`}>
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{name}</h3>
                  <p className="text-xs text-gray-400">{count}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-4">Also covering competitive exams:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {EXAMS.map((exam) => (
                <span key={exam} className="bg-white border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full card-shadow">{exam}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Banner */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-yellow-400 text-yellow-900 border-0 mb-4">Gamified Learning</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Learning That Feels Like a Game</h2>
              <p className="text-blue-100 text-lg mb-6">Earn XP for every lesson, maintain daily streaks, unlock badges, and compete on the leaderboard with your classmates.</p>
              <div className="flex flex-wrap gap-4">
                {[{ icon: '⚡', label: 'XP Points', desc: 'Earn for every activity' }, { icon: '🔥', label: 'Daily Streaks', desc: 'Build study habits' }, { icon: '🏆', label: 'Badges', desc: '50+ achievements' }, { icon: '📊', label: 'Leaderboard', desc: 'Compete with peers' }].map((g) => (
                  <div key={g.label} className="flex items-center gap-3 bg-blue-500/30 backdrop-blur rounded-xl px-4 py-3">
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{g.label}</p>
                      <p className="text-blue-200 text-xs">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-500/30 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-bold">AR</div>
                <div>
                  <p className="text-white font-semibold">Aryan Raj</p>
                  <p className="text-blue-200 text-sm">Grade 10 · Level 24</p>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-orange-400 rounded-full px-3 py-1">
                  <Flame className="w-4 h-4 text-white streak-flame" />
                  <span className="text-white text-sm font-bold">21</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-100">XP Progress to Level 25</span>
                  <span className="text-yellow-300 font-bold">4,280 / 5,000</span>
                </div>
                <div className="w-full h-3 bg-blue-400/30 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['🥇', '🔥', '⚡', '📚', '🎯', '✅', '🧠', '🏆'].map((b, i) => (
                  <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xl ${i < 6 ? 'bg-yellow-400/20' : 'bg-blue-400/10 opacity-40'}`}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 mb-4 text-sm">Success Stories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Students Love EduAI</h2>
            <p className="text-gray-500 text-lg">Real results from real students across India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, grade, avatar, color, text, rating }) => (
              <div key={name} className="bg-[#F8FAFC] rounded-2xl p-6 card-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-gray-500 text-lg mb-8">Join 2 million students already learning smarter. Start your 7-day free trial — no credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"><Button size="lg" className="gradient-blue text-white border-0 hover:opacity-90 shadow-lg text-base px-10 py-6 h-auto rounded-xl">Start Free Trial <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
            <Link href="/pricing"><Button size="lg" variant="outline" className="text-base px-10 py-6 h-auto rounded-xl border-2">View Pricing</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg gradient-blue flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">EduAI</span>
              </div>
              <p className="text-sm leading-relaxed">India&apos;s most loved AI-powered learning platform for Grades 1–12 and competitive exams.</p>
            </div>
            {[
              { title: 'Platform', links: ['Video Lessons', 'Live Classes', 'Quiz Engine', 'AI Doubt Solver', 'Study Planner'] },
              { title: 'Exams', links: ['JEE Main & Adv.', 'NEET UG', 'UPSC CSE', 'SAT / GRE / GMAT', 'Board Exams'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Privacy Policy', 'Terms of Service'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((l) => (<li key={l}><Link href="#" className="text-sm hover:text-white transition-colors">{l}</Link></li>))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 EduAI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> SSL Secured</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> 15 Languages</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> ISO Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
