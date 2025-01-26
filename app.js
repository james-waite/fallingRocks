// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Initial Variables
let redX;
let icons = [];

// Loaders
function preload() {
  redX = loadImage('./static/textures/x.png');
}

/**
 * Setup
 */
function setup() {
  // Canvas
  const myCanvas = document.querySelector('canvas.webgl');
  createCanvas(sizes.width, sizes.height, WEBGL, myCanvas);

  // temp icons for loop
  for (let i = 0; i < 5; i += 1) {
    let x = random(-sizes.width / 6, sizes.width / 6);
    let y = random(-sizes.height / 6, sizes.height / 6);
    let z = -1000 - random(100, 500);
    let size = random(40, 60);
    let img = redX;
    let vel = 5;
    // Create a new Icon object
    let icon = new Icon(x, y, z, size, img, vel);

    // Add Icon to Icons array
    icons.push(icon);
  }
  console.log({ ...icons });
}

/**
 * Draw
 */
function draw() {
  // Scene settings
  background(55);
  noFill();
  noStroke();

  /**
   * Orbit controls
   */
  let orbitOptions = {
    disableTouchActions: false,
    freeRotation: true,
  };
  orbitControl(2, 2, 2, orbitOptions);

  /**
   * Camera
   */
  let camX = random(-1, 1);
  let camY = random(-1, 1);
  let camZ = random(-1, 1);
  // let camX = 0;
  // let camY = 0;
  // let camZ = 0;
  camera(camX, camY, camZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  /**
   * Lights
   */
  // ambientLight(255);

  /**
   * Test reference image
   */
  // push();
  // translate(-100, -100, 0);
  // image(redX, 0, 0, 50, 50);
  // pop();

  /**
   * Icons loop
   */
  for (let i = icons.length - 1; i >= 0; i--) {
    icons[i].showAndMove();
    icons[i].checkImpact();
  }
  // for (let icon of icons) {
  //   // show and move each icon
  //   icon.showAndMove();

  //   // check for icon impact
  //   icon.checkImpact();
  // }

  // textureMode(NORMAL);
  // push();
  // texture(redX);
  // translate(0, 0, -3000 + vel);
  // plane(50);
  // pop();
  // vel += 0.7; // make image move
}

/**
 * Icon Class
 */
class Icon {
  constructor(x, y, z, size, img, vel) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.img = img;
    this.vel = vel;
  }
  showAndMove() {
    texture(this.img);
    translate(this.x, this.y, this.z);
    plane(this.size);
    this.z += this.vel;
  }
  checkImpact() {
    // method for when icon passes threshold
    if (this.z >= 150) {
      // instance of class removes itself from icons array...
      console.log({ ...icons });
      let iconIndex = icons.indexOf(this);
      console.log(iconIndex + ', z: ' + this.z + ', v: ' + this.vel);
      icons.splice(iconIndex, 1);
    }
  }
  playSound() {
    // method for selecting and playing impact noise
  }
}

/**
 * Utilities
 */
function windowResized() {
  resizeCanvas(sizes.width, sizes.height);
}
