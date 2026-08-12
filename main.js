function drawArrow(t, f) {
    push();
    translate(t * width / f - 2, height / 3);
    fill(60, 255, 140, t * 160);
    beginShape();
    vertex(-13, 0);
    vertex(8, 11);
    vertex(10, 8);
    vertex(-6, 0);
    vertex(10, -8);
    vertex(8, -11);
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
            let t = (deltaX / (width / f)) * (deltaX / (width / f));
            if (t > 1) t = 1;
            fill(4, 156, 0, t * 255);
            rect(t * width / f - rectW / 2 - 2, height / 3 - 20, rectW, 40, 14);
            drawArrow(t, f);
        }
        if (deltaX >= width / f) {
            strokeWeight(0);
            fill(4, 156, 0, 255);
            rect(width / f - rectW / 2 - 2, height / 3 - 20, rectW, 40, 14);
            drawArrow(1, f);
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