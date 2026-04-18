'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, Settings, Maximize, ChevronLeft, ChevronRight, MessageSquare, BookOpen, Star, ThumbsUp, Share2, Download, CircleCheck as CheckCircle, Clock, Users, Zap, SkipForward, Captions } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const CHAPTER_LIST = [
  { id: 1, title: 'Introduction to Quadratic Equations', duration: '8:24', completed: true },
  { id: 2, title: 'Standard Form & Coefficients', duration: '12:10', completed: true },
  { id: 3, title: 'Solving by Factoring', duration: '15:30', completed: false, current: true },
  { id: 4, title: 'Completing the Square', duration: '18:45', completed: false },
  { id: 5, title: 'Quadratic Formula', duration: '20:12', completed: false },
  { id: 6, title: 'Nature of Roots (Discriminant)', duration: '14:08', completed: false },
  { id: 7, title: 'Word Problems & Applications', duration: '22:34', completed: false },
  { id: 8, title: 'Practice Quiz', duration: '30:00', completed: false },
];

const NOTES = [
  { timestamp: '2:15', note: 'Key formula: ax² + bx + c = 0' },
  { timestamp: '5:40', note: 'Discriminant = b² - 4ac determines nature of roots' },
  { timestamp: '10:22', note: 'If D > 0: two distinct real roots' },
];

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'qa'>('overview');
  const [progress, setProgress] = useState(35);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Video Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/learn" className="hover:text-blue-600 transition-colors">Learn</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Mathematics</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Algebra</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Quadratic Equations</span>
          </div>

          {/* Video Player */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl mb-4">
            {/* Video Area */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer group" onClick={() => setIsPlaying(!isPlaying)}>
              {/* Mock video visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4 transition-all group-hover:bg-white/20 ${isPlaying ? 'scale-90' : 'scale-100'}`}>
                    {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                  </div>
                  <p className="text-white/60 text-sm">{isPlaying ? 'Click to pause' : 'Click to play'}</p>
                </div>
              </div>

              {/* Subtitles overlay */}
              <div className="absolute bottom-16 left-0 right-0 text-center px-4">
                <span className="bg-black/70 text-white text-sm px-3 py-1 rounded">ax² + bx + c = 0 is the standard form</span>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 px-4 py-3">
              {/* Progress Bar */}
              <div className="relative mb-3 group cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setProgress(Math.round((x / rect.width) * 100));
              }}>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-500 rounded-full shadow -translate-x-1/2 transition-all" style={{ left: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-blue-400 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button className="text-white/60 hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
                  <Volume2 className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 text-sm">5:21 / 15:30</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/60 hover:text-white transition-colors"><Captions className="w-4 h-4" /></button>
                  <select value={speed} onChange={(e) => setSpeed(e.target.value)} className="bg-transparent text-white/60 text-sm border-0 outline-none cursor-pointer hover:text-white">
                    {['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'].map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                  </select>
                  <Settings className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
                  <Maximize className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-2xl card-shadow p-5 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-xs">Mathematics</Badge>
                  <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 text-xs">Medium</Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-100 text-xs">Free</Badge>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">Solving by Factoring - Quadratic Equations</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 min</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 12.4K views</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl gap-1 border-gray-200">
                  <ThumbsUp className="w-4 h-4" /> 2.1K
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl gap-1 border-gray-200">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl gap-1 border-gray-200">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* XP earned indicator */}
            <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-2.5">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-700 font-medium">Complete this lesson to earn <strong>+50 XP</strong></span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="flex border-b border-gray-100">
              {(['overview', 'notes', 'qa'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'qa' ? 'Q&A' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="p-5">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">In this lesson, you will learn how to solve quadratic equations by factoring. This is one of the most powerful and elegant methods for finding the roots of a quadratic expression.</p>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">What you&apos;ll learn:</h3>
                  <div className="space-y-2">
                    {['Identifying factorable quadratics', 'Setting up factor pairs', 'Zero product property', 'Verifying solutions', 'Special cases: perfect squares and difference of squares'].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'notes' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm">Auto-generated Notes</h3>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs h-8">Add Note</Button>
                  </div>
                  <div className="space-y-3">
                    {NOTES.map(({ timestamp, note }) => (
                      <div key={timestamp} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg shrink-0">{timestamp}</span>
                        <p className="text-sm text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'qa' && (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-3">Have a doubt about this lesson?</p>
                  <Link href="/doubt-solver">
                    <Button className="gradient-blue text-white border-0 rounded-xl">Ask AI Doubt Solver</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Chapter List */}
        <div className="xl:w-80 shrink-0">
          <div className="bg-white rounded-2xl card-shadow overflow-hidden sticky top-6">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-sm">Chapter Contents</h3>
                <span className="text-xs text-gray-400">2/8 done</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {CHAPTER_LIST.map(({ id, title, duration, completed, current }) => (
                <div key={id} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 ${current ? 'border-blue-500 bg-blue-50' : completed ? 'border-green-500 hover:bg-gray-50' : 'border-transparent hover:bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${current ? 'gradient-blue text-white' : completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {completed ? <CheckCircle className="w-4 h-4" /> : current ? <Play className="w-3.5 h-3.5 ml-0.5" /> : id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${current ? 'text-blue-700' : completed ? 'text-gray-600' : 'text-gray-700'}`}>{title}</p>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs h-8 border-gray-200">
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
                </Button>
                <Button size="sm" className="flex-1 rounded-xl text-xs h-8 gradient-blue text-white border-0">
                  Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
              <Link href="/quiz">
                <Button variant="outline" className="w-full mt-2 text-xs h-8 rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
                  <BookOpen className="w-3.5 h-3.5 mr-1" /> Take Chapter Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
