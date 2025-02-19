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

// HomePage

function openingPage() {
    document.querySelector("#size").textContent = inicialWidth;
    currentWidth = inicialWidth;
    insertingNewContainerPixels();
}

// Coloring

function coloringPixel(element){
    if (pressedButton == 0) {
        element.classList.add("active");
        element.classList.remove("inactive");
    }
    else if (pressedButton == 2) {
        element.classList.add("inactive");
        element.classList.remove("active");  
    }
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

container.addEventListener("mousedown", (event) =>{
    startColoring = true;
    event.preventDefault();
})

document.addEventListener("mouseup", (event) => {
    event.preventDefault();
    startColoring = false;
})

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

container.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("pixel")) {
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
