
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//carregando imagens do jogo sem css
var bird = new Image();
bird.src = "Materialflappy/images/bird.png";

var bg = new Image();
bg.src = "Materialflappy/images/bg.png";

var chao = new Image();
chao.src = "Materialflappy/images/chao.png";

var canoCima = new Image();
canoCima.src = "Materialflappy/images/canocima.png";

var canoBaixo = new Image();
canoBaixo.src = "Materialflappy/images/canobaixo.png";

//variaveis
var eec = 100; //espaco entre os canos em pixel
var constant; 
var bx = 33; //posicao x do bird
var by = 200;//posicao y do bird
var gravity = 1.4; //suavizar os movimentos do bird
var score = 0;
var cano =[];

cano[0] = {
    x: canvas.width,//cano esta no lado direito da tela
    y: 0 // controlado pelo codigo
}

//carregando sons sem css
var fly = new Audio();
fly.src = "Materialflappy/sounds/fly.mp3";
var scor = new Audio();
scor.src = "Materialflappy/sounds/score.mp3";

//captura de tecla
    document.addEventListener("keydown", voa);
    
    //voando
    function voa(){
            by = by - 26;//26 pixels
            fly.play();
        }

function jogo(){

    //fundo do jogo
    ctx.drawImage(bg, 0, 0); //imagem, posicao x, posicao y

    //criando canos

    for (let i=0; i<cano.length; i++){
        //posicao do cano de baixo
        constant = canoCima.height + eec;
        //cano de cima
        ctx.drawImage(canoCima, cano[i].x, cano[i].y);

        //configurando cano baixo
        ctx.drawImage(canoBaixo, cano[i].x, cano[i].y +constant)

        //movimentacao do cano
        cano[i].x = cano[i].x -1;//velocidade dos canosS//retirando 1 ate o cano chegar do lado esquerdo da tela
        //criando novos canos
        if(cano[i].x == 125){
         console.log("chegou"); // saber se o cano esta proximo de sair da tela
         cano.push({
            x: canvas.width,
            y: Math.floor(Math.random()*canoCima.height)-canoCima.height//valor aleatorio

         })
        }

        //mecanica do game over
        //bird entre as bordas do cano  
        if(bx + bird.width >= cano[i].x && bx <= cano[i].x + canoCima.width
            && (by <= cano[i].y + canoCima.height || by + bird.height>= cano[i].y + constant) //ultrapassou a altura do cano
            // bird colidiu com o cano de cima ou o cano de baixo
            || by + bird.height >= canvas.height - cano.height){ //bird colidiu com o chao
                location.reload(); // reinicia o jogo
        }
        
        //marcando ponto
        if(cano[i].x == 5){//cano saindo da tela
            score +=1;
            scor.play();

        }

    }
    //configurando caho e bird
    ctx.drawImage(chao, 0, canvas.height - chao.height);
    ctx.drawImage(bird, bx, by);
    by += gravity;

    //criando placar
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Placar: " + score, 10, canvas.height-20);

    

    requestAnimationFrame(jogo); //chama o jogo todo momento
}

jogo(); //ativando a funcao jogo
