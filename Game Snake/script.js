
window.onload = function(){ //carregando janela do windows
    canvas = document.getElementById("canvas"); // recupera o tamanho da tela do jogo
    ctx = canvas.getContext("2d"); // dando contexto 2d ao jogo
    score = document.getElementById("score");


    //variaveis
    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15; // posicao comida
    foodY = 15;
    velX = 0; //velocidade
    velY = 0;
    grid = 20; //tamanho da grade
    tam = 3; // tamanho snake
    score = 0;

    setInterval(jogo, 100); // essa função chama outra função a cada 100 milisegundos

    //controles teclado
    document.addEventListener("keydown", function(e){
        switch (e.keyCode){
            case 39: //seta direita
                velX =1;
                velY=0;
                break;
            case 37: //seta esquerda
                velX =-1;
                velY =0;
                break;
            case 38: //seta cima
                velX =0;
                velY = -1;
                break;
            case 40: // seta baixo
                velX =0;
                velY = 1;
                break;
        }
    });

}

function jogo(){
    //configuracao da tela
    ctx.fillStyle = "#A3CDD9"; // cor da tela/canva

    //distancia da borada horizontal
    //distancia borda vertical
    //largura
    //altura
    ctx.fillRect(0,0, canvas.width, canvas.height);
    //ctx.strokeRect(0, 0, canvas.width, canvas.height);

     //deslocamento da snake
     positionX += velX;
     positionY += velY;

    //morrendo ao tocar na borda snake
    if(positionX < 0 || positionX >grid|| positionY<0|| positionY > grid ){
        tam = 3;
        positionX = 10;
        positionY = 10;
        velX = 0; //velocidade
        velY = 0;
        score = 0;
        //alert("GAME OVER");
    }
  

      //configurando a snake
      ctx.fillStyle = "#668C4A";

      for(let i =0; i <snake.length; i++){ // colorir a cobra
          ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid -1, grid -1);
          if(snake[i].x == positionX && snake[i].y == positionY){
              tam = 3;
              //alert("GAME OVER");
          }
      }

    snake.push({x: positionX, y: positionY}); // add obj na snake
 
    //apagando snake
    while(snake.length>tam){
        snake.shift(); // apaga o primeiro valor do array
    }


    //configurando comida
    ctx.fillStyle = "#B22222";
    ctx.fillRect(foodX*grid, foodY*grid, grid -1, grid -1);

    // comendo
    if(positionX == foodX && positionY == foodY){
        tam++;
        foodX = Math.floor(Math.random()*grid);
        foodY = Math.floor(Math.random()*grid);
        score+=10;

}

}