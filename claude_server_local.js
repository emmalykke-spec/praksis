const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/michellemachado/Downloads/Visma Downloads/praksis/ecoPraksis-prototype/ecoPraksis-prototype';
const MIME = { html:'text/html', css:'text/css', js:'application/javascript', json:'application/json', png:'image/png', svg:'image/svg+xml' };
http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/praksis-task-overview.html';
  const fp = path.join(ROOT, url);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = fp.split('.').pop();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'text/plain'});
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => {});
