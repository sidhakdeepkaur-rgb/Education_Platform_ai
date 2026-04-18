'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Zap, MessageSquare, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/quiz', icon: Zap, label: 'Quiz' },
  { href: '/doubt-solver', icon: MessageSquare, label: 'Doubts' },
  { href: '/leaderboard', icon: Trophy, label: 'Rank' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px]',
                isActive ? 'text-blue-600' : 'text-gray-400'
              )}
            >
              <div className={cn('w-10 h-8 rounded-xl flex items-center justify-center transition-all', isActive ? 'bg-blue-50' : 'hover:bg-gray-50')}>
                <Icon className={cn('w-5 h-5 transition-all', isActive ? 'text-blue-600' : 'text-gray-400')} />
              </div>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-blue-600' : 'text-gray-400')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
