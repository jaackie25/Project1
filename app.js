window.addEventListener("DOMContentLoaded", () => {
// variables
    const movementDisplay = document.getElementById("movement")
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    let playerScore= 0
   
// game Components
    class GameComponents {
        constructor(x, y, color, width, height, type) {
            this.type = type
            this.x = x
            this.y = y
            this.color = color
            this.width = width
            this. height  = height
            this.speedX = 0
            this. speedY = 0
            
            
        }
        render () {
            ctx.fillStyle = this.color,
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        speed (){
            this.x += this.speedX
            this.y += this.speedY
        }
       
        
    }

    let sailorMoon = new GameComponents (50, 290, "pink", 40, 40)
    let obstacle = new GameComponents (50, 10, "blue", 50, 70 )
  
   

    document.addEventListener("keydown", movement)
    
    function frameLoop(){
        detectCollision()
        ctx.clearRect(0,0, canvas.width, canvas.height)
        playerScore++
        movementDisplay.textContent = `X: ${sailorMoon.x} Y: ${sailorMoon.y}`

        // sailorMoon.x +=1
        obstacle.render()
        sailorMoon.render()
        sailorMoon.speed()
    }

    let runGame = setInterval(frameLoop, 60)

    function movement(e) {
        // 38 is arrow up
        // 40 is arrow down
        if(e.keyCode === 38) {
            obstacle.y +=10
            sailorMoon.y -=10
            
        } else if (e.keyCode === 40) {
            sailorMoon.y +=10
            obstacle.y -=10 
           
        }
    }

    function detectCollision() {
        if (
            sailorMoon.x + sailorMoon.width >= obstacle.x &&
            sailorMoon.x <= obstacle.x + obstacle.width &&
            sailorMoon.y <= obstacle.y + obstacle.height &&
            sailorMoon.y + sailorMoon.height >= obstacle.y
            ) {
                console.log('hit!')
                document.location.reload();       
            }
    }

    function drawScore() {
        ctx.font = "16px Arial"
        ctx.fillStyle ="black"
        ctx.fillText("Score: "+playerScore, 0, 0 )
    }
    drawScore()































})

