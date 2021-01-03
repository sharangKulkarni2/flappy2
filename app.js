let gameContainer = document.querySelector('.gameContainer')
let ground = document.querySelector('.ground')
let bird = document.querySelector('.bird')

let isGameOver = false
let birdLeft = 220
let birdBottom = 100
let gap = 450
let gravity = 2

function startGame(){
  birdBottom -= 2
  bird.style.bottom = birdBottom + 'px'
}
let timerId = setInterval(startGame, 20)
document.addEventListener('keyup', gameControl)
function gameControl(e){
  if(e.keyCode === 32) jump()
}
function jump(){
  if(birdBottom < 420){
    birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
  }
}
function generateObstacles(){
  if(isGameOver) return
  let obstacleLeft = 500
  let randomHeight = Math.random() * 60
  let obstacleBottom = randomHeight
  let obstacle = document.createElement('div')
  let topObstacle = document.createElement('div')
  obstacle.classList.add('obstacle')
  topObstacle.classList.add('topObstacle')
  if(!isGameOver) gameContainer.appendChild(obstacle)
  if(!isGameOver) gameContainer.appendChild(topObstacle)
  obstacle.style.left = obstacleLeft + 'px'
  topObstacle.style.left = obstacleLeft + 'px'
  obstacle.style.bottom = obstacleBottom + 'px'
  topObstacle.style.bottom = obstacleBottom + gap + 'px'

  function moveObstacle(){
    obstacleLeft -= 2
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    if(obstacleLeft == -10){
      gameContainer.removeChild(obstacle)
      gameContainer.removeChild(topObstacle)
    }

    if((obstacleLeft >= 160 && obstacleLeft <= 280 && birdLeft === 220 &&
    ((birdBottom <= (300 - (150 - obstacleBottom))) || (birdBottom + 45 + (150 - obstacleBottom) >= gap)))
    || birdBottom === 0){
          clearInterval(timerId1)
          gameOver()
    }

  }

  let timerId1 = setInterval(moveObstacle, 20)
  if(!isGameOver) setTimeout(generateObstacles, 3500)
}

function gameOver(){
  isGameOver = true
  clearInterval(timerId)
  document.removeEventListener('keyup', gameControl)
  gameContainer.removeChild(obstacle)
  gameContainer.removeChild(topObstacle)
}


generateObstacles()
