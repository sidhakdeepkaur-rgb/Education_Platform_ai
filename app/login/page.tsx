'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-blue flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">EduAI</span>
        </Link>
        <div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-fit mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Trusted by 2M+ students</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your AI-powered<br />learning journey<br />awaits you.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join millions of students mastering every subject with personalized AI tutoring, live classes, and gamified learning.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Active Learners', value: '2M+' },
              { label: 'Video Lessons', value: '50K+' },
              { label: 'Live Classes / Week', value: '500+' },
              { label: 'Avg Score Increase', value: '42%' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-blue-100 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-blue-100 text-sm">
          <div className="flex -space-x-2">
            {['PS', 'AM', 'RK', 'NJ'].map((a) => (
              <div key={a} className="w-8 h-8 rounded-full bg-white/20 border-2 border-blue-500 flex items-center justify-center text-xs text-white font-bold">{a}</div>
            ))}
          </div>
          <span>Join thousands learning right now</span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-500 mb-8">Sign in to continue your learning journey.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 gradient-blue text-white border-0 hover:opacity-90 rounded-xl text-base font-semibold shadow-lg shadow-blue-100">
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-3 bg-[#F8FAFC] text-gray-500">or continue as</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-gray-200" onClick={() => router.push('/dashboard')}>
              <span className="mr-2">👨‍🎓</span> Student
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-gray-200" onClick={() => router.push('/parent')}>
              <span className="mr-2">👨‍👧</span> Parent
            </Button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
