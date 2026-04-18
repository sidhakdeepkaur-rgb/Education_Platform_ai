'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, LayoutDashboard, BookOpen, Zap, MessageSquare, Video, Trophy, Target, Users, ChartBar as BarChart3, Settings, LogOut, Flame, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/quiz', icon: Zap, label: 'Quiz' },
  { href: '/doubt-solver', icon: MessageSquare, label: 'Doubt Solver' },
  { href: '/live', icon: Video, label: 'Live Classes' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/planner', icon: Target, label: 'Study Planner' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/parent', icon: BarChart3, label: 'Parent View' },
];

interface SidebarProps {
  xp?: number;
  level?: number;
  streak?: number;
  userName?: string;
}

export default function Sidebar({ xp = 2840, level = 12, streak = 7, userName = 'Student' }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const xpForLevel = level * 500;
  const xpProgress = ((xp % 500) / 500) * 100;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center shadow-sm shadow-blue-200">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
        </Link>
      </div>

      {/* XP / Level Card */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Level {level}</span>
          <div className="flex items-center gap-1 bg-orange-100 rounded-full px-2 py-0.5">
            <Flame className="w-3 h-3 text-orange-500 streak-flame" />
            <span className="text-orange-600 text-xs font-bold">{streak}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Hi, {userName.split(' ')[0]}! 👋</p>
        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden mb-1">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-blue-600">
          <span>{xp.toLocaleString()} XP</span>
          <span>{xpForLevel.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn('w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-blue-600' : 'text-gray-400')} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-gray-100 pt-3">
        <Link href="/profile" className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all', pathname === '/profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50')}>
          <Settings className="w-4.5 h-4.5 text-gray-400" />
          Settings
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut className="w-4.5 h-4.5 text-gray-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
