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

  const htmlPath = `file://${path.join(__dirname, 'grafico.html')}`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  await new Promise(resolve => setTimeout(resolve, 4000)); // 1 segundo

  const image = await page.screenshot({ fullPage: true });

  // fs.writeFileSync('relatorio.png', buffer);
  await browser.close();

  res.set('Content-Type', 'image/png');
  res.send(image);

});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
