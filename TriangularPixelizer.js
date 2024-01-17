let img;
let loadingImg = false;
let defaultImgUrl = 'https://www.vincentvangogh.org/images/self-portrait.jpg';
let controlsContainer, inputImgUrl;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  controlsContainer = createDiv();
  controlsContainer.addClass('controlsContainer');

  inputImgUrl = createInput(defaultImgUrl, URL);
  inputImgUrl.size(width * 0.4, width * 0.025);

  controlsContainer.child(inputImgUrl);

  img = loadImage(inputImgUrl.value());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  orbitControl();

  image(img, 0, 0, width, height);
}