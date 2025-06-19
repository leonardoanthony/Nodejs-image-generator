const axios = require('axios');
const fs = require('fs');

async function gerarImagem() {
  const res = await axios.post('http://localhost:3000/gerar-imagem', {
    labels: ["Sex", "Sáb", "Dom", "Seg", "Ter", "Qua", "Qui"],
    data: [155, 105, 53, 64, 131, 52, 72],
    titulo: "Gastos dos últimos 7 dias"
  }, { responseType: 'arraybuffer' });

  fs.writeFileSync('grafico.png', res.data);
}
gerarImagem();
