function drawArrow(t, f, v, h) {
    push();
    translate(t * width / f - 2, height / 3);
    fill(60, 255, 140, t * 160);
    beginShape();
    vertex(-13 * h, 0);
    vertex(8 * h, 11 * v);
    vertex(10 * h, 8 * v);
    vertex(-6 * h, 0);
    vertex(10 * h, -8 * v);
    vertex(8 * h, -11 * v);
    endShape();
    pop();
}

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
        let f = 15; // the end of the animation is at width / f
        let rectW = width / (f / 2);
        let deltaX = mouseX - pastPosX;
        if (deltaX < 0) deltaX = 0;
        if (deltaX < width / f) {
            strokeWeight(0);
            let t = 1 - (1 - (deltaX / (width / f))) ** 2;
            if (t > 1) t = 1;
            fill(4, 156, 0, (deltaX / (width / f)) * 255);
            rect(t * width / f - rectW / 2 - 2, height / 3 - 20, rectW, 40, 14);
            drawArrow(t, f, 1, 1);
        }
        if (deltaX >= width / f && deltaX < width / f + 8) {
            rectMode(CENTER);
            strokeWeight(0);
            fill(4, 156, 0, 255);
            rect(width / f - 2 + (deltaX - width / f) / 4, height / 3, rectW + (deltaX - width / f) / 2, 40 - (deltaX - width / f) / 2, 14);
            drawArrow(1, f, 1 - (deltaX - width / f) / 80, 1 + (deltaX - width / f) / (2 * rectW));
            rectMode(CORNER);
        }
        if (deltaX >= width / f + 8) {
            rectMode(CENTER);
            strokeWeight(0);
            fill(4, 156, 0, 255);
            rect(width / f, height / 3, rectW + 4, 36, 14);
            drawArrow(1, f, 0.9, 1 + 4 / rectW);
            rectMode(CORNER);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {
    if (mouseX < width / 10) {
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