class BackPopAnimClass {
    constructor(startFrame) {
        this.startFrame = startFrame;
        this.fadingOut = false;
        this.fadeStartFrame = 0;
    }

    show(currFrame) {
        let frameOffset = currFrame - this.startFrame;
        stroke(30, 30, 30, 20);
        strokeWeight(40);
        noFill();
        circle(0, height / 3, frameOffset * 120);
        if (frameOffset <= 4) {
            drawBackTab(24 + frameOffset * 24, height / 3, 1.1 - 0.2 * frameOffset / 3, 0.9 + 0.2 * frameOffset / 3, 1);
        }
        if (frameOffset > 4 && frameOffset <= 8) {
            drawBackTab(120 - (frameOffset - 4) * 3, height / 3, 0.833 + 0.167 * (frameOffset - 4) / 4, 1.167 - 0.167 * (frameOffset - 4) / 4, 1);
        }
        if (frameOffset > 8) {
            if (this.fadingOut) {
                drawBackTab(108, height / 3, 1 + 0.2 * (currFrame - this.fadeStartFrame), 1 + 0.2 * (currFrame - this.fadeStartFrame), 1 - 0.05 * (currFrame - this.fadeStartFrame))
            } else {
                drawBackTab(108, height / 3, 1, 1, 1);
            }
        }
    }
}

function drawBackTab(x, y, hs, vs, alpha) {
    let rad = (hs + vs) * 6;
    push();
    translate(x, y);
    noStroke();
    fill(4, 156, 0, alpha * 255);
    rectMode(CENTER);
    rect(0, 0, 50 * vs, 40 * hs, rad);
    fill(60, 255, 140, alpha * 160);
    beginShape();
    vertex(-13 * hs, 0);
    vertex(8 * hs, 11 * vs);
    vertex(10 * hs, 8 * vs);
    vertex(-6 * hs, 0);
    vertex(10 * hs, -8 * vs);
    vertex(8 * hs, -11 * vs);
    endShape();
    pop();
}

let pastPosX = 0;
let isGoingBack = false;
let canGoBack = false;
let isBackPopAnimTriggered = false;
let backPopAnim;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

let frame = 0;
function draw() {
    frame++;
    background(255);
    if (canGoBack && mouseX > pastPosX) {
        isGoingBack = true;
        canGoBack = false;
    }
    if (isGoingBack) {
        let deltaX = mouseX - pastPosX;
        if (deltaX < 0) deltaX = 0;
        if (deltaX < 50) {
            drawBackTab(deltaX - 28, height / 3, 1, 1, deltaX / 50);
        }
        if (deltaX >= 50 && deltaX < 58) {
            let offset = deltaX - 50;
            drawBackTab(22 + offset / 4, height / 3, 1 - offset / 80, 1 + offset / 80, 1);
            isBackPopAnimTriggered = false;
        }
        if (deltaX >= 58) {
            if (!isBackPopAnimTriggered) {
                backPopAnim = new BackPopAnimClass(frame);
                isBackPopAnimTriggered = true;
            } else {
                backPopAnim.show(frame);
            }
        }
    } else if (backPopAnim && backPopAnim.fadingOut) {
        backPopAnim.show(frame);
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
    if (isBackPopAnimTriggered) {
        isBackPopAnimTriggered = false;
        backPopAnim.fadingOut = true;
        backPopAnim.fadeStartFrame = frame;
        // here is where you would go back
    }
}