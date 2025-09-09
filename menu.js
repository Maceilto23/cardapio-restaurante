// menu.js
document.body.insertAdjacentHTML('afterbegin', `
  <div class="hamburger" id="hamburger">
    <div></div>
    <div></div>
    <div></div>
  </div>
`);

document.body.insertAdjacentHTML('afterbegin', `
  <div class="side-menu" id="sideMenu">
    <a href="editar_horario.html" class="btn-time">⏰ Editar Horário</a>
    <a href="editar_cardapio.html" class="btn-edit">✏️ Editar Cardápio</a>
    <a href="editar_locais_entrega.html" class="btn-delivery">🚚 Editar Locais de Entrega</a>
    <a href="editar_forma_pagamento.html" class="btn-payment">💳 Editar Formas de Pagamento</a>
    <a href="index.html" class="btn-view">📖 Ver Cardápio</a>
  </div>
`);

// Função hambúrguer
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  sideMenu.style.left = menuOpen ? '0' : '-50%';
  hamburger.children[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'rotate(0)';
  hamburger.children[1].style.opacity = menuOpen ? '0' : '1';
  hamburger.children[2].style.transform = menuOpen ? 'rotate(-45deg) translate(7px,-6px)' : 'rotate(0)';
});

document.addEventListener('click', (e) => {
  if(menuOpen && !sideMenu.contains(e.target) && !hamburger.contains(e.target)){
    sideMenu.style.left = '-50%';
    hamburger.children[0].style.transform = 'rotate(0)';
    hamburger.children[1].style.opacity = '1';
    hamburger.children[2].style.transform = 'rotate(0)';
    menuOpen = false;
  }
});
