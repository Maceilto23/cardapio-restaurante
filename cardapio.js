// cardapio.js
window.cardapioData = {
  "horarioFuncionamento": { "abertura": "11:30", "fechamento": "14:00" },
  "valoresMarmita": { "Pequena": 15, "Grande": 20 },
  "cardapio": {
    "segunda-feira": { "carnes": ["Frango", "Carne de Porco"], "acompanhamentos": ["Arroz", "Feijão"] },
    "terça-feira": { "carnes": ["Frango", "Carne Bovina"], "acompanhamentos": ["Arroz", "Salada"] },
    "quarta-feira": { "carnes": ["Frango Grelhado", "Peixe"], "acompanhamentos": ["Arroz", "Purê"] },
    "quinta-feira": { "carnes": ["Frango", "Carne Bovina"], "acompanhamentos": ["Arroz", "Salada"] },
    "sexta-feira": { "carnes": ["Peixe", "Carne de Porco"], "acompanhamentos": ["Arroz", "Feijão"] },
    "sábado": { "carnes": ["Frango", "Peixe"], "acompanhamentos": ["Arroz", "Salada"] },
    "domingo": { "carnes": ["Carne Assada", "Frango"], "acompanhamentos": ["Arroz", "Farofa"] }
  },
  "locaisEntrega": [
    { "nome": "Bairro Central", "taxa": 5.00 },
    { "nome": "Boa Vista 1", "taxa": 2.00 },
    { "nome": "Boa Vista 2", "taxa": 4.00 },
    { "nome": "Mont Serrat", "taxa": 2.00 },
    { "nome": "Lunabel", "taxa": 2.00 },
    { "nome": "Lago Azul", "taxa": 4.00 },
    { "nome": "Alvorada", "taxa": 2.00 },
    { "nome": "América do Sul", "taxa": 4.00 }
  ],
  "formasPagamento": ["Dinheiro", "PIX", "Cartão", "Boleto"]
};
