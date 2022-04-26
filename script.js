/* CONTROLES DO DINO */

const dino = document.querySelector('.dino');
/* o comando faz parte de uma api que permite selecionar e manipular elementos em tela, basicamente aqui estamos pegando o elemento .dino e colocando na variavel dino */
const background = document.querySelector('.background'); //"pega" o background para usar no codigo
let isJumping = false;
let position = 0;

function handleKeyUp(event) { //o event é enviado para a função toda vesz que alguma tecla é pressionada pelo navegador
    if (event.keyCode === 32) { //o 32 refere-se a tecla, tecla 32 = a espaço
        if (!isJumping) { //vai conferir se o dino está pulando, se não estiver ativa a função jump
            jump();
        }
    }
}
function jump() { // essa função fará com que a cada 20 milisegundos a posição varie em 20px
    isJumping = true; //para sinalizar que inciou o processo de salto
    let upInterval = setInterval(() => {//essa função fará o dinossauro ir pra cima- set interval serve para a definição de intervalos, o que estiver dentro da função será executado sem parar no intervalo escolhido   
        if (position >= 150) {
            clearInterval(upInterval); //fara a limpeza do intervalo fazendo com que o dino não suba alem de 150px

            let downInterval = setInterval(() => { //essa função fara o dino "descer"
                if (position <= 0) {
                    clearInterval(downInterval); //fara a limpeza do intervalo fazendo com que o dino não desça alem dos limites da pagina
                    isJumping = false; // para sinalizar que encerrou o processo de salto
                } else {
                    position -= 15; //pega o valor da posição e decresce 20, controla a velocidade de decida do salto do dino
                    dino.style.bottom = position + 'px';
                }
            })
        } else {
            position += 15; //pega o valor da posição e adiciona 20, controla a velocidade de subida do salto do dino
            dino.style.bottom = position + 'px';
        }
    }, 20); //esse numero representa o intervalo de repetições, nesse caso 20 miliseconds
}

/* CONTROLES DOS CACTUS */

function createCactus() { //função que vai gerar o aparecimento dos cactus
    const cactus = document.createElement('div'); //cria div a ser utilzada como cactus
    let cactusPosition = 1020; //define a posição incial do cactus neste caso a direita da tela
    let randonTime = Math.random() * 6000; // vai gerar um numero aleatorio, (math.random)


    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus); //o metodo appendChild basicamente adiciona um filho.

    let leftInterval = setInterval(() => { //função para determinar o movimento dos cactus e seu desaparecimento   
        if (cactusPosition < -60) {  //referencia a posição do cactus que saiu da tela
            clearInterval(leftInterval); //limpa o intervalo para de ir a esquerda da tela
            background.removeChild(cactus); //remove o cactus que passou pela tela
        }else if (cactusPosition > 0 && cactusPosition < 40 && position < 40) {//se o cactus não saiu da tela (> 0) e maior que 60 ( a largura ocupada pelo dino) e altura do dino inferior a altura do cactus (60px) coloquei 40 pra reduzir a dificuldade do jogo
            clearInterval(leftInterval);    
            document.body.innerHTML = '  <h1 class="game-over">FiM dE jOgO</h1>';  // cria uma tag html com o texto informado
        }else{
            cactusPosition -= 8; //velocidade de movimento para a esquerda
            cactus.style.left = cactusPosition + 'px';
        }        
    }, 20)

    setTimeout(createCactus, randonTime) //setTimeout serve para executar uma função depois de um determinado tempo, há uma recursividade, uma função se autoInvocando
}

createCactus(); //cria cactus assim que o jogo se inica
document.addEventListener('keyup', handleKeyUp); //eventListneer pega um evento e realiza uma ação
  /*O comando keyup se relaciona a uma ação a ser realizada no momento de retorno de um tecla retornando, ha ainda keydown e keypres */












