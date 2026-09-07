export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Silakan gunakan method POST.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const rawUrl = body?.url?.trim();
    if (!rawUrl) {
      return res.status(400).json({
        success: false,
        error: 'Parameter "url" wajib diisi.'
      });
    }

    // Normalisasi URL: Tambahkan https:// jika tidak ada protokol
    let formattedUrl = rawUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validasi URL
    let parsedUrl;
    try {
      parsedUrl = new URL(formattedUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Protokol tidak didukung');
      }
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Format URL tidak valid. Contoh valid: https://example.com'
      });
    }

    // Setup Timeout Abort Controller (15 detik)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const startTime = Date.now();

    // Headers menyerupai browser modern
    const browserHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    };

    const response = await fetch(parsedUrl.toString(), {
      method: 'GET',
      headers: browserHeaders,
      redirect: 'follow',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;

    const html = await response.text();
    const contentType = response.headers.get('content-type') || 'text/html';

    // Ekstraksi Title halaman secara cerdas
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : parsedUrl.hostname;

    // Hitung ukuran & baris
    const sizeBytes = Buffer.byteLength(html, 'utf8');
    const lineCount = html.split(/\r\n|\r|\n/).length;

    const formatBytes = (bytes) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return res.status(200).json({
      success: true,
      url: parsedUrl.toString(),
      status: response.status,
      statusText: response.statusText || 'OK',
      html,
      meta: {
        title: pageTitle,
        sizeBytes,
        sizeFormatted: formatBytes(sizeBytes),
        lineCount,
        contentType,
        durationMs
      }
    });

  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(408).json({
        success: false,
        error: 'Permintaan timeout (melebihi batas 15 detik). Website target lambat atau memblokir koneksi.'
      });
    }

    return res.status(502).json({
      success: false,
      error: `Gagal mengambil source HTML dari website target: ${err.message || 'Network / DNS Error'}`
    });
  }
}
