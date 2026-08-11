function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    if (mouseIsPressed && mouseX < windowWidth / 6) {
        circle(mouseX, windowHeight / 4, 20);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function touchMoved() {
    return false;
}