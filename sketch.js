let inputRed, inputGreen, inputBlue;
let colors = [];
const numSquares = 5;
const squareSize = 200;  // Doubled the size of the squares

function setup() {
  createCanvas(1080, 720);  // Updated canvas size to 1080x1080
  noLoop();

  // Calculate center positions
  let xOffset = (width - numSquares * squareSize) / 2;
  let yOffset = (height - squareSize) / 2;

  // Adjust the position of labels and inputs
  let yPos = 550;  // Y position for inputs near the bottom of the canvas
  let labelSpacing = 40;  // Space above inputs for labels
  let inputSpacing = 125;  // Adjusted horizontal space between inputs to fit the new layout

  createP('Input value R').position(xOffset, yPos - labelSpacing);
  inputRed = createInput('0');
  inputRed.position(xOffset, yPos);
  inputRed.size(50);
  inputRed.input(updateColors);

  createP('Input value G').position(xOffset + inputSpacing, yPos - labelSpacing);
  inputGreen = createInput('0');
  inputGreen.position(xOffset + inputSpacing, yPos);
  inputGreen.size(50);
  inputGreen.input(updateColors);

  createP('Input value B').position(xOffset + 2 * inputSpacing, yPos - labelSpacing);
  inputBlue = createInput('0');
  inputBlue.position(xOffset + 2 * inputSpacing, yPos);
  inputBlue.size(50);
  inputBlue.input(updateColors);

  // Add a button for taking screenshots
  let btn = createButton('Save Screenshot');
  btn.position(xOffset + 3 * inputSpacing, yPos);
  btn.mousePressed(saveScreenshot);

  updateColors();  // Initial color setup
}

function draw() {
  background(255);
  noStroke();  // Disable the stroke for rectangles
  let xOffset = (width - numSquares * squareSize) / 2;
  let yOffset = (height - squareSize) / 2;
  for (let i = 0; i < numSquares; i++) {
    fill(colors[i]);
    rect(xOffset + i * squareSize, yOffset, squareSize, squareSize);  // Draw larger centered squares
  }
}

function updateColors() {
  randomSeed(parseInt(inputRed.value()));  // Seed for red channel
  let reds = Array.from({length: numSquares}, () => random(255));

  randomSeed(parseInt(inputGreen.value()));  // Seed for green channel
  let greens = Array.from({length: numSquares}, () => random(255));

  randomSeed(parseInt(inputBlue.value()));  // Seed for blue channel
  let blues = Array.from({length: numSquares}, () => random(255));

  colors = reds.map((r, idx) => color(r, greens[idx], blues[idx]));
  redraw();  // Redraw the canvas with new colors
}

function saveScreenshot() {
  // Create a filename based on the input values
  let filename = `color_R${inputRed.value()}_G${inputGreen.value()}_B${inputBlue.value()}`;
  saveCanvas(filename, 'png');
}
