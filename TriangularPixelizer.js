let img, imgSize, imgDim;
let pixelSize, unit;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  img = loadImage('assets/gogh-self-portrait.jpg');

  imgDim = [17, 25];

  calcImgAndPixelSize();

  frameRate(12);
}

function draw() {
  background(0);

  orbitControl();

  rectMode(CENTER);

  // fill(150);
  // stroke(225);
  // rect(0, 0, imgSize[0], imgSize[1]);

  

  // style
  fill(255);
  stroke(169);
  // back face
  beginShape();
  vertex(-unit, -unit, 0);
  vertex(unit, -unit, 0);
  vertex(unit, unit, 0);
  vertex(-unit, unit, 0);
  endShape(CLOSE);

  // side top
  beginShape();
  vertex(-unit, -unit, 0);
  vertex(unit, -unit, 0);
  vertex(unit, -unit, unit);
  endShape(CLOSE);

  // side bottom
  beginShape();
  vertex(-unit, unit, 0);
  vertex(unit, unit, 0);
  vertex(unit, unit, unit);
  endShape(CLOSE);

  // side right
  beginShape();
  vertex(unit, -unit, unit);
  vertex(unit, -unit, 0);
  vertex(unit, unit, 0);
  vertex(unit, unit, unit);
  endShape(CLOSE);

  // top face
  beginShape();
  vertex(-unit, -unit, 0);
  vertex(unit, -unit, unit);
  vertex(unit, unit, unit);
  vertex(-unit, unit, 0);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcImgAndPixelSize();
}

function calcImgAndPixelSize() {
  pixelSize = windowWidth < windowHeight ? (int)((windowWidth * 0.9) / imgDim[0]) : (int)((windowHeight * 0.9) / imgDim[1]);

  imgSize = [pixelSize * imgDim[0] / 2, pixelSize * imgDim[1] / 2];

  unit = pixelSize / 2;
}