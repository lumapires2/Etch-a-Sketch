const inicialWidth = 10;
const container = document.querySelector(".container");
const size = document.querySelector("#size");

const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;

// Events

size.addEventListener("keydown", insertingNewContainerPixels)

for (const pixel of container.children) {
    pixel.addEventListener("click", coloringPixel(pixel, True))
    pixel.addEventListener("contextmenu", coloringPixel(pixel, False))
}

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
    const fragment = document.createDocumentFragment();
    console.log(nPixels)
    for (i=0; i<nPixels**2; i++){
        console.log(i)
        let pixel = document.createElement("div");
        pixel.classList.add("pixel")
        pixel.setAttribute("style", `width: ${widthPerPixel}px; height: ${heightPerPixel}px;`);
        fragment.appendChild(pixel);
    }
    container.appendChild(fragment); 
}

function deletingPixels() {
    container.innerHTML = ""
}

// New Pixel size

function insertingNewContainerPixels() {
    deletingPixels()
    insertingPixels()
}

// Reset

 function resetingGame() {
    let pixels = container.children
    for (const pixel of pixels){
        coloringPixel(pixel, False)
    }
 }