var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d");
canvas.width = 500
canvas.height = 500

snake = {
    points: 1,
    x: 250,
    y: 250,
    width: 25,
    height: 25,
    direction: 0,
    speed: 25,
    tail: []

}




food = {
    x: 0,
    y: 0,
    width: 25,
    height: 25
}













drawSnake = () => {

    if (snake.direction === 1) {

        if (snake.y !== -25) {
            snake.y -= snake.speed
            checkTail()
        }

    }
    if (snake.direction === 2) {
        if (snake.x !== 500) {
            snake.x += snake.speed
            checkTail()
        }

    }
    if (snake.direction === 3) {
        if (snake.y !== 500) {
            snake.y += snake.speed
            checkTail()
        }

    }
    if (snake.direction === 4) {
        if (snake.x !== -25) {
            snake.x -= snake.speed
            checkTail()
        }

    }

    if (snake.y === food.y && snake.x === food.x) {
        snake.points += 1
        changeFoodLocation()
    }
    ctx.fillStyle = 'red'
    ctx.fillRect(snake.x, snake.y, snake.width, snake.height);

    
    
}

checkTail = () => {
    snake.tail.unshift([snake.x,snake.y])
    snake.tail.length = snake.points
    for(let i = 0; i<snake.points; i++){
        ctx.fillStyle = 'red'
        ctx.fillRect(snake.tail[i][0], snake.tail[i][1], snake.width, snake.height);
    }

    for(let i = 0; i<snake.tail.length; i++){
        if(snake.tail[i][0] == snake.x && snake.tail[i][1] == snake.y && i !== 0){
            resetGame()
        }
    }

    if(snake.y === 500 || snake.y === -25 || snake.x === 500 || snake.x === -25){
        resetGame()
    }
}


resetGame = () => {
    snake.tail = []
    snake.points = 1
    snake.direction = 0
    snake.x = 250,
    snake.y = 250
}

window.addEventListener('keydown', () => {
    


    if (event.keyCode === 87 && snake.direction !== 3) {
        snake.direction = 1
    }
    if (event.keyCode === 68 && snake.direction !== 4) {
        snake.direction = 2
    }
    if (event.keyCode === 83 && snake.direction !== 1) {
        snake.direction = 3
    }
    if (event.keyCode === 65 && snake.direction !== 2) {
        snake.direction = 4
    }

})

drawFood = () => {
    ctx.fillStyle = 'blue'
    ctx.fillRect(food.x, food.y, food.width, food.height);
}

drawScore = () => {
    ctx.strokeText('score: '+(Number(snake.points)-1), 420, 25);
}

changeFoodLocation = () => {

    while (true === true) {
        let number = Math.floor(Math.random() * 475+1);
        if ((number % 25) === 0 || number === 0) {
            food.x = number
            break
        }
    }
    while (true === true) {
        let number = Math.floor(Math.random() * 475+1);
        if ((number % 25) === 0 || number === 0) {
            food.y = number
            break
        }
    }
    console.log(snake.points)

}
changeFoodLocation()



startAnimating = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


animate = () => {
    
    requestAnimationFrame(animate)
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)
        




        ctx.clearRect(0, 0, canvas.width, canvas.height)

        drawFood()
        drawSnake()
        drawScore()
        
    }
    

}


startAnimating(7)