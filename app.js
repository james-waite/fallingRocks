// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Initial Variables
// let redX, deadPixel, sound;
const impactPlane = 200;
let iconImages = [];
let crackImages = [];
let icons = [];
let cracks = [];
let sounds = [];

// Loaders
function preload() {
  // redX = loadImage('./static/textures/x.png');
  // deadPixel = loadImage('./static/textures/deadPixel.png');
  // sound = loadSound('./static/audio/_01_rock.wav');

  for (let i = 0; i < 4; i++) {
    iconImages[i] = loadImage('./static/textures/icon_' + i + '.png');
  }
  for (let i = 0; i < 2; i++) {
    crackImages[i] = loadImage('./static/textures/dp_' + i + '.png');
  }
  for (let i = 0; i < 7; i++) {
    sounds[i] = loadSound('./static/audio/_0' + i + '_rock.wav');
  }
}

/**
 * Setup
 */
function setup() {
  // Canvas
  const myCanvas = document.querySelector('canvas.webgl');
  createCanvas(sizes.width, sizes.height, WEBGL, myCanvas);

  // temp icons for loop
  // for (let i = 0; i < 5; i += 1) {
  //   let x = random(-sizes.width / 3, sizes.width / 3);
  //   let y = random(-sizes.height / 3, sizes.height / 3);
  //   let z = -1000 - Math.floor(random(100, 500));
  //   let size = random(40, 60);
  //   let img = iconImages[3];
  //   let vel = 5;
  //   // Create a new Icon object
  //   let icon = new Icon(x, y, z, size, img, vel);

  //   // Add Icon to Icons array
  //   icons.push(icon);
  // }
  // console.log({ ...icons });

  // Scene settings
  noFill();
  noStroke();
}

/**
 * Draw
 */
function draw() {
  // Scene settings
  background(205);

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
  camera(camX, camY, camZ + height / 2 / tan(PI / 6), camY, camZ, camX);

  /**
   * Lights
   */
  // ambientLight(255);

  /**
   * Icons loop
   */
  for (let i = icons.length - 1; i >= 0; i--) {
    icons[i].showAndMove();
    icons[i].checkImpact();
  }

  for (let i = cracks.length - 1; i >= 0; i--) {
    cracks[i].show();
  }
}

/**
 * Create new icons timer
 */
(function loop() {
  let rand = Math.round(Math.random() * (2000 - 150)) + 150;
  setTimeout(function () {
    let x = random(-sizes.width / 3, sizes.width / 3);
    let y = random(-sizes.height / 3, sizes.height / 3);
    let z = -2000 - Math.floor(random(100, 500));
    let size = random(40, 60);
    let img = iconImages[Math.floor(Math.random() * iconImages.length)];
    let vel = Math.floor(5, 8);

    // Create a new Icon object
    let icon = new Icon(x, y, z, size, img, vel);

    // Add Icon to Icons array
    icons.push(icon);
    // console.log({ ...icons });
    loop();
  }, rand);
})();

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
    push();
    texture(this.img);
    translate(this.x, this.y, this.z);
    plane(this.size);
    this.z = this.z + this.vel;
    pop();
  }
  checkImpact() {
    // method for when icon passes threshold
    if (this.z >= impactPlane) {
      // instance of class removes itself from icons array...
      // console.log({ ...icons });
      let iconIndex = icons.indexOf(this);
      if (Math.random() < 0.2) {
        this.placeCrack();
      }
      icons.splice(iconIndex, 1);
    }
  }
  placeCrack() {
    // method for creating a crack at this.x, this.y; w/ probability
    let crack = new Crack(
      crackImages[Math.floor(Math.random() * crackImages.length)],
      this.x,
      this.y,
      impactPlane,
      this.size
    );
    cracks.push(crack);
    this.playSound();
  }
  playSound() {
    // method for selecting and playing impact noise
    let sound = Math.floor(Math.random() * sounds.length);
    console.log(sound);
    sounds[sound].setVolume(0.5);
    sounds[sound].play();
  }
}

/**
 * Cracks class
 */
class Crack {
  constructor(url, x, y, z, s) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s;
  }
  show() {
    push();
    texture(this.url);
    translate(this.x, this.y, this.z);
    plane(this.size);
    pop();
  }
}

/**
 * Utilities
 */
function windowResized() {
  resizeCanvas(sizes.width, sizes.height);
}
