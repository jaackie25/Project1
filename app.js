window.addEventListener("DOMContentLoaded", () => {
    // variables
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const gameOverScore = document.getElementById("gameOverScore")
    const gameOverTitle = document.getElementById("gameOverTitle")
    // screens
    const startScreen = document.getElementById("start")
    const gameOverScreen = document.getElementById("gameover")
    // btns
    const startBtn = document.getElementById("startGame")
    const restartBtn = document.getElementById("restart")
    // sound effect
   
    // variables
    let score
    let player
    let gravity
    let obstacles = []
    let gameSpeed
    let keys = {}
    let gameRun
    // game play eventlistener
    document.addEventListener("keydown", (e) => {
        keys[e.code] = true
    })
    //    lets the player go back to OG positioning once the key is released
    document.addEventListener("keyup", (e) => {
        keys[e.code] = false
    })

    // switching between screens/ add event listeners
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none"
        canvas.style.display = "block"
        gameOverScreen.style.display = "none"
        start()

    })

    // player images
    let playerImg = new Image()
    playerImg.src = "/images/secondsetsailor.png"
    let playerDuckImg = new Image()
    playerDuckImg.src = "/images/sailorducking.png"
    let playerJumping = new Image()
    playerJumping.src = "/images/jumpingsailor.png"
    let playerFalling = new Image()
    playerFalling.src = "/images/fallingsailor.png"
    let background = new Image()
    background.src = "/images/background3.png"

    class Player {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height

            this.yVel = 0
            this.xVel = 0
            // jumping parameters
            this.beginningHeight = height
            this.grounded = false
            this.jumping = false
            // framed sprite for player
            this.frameX = 0
            this.frameY = 0
            this.frame = 0
            this.spriteWidth = 79.3
            this.spriteHeight = 115
            this.gameFrame = 0
            this.staggerFrames = 5
        }
        Animate() {
            // jumping
            if (keys["ArrowUp"]) {
                this.Jump()
            } else {
                this.jumping = false
            }

            if (keys["ArrowDown"]) {
                this.height = this.beginningHeight / 2
                this.Ducking()
            } else {
                this.height = this.beginningHeight
            }
            // gravity
            this.y += this.yVel

            if (this.y + this.height < canvas.height) {
                this.yVel += gravity;
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
                player.yVel -= 20
                player.jumping = true
            } else if (this.grounded && this.jumping == true) {
                player.yVel = 0
                player.jumping = false
            }
            ctx.drawImage(playerJumping, 0, 0, 70, 114, this.x, this.y - 50, 70, 114)
        }
        Draw() {
            this.DrawSprite()
        }
        Ducking() {
            ctx.drawImage(playerDuckImg, 0, 0, 96, 47, this.x, this.y - 20, 96, 47)
        }
        DrawSprite() {
            if (!keys["ArrowDown"] && !keys["ArrowUp"]) {
                ctx.drawImage(playerImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth,
                    this.spriteHeight, this.x, this.y - 50, this.spriteWidth, this.spriteHeight)

                if (this.gameFrame % this.staggerFrames == 0) {
                    if (this.frameX < 5) {
                        this.frameX++
                    } else {
                        this.frameX = 0
                    }
                }
                this.gameFrame++
            }
        }
    }

    // Creation of obstacle class 
    let bat = new Image()
    bat.src = "/images/bat2.png"
    let tree = new Image()
    tree.src = "/images/treept2.png"

    class Obstacle {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.speed = 9
            // sprite variables
            this.frameX = 0
            this.frameY = 0
            this.spriteWidth = 160
            this.spriteHeight = 107
            this.gameFrame = 0
            this.staggerFrames = 5
        }
        update() {
            this.x -= this.speed
            this.Draw()
        }
        Draw() {
            if (this.y == 360) {
                ctx.drawImage(bat, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth,
                    this.spriteHeight, this.x, this.y - 25, this.spriteWidth / 2, this.spriteHeight / 2)
                if (this.gameFrame % this.staggerFrames == 0) {
                    if (this.frameX < 2) {
                        this.frameX++
                    } else {
                        this.frameX = 0
                    }
                }
                this.gameFrame++
            } else if (this.y == 400) {
                ctx.drawImage(tree, 0, 0, 102, 123, this.x, this.y - 65, 102, 123)
            }
        }
    }

    let obstacle
    let obstacle2
    // function to push obstacles randomly into array
    function createObstacles() {
        let type = getRandomInt(0, 1)
        if (type == 1) {
            obstacle = new Obstacle(850, 360, 50, 50, "blue")
            obstacles.push(obstacle)
        } else if (type == 0) {
            obstacle2 = new Obstacle(850, 400, 50, 50, "red")
            obstacles.push(obstacle2)
        }
    }
    // random generator
    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }

    // gaming functions
    function start() {
        canvas.width = 850
        canvas.height = 450
        ctx.font = "20px sans-serif"
        // start game variables
        gameSpeed = 4
        gravity = 1
        score = 0
        player = new Player(25, canvas.height - 150, 50, 50)
        gameRun = true

        requestAnimationFrame(update)
    }
    // drawing score on canvas
    function drawScore() {
        ctx.font = "20px San Serif";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + score, 740, 20);
    }

    // spawn time variables
    let initialSpawnTimer = 200
    let spawnTime = initialSpawnTimer
    
// updating game
    function update() {
        requestAnimationFrame(update)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // varibles that are updated as game proceeds
        let yourScore = score += Math.round(0.5)
        gameSpeed++
        drawScore()
        spawnTime--
        // spawning obstacles
        if(spawnTime == 190 && gameRun === true ){
            createObstacles()
        }
        if (spawnTime <= 60 && gameRun === true) {
            createObstacles()
            spawnTime = initialSpawnTimer - gameSpeed * 6
            if (spawnTime < 100) {
                spawnTime = 100
            }
        }
        // looping through array of obtacles to detect if game ends or obstalces continue to be pushed
        for (let i = 0; i < obstacles.length; i++) {
            let blocks = obstacles[i]
            
            if (blocks.x + blocks.width < 0) {
                obstacles.splice(i, 1)
            }
            
            if (
                player.x < blocks.x + blocks.width
                && player.x + player.width > blocks.x
                && player.y < blocks.y + blocks.height
                && player.y + player.height > blocks.y
            ) {
                obstacles = []
                score = 0
                spawnTime = initialSpawnTimer
                gameSpeed = 4
                gameRun = false
                canvas.style.display = "none"
                gameOverScreen.style.display = "block"
                gameOverTitle.innerText = "GAME OVER"
                gameOverScore.innerText = `Your score is ${yourScore}`

                restartBtn.addEventListener("click", (e) => {
                    if (e.target.value = restart) {
                        gameOverScreen.style.display = "none"
                        startScreen.style.display = "block"
                        document.location.reload()
                    }
                })
            }
            blocks.update()
        }
        player.Animate()
    }







































































































})

