const inicialWidth = 10;
const container = document.querySelector(".container");
const size = document.querySelector("#size");

const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;

// Coloring

function coloringPixel(element, active){
    if (active) {
        element.classList.add("active")
    } else {
        element.classList.add("inactive")}
}

// Pixels in container

function insertingPixels() {
    const nPixels = parseFloat(document.querySelector("#size").value);
    const widthPerPixel = containerWidth/nPixels;
    const heightPerPixel = containerHeight/nPixels;
    for (i=0; i<parseFloat(size)^2; i++){
        let pixel = document.createElement("div");
        container.appendChild(pixel);
        pixel.setAttribute("style", `width: ${widthPerPixel}rem; height: ${heightPerPixel}rem;`);
    }
}

function deletingPixels() {
    container.innerHTML = ""
}

// RESET

 function resetingGame() {
    let pixels = container.children
    for (const pixel of pixels){
        coloringPixel(pixel, False)
    }
 }