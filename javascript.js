const inicialWidth = 10;
const container = document.querySelector(".container");
const size = document.querySelector("#size");

const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;

let startColoring = false
let pressedButton

// HomePage

function openingPage() {
    document.querySelector("#size").value = 10
    insertingNewContainerPixels()
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
    const nPixels = parseFloat(document.querySelector("#size").value);
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

function insertingNewContainerPixels() {
    deletingPixels();
    insertingPixels();
    addingEventsToNewPixels();
}

// Reset

 function resetingGame() {
    let pixels = container.children;
    for (const pixel of pixels){
        coloringPixel(pixel);
    }
 }

// Events

document.addEventListener("DOMContentLoaded", () => openingPage())
size.addEventListener("keydown", insertingNewContainerPixels)

container.addEventListener("mousedown", (event) =>{
    event.preventDefault();
    startColoring = true;
    if (event == 0) {
        pressedButton = 2;
    } else {
        pressedButton = event.button;
    }
})

document.addEventListener("mouseup", (event) => {
    event.preventDefault();
    startColoring = false;
})


document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})


function addingEventsToNewPixels() {
    const pixels = Array.from(container.children);
    pixels.forEach(pixel => {
        pixel.addEventListener("mousedown", (event) => {
            coloringPixel(pixel);
        })
        pixel.addEventListener("mouseover", (event) => {
            if (startColoring) {
                coloringPixel(pixel);  
            }
        })
    })
}
