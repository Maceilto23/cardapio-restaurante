import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = 'c3a46c2fe5f946fe8b707ff285a5cecc57f58240dca3d74c1c89e22a79c0dc29';
const CARDAPIO_PATH = './cardapio.json';

app.use(cors());
app.use(bodyParser.json());

// Rota GET para consultar os dados
app.get('/cardapio', (req, res) => {
  try {
    const dados = fs.readFileSync(CARDAPIO_PATH, 'utf-8');
    res.json(JSON.parse(dados));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao ler o arquivo' });
  }
});

// Rota PUT para atualizar os dados (protegida com token)
app.put('/cardapio', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${TOKEN}`) {
    return res.status(403).json({ erro: 'Token inválido ou ausente.' });
  }

  try {
    fs.writeFileSync(CARDAPIO_PATH, JSON.stringify(req.body, null, 2));
    res.json({ sucesso: true, mensagem: 'Cardápio atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar o arquivo' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
