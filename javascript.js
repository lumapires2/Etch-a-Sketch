const inicialWidth = 40;
const container = document.querySelector(".container");
const size = document.querySelector("#size");

const containerHeight = container.clientHeight;
const containerWidth = container.clientWidth;

let startColoring = false
let rainbow = false
let defaultColor
let pressedButton

const reset = document.querySelector("#eraser")

const more = document.querySelector("#more")
const less = document.querySelector("#less")

const minPixel =  10
const maxPixel = 100

const active = document.querySelector(".active")

let nOpacity = 5

const colorShow = document.querySelector("#colorShow")
const colorPicker = document.querySelector("#colorPicker")
const rainbowMode = document.querySelector("#rainbow")

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
            color = gettingColor()
            element.classList.add("active");
            element.style.opacity = 1/nOpacity
            element.style.backgroundColor = color
            element.style.border = `2px solid ${color}`
            element.classList.remove("inactive");
        } else {
            element.style.opacity = Math.min(parseFloat(element.style.opacity) + 1/nOpacity, 1)
        }   
    }

    else if (pressedButton == 2) {
        element.classList.remove("active"); 
        element.classList.add("inactive");
        element.style.opacity = 1
        element.style.backgroundColor = "rgb(255, 255, 255)"
        element.style.border = ""
    }
}

function gettingColor() {
    let color;
    if (rainbow) {
        return gettingRandomColor();
    } else {
        return defaultColor;
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
        size.textContent = currentNPixel + 10;
        insertingNewContainerPixels();
    } else if (!add && currentNPixel > minPixel){
        size.textContent = currentNPixel - 10;
        insertingNewContainerPixels();
    }
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
        coloringPixel(pixel, false);
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

colorShow.addEventListener("click", () => {
    colorPicker.click();
    rainbow = false;
})

colorPicker.addEventListener("input", () => {
    defaultColor = colorPicker.value
    colorShow.style.backgroundColor = defaultColor;
})

rainbowMode.addEventListener("click", () => {rainbow = true;})