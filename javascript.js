const inicialWidth = 10;
const container = document.querySelector(".container");
const size = document.querySelector("#size");

const containerHeight = container.clientHeight;
const containerWidth = container.clientWidth;

let startColoring = false
let pressedButton

const reset = document.querySelector("h2 div")

const more = document.querySelector("#more")
const less = document.querySelector("#less")

const minPixel =  10
const maxPixel = 100

const active = document.querySelector(".active")

let nOpacity = 5

// HomePage

function openingPage() {
    document.querySelector("#size").textContent = inicialWidth;
    currentWidth = inicialWidth;
    insertingNewContainerPixels();
}

// Coloring

function coloringPixel(element){

    if (pressedButton == 0) {
        if (!element.classList.contains('active')) {
            element.classList.add("active");
            let randomColor = gettingRandomColor()
            element.style.opacity = 1/nOpacity
            element.style.backgroundColor = randomColor
            element.style.border = `2px solid ${randomColor}`
            element.classList.remove("inactive");
        } else {
            element.style.opacity = Math.min(parseFloat(element.style.opacity) + 1/nOpacity, 1)
        }
        
    }

    else if (pressedButton == 2) {
        element.classList.add("inactive");
        element.classList.remove("active");  
    }
}

function gettingRandomColor() {
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${green}, ${blue})`;
}

// Pixels in container

function insertingPixels() {
    const nPixels = parseFloat(document.querySelector("#size").textContent);
    const widthPerPixel = containerWidth/nPixels;
    const heightPerPixel = containerHeight/nPixels;
    const fragment = document.createDocumentFragment();
    for (i=0; i<nPixels**2; i++){
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("style", `width: ${widthPerPixel}px; height: ${heightPerPixel}px;`);
        fragment.appendChild(pixel);
    }
    container.appendChild(fragment); 
}

function deletingPixels() {
    container.innerHTML = "";
}

// New Pixel size

function zooming(add) {
    let currentNPixel = parseInt(size.textContent)
    if (add && currentNPixel < maxPixel) {
        size.textContent = currentNPixel + 10
    } else if (!add && currentNPixel > minPixel){
        size.textContent = currentNPixel - 10
    }
    insertingNewContainerPixels();
}

function insertingNewContainerPixels() {
    deletingPixels();
    insertingPixels();
}

// Reset

 function resetingGame() {
    let pixels = container.children;
    for (const pixel of pixels){
        pressedButton = 2;
        coloringPixel(pixel);
    }
 }

// Events

document.addEventListener("DOMContentLoaded", () => openingPage())

document.addEventListener("mouseup", (event) => {
    event.preventDefault();
    startColoring = false;
})

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

container.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("pixel")) {
        startColoring = true;
        event.preventDefault();
        pressedButton = event.button;
        coloringPixel(event.target);
    }
})

container.addEventListener("mouseover", (event) => {
    if (startColoring) {
        coloringPixel(event.target)
    }
})

reset.addEventListener("click", resetingGame)

more.addEventListener("click", () => zooming(true))
less.addEventListener("click", () => zooming(false))
