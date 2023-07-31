const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speedX: 0,
  speedY: 0,
  jumping: false
};

const platforms = [
  { x: 0, y: canvas.height - 20, width: canvas.width, height: 20 },
  { x: 200, y: 250, width: 100, height: 20 },
  { x: 400, y: 200, width: 100, height: 20 },
  { x: 600, y: 150, width: 100, height: 20 }
];

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = "gray";
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function update() {
  // Movement logic
  player.x += player.speedX;
  player.y += player.speedY;

  // Gravity
  if (!player.jumping) {
    player.speedY += 1.5;
  }

  // Collision with platforms
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height
    ) {
      player.jumping = false;
      player.speedY = 0;
      player.y = platform.y - player.height;
    }
  });

  // Clear canvas and draw objects
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  drawPlayer();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    player.speedX = -5; // Move left
  } else if (event.keyCode === 39) {
    player.speedX = 5; // Move right
  } else if (event.keyCode === 32 && !player.jumping) {
    player.speedY = -20; // Jump
    player.jumping = true;
  }
});

document.addEventListener("keyup", event => {
  if (event.keyCode === 37 || event.keyCode === 39) {
    player.speedX = 0; // Stop horizontal movement
  }
});

update();
