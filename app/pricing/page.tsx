'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Check, X, Zap, Star, Shield, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for exploring the platform',
    color: 'from-gray-100 to-gray-200',
    textColor: 'text-gray-700',
    buttonClass: 'border-gray-300 text-gray-700 hover:bg-gray-50',
    buttonVariant: 'outline' as const,
    badge: null,
    features: [
      { text: '5 video lessons per day', included: true },
      { text: '3 quiz attempts per week', included: true },
      { text: 'Basic doubt solving (10/month)', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Limited practice questions', included: true },
      { text: 'Live classes (free sessions only)', included: true },
      { text: 'AI personalized learning path', included: false },
      { text: 'Unlimited video access', included: false },
      { text: 'Offline downloads', included: false },
      { text: 'Priority doubt resolution', included: false },
      { text: 'Parent dashboard', included: false },
      { text: 'Performance analytics', included: false },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: { monthly: 299, annual: 199 },
    description: 'Best for regular learners',
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-white',
    buttonClass: 'bg-white text-blue-600 hover:bg-blue-50 border-0',
    buttonVariant: 'default' as const,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited video lessons', included: true },
      { text: 'Unlimited quiz attempts', included: true },
      { text: 'AI doubt solving (100/month)', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Full practice question bank', included: true },
      { text: 'All live class access', included: true },
      { text: 'AI personalized learning path', included: true },
      { text: 'Offline downloads (10 videos)', included: true },
      { text: 'Performance analytics (basic)', included: true },
      { text: 'Priority doubt resolution', included: false },
      { text: 'Parent dashboard', included: false },
      { text: 'Advanced analytics & reports', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 599, annual: 399 },
    description: 'For serious exam aspirants',
    color: 'from-green-500 to-green-600',
    textColor: 'text-white',
    buttonClass: 'bg-white text-green-600 hover:bg-green-50 border-0',
    buttonVariant: 'default' as const,
    badge: 'Best Value',
    features: [
      { text: 'Unlimited video lessons', included: true },
      { text: 'Unlimited quiz attempts', included: true },
      { text: 'Unlimited AI doubt solving', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Full practice question bank + PYQs', included: true },
      { text: 'All live class access + recordings', included: true },
      { text: 'AI personalized learning path', included: true },
      { text: 'Unlimited offline downloads', included: true },
      { text: 'Priority doubt resolution (2hr SLA)', included: true },
      { text: 'Full parent dashboard', included: true },
      { text: 'Advanced analytics & reports', included: true },
      { text: 'Dedicated academic counselor', included: true },
    ],
  },
];

const FAQS = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, the change takes effect at the end of your billing cycle.',
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Yes! Both Basic and Pro plans come with a 7-day free trial. No credit card is required to start the trial. You\'ll only be charged after the trial period ends.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and EMI options for annual plans through our secure payment gateway.',
  },
  {
    q: 'Can I get a refund if I\'m not satisfied?',
    a: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not completely satisfied, contact our support team and we\'ll process your refund within 5-7 business days.',
  },
  {
    q: 'Are there discounts for students or schools?',
    a: 'Yes! We offer special pricing for school/college institutions and group enrollments. Contact our sales team at sales@eduai.com for bulk pricing options.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your account and progress data are retained for 90 days after cancellation. You can download your certificates and progress reports before the account is archived.',
  },
];

const COMPARISON = [
  { feature: 'Video lessons per day', free: '5 videos', basic: 'Unlimited', pro: 'Unlimited' },
  { feature: 'AI doubt solving', free: '10/month', basic: '100/month', pro: 'Unlimited' },
  { feature: 'Live class access', free: 'Free only', basic: 'All classes', pro: 'All + recordings' },
  { feature: 'Offline downloads', free: null, basic: '10 videos', pro: 'Unlimited' },
  { feature: 'Practice questions', free: 'Limited', basic: 'Full bank', pro: 'Full bank + PYQs' },
  { feature: 'AI learning path', free: null, basic: true, pro: true },
  { feature: 'Parent dashboard', free: null, basic: null, pro: true },
  { feature: 'Priority support', free: null, basic: null, pro: '2-hr SLA' },
  { feature: 'Academic counselor', free: null, basic: null, pro: true },
  { feature: 'Performance analytics', free: null, basic: 'Basic', pro: 'Advanced' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Edu<span className="text-gradient-blue">AI</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" className="text-gray-600 h-9">Login</Button></Link>
            <Link href="/register"><Button className="gradient-blue text-white border-0 h-9 rounded-xl">Start Free Trial</Button></Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 mb-4">Simple, Transparent Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Invest in your <span className="text-gradient-blue">future</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            Start free, upgrade when you need more. All plans include a 7-day free trial — no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${!annual ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annual
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">Save 33%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden ${plan.badge ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-100' : 'border border-gray-200 shadow-sm'} bg-white`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className={`bg-gradient-to-br ${plan.color} p-6 ${plan.badge ? 'mt-7' : ''}`}>
                <p className={`text-sm font-semibold mb-1 ${plan.id === 'free' ? 'text-gray-500' : 'text-white/80'}`}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-bold ${plan.textColor}`}>
                    {plan.price[annual ? 'annual' : 'monthly'] === 0 ? 'Free' : `₹${plan.price[annual ? 'annual' : 'monthly']}`}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={`text-sm mb-1 ${plan.id === 'free' ? 'text-gray-400' : 'text-white/70'}`}>/mo</span>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className={`text-xs mt-1 ${plan.id === 'free' ? 'text-gray-400' : 'text-white/70'}`}>
                    Billed ₹{plan.price.annual * 12}/year · Save ₹{(plan.price.monthly - plan.price.annual) * 12}
                  </p>
                )}
                <p className={`text-sm mt-2 ${plan.id === 'free' ? 'text-gray-500' : 'text-white/80'}`}>{plan.description}</p>
              </div>

              <div className="p-6">
                <Link href={plan.id === 'free' ? '/register' : `/register?plan=${plan.id}`}>
                  <Button className={`w-full h-11 rounded-xl font-semibold mb-6 ${plan.id !== 'free' ? `bg-gradient-to-r ${plan.color} text-white border-0` : 'border-gray-200 text-gray-700'}`} variant={plan.id === 'free' ? 'outline' : 'default'}>
                    {plan.id === 'free' ? 'Get Started Free' : `Start 7-Day Trial`}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {f.included ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Shield, title: '30-Day Money Back', desc: 'Not happy? Get a full refund within 30 days, no questions asked.' },
            { icon: Zap, title: 'Instant Access', desc: 'Get started immediately after sign-up. No waiting, no delays.' },
            { icon: Star, title: '4.9/5 Rating', desc: 'Loved by 2M+ students across India and internationally.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Full Feature Comparison</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4 font-semibold text-gray-500 text-sm">Feature</div>
              {PLANS.map((p) => (
                <div key={p.id} className="p-4 text-center font-bold text-gray-900 text-sm">{p.name}</div>
              ))}
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="p-4 text-sm text-gray-700 font-medium">{row.feature}</div>
                {(['free', 'basic', 'pro'] as const).map((plan) => (
                  <div key={plan} className="p-4 flex items-center justify-center">
                    {row[plan] === null ? (
                      <X className="w-4 h-4 text-gray-300" />
                    ) : row[plan] === true ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-sm text-gray-600 text-center">{row[plan]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gradient-blue rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to start learning?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join 2M+ students. 7-day free trial on all paid plans. No credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 border-0 h-12 px-8 rounded-xl font-semibold text-base">
                Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-xl text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
