'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

const GRADES = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
  'JEE', 'NEET', 'UPSC', 'SAT', 'GRE', 'GMAT',
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    setStep(2);
  };

  const handleRegister = async () => {
    if (!selectedGrade) return;
    setLoading(true);
    setError('');
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      if (signUpError) throw signUpError;
      if (data.user) {
        await supabase.from('profiles').upsert({ id: data.user.id, full_name: fullName, onboarding_completed: false });
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    '7-day free trial, no credit card needed',
    'AI-powered personalized learning path',
    'Access to 50,000+ video lessons',
    'Live classes with expert teachers',
    'Gamified quizzes and challenges',
  ];

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-green-500 to-green-600 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">EduAI</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Start your free<br />learning journey<br />today.</h2>
          <p className="text-green-100 text-lg mb-8">Everything you need to excel in academics and competitive exams — all in one place.</p>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-white font-semibold text-sm mb-1">Join these students today:</p>
          <p className="text-green-100 text-xs">Priya scored 98% in Boards • Rahul cracked JEE AIR 234 • Ananya cleared NEET in first attempt</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'gradient-blue text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
                {s < 2 && <div className={`h-1 w-12 rounded-full transition-all ${step > s ? 'bg-blue-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
            <span className="ml-2 text-sm text-gray-500">Step {step} of 2</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
          )}

          {step === 1 ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-500 mb-8">Start your 7-day free trial. No credit card needed.</p>
              <form onSubmit={handleStep1} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 h-12 rounded-xl border-gray-200" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl border-gray-200" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12 rounded-xl border-gray-200" required minLength={8} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 gradient-blue text-white border-0 rounded-xl text-base font-semibold">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What are you studying?</h1>
              <p className="text-gray-500 mb-6">Select your grade or target exam so we can personalize your learning path.</p>
              <div className="grid grid-cols-3 gap-2 mb-6 max-h-72 overflow-y-auto pr-1">
                {GRADES.map((g) => (
                  <button key={g} onClick={() => setSelectedGrade(g)} className={`py-3 px-2 rounded-xl text-sm font-medium border-2 transition-all ${selectedGrade === g ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white text-gray-700 hover:border-blue-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
              <Button onClick={handleRegister} disabled={!selectedGrade || loading} className="w-full h-12 gradient-blue text-white border-0 rounded-xl text-base font-semibold">
                {loading ? 'Creating account...' : 'Start Learning Free'}
                {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
              <Button variant="ghost" onClick={() => setStep(1)} className="w-full mt-2 text-gray-500">Go back</Button>
            </>
          )}

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
          </p>
          <p className="text-center text-gray-400 text-xs mt-4">
            By registering, you agree to our{' '}
            <Link href="#" className="text-gray-500 underline">Terms of Service</Link> and{' '}
            <Link href="#" className="text-gray-500 underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
