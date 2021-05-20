window.addEventListener("DOMContentLoaded", () => {
// variables
    const movementDisplay = document.getElementById("movement")
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

// screens
    const startScreen = document.getElementById("start")
    const instructionScreen = document.getElementById("read")
    const gameOverScreen= document.getElementById("gameover")
// btns
    const instructionsBtn = document.getElementById("instructions")
    const startBtn= document.getElementById("start")
    const restartBtn= document.getElementById("restart")
    const backBtn = document.getElementById("back")
  



    // variables
    let score
    let player
    let gravity
    let obstacles = []
    let gameSpeed
    let keys = {}


    
   
    // game play eventlistener
   document.addEventListener("keydown", (e) => {
       keys[e.code]= true
   })
//    lets the player go back to OG positioning once the key is released
   document.addEventListener("keyup", (e) => {
    keys[e.code]= false
})

// switching between screens/ add event listeners
    startBtn.addEventListener("click", () => {
       startScreen.style.display = "none"
        canvas.style.display = "block"
        start()
        
    })

    // instructionsBtn.addEventListener("click", (event) => {
    //     console.log(event.target.id)
    //     if(event.target.value == instructions) {
    //         canvas.style.display = "none"
    //         startScreen.style.display = "none"
    //         instructionScreen.style.display = "block"
    //     }
        
    // })

    
    restartBtn.addEventListener("click", (e) => {
       if(e.target.value = restart) {
            gameOverScreen.style.display = "none"
            startScreen.style.display = "block"
       }
    })



   


    let playerImg = new Image()
    playerImg.src ="/images/secondsetsailor.png"
    let playerDuckImg = new Image()
    playerDuckImg.src = "/images/sailorducking.png"
    let playerJumping = new Image()
    playerJumping.src = "/images/sailorjumping.png"

    class Player {
        constructor(x, y, width, height){
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            // this.color = color

            this.yVel= 0
            this.xVel= 0
            
            this.beginningHeight = height
            this.grounded = false
            this.jumping = false

            // this.type= type


            this.frameX = 0
            this.frameY= 0
            this.frame = 0 
            this.spriteWidth = 79.3
            this.spriteHeight = 115
            this.gameFrame = 0
            this.staggerFrames = 5
                
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
                this.Ducking()
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
                player.yVel -=15
                player.jumping = true
            } else if (this.grounded && this.jumping == true) {
                player.yVel = 0 
                player.jumping = false
            }

        }
        Draw() {
            if(!keys["ArrowDown"] && !keys["ArrowUp"]){
                ctx.drawImage(playerImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, 
                    this.spriteHeight, this.x, this.y, this.spriteWidth/2, this.spriteHeight/2 )

                    if(this.gameFrame % this.staggerFrames == 0 ) {
                        if(this.frameX < 5) {
                            this.frameX++
                        } else {
                            this.frameX = 0
                        }
                    }                
                    this.gameFrame++
            }
            
            
        }
        Ducking() {
            ctx.drawImage(playerDuckImg, 0, 0, 96, 47, this.x, this.y, 48, 23.5)
        }
        
    }
    

    // Creation of obstacle class 

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
            // let y = getRandomInt(340, 420)
            let y = 360
            let width = 50 
            let height= 50
            // let height = getRandomInt(30, 50)
            let color= "blue" 
           

            obstacle = new Obstacle(x, y, width, height, color)
              

            obstacles.push(obstacle)
           
        }

        function getRandomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

// gaming functions

        function pauseStart(){
            startBtn.addEventListener("click", () => {
               
            })
        }

        function start () {
            canvas.width = 850
            canvas.height = 450
            ctx.font ="20px sans-serif"

            gameSpeed = 4
            gravity = 1
            score = 0
            player = new Player(25, canvas.height - 150, 50, 50)
            movementDisplay.innerText = `X:${player.x} Y:${player.y} H:${player.height} W:${player.width}`
            
            
            requestAnimationFrame(update)
            
        }

// loading image and animation
        
    


        // let shift = 0
        // let frameWidth = 78.33
        // let frameHeight = 115
        // let totalFrames = 6
        // let currentFrame = 0 

        // function playerAnimation() {
        //     console.log("image is here ")
        //     ctx.clearRect(0 ,0, canvas.width, canvas.height)
        //     ctx.drawImage(myImage, 0, 0, frameWidth, frameHeight, 25, 300)

        //     shift += frameWidth + 1

        //     if(currentFrame === totalFrames){
        //         shift = 0
        //         currentFrame = 0
        //     }

        //     currentFrame++

        //     requestAnimationFrame(playerAnimation)
        // }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: "+score, 740 , 20);
        }
        
        
        let initialSpawnTimer  = 100
        let spawnTime = initialSpawnTimer
        
        function update() {

            requestAnimationFrame(update)
          
            
            ctx.clearRect(0 ,0, canvas.width, canvas.height)

          
            let yourScore = score += Math.round(0.5)
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
                    
                    alert(`your score is ${yourScore}`)
                    document.location.reload()
                }

                blocks.update()
            }
            
            
            player.Animate()
        }

      





































































































})

