'use client';

import { useState } from 'react';
import { Video, Users, Clock, Calendar, Mic, MicOff, VideoOff, Hand, MessageSquare, Monitor, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UPCOMING = [
  { id: 1, subject: 'Mathematics', title: 'Matrices & Determinants - Master Class', teacher: 'Prof. Anand Sharma', time: 'Today, 4:00 PM', duration: '90 min', students: 342, color: 'from-blue-500 to-blue-600', free: false, rating: 4.9 },
  { id: 2, subject: 'Physics', title: 'Wave Optics - JEE Advanced Deep Dive', teacher: 'Dr. Priya Kapoor', time: 'Today, 6:30 PM', duration: '60 min', students: 198, color: 'from-sky-500 to-blue-600', free: true, rating: 4.8 },
  { id: 3, subject: 'Chemistry', title: 'Organic Reactions & Mechanisms', teacher: 'Prof. Raj Mehta', time: 'Tomorrow, 5:00 PM', duration: '75 min', students: 267, color: 'from-yellow-500 to-orange-500', free: false, rating: 4.7 },
  { id: 4, subject: 'Biology', title: 'NEET Special: Human Physiology', teacher: 'Dr. Sunita Verma', time: 'Tomorrow, 7:00 PM', duration: '90 min', students: 412, color: 'from-emerald-500 to-green-600', free: false, rating: 4.9 },
  { id: 5, subject: 'Mathematics', title: 'Calculus for JEE - Integration Techniques', teacher: 'Prof. Anand Sharma', time: 'Sat, 10:00 AM', duration: '120 min', students: 523, color: 'from-blue-500 to-blue-600', free: false, rating: 5.0 },
  { id: 6, subject: 'English', title: 'Essay Writing & Comprehension', teacher: 'Ms. Lisa D\'Souza', time: 'Sun, 11:00 AM', duration: '60 min', students: 89, color: 'from-sky-400 to-sky-600', free: true, rating: 4.6 },
];

const RECORDINGS = [
  { title: 'Quadratic Equations Masterclass', teacher: 'Prof. Sharma', views: 4200, duration: '1h 24m', date: '2 days ago', color: 'from-blue-500 to-blue-600' },
  { title: 'Thermodynamics Complete Chapter', teacher: 'Dr. Kapoor', views: 3100, duration: '1h 45m', date: '5 days ago', color: 'from-sky-500 to-blue-600' },
  { title: "d-Block Elements - NEET Special", teacher: 'Prof. Mehta', views: 2800, duration: '58 min', date: '1 week ago', color: 'from-yellow-500 to-orange-500' },
];

export default function LiveClassesPage() {
  const [joinedClass, setJoinedClass] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings'>('upcoming');

  if (joinedClass) {
    return (
      <div className="h-[calc(100vh-64px)] bg-gray-900 flex flex-col">
        {/* Class Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-white font-semibold text-sm">Wave Optics - JEE Advanced Deep Dive</p>
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> LIVE</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />198 students</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />00:42:18</span>
            </div>
          </div>
          <Button onClick={() => setJoinedClass(false)} variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-400/10 h-8 text-xs rounded-xl">Leave Class</Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">PK</div>
                <p className="text-white font-semibold">Dr. Priya Kapoor</p>
                <p className="text-gray-400 text-sm">Wave Optics - Interference & Diffraction</p>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">Presenting</Badge>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col hidden lg:flex">
            <div className="p-3 border-b border-gray-700">
              <p className="text-white text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Class Chat
              </p>
            </div>
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {[
                { user: 'Aryan', msg: 'Sir, can you explain constructive interference again?' },
                { user: 'Priya', msg: 'What is the formula for path difference?' },
                { user: 'Teacher', msg: 'Great question! Path difference = nλ for constructive', isTeacher: true },
                { user: 'Dev', msg: 'Thank you! That makes it clear' },
              ].map(({ user, msg, isTeacher }, i) => (
                <div key={i} className={`text-xs ${isTeacher ? 'bg-blue-900/30 rounded-lg p-2' : ''}`}>
                  <span className={`font-semibold ${isTeacher ? 'text-blue-400' : 'text-gray-300'}`}>{user}: </span>
                  <span className="text-gray-400">{msg}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-700">
              <input className="w-full bg-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 placeholder-gray-500 border-0 outline-none" placeholder="Ask a question..." />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-center gap-4 shrink-0">
          <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-gray-400" />}
          </button>
          <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${camOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {camOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-gray-400" />}
          </button>
          <button onClick={() => setHandRaised(!handRaised)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${handRaised ? 'bg-yellow-500 scale-110' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <Hand className={`w-5 h-5 ${handRaised ? 'text-white' : 'text-gray-400'}`} />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
            <Monitor className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Live Classes</h1>
        <p className="text-gray-500 text-sm">Join interactive sessions with expert teachers in real time</p>
      </div>

      {/* Live Now Banner */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-red-100 text-sm font-medium">LIVE NOW</span>
          <Badge className="bg-white/20 text-white border-0 text-xs ml-auto">198 watching</Badge>
        </div>
        <h2 className="text-xl font-bold mb-1">Wave Optics - JEE Advanced Deep Dive</h2>
        <p className="text-red-100 text-sm mb-4">Dr. Priya Kapoor · Physics · FREE to join</p>
        <Button onClick={() => setJoinedClass(true)} className="bg-white text-red-600 hover:bg-red-50 border-0 font-semibold rounded-xl h-10">
          Join Now — It&apos;s Free! <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
        {(['upcoming', 'recordings'] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UPCOMING.map(({ id, subject, title, teacher, time, duration, students, color, free, rating }) => (
            <div key={id} className="bg-white rounded-2xl card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all overflow-hidden group">
              <div className={`h-28 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                {free && <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0 text-xs">Free</Badge>}
              </div>
              <div className="p-4">
                <p className="text-xs text-blue-600 font-medium mb-1">{subject}</p>
                <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{title}</h3>
                <p className="text-xs text-gray-400 mb-3">{teacher}</p>
                <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{time}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{students}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{rating}</span>
                </div>
                <Button className="w-full h-9 text-sm gradient-blue text-white border-0 rounded-xl">Register</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {RECORDINGS.map(({ title, teacher, views, duration, date, color }) => (
            <div key={title} className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-4 hover:card-shadow-hover transition-all group cursor-pointer">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                <Video className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-400">{teacher}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{views.toLocaleString()} views</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                  <span>{date}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 rounded-xl border-gray-200 text-xs h-8">Watch</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
