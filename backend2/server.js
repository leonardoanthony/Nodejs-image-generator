// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.')); // serve o template.html

app.post('/gerar-imagem', async (req, res) => {
  const { labels, data, titulo } = req.body;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const url = `file://${path.join(__dirname, 'template.html')}?labels=${encodeURIComponent(JSON.stringify(labels))}&data=${encodeURIComponent(JSON.stringify(data))}&titulo=${encodeURIComponent(titulo)}`;

  await page.goto(url, { waitUntil: 'networkidle0' });

  const image = await page.screenshot({ type: 'png' });

  await browser.close();

  res.set('Content-Type', 'image/png');
  res.send(image);
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
