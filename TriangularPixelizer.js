let img, imgSize, imgDim;
let imgColours;
let pixelSize, unit;
let backCorners = [4];

function preload() {
  img = loadImage('assets/gogh-self-portrait.jpg');
  // img = loadImage('assets/gogh-sunflower.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  frameRate(12);

  imgLoaded = false;

  // imgDim = [17, 25];
  imgDim = [13, 21]; // smaller resolution is faster

  calcUnits();
  calcColours();

  rectMode(CORNERS);
}

function draw() {
  background(0);

  lights();

  orbitControl(1.5, 1.5, 0.15, {freeRotation: true});

  renderImgBg();

  renderTriangularImg();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcUnits();
}

function calcUnits() {
  pixelSize = windowWidth < windowHeight ? (int)((windowWidth * 0.5) / imgDim[0]) : (int)((windowHeight * 0.5) / imgDim[1]);

  imgSize = [pixelSize * imgDim[0] / 2, pixelSize * imgDim[1] / 2];

  unit = pixelSize / 2;
}

function renderImgBg() {
  backCorners[0] = (-imgSize[0] / 2) + 0 * pixelSize - unit;
  backCorners[1] = (-imgSize[1] / 2) + 0 * pixelSize - unit;
  backCorners[2] = (-imgSize[0] / 2) + imgDim[0] * pixelSize - unit;
  backCorners[3] = (-imgSize[1] / 2) + imgDim[1] * pixelSize - unit;

  fill(51, 37, 32);
  stroke(74, 51, 42);

  rect(backCorners[0], backCorners[1], backCorners[2], backCorners[3]);
}

function renderTriangularImg() {
  // move to top left corner
  translate(
    ((-imgSize[0] / 2) - pixelSize),
    (-imgSize[1] / 2),
    0
  );

  for (let imgY = 0; imgY < imgDim[1]; ++imgY) {
    for (let imgX = 0; imgX < imgDim[0]; ++imgX) {
      fill(imgColours[imgX * imgDim[1] + imgY]);
      noStroke();

      translate(pixelSize, 0, 0);

      // use index to map a rotation seamingly randomly
      rotation = (imgX * imgDim[1] + imgY % 4) * PI / 2;
      rotate(rotation, [0, 0, 1]);

      renderTriPrism();

      rotate(-rotation, [0, 0, 1]);

    }

    // Translate to the next row
    translate(-pixelSize * imgDim[0], pixelSize, 0);
  }
}


function renderTriPrism() {
  // triangle is facing left with raise side on right
  beginShape(TRIANGLE_STRIP);
  // tri top
  vertex(unit, -unit, 0);
  vertex(-unit, -unit, 0);
  vertex(unit, -unit, unit);

  // face front top
  vertex(-unit, -unit, 0);
  vertex(unit, -unit, unit);
  vertex(unit, unit, unit);

  // face front bottom
  vertex(-unit, -unit, 0);
  vertex(-unit, unit, 0);
  vertex(unit, unit, unit);

  // tri bottom
  vertex(unit, unit, unit);
  vertex(-unit, unit, 0);
  vertex(unit, unit, 0);

  // face right top
  vertex(unit, unit, 0);
  vertex(unit, unit, unit);
  vertex(unit, -unit, unit);

  // face right bottom
  vertex(unit, -unit, unit);
  vertex(unit, unit, 0);
  vertex(unit, -unit, 0);

  endShape(CLOSE);
}

function calcColours() {
  imgColours = new Array(imgDim[0] * imgDim[1]);

  for (let imgX = 0; imgX < imgDim[0]; ++imgX) {
    for (let imgY = 0; imgY < imgDim[1]; ++imgY) {
      let xOff = floor((img.width / imgDim[0]) * imgX);
      let yOff = floor((img.height / imgDim[1]) * imgY);

      let imgColour = img.get(xOff, yOff);

      imgColours[imgX * imgDim[1] + imgY] = imgColour;
    }
  }
}