import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lms-tg-app/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Creates a custom SSL certificate valid for the local machine.
    // Using this plugin requires admin rights on the first dev-mode launch.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    process.env.HTTPS && mkcert(),
  ],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
    allowedHosts: ['knosorev-test.loca.lt'],
    cors: {
      origin: true, // Разрешить все origins
      credentials: true, // Разрешить cookies и авторизационные заголовки
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-TG-INIT-DATA', 'X-Requested-With'],
    },
    proxy: {
      // Прокси для API запросов во время разработки
      '/api': {
        target: 'https://n8n.tg.knosorev.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '/webhook/api');
          console.log('🔄 Rewriting path:', path, '->', newPath);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🔄 Proxying request to:', proxyReq.path);
            console.log('📤 Method:', proxyReq.method);
            console.log('📤 Headers:', proxyReq.getHeaders());
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('📥 Response status:', proxyRes.statusCode);
            console.log('📥 Response headers:', proxyRes.headers);
          });
          
          proxy.on('error', (err, req, res) => {
            console.error('❌ Proxy error:', err);
          });
        },
      },
    },
  },
});

