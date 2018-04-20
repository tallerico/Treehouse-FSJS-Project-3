const nameInput = document.querySelector('#name');

document.addEventListener('load', setFocus(nameInput));

function setFocus(element) {
    element.focus();
}


