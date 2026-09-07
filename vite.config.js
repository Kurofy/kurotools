import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function webGrabberDevPlugin() {
  return {
    name: 'web-grabber-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url ? req.url.split('?')[0] : '';
        if (path === '/api/web-grabber' || path === '/api/tools/web-grabber') {
          try {
            const handlerModule = await import('./api/web-grabber.js');
            const handler = handlerModule.default;

            let rawBody = '';
            req.on('data', chunk => {
              rawBody += chunk;
            });
            req.on('end', async () => {
              try {
                req.body = rawBody ? JSON.parse(rawBody) : {};
              } catch {
                req.body = rawBody;
              }

              res.status = function(code) {
                res.statusCode = code;
                return res;
              };
              res.json = function(data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };

              await handler(req, res);
            });
            return;
          } catch (err) {
            console.error('[WebGrabber Dev Error]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), webGrabberDevPlugin()],
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api/fastsaver': {
          target: 'https://api.fastsaver.io/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/fastsaver/, ''),
          headers: {
            'Origin': 'https://api.fastsaver.io'
          },
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = process.env.FASTSAVER_API_KEY || process.env.VITE_FASTSAVER_API_KEY;
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`);
                proxyReq.setHeader('x-api-key', key);
              }
            });
          }
        },
        '/api/shortio': {
          target: 'https://api.short.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/shortio/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = process.env.SHORTIO_API_KEY || process.env.VITE_SHORTIO_API_KEY;
              if (key) {
                proxyReq.setHeader('authorization', key);
              }
            });
          }
        }
      }
    }
  };
});
