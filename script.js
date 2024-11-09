const pictures = document.querySelectorAll('.Picture'); 
let previousTouch = null;

function updateElementPosition(element, event) { 
    let movementX = 0, movementY = 0;

    if (event.type === 'touchmove') { 
        const touch = event.touches[0]; 
        if (previousTouch) {
            movementX = touch.clientX - previousTouch.clientX; 
            movementY = touch.clientY - previousTouch.clientY; 
        }
        previousTouch = touch;
    } else { 
        movementX = event.movementX; 
        movementY = event.movementY; 
    }

    const elementY = parseInt(element.style.top || 0) + movementY; 
    const elementX = parseInt(element.style.left || 0) + movementX; 
    element.style.top = elementY + "px"; 
    element.style.left = elementX + "px"; 
}

function startDrag(element, event) { 
    const updateFunction = (event) => updateElementPosition(element, event);
    const stopFunction = () => stopDrag(updateFunction, stopFunction);

    document.addEventListener("mousemove", updateFunction); 
    document.addEventListener("touchmove", updateFunction); 
    document.addEventListener("mouseup", stopFunction); 
    document.addEventListener("touchend", stopFunction); 

    if (event.type === 'touchstart') {
        previousTouch = event.touches[0];
    } else {
        previousTouch = null;
    }
}

function stopDrag(updateFunction, stopFunction) { 
    previousTouch = null;
    document.removeEventListener("mousemove", updateFunction); 
    document.removeEventListener("touchmove", updateFunction); 
    document.removeEventListener("mouseup", stopFunction); 
    document.removeEventListener("touchend", stopFunction); 
}

pictures.forEach(picture => { 
    const range = 100; 
    const randomX = Math.random() * (range * 2) - range; 
    const randomY = Math.random() * (range * 2) - range; 
    const randomRotate = Math.random() * (range / 2) - range / 4;

    picture.style.top = `${randomY}px`; 
    picture.style.left = `${randomX}px`; 
    picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`; 

    const startFunction = (event) => startDrag(picture, event); 
    picture.addEventListener("mousedown", startFunction); 
    picture.addEventListener("touchstart", startFunction); 
});
