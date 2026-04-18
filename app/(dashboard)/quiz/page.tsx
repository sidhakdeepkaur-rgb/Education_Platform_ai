'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle, X, Clock, Zap, ChevronRight, Brain, Target, ChartBar as BarChart3, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const QUIZ_CATEGORIES = [
  { id: 'math', name: 'Mathematics', icon: '∑', color: 'from-blue-500 to-blue-600', questions: 25, time: '30 min', difficulty: 'Adaptive' },
  { id: 'physics', name: 'Physics', icon: '⚛', color: 'from-sky-500 to-blue-600', questions: 20, time: '25 min', difficulty: 'Medium' },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗', color: 'from-yellow-500 to-orange-500', questions: 20, time: '25 min', difficulty: 'Hard' },
  { id: 'bio', name: 'Biology', icon: '🌿', color: 'from-emerald-500 to-green-600', questions: 25, time: '30 min', difficulty: 'Easy' },
  { id: 'daily', name: 'Daily Challenge', icon: '🎯', color: 'from-orange-500 to-red-500', questions: 10, time: '15 min', difficulty: 'Mixed' },
  { id: 'pyq', name: 'PYQ Practice', icon: '📋', color: 'from-gray-600 to-gray-800', questions: 30, time: '45 min', difficulty: 'JEE/NEET' },
];

const QUESTIONS = [
  {
    id: 1,
    text: 'What is the discriminant of the quadratic equation 2x² - 5x + 3 = 0?',
    type: 'mcq',
    options: [{ id: 'a', text: '1' }, { id: 'b', text: '49' }, { id: 'c', text: '-24' }, { id: 'd', text: '25' }],
    correctId: 'a',
    explanation: 'Discriminant = b² - 4ac = (-5)² - 4(2)(3) = 25 - 24 = 1',
    difficulty: 'Medium',
    marks: 4,
    negativeMarks: -1,
  },
  {
    id: 2,
    text: 'If the roots of ax² + bx + c = 0 are equal, then b² - 4ac equals:',
    type: 'mcq',
    options: [{ id: 'a', text: '> 0' }, { id: 'b', text: '< 0' }, { id: 'c', text: '= 0' }, { id: 'd', text: '≠ 0' }],
    correctId: 'c',
    explanation: 'For equal roots, the discriminant (b² - 4ac) must be exactly 0.',
    difficulty: 'Easy',
    marks: 4,
    negativeMarks: -1,
  },
  {
    id: 3,
    text: 'The sum of the roots of x² - 7x + 10 = 0 is:',
    type: 'mcq',
    options: [{ id: 'a', text: '7' }, { id: 'b', text: '10' }, { id: 'c', text: '-7' }, { id: 'd', text: '5' }],
    correctId: 'a',
    explanation: 'By Vieta\'s formulas, sum of roots = -b/a = -(-7)/1 = 7',
    difficulty: 'Easy',
    marks: 4,
    negativeMarks: -1,
  },
];

type QuizState = 'selection' | 'active' | 'results';

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('selection');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [score, setScore] = useState(0);

  const question = QUESTIONS[currentQ];
  const totalQuestions = QUESTIONS.length;

  const handleAnswer = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = { ...answers, [question.id]: selectedAnswer };
      setAnswers(newAnswers);
      if (selectedAnswer === question.correctId) setScore(s => s + question.marks);
      else setScore(s => s + question.negativeMarks);
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(c => c + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizState('results');
      }
    }
    if (!selectedAnswer) setShowExplanation(true);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (quizState === 'selection') {
    return (
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Quiz Engine</h1>
          <p className="text-gray-500 text-sm">Adaptive quizzes that match your level and help you improve</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Quizzes Taken', value: '47', icon: Target, color: 'text-blue-600 bg-blue-50' },
            { label: 'Avg Score', value: '78%', icon: BarChart3, color: 'text-green-600 bg-green-50' },
            { label: 'XP from Quizzes', value: '1,240', icon: Zap, color: 'text-yellow-600 bg-yellow-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 card-shadow">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-2`}><Icon className="w-4.5 h-4.5" /></div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎯</span>
            <Badge className="bg-yellow-400 text-yellow-900 border-0 text-xs">Daily Challenge</Badge>
          </div>
          <h2 className="text-lg font-bold mb-1">Mixed Subjects · 10 Questions · 15 min</h2>
          <p className="text-orange-100 text-sm mb-4">Complete today&apos;s challenge to earn <strong>+100 bonus XP</strong> and maintain your streak!</p>
          <Button onClick={() => setQuizState('active')} className="bg-white text-orange-600 hover:bg-orange-50 border-0 font-semibold rounded-xl">
            Start Daily Challenge <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Quiz Categories */}
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Choose a Quiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUIZ_CATEGORIES.map(({ id, name, icon, color, questions, time, difficulty }) => (
              <div key={id} className="bg-white rounded-2xl card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all p-4 cursor-pointer group" onClick={() => setQuizState('active')}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl text-white font-bold shrink-0 group-hover:scale-110 transition-transform`}>{icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
                    <Badge className="mt-1 text-xs bg-gray-100 text-gray-600 border-0">{difficulty}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Brain className="w-3 h-3" />{questions} questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{time}</span>
                </div>
                <Button className="w-full mt-3 h-8 text-xs gradient-blue text-white border-0 rounded-xl">Start Quiz</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    const pct = Math.round((score / (totalQuestions * 4)) * 100);
    const correct = Object.entries(answers).filter(([qId, ans]) => {
      const q = QUESTIONS.find(q => q.id === parseInt(qId));
      return q?.correctId === ans;
    }).length;

    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl card-shadow p-8 text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold border-4 border-blue-200 bg-blue-50 text-blue-600">
            {pct}%
          </div>
          <div className="text-2xl mb-1">{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practicing!'}</h1>
          <p className="text-gray-500 mb-6">You scored {score} out of {totalQuestions * 4} marks</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Correct', value: correct, color: 'text-green-600 bg-green-50' },
              { label: 'Wrong', value: totalQuestions - correct, color: 'text-red-600 bg-red-50' },
              { label: 'XP Earned', value: `+${Math.max(0, score * 10)}`, color: 'text-blue-600 bg-blue-50' },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-xl p-3 ${color}`}>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => { setQuizState('selection'); setCurrentQ(0); setAnswers({}); setScore(0); setSelectedAnswer(null); }} variant="outline" className="rounded-xl border-gray-200">Try Another Quiz</Button>
            <Button className="gradient-blue text-white border-0 rounded-xl">View Detailed Analysis</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setQuizState('selection')} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <X className="w-4 h-4 text-gray-500" />
          </button>
          <div>
            <p className="text-xs text-gray-400">Mathematics Quiz</p>
            <p className="text-sm font-semibold text-gray-900">Question {currentQ + 1} of {totalQuestions}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-orange-50 rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-orange-600 text-sm font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 rounded-full px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-blue-600 text-sm font-bold">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div className="h-full gradient-blue rounded-full transition-all" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl card-shadow p-6 mb-4">
        <div className="flex items-start gap-3 mb-6">
          <Badge className="bg-blue-50 text-blue-700 border-blue-100 shrink-0">{question.difficulty}</Badge>
          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 shrink-0">+{question.marks} marks</Badge>
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">{question.text}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {question.options.map(({ id, text }) => {
          let cls = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50';
          if (selectedAnswer === id) cls = 'border-blue-500 bg-blue-50 text-blue-700 font-semibold';
          if (showExplanation) {
            if (id === question.correctId) cls = 'border-green-500 bg-green-50 text-green-700 font-semibold';
            else if (selectedAnswer === id && id !== question.correctId) cls = 'border-red-500 bg-red-50 text-red-700';
          }
          return (
            <button key={id} onClick={() => handleAnswer(id)} disabled={showExplanation} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${cls}`}>
              <span className="w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center text-sm font-bold shrink-0">{id.toUpperCase()}</span>
              <span className="text-sm sm:text-base">{text}</span>
              {showExplanation && id === question.correctId && <CheckCircle className="ml-auto w-5 h-5 text-green-500 shrink-0" />}
              {showExplanation && selectedAnswer === id && id !== question.correctId && <X className="ml-auto w-5 h-5 text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-blue-700 mb-1 flex items-center gap-2">
            <Brain className="w-4 h-4" /> Explanation
          </p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!showExplanation && (
          <Button variant="outline" onClick={() => setShowExplanation(true)} className="flex-1 rounded-xl border-gray-200">
            Skip & See Answer
          </Button>
        )}
        <Button onClick={handleNext} className={`gradient-blue text-white border-0 rounded-xl ${!showExplanation && !selectedAnswer ? 'flex-1' : 'flex-1'}`}>
          {currentQ < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
