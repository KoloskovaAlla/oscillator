export function solution(player, platforms, audioContext, destination) {
  let { x, y, vx, vy, ax, ay } = player;

  // Update velocity
  vx += ax;
  vy += ay;

  // Calculate next position
  let nextX = x + vx;
  let nextY = y + vy;

  // Check collisions with platforms
  platforms.forEach(platform => {
    // Calculate platform boundaries
    let platformTop = platform.y - platform.height / 2;
    let platformBottom = platform.y + platform.height / 2;
    let platformLeft = platform.x - platform.width / 2;
    let platformRight = platform.x + platform.width / 2;

    // Check if the player is moving towards the platform
    if ((x < platformRight && nextX >= platformLeft) || (x > platformLeft && nextX <= platformRight)) {
      if ((y < platformBottom && nextY >= platformTop) || (y > platformTop && nextY <= platformBottom)) {
        // Collision detected
        vy = -0.5 * vy;  // Reverse vertical velocity
        vx = -vx;        // Reverse horizontal velocity

        // Play sound of platform frequency
        playSound(platform.freq, audioContext, destination);

        // Adjust position to be right at the collision point
        if (y < platformBottom && nextY >= platformTop) {
          nextY = platformTop;
        } else if (y > platformTop && nextY <= platformBottom) {
          nextY = platformBottom;
        }
      }
    }
  });

  // Update player object with new values
  player.x = nextX;
  player.y = nextY;
  player.vx = vx;
  player.vy = vy;

  return player;
}

// Helper function to play sound of given frequency
function playSound(freq, audioContext, destination) {
  // Create oscillator node
  let oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.value = freq;

  // Connect oscillator to destination (e.g., speakers)
  oscillator.connect(destination);

  // Start oscillator
  oscillator.start();

  // Stop oscillator after 250ms (0.25s)
  setTimeout(() => {
    oscillator.stop();
  }, 250);
}