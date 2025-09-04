const cardapios = {
  "segunda-feira": { carnes:["Costela com mandioca","Frango ao molho","Peito de frango grelhado"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Purê","Farofa","Verduras cozidas","Salada"] },
  "terça-feira": { carnes:["Churrasco","Carne de porco frita","Frango ao molho"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Batata frita"] },
  "quarta-feira": { carnes:["Churrasco","Strogonoff de frango","Frango ao molho"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Batata palha","Batata temperada"] },
  "quinta-feira": { carnes:["Churrasco","Frango ao molho","Fígado"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Batata frita"] },
  "sexta-feira": { carnes:["Churrasco","Frango ao molho","Coxa e sobrecoxa assada"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Batata frita"] },
  "sábado": { carnes:["Churrasco","Feijoada","Frango ao molho"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Batata frita"] },
  "domingo": { carnes:["Churrasco","Frango ao molho","Lasanha"], acompanhamentos:["Arroz","Feijão","Macarrão alho e óleo","Farofa","Verduras cozidas","Salada","Maionese"] }
};

const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
const hoje = dias[new Date().getDay()];
const cardapioHoje = cardapios[hoje];
const container = document.getElementById("cardapio");
const itensPedido = document.getElementById("itensPedido");
let pedido = [];

// Renderizar cardápio
function renderCardapio() {
  container.innerHTML = `
    <h2>${hoje.toUpperCase()}</h2>
    <h3>🍖 Carnes</h3>
    <ul id="carnes">${cardapioHoje.carnes.map(c => `<li>${c}</li>`).join("")}</ul>
    <h3>🥗 Acompanhamentos</h3>
    <ul id="acompanhamentos">${cardapioHoje.acompanhamentos.map(a => `<li>${a}</li>`).join("")}</ul>
    <div class="preco">
      <p><b>Marmita Pequena:</b> R$15,00 (1 carne)</p>
      <p><b>Marmita Grande:</b> R$20,00 (2 carnes)</p>
    </div>
  `;
  habilitarClick();
}

// Clique nos itens
function habilitarClick() {
  document.querySelectorAll("#carnes li, #acompanhamentos li").forEach(li => {
    li.addEventListener("click", () => {
      const item = li.textContent;
      if(pedido.includes(item)){
        pedido = pedido.filter(i => i !== item);
        li.classList.remove("selecionado");
      } else {
        pedido.push(item);
        li.classList.add("selecionado");
      }
      atualizarPedido();
    });
  });
}

function atualizarPedido() {
  itensPedido.innerHTML = pedido.map(i => `<li>${i}</li>`).join("");
}

// Enviar via WhatsApp
document.getElementById("enviarWhats").addEventListener("click", () => {
  const adicionais = document.getElementById("adicionais").value;
  const mensagem = `Olá! Gostaria de fazer o pedido:\n\nItens:\n- ${pedido.join("\n- ")}\n\nAdicionais:\n${adicionais}`;
  const numeroWhats = "5511999999999"; // Substitua pelo número do WhatsApp do restaurante
  const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});

renderCardapio();
