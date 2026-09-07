import React, { useState } from 'react';
import { 
  Brain, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Trophy, 
  Timer, 
  Flame, 
  Layers, 
  Zap, 
  ArrowRight,
  Copy,
  Check,
  Languages,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  Share2,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';

export default function KuroviaPortal({ showToast }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showIndoTranslation, setShowIndoTranslation] = useState(false);

  // Interactive Mini Trivia Teaser State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const sampleQuestions = [
    {
      id: 1,
      category: 'Computers & Technology',
      difficulty: 'Easy',
      questionEn: 'What does the "HTTP" stand for in website addresses?',
      questionId: 'Apa kepanjangan dari singkatan "HTTP" pada alamat situs web?',
      options: [
        'HyperText Transfer Protocol',
        'High Tech Transmission Process',
        'Hyperlink Terminal Traffic Program',
        'Home Tool Tracking Protocol'
      ],
      correct: 0,
      explanation: 'HyperText Transfer Protocol (HTTP) adalah protokol jaringan fondasi pertukaran data di World Wide Web.'
    },
    {
      id: 2,
      category: 'Video Games',
      difficulty: 'Medium',
      questionEn: 'In "The Legend of Zelda" series, what is the iconic name of the Master Sword\'s resting place in most games?',
      questionId: 'Dalam seri "The Legend of Zelda", apa nama tempat ikonik peristirahatan Master Sword di sebagian besar seri gamenya?',
      options: [
        'Lost Woods / Sacred Grove',
        'Death Mountain Crater',
        'Temple of Time Ruins',
        'Hyrule Castle Dungeons'
      ],
      correct: 0,
      explanation: 'Master Sword secara legendaris diletakkan di dalam Sacred Grove atau Pedestal of Time di dalam Lost Woods.'
    },
    {
      id: 3,
      category: 'Science & Nature',
      difficulty: 'Medium',
      questionEn: 'What planet in our solar system has the most prominent and visible ring system?',
      questionId: 'Planet manakah di tata surya kita yang memiliki sistem cincin paling menonjol dan mudah terlihat?',
      options: [
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune'
      ],
      correct: 1,
      explanation: 'Saturnus memiliki sistem cincin es dan debu paling spektakuler dan luas yang dapat diamati dari bumi.'
    },
    {
      id: 4,
      category: 'Anime & Manga',
      difficulty: 'Easy',
      questionEn: 'In "One Piece", what is the dream goal of Monkey D. Luffy?',
      questionId: 'Dalam serial "One Piece", apakah impian utama dari karakter Monkey D. Luffy?',
      options: [
        'Become the King of the Pirates',
        'Find the All Blue Ocean',
        'Defeat the World Government Fleet',
        'Become the Greatest Swordsman'
      ],
      correct: 0,
      explanation: 'Monkey D. Luffy berlayar mengarungi Grand Line dengan tujuan menemukan One Piece dan menjadi Raja Bajak Laut.'
    }
  ];

  const categoriesShowcase = [
    {
      name: 'Science & Nature',
      nameId: 'Sains & Alam',
      icon: '🧪',
      tag: 'Kimia, Fisika, Biologi',
      questionsCount: '1,500+ Soal',
      difficulty: 'Easy - Hard'
    },
    {
      name: 'Video Games',
      nameId: 'Game & Konsol',
      icon: '🎮',
      tag: 'Nintendo, PC, PlayStation, Retro',
      questionsCount: '1,200+ Soal',
      difficulty: 'Medium'
    },
    {
      name: 'Japanese Anime & Manga',
      nameId: 'Anime & Pop Culture',
      icon: '⚡',
      tag: 'Shonen, Classic, Studio Ghibli',
      questionsCount: '900+ Soal',
      difficulty: 'Easy - Medium'
    },
    {
      name: 'Geography & History',
      nameId: 'Geografi & Sejarah Dunia',
      icon: '🌍',
      tag: 'Ibukota, Peradaban Kuno, Bendera',
      questionsCount: '1,800+ Soal',
      difficulty: 'Medium - Hard'
    },
    {
      name: 'Film & Entertainment',
      nameId: 'Film & Perfilman',
      icon: '🎬',
      tag: 'Oscar, Hollywood, Sutradara',
      questionsCount: '1,100+ Soal',
      difficulty: 'Easy - Hard'
    },
    {
      name: 'Computers & AI',
      nameId: 'Komputer & Teknologi',
      icon: '💻',
      tag: 'Hardware, Coding, Internet History',
      questionsCount: '800+ Soal',
      difficulty: 'Medium - Hard'
    }
  ];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === sampleQuestions[currentQIndex].correct;
    if (isCorrect) {
      setScore(prev => prev + 150 + (streak * 25));
      setStreak(prev => prev + 1);
      showToast?.('🎉 Benar sekali! Skor bertambah.', 'success');
    } else {
      setStreak(0);
      showToast?.('❌ Kurang tepat, simak pembahasannya!', 'error');
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < sampleQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowIndoTranslation(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowIndoTranslation(false);
    setScore(0);
    setStreak(0);
    setIsQuizFinished(false);
  };

  const handleCopyPortalUrl = () => {
    navigator.clipboard.writeText('https://kurovia.vercel.app/');
    setCopiedLink(true);
    showToast?.('Tautan Kurovia disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const currentQ = sampleQuestions[currentQIndex];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Hero Showcase Banner */}
      <div className="clay-card p-6 sm:p-10 bg-gradient-to-br from-amber-50/80 via-yellow-50/50 to-emerald-50/70 dark:from-amber-950/30 dark:via-slate-900/60 dark:to-emerald-950/30 border border-amber-300/60 dark:border-white/10 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/20 dark:bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3.5 max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 text-xs font-black shadow-sm">
                <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Modul Transfer Ekosistem KuroDev</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black text-yellow-300 font-black tracking-wide border border-black dark:border-yellow-400/40">
                ⚡ Neo-Brutalist Edition
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-claySlate-900 dark:text-white tracking-tight flex flex-wrap items-center gap-3">
              <span>Kurovia</span>
              <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black shadow-sm border border-black/10">
                🧠 Trivia Web App
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-claySlate-800 dark:text-slate-100 font-bold leading-relaxed">
              <strong>Asah Otakmu dengan Game Trivia Interaktif Berbahasa Inggris Terlengkap.</strong>
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-claySlate-600 dark:text-slate-300 font-medium leading-relaxed">
              Platform kuis trivia berkecepatan tinggi bergaya <em>Neo-Brutalism</em> dengan ribuan bank soal Open Trivia DB global. Dilengkapi Session Token anti-duplikasi, mode timer 15 detik, multiplier combo streak, lifelines bantuan, dan Cloud Leaderboard Supabase live.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://kurovia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button py-3.5 px-6 text-xs sm:text-sm font-black flex items-center gap-2 bg-[#FFE600] hover:bg-[#FFE600]/90 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span>Mainkan di Kurovia (Live App)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyPortalUrl}
                className="clay-button py-3.5 px-5 text-xs font-black bg-white/90 dark:bg-[#131B2E] hover:bg-white text-claySlate-800 dark:text-white border border-claySlate-200 dark:border-white/10 flex items-center gap-2 shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tautan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Salin URL Kurovia</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Stats Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3.5 w-full lg:w-72">
            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-amber-200/80 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 font-black">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">24+</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">Kategori Soal Global</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-emerald-200/80 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">Anti-Repeat</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">OpenTDB Session Token</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-cyan-200/80 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-700 dark:text-cyan-400 font-black">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">Supabase</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">Cloud Leaderboard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Mini-Quiz Preview Teaser */}
      <div className="clay-card p-6 sm:p-8 border-2 border-claySlate-200 dark:border-white/10 bg-white/80 dark:bg-[#0E1524]/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-claySlate-100 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 text-[11px] font-extrabold mb-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Interactive Gameplay Preview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-claySlate-900 dark:text-white flex items-center gap-2">
              <span>Coba Kuis Teaser Kurovia</span>
            </h2>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 font-medium mt-0.5">
              Uji pengetahuanmu langsung pada pratinjau di bawah sebelum meluncur ke aplikasi utama!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Score & Streak Counters */}
            <div className="flex items-center gap-2 bg-claySlate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-claySlate-200 dark:border-white/5 text-xs font-black">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Skor: <strong className="text-claySlate-900 dark:text-white">{score}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 px-3 py-1.5 rounded-xl text-xs font-black">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{streak} Streak</span>
            </div>
          </div>
        </div>

        {!isQuizFinished ? (
          <div className="space-y-5">
            {/* Question Header: Category, Difficulty, & Question Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  {currentQ.category}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {currentQ.difficulty}
                </span>
              </div>

              <div className="text-xs font-bold text-claySlate-500 dark:text-slate-400">
                Pertanyaan <strong className="text-claySlate-900 dark:text-white">{currentQIndex + 1}</strong> dari {sampleQuestions.length}
              </div>
            </div>

            {/* Question Box with Neo-Brutalist flair */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border-2 border-black dark:border-amber-400/40 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(251,191,36,0.3)] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-black text-claySlate-900 dark:text-white leading-snug">
                  {showIndoTranslation ? currentQ.questionId : currentQ.questionEn}
                </h3>

                {/* Translation Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowIndoTranslation(!showIndoTranslation)}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-claySlate-300 dark:border-white/10 text-[11px] font-extrabold text-claySlate-700 dark:text-slate-200 hover:bg-claySlate-100 shadow-sm"
                  title="Terjemahkan Soal ke Bahasa Indonesia"
                >
                  <Languages className="w-3.5 h-3.5 text-blue-500" />
                  <span>{showIndoTranslation ? 'Lihat English' : 'Terjemah ID'}</span>
                </button>
              </div>

              <p className="text-[11px] text-claySlate-500 dark:text-slate-400 font-medium">
                💡 Mode bahasa default Open Trivia DB adalah Bahasa Inggris internasional.
              </p>
            </div>

            {/* 4 Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'bg-white dark:bg-[#131B2E] hover:bg-amber-50 dark:hover:bg-slate-800 text-claySlate-800 dark:text-slate-200 border-2 border-claySlate-200 dark:border-white/10';
                
                if (isAnswerSubmitted) {
                  if (idx === currentQ.correct) {
                    btnStyle = 'bg-emerald-500 text-white border-2 border-black font-black shadow-[3px_3px_0px_#000]';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-500 text-white border-2 border-black font-black shadow-[3px_3px_0px_#000]';
                  } else {
                    btnStyle = 'opacity-40 bg-claySlate-100 dark:bg-slate-900 border-claySlate-200 dark:border-white/5';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl text-left font-bold text-xs sm:text-sm flex items-center justify-between transition-all select-none ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-black flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && idx === currentQ.correct && (
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && idx === selectedOption && idx !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Post-Answer Feedback Banner */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {selectedOption === currentQ.correct ? (
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat (+150 poin)
                      </span>
                    ) : (
                      <span className="text-xs font-black text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Jawaban Kurang Tepat
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-claySlate-600 dark:text-slate-300 font-medium">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="clay-button py-2.5 px-5 text-xs font-black bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 flex-shrink-0 hover:translate-x-0.5"
                >
                  <span>{currentQIndex < sampleQuestions.length - 1 ? 'Soal Berikutnya' : 'Selesai & Lihat Skor'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Quiz State */
          <div className="p-8 text-center space-y-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-black dark:border-amber-400/40">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-yellow-400 text-black border-2 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_#000]">
              🏆
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-claySlate-900 dark:text-white">
                Pratinjau Selesai! Skor Kamu: {score}
              </h3>
              <p className="text-xs sm:text-sm text-claySlate-600 dark:text-slate-300 font-medium max-w-md mx-auto">
                Ingin tantangan sesungguhnya dengan ribuan soal, mode timer 15 detik, dan papan peringkat global Supabase?
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://kurovia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button py-3 px-6 text-xs sm:text-sm font-black flex items-center gap-2 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5"
              >
                <span>Mainkan di Kurovia Sekarang</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleResetQuiz}
                className="clay-button py-3 px-5 text-xs font-black bg-white dark:bg-[#131B2E] text-claySlate-800 dark:text-white border border-claySlate-200 dark:border-white/10 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Teaser</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Category Showcase Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-claySlate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Eksplorasi Kategori Trivia Kurovia</span>
            </h2>
            <p className="text-xs sm:text-sm text-claySlate-500 dark:text-slate-400 font-medium mt-0.5">
              Pilihan kategori pengetahuan lengkap yang tersedia di aplikasi Kurovia.
            </p>
          </div>

          <a
            href="https://kurovia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 dark:text-amber-400 hover:underline"
          >
            <span>Buka Semua 24 Kategori</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoriesShowcase.map((cat, i) => (
            <div
              key={i}
              className="clay-card p-5 border border-claySlate-200 dark:border-white/10 hover:border-amber-400/80 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-200/50 dark:border-white/5">
                    {cat.icon}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-claySlate-100 dark:bg-slate-800 text-claySlate-600 dark:text-slate-300">
                    {cat.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-claySlate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-claySlate-500 dark:text-slate-400 font-semibold">
                    {cat.nameId}
                  </p>
                </div>

                <div className="text-[11px] text-claySlate-600 dark:text-slate-300 bg-claySlate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-claySlate-100 dark:border-white/5">
                  Topik: <span className="font-bold">{cat.tag}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-claySlate-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-bold text-claySlate-400 dark:text-slate-400">
                  {cat.questionsCount}
                </span>
                <a
                  href="https://kurovia.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <span>Mainkan</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Core Features of Kurovia */}
      <div className="clay-card p-6 sm:p-8 border border-claySlate-200 dark:border-white/10">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-claySlate-900 dark:text-white">
            Fitur Utama Kurovia Web App
          </h3>
          <p className="text-xs sm:text-sm text-claySlate-500 dark:text-slate-400 font-medium">
            Dirancang khusus untuk menghadirkan pengalaman trivia online yang cepat, adil, dan adiktif.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center space-y-2.5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-yellow-100 dark:bg-yellow-950/80 text-yellow-800 dark:text-yellow-300 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Session Token Anti-Duplikat</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Sistem token otomatis memastikan Anda tidak pernah menerima soal yang sama selama 6 jam sesi bermain.
            </p>
          </div>

          <div className="text-center space-y-2.5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
              <Timer className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Timer & Combo Streak</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Tantangan 15 detik per soal. Semakin cepat menjawab benar secara berturut-turut, semakin besar poin bonus Anda.
            </p>
          </div>

          <div className="text-center space-y-2.5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-black">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Supabase Cloud Leaderboard</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Skor akhir disimpan secara real-time ke Supabase. Bersaing dengan pemain lain untuk meraih peringkat tertinggi.
            </p>
          </div>
        </div>

        {/* English Only Guide Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 border border-blue-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 dark:text-blue-300">
              <Languages className="w-4 h-4" />
              <span>Panduan Bahasa Soal (English Only Questions)</span>
            </div>
            <p className="text-xs text-claySlate-600 dark:text-slate-300 font-medium">
              Seluruh soal Open Trivia DB berstandar bahasa Inggris. Anda dapat mengaktifkan fitur <em>Right-Click &rarr; Translate to Bahasa Indonesia</em> pada browser untuk menerjemahkan secara instan!
            </p>
          </div>

          <a
            href="https://kurovia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="clay-button py-2.5 px-4 text-xs font-black bg-blue-600 text-white hover:bg-blue-500 shadow-sm flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Buka Kurovia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-8 pt-6 border-t border-claySlate-200 dark:border-white/10 text-center">
          <a
            href="https://kurovia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 clay-button py-3.5 px-8 text-xs sm:text-sm font-black bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <span>Luncurkan Website Resmi Kurovia</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
