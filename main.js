function drawArrow(t, f) {
    push();
    translate(t * width / f, height / 3);
    fill(60, 255, 140, t * 160);
    beginShape();
    vertex(-11, 0);
    vertex(5, 10);
    vertex(7, 7);
    vertex(-3, 0);
    vertex(7, -7);
    vertex(5, -10);
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
        let deltaX = mouseX - pastPosX;
        if (deltaX < 0) deltaX = 0;
        let f = 10; // the end of the animation is at width / f
        if (deltaX < width / f) {
            strokeWeight(0);
            let t = (deltaX / (width / f)) * (deltaX / (width / f));
            if (t > 1) t = 1;
            fill(4, 156, 0, t * 255);
            circle(t * width / f, height / 3, 40);
            drawArrow(t, f);
        }
        if (deltaX >= width / f) {
            strokeWeight(0);
            fill(4, 156, 0, 255);
            circle(width / f, height / 3, 40);
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