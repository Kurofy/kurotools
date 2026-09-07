import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  FileCode, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Eye, 
  RefreshCw, 
  Zap, 
  Clock, 
  ArrowRight,
  ClipboardCopy,
  WrapText,
  AlertCircle
} from 'lucide-react';
import { grabWebSource } from '../../services/webGrabberApi.js';
import ScrollReveal from '../common/ScrollReveal.jsx';

export default function WebGrabber({ showToast }) {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [grabbedData, setGrabbedData] = useState(null);

  // Tools state
  const [isCopied, setIsCopied] = useState(false);
  const [viewMode, setViewMode] = useState('code'); // 'code' | 'preview'
  const [wordWrap, setWordWrap] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  const sampleUrls = [
    { label: 'Example.com', url: 'https://example.com' },
    { label: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Hacker News', url: 'https://news.ycombinator.com' }
  ];

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
        showToast?.('URL berhasil ditempel dari clipboard!', 'success');
      }
    } catch {
      showToast?.('Gagal membaca clipboard. Izinkan akses clipboard di browser.', 'error');
    }
  };

  const handleFetchSource = async (e) => {
    if (e) e.preventDefault();
    const target = urlInput.trim();
    if (!target) {
      setError('Harap masukkan URL website yang valid terlebih dahulu.');
      showToast?.('Masukkan alamat URL website target.', 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await grabWebSource(target);
      setGrabbedData(result);
      setViewMode('code');
      showToast?.(`Berhasil mengambil ${result.meta?.sizeFormatted || 'source'} HTML!`, 'success');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengambil source website.');
      showToast?.(err.message || 'Gagal mengambil source code.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!grabbedData?.html) return;
    navigator.clipboard.writeText(grabbedData.html);
    setIsCopied(true);
    showToast?.('Seluruh kode HTML berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadHtml = () => {
    if (!grabbedData?.html) return;
    try {
      let filename = 'source.html';
      if (grabbedData.url) {
        try {
          const parsed = new URL(grabbedData.url);
          filename = `${parsed.hostname.replace(/[^a-z0-9]/gi, '_')}_source.html`;
        } catch {
          filename = 'web_source.html';
        }
      }

      const blob = new Blob([grabbedData.html], { type: 'text/html;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      showToast?.(`File ${filename} berhasil diunduh!`, 'success');
    } catch {
      showToast?.('Gagal mengunduh file HTML.', 'error');
    }
  };

  const handleClearAll = () => {
    setUrlInput('');
    setGrabbedData(null);
    setError(null);
    setSearchFilter('');
  };

  // Filtered HTML for code search
  const filteredHtml = useMemo(() => {
    if (!grabbedData?.html) return '';
    return grabbedData.html;
  }, [grabbedData]);

  // Match count for search highlight
  const matchCount = useMemo(() => {
    if (!searchFilter.trim() || !grabbedData?.html) return 0;
    try {
      const regex = new RegExp(searchFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = grabbedData.html.match(regex);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [searchFilter, grabbedData]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* 1. Header Hero Card */}
      <div className="clay-card p-6 sm:p-10 bg-gradient-to-br from-cyan-50/70 via-blue-50/50 to-indigo-50/70 dark:from-cyan-950/40 dark:via-slate-900/50 dark:to-indigo-950/40 border border-cyan-200/60 dark:border-white/10 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 text-xs font-black shadow-sm">
              <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Native Relay • Tanpa API Pihak Ketiga</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-claySlate-900 dark:text-white tracking-tight flex flex-wrap items-center gap-3">
              <span>Web Grabber</span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500 text-white font-extrabold shadow-sm">
                🌐 HTML Source Fetcher
              </span>
            </h1>

            <p className="text-sm sm:text-base text-claySlate-700 dark:text-slate-200 font-semibold leading-relaxed">
              <strong>Ekstrak, telusuri, dan unduh source code HTML mentah dari halaman web manapun secara instan.</strong>
            </p>

            <p className="text-xs sm:text-sm text-claySlate-500 dark:text-slate-400 font-medium leading-relaxed">
              Dibekali header browser modern (User-Agent asli) untuk meminimalkan proteksi bot Cloudflare & WAF. Mengatasi batasan CORS browser secara mandiri untuk kebutuhan analisa DOM, debugging, dan web scraping.
            </p>

            {/* Quick Sample Preset Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-claySlate-500 dark:text-slate-400 mr-1">
                Contoh Cepat:
              </span>
              {sampleUrls.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setUrlInput(sample.url)}
                  className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-white/10 text-xs font-bold transition-all shadow-sm"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3.5 w-full lg:w-72">
            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-cyan-100 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-700 dark:text-cyan-400 font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">100% Raw</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">Original HTML DOM</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-cyan-100 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-700 dark:text-blue-400 font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">Anti-Bot Header</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">Chrome User-Agent</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 dark:bg-[#131B2E] border border-cyan-100 dark:border-white/10 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-black">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900 dark:text-white">1-Click Export</div>
                <div className="text-[11px] font-bold text-claySlate-500 dark:text-slate-400">Copy & Download .html</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Input Box & Action Controls */}
      <div className="clay-card p-6 sm:p-8 border border-claySlate-200 dark:border-white/10 space-y-4">
        <form onSubmit={handleFetchSource} className="space-y-4">
          <label className="block text-xs font-black uppercase tracking-wider text-claySlate-700 dark:text-slate-300">
            Masukkan Alamat URL Target:
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-claySlate-400">
                <Globe className="w-5 h-5 text-cyan-600" />
              </div>

              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="https://contoh-website.com/halaman"
                className="w-full clay-input-field pl-11 pr-24 py-3.5 text-xs sm:text-sm text-claySlate-800 dark:text-white font-mono"
                disabled={isLoading}
              />

              {/* Action Buttons inside Input */}
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
                {urlInput ? (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="p-1.5 rounded-lg text-claySlate-400 hover:text-claySlate-600 dark:hover:text-white transition-colors"
                    title="Kosongkan URL"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="px-2.5 py-1 rounded-lg bg-claySlate-100 dark:bg-slate-800 text-claySlate-600 dark:text-slate-300 hover:bg-claySlate-200 text-xs font-bold flex items-center gap-1 transition-all"
                    title="Tempel dari Clipboard"
                  >
                    <ClipboardCopy className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Fetch Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="clay-button py-3.5 px-7 text-xs sm:text-sm font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-clay-card flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mengambil HTML...</span>
                </>
              ) : (
                <>
                  <Code2 className="w-4 h-4" />
                  <span>Grab Source / Fetch HTML</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 flex items-start gap-3 animate-fade-in text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-black">Gagal Mengambil Website</span>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Output Code Display & Tools Area */}
      {grabbedData && (
        <div className="clay-card p-6 sm:p-8 border border-claySlate-200 dark:border-white/10 space-y-5 animate-fade-in">
          
          {/* Top Metadata & Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-claySlate-200 dark:border-white/10">
            
            {/* Title & Status Badges */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  grabbedData.status >= 200 && grabbedData.status < 300 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {grabbedData.status} {grabbedData.statusText}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 text-[10px] font-black">
                  📦 {grabbedData.meta?.sizeFormatted}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-black">
                  📜 {grabbedData.meta?.lineCount?.toLocaleString()} Baris
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-claySlate-100 text-claySlate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-500" />
                  <span>{grabbedData.meta?.durationMs} ms</span>
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-claySlate-900 dark:text-white truncate" title={grabbedData.meta?.title}>
                {grabbedData.meta?.title || grabbedData.url}
              </h2>

              <a
                href={grabbedData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline truncate max-w-md font-mono font-semibold"
              >
                <span>{grabbedData.url}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>

            {/* Action Buttons: Copy, Download, Tab switch */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* View Mode Toggle: Source vs Preview */}
              <div className="flex items-center bg-claySlate-100 dark:bg-slate-800 p-1 rounded-xl border border-claySlate-200 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'code'
                      ? 'bg-white dark:bg-[#1E293B] text-cyan-700 dark:text-cyan-300 shadow-sm font-extrabold'
                      : 'text-claySlate-600 dark:text-slate-400 hover:text-claySlate-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Kode HTML</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'preview'
                      ? 'bg-white dark:bg-[#1E293B] text-cyan-700 dark:text-cyan-300 shadow-sm font-extrabold'
                      : 'text-claySlate-600 dark:text-slate-400 hover:text-claySlate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Web</span>
                </button>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyCode}
                className="clay-button py-2.5 px-4 text-xs font-black bg-white dark:bg-[#131B2E] text-claySlate-800 dark:text-white border border-claySlate-200 dark:border-white/10 flex items-center gap-1.5 shadow-sm"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>

              {/* Download .html Button */}
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="clay-button py-2.5 px-4 text-xs font-black bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .html</span>
              </button>

              {/* Reset/Clear */}
              <button
                type="button"
                onClick={handleClearAll}
                className="p-2.5 rounded-xl text-claySlate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Bersihkan Hasil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search in Code & View Options Bar (only for Code view) */}
          {viewMode === 'code' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-claySlate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-claySlate-200 dark:border-white/5">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Cari tag, class, teks di HTML..."
                  className="w-full text-xs py-1.5 pl-8 pr-3 rounded-lg bg-white dark:bg-slate-800 border border-claySlate-200 dark:border-white/10 text-claySlate-800 dark:text-white font-mono"
                />
                <Search className="w-3.5 h-3.5 text-claySlate-400 absolute left-2.5 top-2.5" />
                {searchFilter && (
                  <span className="absolute right-2.5 top-2 text-[10px] font-bold text-cyan-600">
                    {matchCount} kecocokan
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Word Wrap Toggle */}
                <button
                  type="button"
                  onClick={() => setWordWrap(!wordWrap)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    wordWrap
                      ? 'bg-cyan-100/70 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800'
                      : 'bg-white dark:bg-slate-800 text-claySlate-600 dark:text-slate-300 border-claySlate-200 dark:border-white/10'
                  }`}
                  title="Toggle Word Wrap (Bungkus Baris Panjang)"
                >
                  <WrapText className="w-3.5 h-3.5" />
                  <span>Word Wrap: {wordWrap ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Code Viewer Mode */}
          {viewMode === 'code' && (
            <div className="relative rounded-2xl bg-[#0d1117] text-slate-200 p-4 font-mono text-xs overflow-x-auto border border-claySlate-800 shadow-inner max-h-[600px] overflow-y-auto selection:bg-cyan-500 selection:text-black">
              <pre className={`${wordWrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'} leading-relaxed`}>
                <code>{filteredHtml}</code>
              </pre>
            </div>
          )}

          {/* Sandboxed Live Preview Mode */}
          {viewMode === 'preview' && (
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                ⚠️ <strong>Sandboxed Preview</strong>: Pratinjau dijalankan di dalam iframe terisolasi tanpa eksekusi skrip berbahaya. Beberapa gambar atau aset eksternal yang dibatasi CORS mungkin tidak termuat penuh.
              </div>
              <div className="w-full h-[550px] rounded-2xl bg-white border-2 border-claySlate-200 dark:border-white/10 overflow-hidden shadow-inner">
                <iframe
                  title="Live Web Preview"
                  srcDoc={grabbedData.html}
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

        </div>
      )}

      {/* 4. Feature Highlights / Mengapa Menggunakan Web Grabber? */}
      <div className="clay-card p-6 sm:p-8 border border-claySlate-200 dark:border-white/10">
        <h3 className="text-lg font-black text-claySlate-900 dark:text-white mb-6 text-center">
          Keunggulan Web Grabber KuroTools
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Tanpa API Pihak Ketiga</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Tidak bergantung pada layanan API scraper eksternal berbayar. Request ditangani langsung secara independen.
            </p>
          </div>

          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Anti-Bot User-Agent</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Menggunakan header browser Google Chrome autentik sehingga request tidak langsung diblokir oleh web server modern.
            </p>
          </div>

          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-claySlate-100 dark:border-white/5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800 dark:text-white">Inspeksi & Ekspor Lengkap</h4>
            <p className="text-xs text-claySlate-500 dark:text-slate-400 leading-relaxed font-medium">
              Dapat dicari, disalin langsung dengan 1-klik, dipratinjau dalam iframe terisolasi, atau diunduh sebagai file <code>.html</code>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
