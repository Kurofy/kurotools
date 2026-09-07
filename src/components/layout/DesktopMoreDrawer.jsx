import React from 'react';
import { 
  X, 
  User, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  Glasses, 
  Gamepad2, 
  Brain,
  Home, 
  ExternalLink, 
  Sun, 
  Moon, 
  Globe, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function DesktopMoreDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab 
}) {
  if (!isOpen) return null;

  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#131B2E] h-full shadow-2xl z-10 p-6 overflow-y-auto flex flex-col justify-between border-l border-claySlate-200 dark:border-white/10 transition-transform">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-claySlate-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-clayPurple-light/60 dark:bg-purple-950/60 text-clayPurple flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-claySlate-900 dark:text-white">
                  {t('drawerTitle')}
                </h3>
                <p className="text-[11px] font-semibold text-claySlate-400 dark:text-slate-400">
                  {t('drawerSubtitle')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-claySlate-100 dark:hover:bg-slate-800 text-claySlate-400 hover:text-claySlate-800 dark:hover:text-white transition-colors"
              title={t('drawerClose')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Featured Ecosystem & Web Transfer Hubs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
                🚀 Web Transfer & Hub Komunitas
              </span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Ecosystem
              </span>
            </div>

            {/* Kurovia Trivia Card */}
            <div 
              onClick={() => handleNavigate('kurovia')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border group ${
                activeTab === 'kurovia'
                  ? 'bg-amber-100/50 dark:bg-amber-950/40 border-amber-400 shadow-sm'
                  : 'bg-gradient-to-br from-amber-50/70 to-yellow-50/40 dark:from-[#171D28] dark:to-[#131B2E] border-amber-200/80 dark:border-white/5 hover:border-amber-400/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black group-hover:scale-105 transition-transform flex-shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-claySlate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Kurovia Trivia Hub
                      </h4>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                        ⚡ Trivia
                      </span>
                    </div>
                    <p className="text-[11px] text-claySlate-500 dark:text-slate-400 truncate mt-0.5">
                      Game kuis trivia bahasa Inggris OpenTDB & leaderboard
                    </p>
                  </div>
                </div>

                <a
                  href="https://kurovia.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 hover:scale-110 transition-transform shadow-sm flex-shrink-0"
                  title="Buka Website Resmi Kurovia (kurovia.vercel.app)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* SecretDexx Card */}
            <div 
              onClick={() => handleNavigate('secretdexx')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border group ${
                activeTab === 'secretdexx'
                  ? 'bg-emerald-100/50 dark:bg-emerald-950/40 border-emerald-400 shadow-sm'
                  : 'bg-gradient-to-br from-emerald-50/70 to-teal-50/40 dark:from-[#171D28] dark:to-[#131B2E] border-emerald-200/80 dark:border-white/5 hover:border-emerald-400/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black group-hover:scale-105 transition-transform flex-shrink-0">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-claySlate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        SecretDexx Hub
                      </h4>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                        🎮 Roblox
                      </span>
                    </div>
                    <p className="text-[11px] text-claySlate-500 dark:text-slate-400 truncate mt-0.5">
                      Direktori 500+ script Roblox terverifikasi & keyless
                    </p>
                  </div>
                </div>

                <a
                  href="https://secretdexx.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform shadow-sm flex-shrink-0"
                  title="Buka Website Resmi SecretDexx (secretdexx.netlify.app)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: Specialized Utility Modules */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
              ✨ Modul Utilitas Khusus
            </span>

            <div className="grid grid-cols-1 gap-2">
              {/* Meta Glasses */}
              <div 
                onClick={() => handleNavigate('meta-glasses')}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center justify-between group ${
                  activeTab === 'meta-glasses'
                    ? 'bg-cyan-100/40 dark:bg-cyan-950/40 border-cyan-400 shadow-sm'
                    : 'bg-claySlate-50/80 dark:bg-[#0F1626] border-claySlate-200 dark:border-white/5 hover:border-cyan-400/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black flex-shrink-0">
                    <Glasses className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-claySlate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Meta Glasses EIF
                    </h4>
                    <p className="text-[10px] text-claySlate-500 dark:text-slate-400">
                      Suntik EXIF Ray-Ban Meta untuk 3D Story
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
                  👓 3D Story
                </span>
              </div>

              {/* Author LinkTree */}
              <div 
                onClick={() => handleNavigate('author')}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center justify-between group ${
                  activeTab === 'author'
                    ? 'bg-sky-100/40 dark:bg-sky-950/40 border-sky-400 shadow-sm'
                    : 'bg-claySlate-50/80 dark:bg-[#0F1626] border-claySlate-200 dark:border-white/5 hover:border-sky-400/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-claySlate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      Author LinkTree & Profil
                    </h4>
                    <p className="text-[10px] text-claySlate-500 dark:text-slate-400">
                      Profil kreator, portofolio & jejaring sosial
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                  Portfolio
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Quick Navigation to Primary Tools */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
              🛠️ Modul Utilitas Utama
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleNavigate('downloader')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  activeTab === 'downloader'
                    ? 'bg-purple-100/60 dark:bg-purple-950/60 border-purple-400 font-bold'
                    : 'bg-white dark:bg-[#0F1626] border-claySlate-100 dark:border-white/5 hover:bg-claySlate-50'
                }`}
              >
                <DownloadCloud className="w-4 h-4 text-purple-500" />
                <span className="text-[11px] font-bold text-claySlate-800 dark:text-slate-200">Downloader</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('shortener')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  activeTab === 'shortener'
                    ? 'bg-emerald-100/60 dark:bg-emerald-950/60 border-emerald-400 font-bold'
                    : 'bg-white dark:bg-[#0F1626] border-claySlate-100 dark:border-white/5 hover:bg-claySlate-50'
                }`}
              >
                <LinkIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-claySlate-800 dark:text-slate-200">Shortener</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('barcode')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  activeTab === 'barcode'
                    ? 'bg-orange-100/60 dark:bg-orange-950/60 border-orange-400 font-bold'
                    : 'bg-white dark:bg-[#0F1626] border-claySlate-100 dark:border-white/5 hover:bg-claySlate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-orange-500" />
                <span className="text-[11px] font-bold text-claySlate-800 dark:text-slate-200">Barcode</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Settings: Theme & Language */}
        <div className="pt-6 border-t border-claySlate-100 dark:border-white/10 space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
            {t('drawerSystem')}
          </span>

          <div className="grid grid-cols-2 gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-claySlate-50 dark:bg-[#0F1626] border border-claySlate-200 dark:border-white/5 flex items-center justify-center gap-2 text-xs font-black text-claySlate-700 dark:text-slate-200 hover:border-clayPurple transition-all"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{t('themeLight')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span>{t('themeDark')}</span>
                </>
              )}
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLang}
              className="p-3 rounded-xl bg-claySlate-50 dark:bg-[#0F1626] border border-claySlate-200 dark:border-white/5 flex items-center justify-center gap-2 text-xs font-black text-claySlate-700 dark:text-slate-200 hover:border-clayPurple transition-all"
            >
              <Globe className="w-4 h-4 text-clayPurple" />
              <span>{lang === 'id' ? 'English (EN)' : 'Indonesia (ID)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
