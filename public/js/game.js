"use strict";

function onLoad() {
    let $cards = $('img');
    $cards.mousedown(onMouseDown);
    $cards.mouseup(onMouseUp);
    $cards.click(onCardClick);
    document.body.addEventListener('dragover',onDragOver,false);
    document.body.addEventListener('drop',onDrop,false);
}

let target;
let startDrag = { x: 0, y: 0 };
function onMouseDown(ev) {
    console.log(`Mouse down at: ${ev.pageX}, ${ev.pageY}`);
    startDrag = {
        x: ev.pageX,
        y: ev.pageY
    };
}

function onMouseUp(ev) {
    console.log(`Mouse up at: ${ev.pageX}, ${ev.pageY}`);
    let endDrag = {
        x: ev.pageX,
        y: ev.pageY
    };
    let distance = Math.sqrt(Math.pow(endDrag.x - startDrag.x, 2) + Math.pow(endDrag.y - startDrag.y, 2));
    // Have some min bounds on what constitutes a drag
    if (distance > 1) console.log(distance);
}

function onDrag(ev) {
    target = ev.target;
    // Add target to data transfer (https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
    let style = window.getComputedStyle(ev.target, null);
    let newX = parseInt(style.getPropertyValue("left"), 10) - ev.clientX;
    let newY = parseInt(style.getPropertyValue("top"), 10) - ev.clientY;
    ev.dataTransfer.setData("text/plain", `${newX},${newY}`);
}

function onDragOver(ev) {
    ev.preventDefault();
    return false;
}

function onDrop(ev) {
    let offset = ev.dataTransfer.getData("text/plain").split(',');
    target.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
    target.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
    ev.preventDefault();
    return false;
}

function onCardClick(ev) {
    let target = ev.target;
    console.log(target.id);
}
