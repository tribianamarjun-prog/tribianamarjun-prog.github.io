// Orbiting Dot - Math-Based Animation (p5.js)
// Math used: x = cx + R*cos(theta), y = cy + R*sin(theta)

// ---- Variables that change over time / with controls ----
let centerX;            // x of the orbit's center (middle of canvas)
let centerY;            // y of the orbit's center
let orbitRadius = 150;  // R: distance from center to the dot (pixels)
let angleDeg = 0;       // theta: current angle of the dot, in degrees
let speedDeg = 2;       // degrees added to theta every frame
let isPaused = false;   // true = animation frozen

function setup() {
  createCanvas(600, 600);
  frameRate(60);              // 60 frames per second, so 2 deg/frame = 120 deg/sec
  angleMode(DEGREES);         // sin() and cos() will use degrees, not radians
  centerX = width / 2;        // 300
  centerY = height / 2;       // 300
  textFont('monospace');
}

function draw() {
  background(20);

  // MOUSE CONTROL: mouseX (0 to 600) is mapped to speed (0 to 6 deg/frame)
  // Only update when the mouse is on the canvas.
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    speedDeg = map(mouseX, 0, width, 0, 6);
  }

  // Update the angle each frame; % 360 keeps theta between 0 and 360
  if (!isPaused) {
    angleDeg = (angleDeg + speedDeg) % 360;
  }

  // THE MATH: polar -> screen coordinates
  // cos(theta) gives the horizontal part, sin(theta) gives the vertical part.
  // Multiply by R to scale up to pixels, then add the center to shift the circle.
  // (In p5.js, y increases going DOWN the screen.)
  let dotX = centerX + orbitRadius * cos(angleDeg);
  let dotY = centerY + orbitRadius * sin(angleDeg);

  // Orbit path
  noFill();
  stroke(80);
  strokeWeight(1);
  circle(centerX, centerY, orbitRadius * 2);   // diameter = 2R

  // Radius line (center to dot)
  stroke(120, 180, 255);
  line(centerX, centerY, dotX, dotY);

  // Center point
  noStroke();
  fill(255, 200, 0);
  circle(centerX, centerY, 12);

  // Orbiting dot
  fill(255, 90, 90);
  circle(dotX, dotY, 28);

  // ---- On-canvas text ----
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text('CONTROLS', 12, 12);
  text('Mouse X : speed (left = slow, right = fast)', 12, 32);
  text('SPACE   : pause / resume', 12, 50);
  text('UP/DOWN : bigger / smaller radius', 12, 68);
  text('LEFT/RIGHT (when paused): angle -/+ 15 deg', 12, 86);

  textAlign(LEFT, BOTTOM);
  text('R = ' + orbitRadius + '   theta = ' + nf(angleDeg, 1, 1) + ' deg', 12, height - 48);
  text('speed = ' + nf(speedDeg, 1, 2) + ' deg/frame  (' + nf(speedDeg * 60, 1, 0) + ' deg/sec)', 12, height - 30);
  text('x = ' + nf(dotX, 1, 1) + '   y = ' + nf(dotY, 1, 1) + (isPaused ? '   [PAUSED]' : ''), 12, height - 12);
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  }
  if (keyCode === UP_ARROW) {
    orbitRadius = constrain(orbitRadius + 10, 50, 250);
  }
  if (keyCode === DOWN_ARROW) {
    orbitRadius = constrain(orbitRadius - 10, 50, 250);
  }
  // Step the angle by hand (only while paused) - useful for the worked example
  if (isPaused && keyCode === RIGHT_ARROW) {
    angleDeg = (angleDeg + 15) % 360;
  }
  if (isPaused && keyCode === LEFT_ARROW) {
    angleDeg = (angleDeg - 15 + 360) % 360;
  }
  return false; // stop the browser from scrolling with space/arrow keys
}
