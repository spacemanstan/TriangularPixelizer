let img;
let pixelSize = 30; // Adjust the pixel size as needed
let paddingPercent = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  img = loadImage('assets/gogh-self-portrait.jpg');
  frameRate(12);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  orbitControl();

  // Calculate padding based on window size
  let paddingX = width * paddingPercent;
  let paddingY = height * paddingPercent;

  // Center the image
  translate(-windowWidth / 4, -windowHeight / 4);

  // Pixelate and create triangular prisms
  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {
      let c = img.get(x, y); // Get color of the pixel
      fill(c);
      noStroke();

      // Create a square for each pixel
      square(x, y, pixelSize);

      // Extend a random edge to form a triangular prism
      let randEdge = floor(random(4));
      let triHeight = random(pixelSize);
      beginShape();
      vertex(x, y);
      switch (randEdge) {
        case 0:
          vertex(x + pixelSize, y);
          vertex(x + pixelSize, y + triHeight);
          break;
        case 1:
          vertex(x + pixelSize, y + pixelSize);
          vertex(x + pixelSize - triHeight, y + pixelSize);
          break;
        case 2:
          vertex(x, y + pixelSize);
          vertex(x, y + pixelSize - triHeight);
          break;
        case 3:
          vertex(x, y + triHeight);
          vertex(x + triHeight, y);
          break;
      }
      endShape(CLOSE);
    }
  }
}
