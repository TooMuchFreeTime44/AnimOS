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
            let slidingVar = (deltaX / (width / 4)) * (deltaX / (width / 4));
            if (slidingVar > 1) slidingVar = 1;
            fill(4, 156, 0, slidingVar * 255);
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