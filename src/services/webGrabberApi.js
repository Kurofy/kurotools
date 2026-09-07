/**
 * Service API client untuk modul Web Grabber / HTML Source Fetcher
 * Berkomunikasi dengan endpoint serverless /api/web-grabber
 */
export async function grabWebSource(targetUrl) {
  if (!targetUrl || !targetUrl.trim()) {
    throw new Error('Silakan masukkan URL website yang ingin diambil.');
  }

  const response = await fetch('/api/web-grabber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: targetUrl.trim() })
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('Respon server tidak valid atau gagal diparsing.');
  }

  if (!response.ok || !data.success) {
    throw new Error(data.error || `Gagal mengambil source HTML (Kode ${response.status})`);
  }

  return data;
}
