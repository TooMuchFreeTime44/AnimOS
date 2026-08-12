let pastPosX = 0;
let isGoingBack = false;
let canGoBack = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    if (canGoBack && mouseX > pastPosX) {
        isGoingBack = true;
        canGoBack = false;
    }
    if (isGoingBack) {
        let deltaX = mouseX - pastPosX;
        if (deltaX < 0) deltaX = 0;
        if (deltaX < width / 4) {
            strokeWeight(0);
            let slidingAlpha = deltaX * 255 / (width / 4);
            if (slidingAlpha > 255) slidingAlpha = 255;
            fill(4, 156, 0, slidingAlpha);
            circle(deltaX, height / 3, 40);
        }
        if (deltaX >= width / 4) {
            strokeWeight(0);
            fill(4, 156, 0, 255);
            circle(width / 4, height / 3, 40);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {
    if (mouseX < width / 8) {
        canGoBack = true;
        pastPosX = mouseX;
    } else canGoBack = false;
}

function touchMoved() {
    return false;
}

function touchEnded() {
    isGoingBack = false;
    canGoBack = false;
}