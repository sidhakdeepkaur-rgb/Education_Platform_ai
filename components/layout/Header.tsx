'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, Flame, Zap, Menu, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title?: string;
  xp?: number;
  streak?: number;
  userName?: string;
  onMenuToggle?: () => void;
}

export default function Header({ title = 'Dashboard', xp = 2840, streak = 7, userName = 'Student', onMenuToggle }: HeaderProps) {
  const [searching, setSearching] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 px-4 sm:px-6 h-16">
        {/* Mobile logo + menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg gradient-blue flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
          </Link>
        </div>

        <h1 className="hidden lg:block text-lg font-bold text-gray-900 shrink-0">{title}</h1>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search topics, chapters, subjects..."
              className="pl-9 h-9 rounded-xl border-gray-200 bg-gray-50 text-sm focus:bg-white"
              onFocus={() => setSearching(true)}
              onBlur={() => setSearching(false)}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* XP Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 rounded-full px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-blue-700 text-sm font-bold">{xp.toLocaleString()}</span>
            <span className="text-blue-400 text-xs">XP</span>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-1 bg-orange-50 rounded-full px-2.5 py-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500 streak-flame" />
            <span className="text-orange-600 text-sm font-bold">{streak}</span>
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Bell className="w-4.5 h-4.5 text-gray-500" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          <Link href="/profile">
            <div className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity">
              {userName.charAt(0).toUpperCase()}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
