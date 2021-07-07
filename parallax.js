// MOUSE SETUP
var mouse = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
};

// INPUT SETUP
var input = {
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: mouse.x,
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: mouse.y,
    }
};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// OUTPUT SETUP
var output = {
    x: {
        start: -20,
        end: 20,
        current: 0,
    },
    y: {
        start: -20,
        end: 20,
        current: 0,
    },
    z: {
        range: 1000
    }
}
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var parallaxContainer = document.getElementById('parallaxContainer');
var itemsArray = [];

for (var i=0; i<10; i++) {
    var item = document.createElement('div');
    item.className = 'parallax-item';
    itemsArray.push(item);

    var star = document.createElement('div');
    star.className = 'star';
    item.appendChild(star);

    parallaxContainer.appendChild(item);

    var depth = Math.random();
    var zIndex = output.z.range - (depth * output.z.range);

    // item.style.backgroundColor = 'white';
    item.dataset.depth = depth;
    item.style.zIndex = zIndex;
    item.style.width = '100%';
    star.style.backgroundImage = 'url(images/bg-stars-'+ Math.floor((Math.random()*3)+1) +'.png)';
    item.style.top = Math.round(Math.random() * 100 - 50) + '%';
    item.style.left = Math.round(Math.random() * 100 - 50) + '%';
}

var updateInputs = () => {
    // input current, fraction
    input.mouseX.current = mouse.x;
    input.mouseY.current = mouse.y;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}   

var updateOutputs = () => {
    // output current. x and y
    // klo start + -> ikutin arah mouse
    // klo end - -> kebalikan arah mouse
    output.x.current = output.x.end -  (input.mouseX.fraction * output.x.range);
    output.y.current = output.y.end -  (input.mouseY.fraction * output.y.range);
}

var updateParallaxItems = () => {
    // apply to html
    itemsArray.forEach((item, i)=>{
        var depth = parseFloat(item.dataset.depth, 10);
        var itemOutput = {
            x: output.x.current * depth,
            y: output.y.current * depth,
        }
        
        item.style.transform = 'translate('+itemOutput.x+'px, '+itemOutput.y+'px)'
    });
}

var handMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    updateInputs();
    updateOutputs();
    updateParallaxItems();
};

var handleResize = () => {
    // end, range
    input.mouseX.end = window.innerWidth;
    input.mouseY.end = window.innerHeight;

    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
};

window.addEventListener('mousemove', handMouseMove);
window.addEventListener('resize', handleResize);
