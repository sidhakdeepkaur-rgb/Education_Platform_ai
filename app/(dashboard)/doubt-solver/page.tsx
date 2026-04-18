'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Image, Sparkles, BookOpen, Clock, Plus, Brain, ChevronRight, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

const SAMPLE_DOUBTS = [
  { question: 'How do I solve integration by parts?', subject: 'Mathematics', time: '2h ago' },
  { question: 'Explain the photoelectric effect', subject: 'Physics', time: '1d ago' },
  { question: 'What is Le Chatelier\'s principle?', subject: 'Chemistry', time: '2d ago' },
];

const QUICK_TOPICS = ['Derivatives', 'Optics', 'Cell Division', 'Coordinate Geometry', 'Thermodynamics', 'Organic Reactions'];

const AI_RESPONSES: Record<string, string> = {
  default: `Great question! Let me guide you through this step by step using the Socratic method. 🧠

**Step 1: Understand the concept**
Before I give you the answer directly, let me ask: What do you already know about this topic? Have you tried applying any formulas or principles?

**Step 2: Break it down**
Let's think about this systematically:
• What are the given values?
• What formula or concept applies here?
• What is the unknown you're trying to find?

**Step 3: Apply the concept**
Based on the fundamentals, here's how we approach it:

The key insight is to identify which principle governs this problem. Once you recognize the pattern, the solution becomes much clearer.

Can you try working through Step 1 and tell me what you come up with? I'll guide you from there! 💡`,
};

export default function DoubtSolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `Hello! I'm your AI Doubt Solver powered by GPT-4. 🌟

I use the **Socratic method** to help you truly understand concepts — not just give answers. This builds deep knowledge that helps you in exams!

You can:
• **Type** your doubt below
• **Upload an image** of your textbook problem
• **Ask follow-up questions** — I remember our conversation

What's confusing you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      content: AI_RESPONSES.default,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8FAFC]">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <Button className="w-full gradient-blue text-white border-0 rounded-xl h-10 text-sm font-semibold">
            <Plus className="w-4 h-4 mr-2" /> New Doubt
          </Button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Doubts</p>
          <div className="space-y-2">
            {SAMPLE_DOUBTS.map(({ question, subject, time }, i) => (
              <button key={i} onClick={() => setSelectedThread(i)} className={`w-full text-left p-3 rounded-xl transition-all ${selectedThread === i ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}>
                <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{question}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-50 text-blue-600 border-0 text-xs">{subject}</Badge>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{time}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Ask</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TOPICS.map((t) => (
                <button key={t} onClick={() => setInput(`Explain ${t}`)} className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-blue-50/50">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-700">AI Powered</p>
              <p className="text-xs text-blue-500">GPT-4 with subject expertise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gradient-blue rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">AI Doubt Solver</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs text-gray-400">GPT-4 · Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-50 text-green-700 border-green-100 text-xs">Socratic Method</Badge>
            <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <BookOpen className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(({ id, sender, content, timestamp }) => (
            <div key={id} className={`flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold ${sender === 'ai' ? 'gradient-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                {sender === 'ai' ? '🤖' : 'You'}
              </div>
              <div className={`max-w-[80%] ${sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${sender === 'ai' ? 'bg-white card-shadow text-gray-800' : 'gradient-blue text-white'}`}>
                  <div className="whitespace-pre-line">{content}</div>
                </div>
                <span className="text-xs text-gray-400 px-1">
                  {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl gradient-blue flex items-center justify-center text-sm">🤖</div>
              <div className="bg-white card-shadow rounded-2xl px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-100 p-4 sm:p-6 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F8FAFC] rounded-2xl border border-gray-200 focus-within:border-blue-300 transition-colors">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your doubt here... or describe your problem (Press Enter to send, Shift+Enter for new line)"
                className="border-0 bg-transparent rounded-2xl resize-none text-sm px-4 py-3 min-h-[80px] max-h-[160px] focus-visible:ring-0 text-gray-800 placeholder:text-gray-400"
              />
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Upload image">
                    <Image className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Voice input">
                    <Mic className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-gray-400">Supports images, diagrams, equations</span>
                </div>
                <Button onClick={sendMessage} disabled={!input.trim() || isTyping} className="gradient-blue text-white border-0 rounded-xl h-9 px-4 text-sm font-semibold disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">AI responses are for educational guidance. Always verify with your teacher.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
