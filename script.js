const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);
window.addEventListener('mousemove', mousemove);
window.addEventListener('mousewheel', mousewheel);

function mousewheel(e) {
    if (camera.zoom - Math.sign(e.deltaY)*0.1 < 0.2) return;
    camera.zoom += -Math.sign(e.deltaY)*0.1;
}

function mousedown(e) {
    isMouseDown = true;
    mousePrev = e.x;
}

function mouseup(e) {
    isMouseDown = false;
}

function mousemove(e) {
    if (!isMouseDown) return;

    let value = e.x - mousePrev;
    if (Math.abs(value) < 2) {
        camera.rotation -= value;
    } else {
        camera.rotation -= Math.sign(value)*2;
    }

    if (camera.rotation > 360) camera.rotation -= 360;
    if (camera.rotation < 0 ) camera.rotation += 360;
    mousePrev = e.x;
}

function keydown(e) {
    if (e.key == "ArrowUp" || e.key == "w") {
        isUp = true;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        isDown = true;
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        isLeft = true;
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        isRight = true;
    }
}

function keyup(e) {
    if (e.key == "ArrowUp" || e.key == "w") {
        isUp = false;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        isDown = false;
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        isLeft = false;
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        isRight = false;
    }
}

let isLeft = false;
let isRight = false;
let isDown = false;
let isUp = false;
let isMouseDown = false;
let mousePrev = 0;

const camera = {
    x: 0,
    y: 0,
    zoom: 1,
    rotation: 0
}

const rect1 = {
    x: 100,
    y: 100,
    w: 50,
    h: 50
}

const rect2 = {
    x: 500,
    y: 1000,
    w: 50,
    h: 50
}

const rect3 = {
    x: 500,
    y: -500,
    w: 100,
    h: 100
}

const rect4 = {
    x: -1000,
    y: 1000,
    w: 70,
    h: 80
}

const img1 = {
    x: 1000,
    y: -1000,
    w: 250,
    h: 250,
    img: new Image()
}
img1.img.src = "tree.png"

const rects = [
    rect1, rect2, rect3, rect4, img1
]

function update() {
    moveCamera();
}

function draw() {
    update();
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 50*camera.zoom, 0, 6.28);
    ctx.fill();

    rects.forEach(rect => {
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(camera.rotation*Math.PI/180);
        ctx.translate(-(canvas.width/2), -(canvas.height/2));

        ctx.fillStyle = "blue";
        let rX = rect.x-camera.x;
        let rY = rect.y-camera.y;
        if (rect.img != undefined) {
            ctx.drawImage(rect.img, rX - (canvas.width/2 - rX)*(camera.zoom-1), rY - (canvas.width/2 - rY)*(camera.zoom-1), 800*camera.zoom, 800*camera.zoom);
        } else {
            ctx.fillRect(rX - (canvas.width/2 - rX)*(camera.zoom-1), rY - (canvas.width/2 - rY)*(camera.zoom-1), 50*camera.zoom, 50*camera.zoom);
        }

        ctx.resetTransform();
    });

    requestAnimationFrame(draw);
}

draw();

function moveCamera() {
    let v = 5;
    if (isLeft) {
        camera.x += -Math.cos(camera.rotation*Math.PI/180)*v;
        camera.y += Math.sin(camera.rotation*Math.PI/180)*v;
    }
    if (isRight) {
        camera.x += Math.cos(camera.rotation*Math.PI/180)*v;
        camera.y += -Math.sin(camera.rotation*Math.PI/180)*v;
    }
    if (isUp) {
        camera.x += -Math.sin(camera.rotation*Math.PI/180)*v;
        camera.y += -Math.cos(camera.rotation*Math.PI/180)*v;
    }
    if (isDown) {
        camera.x += Math.sin(camera.rotation*Math.PI/180)*v;
        camera.y += Math.cos(camera.rotation*Math.PI/180)*v;
    }
}