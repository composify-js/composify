/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (pathname !== '/') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  switch (method) {
    case 'GET': {
      const slug = parsedUrl.query.slug || '';
      const database = fs.existsSync('database.json') ? JSON.parse(fs.readFileSync('database.json', 'utf-8')) : {};

      res.end(database[slug] || '');
      break;
    }
    case 'POST': {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { slug, content } = JSON.parse(body);
        const database = fs.existsSync('database.json') ? JSON.parse(fs.readFileSync('database.json', 'utf-8')) : {};

        const updatedData = {
          ...database,
          [decodeURIComponent(slug)]: content,
        };

        fs.writeFileSync('database.json', JSON.stringify(updatedData));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('');
      });
      break;
    }
    default:
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
  }
});

server.listen(PORT);
