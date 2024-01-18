let img, imgSize, imgDim;
let pixelSize, unit;
let backCorners = [4];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  frameRate(12);

  img = loadImage('assets/gogh-self-portrait.jpg');

  imgDim = [17, 25];

  calcUnits();

  rectMode(CORNERS);
}

function draw() {
  background(0);

  orbitControl();

  for (let imgX = 0; imgX < imgDim[0]; ++imgX) {
    for (let imgY = 0; imgY < imgDim[1]; ++imgY) {
      let xOff = int((img.width / imgDim[0]) * imgX);
      let yOff = int((img.height / imgDim[1]) * imgY);
      let imgColour = img.get(xOff, yOff);

      fill(imgColour);
      noStroke();

      push();

      translate(
        (-imgSize[0] / 2) + imgX * pixelSize,
        (-imgSize[1] / 2) + imgY * pixelSize,
        0
      );

      // use index to map a rotation seamingly randomly
      rotation = (imgX * imgDim[1] + imgY % 4) * PI / 2;
      rotate(rotation, [0, 0, 1]);

      renderTriPrism();

      // this back corners code is really dumb
      // but p5js is more dumb and it is the only thing that sizes it right for some reason 
      let first = (imgX == 0 && imgY == 0);
      let last = (imgX == imgDim[0] - 1 && imgY == imgDim[1] - 1);

      if (first) {
        backCorners[0] = (-imgSize[0] / 2) + imgX * pixelSize - unit;
        backCorners[1] = (-imgSize[1] / 2) + imgY * pixelSize - unit;
      }

      if (last) {
        backCorners[2] = (-imgSize[0] / 2) + imgX * pixelSize + unit;
        backCorners[3] = (-imgSize[1] / 2) + imgY * pixelSize + unit;
      }

      pop();
    }
  }

  fill(51, 37, 32);
  stroke(74, 51, 42);
  rect(backCorners[0], backCorners[1], backCorners[2], backCorners[3]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcUnits();
}

function calcUnits() {
  pixelSize = windowWidth < windowHeight ? (int)((windowWidth * 0.9) / imgDim[0]) : (int)((windowHeight * 0.9) / imgDim[1]);

  imgSize = [pixelSize * imgDim[0] / 2, pixelSize * imgDim[1] / 2];

  unit = pixelSize / 2;
}

function renderTriPrism() {
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