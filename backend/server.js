// server.js
const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();
app.use(express.json());

const width = 600; // px
const height = 400;

const chartCanvas = new ChartJSNodeCanvas({ width, height });

app.post('/gerar-grafico', async (req, res) => {
  const { labels, valores, titulo } = req.body;

  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: titulo,
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        title: {
          display: true,
          text: titulo
        }
      }
    }
  };

  const imageBuffer = await chartCanvas.renderToBuffer(config);
  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
