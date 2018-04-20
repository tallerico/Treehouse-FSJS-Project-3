const fieldset = document.querySelectorAll('fieldset');
const nameInput = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const label = document.createElement('label');
const input = document.createElement('input');



document.addEventListener('load', setFocus(nameInput));

// reusable function to simply add focus to an element.
function setFocus(element) {
    element.focus();
}

// This function adds and input element if "other" is selected from the Job role select field.
function addOtherJob () {
    fieldset[0].appendChild(input)
            .setAttribute('id', 'other-title');
    const otherJob = document.querySelector('#other-title');
    otherJob.setAttribute('placeholder', 'Your Job Role');
    otherJob.style.display = 'none';
    jobRole.addEventListener('change', () => {
        if (jobRole.value === 'other') {
            otherJob.style.display = 'block';
        } else {
            otherJob.style.display = 'none';
        }
    }); 
}
addOtherJob();

//this function removes
function setColorOptions () {
    const tshirtDesign = document.querySelector('#design').children;
    const colorChoices = document.querySelector('#colors-js-puns').children;
    if (tshirtDesign.value === 'js puns') {
        for (let i = 0; i < colorChoices.length; i++) {
            let color = colorChoices[i].value;
            colorChoices[i].style.display = 'none';
            if (color === 'cornflowerblue' || color === 'darkslategrey' || color === 'gold' ) {
                colorChoices[i].style.display = '';
            }
        }
    }
}
setColorOptions();

