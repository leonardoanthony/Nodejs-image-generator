const axios = require('axios');
const fs = require('fs');

async function gerarImagem() {
  const response = await axios.post('http://localhost:3000/gerar-grafico', {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    valores: [64, 131, 52, 72, 155, 105, 53],
    titulo: 'Gastos nos últimos 7 dias'
  }, { responseType: 'arraybuffer' });

  fs.writeFileSync('grafico.png', response.data); // ou envie direto via bot
}
gerarImagem();
