window.addEventListener("DOMContentLoaded", () => {
// variables
    const movementDisplay = document.getElementById("movement")
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")


    // variables
    let score
    let highScore
    let player
    let gravity
    let obstacles = []
    let gameSpeed
    let keys = {}

    // eventlistener
   document.addEventListener("keydown", (e) => {
       keys[e.code]= true
   })
//    lets the player go back to OG positioning once the key is released
   document.addEventListener("keyup", (e) => {
    keys[e.code]= false
})

    class Player {
        constructor(x, y, width, height, color){
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.color = color

            this.yVel= 0
            this.xVel= 0
            
            this.beginningHeight = height
            this.grounded = false
            this.jumping = false
            
            
        }

        Animate(){
            // jumping
            if (keys["ArrowUp"]) {
                this.Jump()
            } else {
                this.jumping = false
            }

            if(keys["ArrowDown"]){
                this.height = this.beginningHeight/2
            } else {
                this.height = this.beginningHeight
            }

            this.y += this.yVel
            
            // gravity
            if(this.y + this.height < canvas.height) {
                this.yVel += gravity
                this.grounded = false
            } else {
                this.yVel = 0 
                this.grounded = true
                this.y = canvas.height - this.height
            }

            this.Draw()
        }
        Jump() {
            if (this.grounded && this.jumping == false) {
                player.yVel -=20
                player.jumping = true
            } else if (this.grounded && this.jumping == true) {
                player.yVel = 0 
                player.jumping = false
            }
        }
        Draw() {
            ctx.beginPath()
            ctx.fillStyle= this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.closePath()
        }
    }

       


        class Obstacle {
           constructor(x, y, width, height, color) {
               this.x = x
               this.y = y
               this.width = width
               this.height = height
               this.color = color
               this.speed = 9  
           }
           update() {
               this.x -= this.speed
               this.Draw()            
           }
           Draw() {
            ctx.beginPath()
            ctx.fillStyle= this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.closePath()
           }
           
           
        }

        let obstacle

        function createObstacles() {
            // let x = getRandomInt(canvas.width + 200, 900)
            let x = canvas.width 
            let y = getRandomInt(340, 420)
            // let y = 360
            let width = 50 
            // let height= 50
            let height = getRandomInt(30, 50)
            let color= "blue" 
           

            obstacle = new Obstacle(x, y, width, height, color)
              

            obstacles.push(obstacle)
           
        }

        function getRandomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

// animations
       


        

// gaming functions


        function start () {
            canvas.width = 850
            canvas.height = 450
            ctx.font ="20px sans-serif"

            gameSpeed = 4
            gravity = 1
            score = 0

         
            
            
           
            player = new Player(25, canvas.height - 150, 50, 50, "pink")
            movementDisplay.innerText = `X:${player.x} Y:${player.y} H:${player.height} W:${player.width}`
            
            
            requestAnimationFrame(update)
            
        }

        

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: "+score, 8, 20);
        }
        
        
        let initialSpawnTimer  = 100
        let spawnTime = initialSpawnTimer
        
        function update() {

            requestAnimationFrame(update)
          
            
            ctx.clearRect(0 ,0, canvas.width, canvas.height)

          
            score += Math.round(0.5)
            gameSpeed++
            drawScore()
            
            spawnTime--

            if (spawnTime <=0) {
                createObstacles()
                spawnTime = initialSpawnTimer - gameSpeed * 5   
                if(spawnTime < 100) {
                    spawnTime = 100
                 }
            }
               
            for (let i =0; i < obstacles.length; i++) {
                let blocks = obstacles[i]

                if(blocks.x + blocks.width < 0){
                    obstacles.splice(i, 1)
                    console.log("remove")
                }
                if(
                    player.x < blocks.x + blocks.width
                    && player.x + player.width > blocks.x
                    && player.y < blocks.y + blocks.height
                    && player.y + player.height > blocks.y
                ) {
                    obstacles = []
                    score = 0
                    spawnTime = initialSpawnTimer
                    gameSpeed = 4
                    
                    alert("Game Over")
                    document.location.reload()
                }

                blocks.update()
            }
            
            
            player.Animate()
        }

        start()





































































































})

