const grid = document.querySelector('#grid');

const personagens = ['mayuri', 'okabe', 'daru', 'kurikabe', 'kurisu'];
const cores_fundo = ['blue', 'purple', 'green', 'lime', 'yellow'];
const duplicar_cores = [...cores_fundo, ...cores_fundo];
let nome=document.querySelector(".nome")
let tempo=document.querySelector('.tempo')
let corpo=document.querySelector('main')

function contar_tempo(){
  this.loop=setInterval(()=>{
  const atualizar_tempo= +tempo.innerHTML
  tempo.innerHTML=atualizar_tempo+1
  },1000)
  
}

function elementos(tag, className) {
    const ele = document.createElement(tag);
    ele.className = className;
    return ele;
}

let primeira_carta=" "
let segunda_carta=" "

function resultado_final(){
  const cartas_reveladas=document.querySelectorAll('.revelado')
  if(cartas_reveladas.length===10){
   window.alert('Parabéns'+' '+nome.innerHTML+' seu tempo foi de'+' '+tempo.innerHTML+' segundos')
   clearInterval(this.loop)
   let reiniciar=document.createElement('button')
   corpo.appendChild(reiniciar)
   reiniciar.innerHTML='reiniciar jogo'
   reiniciar.classList.add('botão-reiniciar')
   reiniciar.addEventListener('click',function(){
    window.location='game.html';
   })
  }
}

function verificar(){
  const primeiro_personagem=primeira_carta.getAttribute('data-personagem')
  const segundo_personagem=segunda_carta.getAttribute('data-personagem')

  if(primeiro_personagem===segundo_personagem){
    primeira_carta.firstChild.classList.add('revelado')
    segunda_carta.firstChild.classList.add('revelado')
    primeira_carta=" "
    segunda_carta=" "
  }
  else{
    setTimeout(()=>{
    primeira_carta.classList.remove('revelar-carta')
    segunda_carta.classList.remove('revelar-carta')
    primeira_carta=" "
    segunda_carta=" "
  },500)}
  resultado_final()
}

function revelar_carta({target}) {
    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }
    
    if(primeira_carta===" "){
      target.parentNode.classList.add('revelar-carta');
      primeira_carta=target.parentNode
    }else if(segunda_carta===" "){
      target.parentNode.classList.add('revelar-carta');
      segunda_carta=target.parentNode
    }
     verificar()
}

function criar_cartas(personagem, cor) {
    const card = elementos('div', 'card');
    const frente = elementos('div', 'face frente');
    const tras = elementos('div', 'face tras');
    card.appendChild(frente);
    card.appendChild(tras);
    frente.style.backgroundImage = `url('../imagens/${personagem}.png')`;
    card.style.backgroundColor = cor; 
    card.addEventListener('click', revelar_carta);
    card.setAttribute("data-personagem",personagem)
    return card;
}

function gerar_jogo() {
    const cartasEmbaralhadas = [];
    const duplicar_personagens=[...personagens,...personagens]
    duplicar_personagens.forEach((personagem, index) => {
        const cor = duplicar_cores[index % cores_fundo.length];
        cartasEmbaralhadas.push({ personagem, cor });
    });
    const embaralhar_cartas = cartasEmbaralhadas.sort(() => Math.random() - 0.5);

    embaralhar_cartas.forEach(({ personagem, cor }) => {
        const card = criar_cartas(personagem, cor); 
        grid.appendChild(card);
    });
}
window.onload=()=>{
contar_tempo()
gerar_jogo();
var mostrar_nome=localStorage.getItem('play')
nome.innerHTML=mostrar_nome
}