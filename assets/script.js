// Pegando os elementos da cena
const bola = document.querySelector('#bola');

const p1 = document.querySelector('#player1');
let pos1 = (window.innerHeight / 2);

const p2 = document.querySelector('#player2');
let pos2 = (window.innerHeight / 2);

// Definindo a posição dos players centralizados
p1.style.top = (window.innerHeight / 2) + 'px';
p2.style.top = (window.innerHeight / 2) + 'px';

// Pegando o texto e placar do jogo
const titulo = document.querySelector('#titulo');
const placar1 = document.querySelector('#placar1');
const placar2 = document.querySelector('#placar2');

// Definindo variavel para controlar quando o jogo pode reiniciar
let start = true;

// Definindo a pontuação
let pontos1 = 0;
let pontos2 = 0;

// Definindo a posição X e Y da bola
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;

// Medidas da bola
const raioBola = 50;

// Velocidades iniciais
let velX = 0.4;
let velY = 0.3;

let animationId;
let ultimoTempo = 0;
keys = {};
speed = 5;
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        keys[e.key] = true;
    }
    if (e.key === ' ' && start) {
        titulo.style.display = 'none';
        animationId = requestAnimationFrame(moverBola);
        velX = 0.4;
        velY = 0.3;
        start = false;
    }
})

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        keys[e.key] = false;
    }
})

function ponto(jog) {
    // Para a bola
    velX = velY = 0;

    // Posiciona a bola novamente ao centro
    posX = window.innerWidth / 2;
    posY = window.innerHeight / 2;

    // Conta a pontuação
    if (jog == 1) {
        pontos1++;
        placar1.innerText = pontos1;
    } else if (jog == 2) {
        pontos2++;
        placar2.innerText = pontos2;
    }

    // Aparece a instrução novamente
    titulo.style.display = 'block';
    start = true;
}

function moverPlayer() {
    if (keys['w'] && pos1 - 50 > 0) {
        pos1 -= speed;
        p1.style.top = pos1 + 'px';
    }
    if (keys['s'] && pos1 + 50 < 0.95 * window.innerHeight) {
        pos1 += speed;
        p1.style.top = pos1 + 'px';
    }

    if (keys['ArrowUp'] && pos2 - 50 > 0) {
        pos2 -= speed;
        p2.style.top = pos2 + 'px';
    }
    if (keys['ArrowDown'] && pos2 + 50 < 0.95 * window.innerHeight) {
        pos2 += speed;
        p2.style.top = pos2 + 'px';
    }

    p1.style.left = '100px';
    p2.style.left = (window.innerWidth - 100) + 'px';

    requestAnimationFrame(moverPlayer);
}

function moverBola(tempoAtual) {
    if (!ultimoTempo) ultimoTempo = tempoAtual;
    const deltaTempo = tempoAtual - ultimoTempo;
    ultimoTempo = tempoAtual;

    posX += velX * deltaTempo;
    posY += velY * deltaTempo;

    // Pega o tamanho atual da janela do navegador
    const limiteDireita = window.innerWidth;
    const limiteBaixo = window.innerHeight;

    // Colisão com as paredes
    if (posX + raioBola >= limiteDireita) {
        posX = limiteDireita - 25;
        ponto(1);
    } else if (posX <= 25) {
        posX = 25;
        ponto(2);
    }
    if (posY >= (0.95 * limiteBaixo) - 25) {
        posY = (0.95 * limiteBaixo) - 30
        velY *= -1;
    } else if (posY <= 25) {
        posY = 30;
        velY *= -1;
    }

    // Colisão com os players
    if (posX - raioBola >= 70 && posX - raioBola <= 100 && posY + raioBola >= pos1 - 50 && posY - raioBola <= pos1 + 50) {
        posX = 155;
        velX *= -1;
        velX *= 1.05;
        velY *= 1.05;
    } else if (posX + raioBola >= window.innerWidth - 100 && posX + raioBola <= window.innerWidth - 70 && posY + raioBola >= pos2 - 50 && posY - raioBola <= pos2 + 50) {
        posX = window.innerWidth - 155;
        velX *= -1;
        velX *= 1.05;
        velY *= 1.05;
    }

    bola.style.left = posX + 'px';
    bola.style.top = posY + 'px';


    animationId = requestAnimationFrame(moverBola);
}
requestAnimationFrame(moverPlayer);