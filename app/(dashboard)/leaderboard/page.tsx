'use client';

import { useState } from 'react';
import { Trophy, Flame, Zap, Medal, Crown, TrendingUp, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TABS = ['Global', 'Grade 12', 'Class', 'Friends'] as const;

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Priya Sharma', grade: 'Grade 12', xp: 12840, streak: 45, badge: '👑', avatar: 'PS', color: 'bg-yellow-400', isMe: false },
  { rank: 2, name: 'Arjun Mehta', grade: 'Grade 12', xp: 11520, streak: 32, badge: '🥈', avatar: 'AM', color: 'bg-gray-400', isMe: false },
  { rank: 3, name: 'Neha Joshi', grade: 'Grade 11', xp: 10890, streak: 28, badge: '🥉', avatar: 'NJ', color: 'bg-amber-500', isMe: false },
  { rank: 4, name: 'Rahul Kumar', grade: 'Grade 12', xp: 9750, streak: 21, badge: '', avatar: 'RK', color: 'bg-blue-500', isMe: false },
  { rank: 5, name: 'Shreya Patel', grade: 'Grade 10', xp: 9120, streak: 18, badge: '', avatar: 'SP', color: 'bg-green-500', isMe: false },
  { rank: 6, name: 'You', grade: 'Grade 12', xp: 8840, streak: 14, badge: '', avatar: 'ME', color: 'bg-blue-600', isMe: true },
  { rank: 7, name: 'Dev Singh', grade: 'Grade 12', xp: 8240, streak: 12, badge: '', avatar: 'DS', color: 'bg-purple-500', isMe: false },
  { rank: 8, name: 'Ananya Roy', grade: 'Grade 11', xp: 7980, streak: 9, badge: '', avatar: 'AR', color: 'bg-pink-500', isMe: false },
  { rank: 9, name: 'Kiran Bhat', grade: 'Grade 10', xp: 7650, streak: 7, badge: '', avatar: 'KB', color: 'bg-teal-500', isMe: false },
  { rank: 10, name: 'Siddharth M.', grade: 'Grade 12', xp: 7340, streak: 6, badge: '', avatar: 'SM', color: 'bg-orange-500', isMe: false },
];

const BADGES = [
  { icon: '🔥', label: 'Week Warrior', desc: '7-day streak', earned: true, color: 'bg-orange-50 border-orange-200' },
  { icon: '⚡', label: 'XP Hunter', desc: 'Earned 1000 XP', earned: true, color: 'bg-blue-50 border-blue-200' },
  { icon: '📚', label: 'Curious Learner', desc: 'Watched 10 videos', earned: true, color: 'bg-green-50 border-green-200' },
  { icon: '🎯', label: 'Quiz Ace', desc: 'Score 100% on quiz', earned: false, color: 'bg-gray-50 border-gray-200' },
  { icon: '🏆', label: 'Month Master', desc: '30-day streak', earned: false, color: 'bg-gray-50 border-gray-200' },
  { icon: '🧠', label: 'Brain Power', desc: 'Watched 50 videos', earned: false, color: 'bg-gray-50 border-gray-200' },
  { icon: '🌟', label: 'Top 10', desc: 'Reach global top 10', earned: false, color: 'bg-gray-50 border-gray-200' },
  { icon: '💎', label: 'Diamond Streak', desc: '60-day streak', earned: false, color: 'bg-gray-50 border-gray-200' },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Global');
  const [activeSection, setActiveSection] = useState<'leaderboard' | 'badges'>('leaderboard');
  const meRank = LEADERBOARD_DATA.find(u => u.isMe);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Leaderboard</h1>
        <p className="text-gray-500 text-sm">Compete with students worldwide. Earn XP to climb the ranks!</p>
      </div>

      {/* Your Rank Card */}
      {meRank && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-yellow-900 font-bold text-lg shadow-lg">
              {meRank.avatar}
            </div>
            <div className="flex-1">
              <p className="text-blue-100 text-xs mb-0.5">Your Current Rank</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">#{meRank.rank}</span>
                <span className="text-blue-100 text-sm mb-1">of 2.1M students</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-lg">{meRank.xp.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Flame className="w-4 h-4 text-orange-300" />
                <span className="text-blue-100 text-sm">{meRank.streak} day streak</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-blue-100 text-sm">
            <TrendingUp className="w-4 h-4 text-green-300" />
            <span>Up <strong className="text-green-300">+3</strong> positions this week · Next rank in <strong className="text-yellow-300">160 XP</strong></span>
          </div>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {(['leaderboard', 'badges'] as const).map((s) => (
          <button key={s} onClick={() => setActiveSection(s)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${activeSection === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {s === 'leaderboard' ? '🏆 Rankings' : '🎖 Badges'}
          </button>
        ))}
      </div>

      {activeSection === 'leaderboard' ? (
        <>
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'gradient-blue text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3">
            {LEADERBOARD_DATA.slice(0, 3).map(({ rank, name, xp, streak, avatar, color }, i) => {
              const order = [1, 0, 2][i];
              const heights = ['h-24', 'h-32', 'h-20'];
              const crowns = ['🥈', '👑', '🥉'];
              return (
                <div key={rank} className={`${order === 0 ? 'order-2' : order === 1 ? 'order-1' : 'order-3'} flex flex-col items-center`}>
                  <div className="text-2xl mb-1">{crowns[order]}</div>
                  <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white font-bold text-sm mb-1 shadow-md`}>{avatar}</div>
                  <p className="text-xs font-semibold text-gray-800 text-center truncate w-full px-1">{name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400 mb-2">{xp.toLocaleString()} XP</p>
                  <div className={`${heights[order]} w-full ${order === 0 ? 'gradient-yellow' : order === 1 ? 'gradient-blue' : 'gradient-green'} rounded-t-xl flex items-end justify-center pb-2`}>
                    <span className="text-white font-bold text-lg">#{rank}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full List */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            {LEADERBOARD_DATA.map(({ rank, name, grade, xp, streak, badge, avatar, color, isMe }) => (
              <div key={rank} className={`flex items-center gap-4 px-4 py-3.5 border-b last:border-0 border-gray-50 transition-colors ${isMe ? 'bg-blue-50 border-blue-100' : 'hover:bg-gray-50'}`}>
                <div className={`w-8 text-center font-bold text-sm ${rank <= 3 ? 'text-yellow-500' : 'text-gray-400'}`}>
                  {rank <= 3 ? badge || `#${rank}` : `#${rank}`}
                </div>
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>{avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${isMe ? 'text-blue-700' : 'text-gray-900'}`}>{name} {isMe && <span className="text-blue-400 font-normal">(You)</span>}</p>
                    {isMe && <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Me</Badge>}
                  </div>
                  <p className="text-xs text-gray-400">{grade}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-sm font-bold text-gray-900">{xp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-xs text-gray-400">{streak}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Your Badges</h2>
            <span className="text-sm text-gray-400">3 / {BADGES.length} earned</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES.map(({ icon, label, desc, earned, color }) => (
              <div key={label} className={`rounded-2xl p-4 border-2 text-center transition-all ${earned ? color + ' ' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'}`}>
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
                {earned && <p className="text-xs text-green-600 font-semibold mt-1">Earned!</p>}
                {!earned && <p className="text-xs text-gray-400 mt-1">Locked</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
