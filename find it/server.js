// FindIt - Production & Local High-Performance Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

// Pre-load all critical JS and HTML assets in memory so Vercel Serverless Function
// ALWAYS bundles them into the deployment package and serves them with 0ms latency.
let MOCK_DATA_JS = '';
let APP_JS = '';
let LOGO_PNG = null;
let LOGO_JPG = null;
try {
  MOCK_DATA_JS = fs.readFileSync(path.join(BASE_DIR, 'js', 'mockData.js'), 'utf8');
} catch (e) {
  console.warn('Could not pre-read mockData.js', e.message);
}
try {
  APP_JS = fs.readFileSync(path.join(BASE_DIR, 'js', 'app.js'), 'utf8');
} catch (e) {
  console.warn('Could not pre-read app.js', e.message);
}
try {
  LOGO_PNG = fs.readFileSync(path.join(BASE_DIR, 'assets', 'images', 'findit-logo.png'));
} catch (e) {
  console.warn('Could not pre-read findit-logo.png', e.message);
}
try {
  LOGO_JPG = fs.readFileSync(path.join(BASE_DIR, 'assets', 'images', 'findit-logo.jpg'));
} catch (e) {
  console.warn('Could not pre-read findit-logo.jpg', e.message);
}

const HTML_PAGES = {
  '/index.html': 'index.html',
  '/login.html': 'login.html',
  '/LoginPage.html': 'LoginPage.html',
  '/HOME PAGE AFTERR LOGIN.html': 'HOME PAGE AFTERR LOGIN.html',
  '/LANDING PAGE.html': 'LANDING PAGE.html',
  '/dashboard.html': 'dashboard.html',
  '/active_cases.html': 'active_cases.html',
  '/karma_rewards.html': 'karma_rewards.html',
  '/trusted_hubs_page.html': 'trusted_hubs_page.html',
  '/echo_radar.html': 'echo_radar.html',
  '/NeuralMatchEngine.html': 'NeuralMatchEngine.html',
  '/gemini-code-1792843735076.html': 'gemini-code-1792843735076.html',
  '/report.html': 'report.html',
  '/profile.html': 'profile.html'
};

const HTML_CACHE = {};
for (const [route, fileName] of Object.entries(HTML_PAGES)) {
  try {
    HTML_CACHE[route] = fs.readFileSync(path.join(BASE_DIR, fileName), 'utf8');
  } catch (e) {
    console.warn(`Could not pre-read ${fileName}`, e.message);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Direct in-memory serving for vital JS files
  if (pathname === '/js/mockData.js' || pathname.toLowerCase() === '/js/mockdata.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
    res.end(MOCK_DATA_JS);
    return;
  }
  if (pathname === '/js/app.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
    res.end(APP_JS);
    return;
  }

  // 1b. Direct in-memory serving for FindIt Brand Logo & Favicon
  if (
    pathname === '/assets/images/findit-logo.png' ||
    pathname.endsWith('/findit-logo.png') ||
    pathname === '/findit-logo.png' ||
    pathname === '/favicon.ico'
  ) {
    if (LOGO_PNG) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': LOGO_PNG.length,
        'Cache-Control': 'public, max-age=31536000, immutable'
      });
      res.end(LOGO_PNG);
      return;
    }
  }
  if (
    pathname === '/assets/images/findit-logo.jpg' ||
    pathname.endsWith('/findit-logo.jpg') ||
    pathname === '/findit-logo.jpg'
  ) {
    if (LOGO_JPG) {
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': LOGO_JPG.length,
        'Cache-Control': 'public, max-age=31536000, immutable'
      });
      res.end(LOGO_JPG);
      return;
    }
  }

  // 2. Direct streaming for Hero MP4 Intro Video
  if (pathname === '/finditintro.mp4' || pathname.endsWith('finditintro.mp4')) {
    const videoFile = path.join(BASE_DIR, 'finditintro.mp4');
    if (fs.existsSync(videoFile)) {
      const stat = fs.statSync(videoFile);
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
        });
        fs.createReadStream(videoFile, { start, end }).pipe(res);
        return;
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=86400'
        });
        fs.createReadStream(videoFile).pipe(res);
        return;
      }
    }
  }

  // 3. Friendly route aliases
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  } else if (pathname === '/login' || pathname === '/signin' || pathname === '/LoginPage' || pathname === '/loginpage') {
    pathname = '/login.html';
  } else if (pathname === '/home-page-after-login' || pathname === '/homepageafterlogin') {
    pathname = '/HOME PAGE AFTERR LOGIN.html';
  } else if (pathname === '/dashboard' || pathname === '/home') {
    pathname = '/dashboard.html';
  } else if (pathname === '/active_cases' || pathname === '/active-cases' || pathname === '/cases' || pathname === '/catalog') {
    pathname = '/active_cases.html';
  } else if (pathname === '/hubs' || pathname === '/secure-hubs' || pathname === '/trusted-hubs' || pathname === '/trusted_hubs_page') {
    pathname = '/trusted_hubs_page.html';
  } else if (pathname === '/rewards' || pathname === '/karma' || pathname === '/coupons' || pathname === '/karma-rewards' || pathname === '/karma_rewards') {
    pathname = '/karma_rewards.html';
  } else if (pathname === '/report' || pathname === '/report-item' || pathname === '/report.html') {
    pathname = '/gemini-code-1792843735076.html';
  } else if (pathname === '/neural' || pathname === '/match' || pathname === '/neural-match' || pathname === '/neural-engine' || pathname === '/neuralmatchengine' || pathname === '/neural_match_engine') {
    pathname = '/NeuralMatchEngine.html';
  } else if (pathname === '/radar' || pathname === '/echo-radar' || pathname === '/echo_radar' || pathname === '/echoradar' || pathname === '/spatial') {
    pathname = '/echo_radar.html';
  } else if (pathname === '/profile' || pathname === '/my-profile') {
    pathname = '/profile.html';
  } else if (pathname === '/find it' || pathname === '/find it/') {
    pathname = '/find it/index.html';
  }

  // 4. Direct in-memory serving for HTML cache
  if (HTML_CACHE[pathname]) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(HTML_CACHE[pathname]);
    return;
  }

  let filePath = path.join(BASE_DIR, pathname);

  // Normalize path to prevent directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Automatic .html extension matching
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(BASE_DIR, pathname.toLowerCase() + '.html'))) {
      filePath = path.join(BASE_DIR, pathname.toLowerCase() + '.html');
    }
  }

  // Check if directory
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {
    // File not found directly, check alternative
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title><style>body{font-family:sans-serif;padding:40px;text-align:center;}</style></head>
        <body>
          <h2>FindIt - 404 Not Found</h2>
          <p>The requested URL <code>${pathname}</code> was not found.</p>
          <p><a href="/">Return to Home</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle HTTP Range Requests (Essential for MP4 video streaming & audio scrub)
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      file.pipe(res);
      return;
    }

    // Standard static serving
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(` FindIt Campus Platform is running live!`);
  console.log(` Local URL:     http://localhost:${PORT}`);
  console.log(` Network URL:   http://127.0.0.1:${PORT}`);
  console.log(`====================================================`);
});
