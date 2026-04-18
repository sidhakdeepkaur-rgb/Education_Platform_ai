'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Play, Clock, ChevronRight, Star, Filter, Grid2x2 as Grid, List, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '∑', color: 'from-blue-500 to-blue-600', chapters: 24, topics: 180, progress: 65 },
  { id: 'physics', name: 'Physics', icon: '⚛', color: 'from-sky-500 to-blue-600', chapters: 18, topics: 145, progress: 42 },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗', color: 'from-yellow-500 to-orange-500', chapters: 20, topics: 160, progress: 28 },
  { id: 'biology', name: 'Biology', icon: '🌿', color: 'from-emerald-500 to-green-600', chapters: 16, topics: 130, progress: 0 },
  { id: 'english', name: 'English', icon: 'A', color: 'from-sky-400 to-sky-600', chapters: 12, topics: 90, progress: 80 },
  { id: 'history', name: 'History', icon: '📜', color: 'from-amber-500 to-yellow-600', chapters: 10, topics: 75, progress: 15 },
  { id: 'geography', name: 'Geography', icon: '🌍', color: 'from-teal-500 to-green-600', chapters: 8, topics: 60, progress: 0 },
  { id: 'cs', name: 'Computer Sc.', icon: '💻', color: 'from-blue-600 to-blue-800', chapters: 14, topics: 110, progress: 35 },
];

const FEATURED_TOPICS = [
  { id: 1, title: 'Quadratic Equations', subject: 'Mathematics', chapter: 'Algebra', duration: '28 min', difficulty: 'Medium', isFree: true, rating: 4.9, views: 12400 },
  { id: 2, title: "Newton's Laws of Motion", subject: 'Physics', chapter: 'Mechanics', duration: '34 min', difficulty: 'Easy', isFree: true, rating: 4.8, views: 18200 },
  { id: 3, title: 'Periodic Table & Trends', subject: 'Chemistry', chapter: 'Structure of Atom', duration: '22 min', difficulty: 'Medium', isFree: false, rating: 4.7, views: 9800 },
  { id: 4, title: 'Cell Structure & Function', subject: 'Biology', chapter: 'Cell Biology', duration: '31 min', difficulty: 'Easy', isFree: false, rating: 4.9, views: 14600 },
  { id: 5, title: 'Integration Techniques', subject: 'Mathematics', chapter: 'Calculus', duration: '45 min', difficulty: 'Hard', isFree: false, rating: 4.8, views: 7200 },
  { id: 6, title: 'Wave Optics', subject: 'Physics', chapter: 'Optics', duration: '38 min', difficulty: 'Hard', isFree: false, rating: 4.6, views: 6100 },
];

const FILTERS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Free'];

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-50 text-green-700 border-green-100',
  Medium: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  Hard: 'bg-red-50 text-red-700 border-red-100',
};

export default function LearnPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredTopics = FEATURED_TOPICS.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || t.subject === activeFilter || (activeFilter === 'Free' && t.isFree);
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Video Library</h1>
        <p className="text-gray-500 text-sm">50,000+ lessons across all subjects and grades</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search topics, chapters, subjects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl border-gray-200 bg-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-gray-200"><Filter className="w-4 h-4" /></Button>
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" className={`h-11 w-11 rounded-xl ${viewMode === 'grid' ? 'gradient-blue text-white border-0' : 'border-gray-200'}`} onClick={() => setViewMode('grid')}><Grid className="w-4 h-4" /></Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" className={`h-11 w-11 rounded-xl ${viewMode === 'list' ? 'gradient-blue text-white border-0' : 'border-gray-200'}`} onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Subject Cards */}
      {!selectedSubject && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">My Subjects</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SUBJECTS.map(({ id, name, icon, color, chapters, topics, progress }) => (
              <button key={id} onClick={() => setSelectedSubject(id)} className="bg-white rounded-2xl p-4 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all text-left group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl text-white font-bold mb-3 group-hover:scale-110 transition-transform`}>{icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{name}</h3>
                <p className="text-xs text-gray-400 mb-2">{chapters} chapters · {topics} topics</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Topic Filters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">
            {selectedSubject ? SUBJECTS.find(s => s.id === selectedSubject)?.name + ' Topics' : 'Featured Topics'}
          </h2>
          {selectedSubject && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedSubject(null)} className="text-blue-600 hover:text-blue-700 text-sm">
              ← All Subjects
            </Button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === f ? 'gradient-blue text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
              {f}
            </button>
          ))}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map(({ id, title, subject, chapter, duration, difficulty, isFree, rating, views }) => (
              <Link key={id} href={`/learn/${id}`}>
                <div className="bg-white rounded-2xl card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all overflow-hidden group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                    {!isFree && (
                      <div className="absolute top-3 right-3 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Pro
                      </div>
                    )}
                    {isFree && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">Free</div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-blue-600 font-medium">{subject}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{chapter}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">{title}</h3>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${difficultyColors[difficulty]} border`}>{difficulty}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600 font-medium">{rating}</span>
                        <span className="text-xs text-gray-400">({(views / 1000).toFixed(1)}k)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTopics.map(({ id, title, subject, chapter, duration, difficulty, isFree, rating }) => (
              <Link key={id} href={`/learn/${id}`}>
                <div className="bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all flex items-center gap-4 p-4 group cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-blue-600 font-medium">{subject}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{chapter}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge className={`text-xs ${difficultyColors[difficulty]} border`}>{difficulty}</Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{rating}</span>
                      </div>
                    </div>
                  </div>
                  {!isFree && <Lock className="w-4 h-4 text-gray-400 shrink-0" />}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No topics found</p>
          <p className="text-gray-400 text-sm">Try a different search term or filter</p>
        </div>
      )}
    </div>
  );
}
