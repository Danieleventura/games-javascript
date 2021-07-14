document.addEventListener('DOMContentLoaded', ()=>{

    //referencias
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const body = document.querySelector('body')
    const alert = document.getElementById('alert')

    //variaveis
    let jumping = false 
    let gravity = 0.9
    let gameo = false
    let dinopy = 0

    //entrada de dados
    document.addEventListener('keyup',jumpControl)
    //controle do pulo
    function jumpControl(e){
        if(e.keyCode == 32){
            if(!jumping){
                jumping = true
                jump()
            }
        }
    }
    
    
    function jump(){
        let count =0
        let timerId = setInterval(function(){
            //caindo
            if(count == 15){
                clearInterval(timerId)
                let downTimerId = setInterval(function(){
                   if(count == 0){
                       clearInterval(downTimerId)
                       jumping = false
                   }
                    dinopy -= 5
                    count --
                    dinopy = dinopy * gravity
                    dino.style.bottom = dinopy + 'px'
                },20)
            }
            //subida
            dinopy += 30
            count ++
            dinopy = dinopy * gravity
            dino.style.bottom = dinopy + 'px'
        }, 20)

    }

    function gerarObst(){
        let randomTime = Math.random()*4000
        let obstaclepx = 1000
        const obstacle = document.createElement('div')

        //criando copias
        if(!gameo)obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclepx + 'px'

        //logica do jogo + movimento dos obstaculos
        let timerId = setInterval(function(){
            //colisao com o player
            if(obstaclepx >0 && obstaclepx<60 && dinopy<60){
                clearInterval(timerId)
                alert.innerHTML='Fim de jogo'
                gameo = true
                //removendo copias
                body.removeChild(body.firstChild)
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }
            //movimento dos obstaculos para a esquerda
            obstaclepx -=10
            obstacle.style.left = obstaclepx +'px'

        },20)

        if(!gameo)setTimeout(gerarObst, randomTime)
    }

    gerarObst()

})