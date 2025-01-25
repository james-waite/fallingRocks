// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Initial Variables
let redX;
let vel = 0;

// Loaders
function preload() {
  redX = loadImage('/static/textures/x.png');
}

/**
 * Setup
 */
function setup() {
  // Canvas
  const myCanvas = document.querySelector('canvas.webgl');
  createCanvas(sizes.width, sizes.height, WEBGL, myCanvas);
}

/**
 * Draw
 */
function draw() {
  background(55);

  // Orbit controls
  let orbitOptions = {
    disableTouchActions: false,
    freeRotation: true,
  };
  orbitControl(2, 2, 2, orbitOptions);
  noFill();
  noStroke();
  image(redX, -200, -200, 50, 50);

  // textureMode(NORMAL);
  push();
  texture(redX);
  translate(0, 0, -3000 + vel);
  plane(50);
  pop();

  vel += 0.7;
}

/**
 * Utilities
 */
function windowResized() {
  resizeCanvas(sizes.width, sizes.height);
}
