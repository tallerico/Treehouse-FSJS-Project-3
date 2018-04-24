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

// simple function that hides an element
function hideEl(el) {
    el.style.display = 'none'
}

// simple function that shows an element
function showEl(el, displayProp) {
    el.style.display = [displayProp];
}

// This function adds and input element if "other" is selected from the Job role select field.
function addOtherJob () {
    const otherJob = document.querySelector('#other-title');
    hideEl(otherJob);
    jobRole.addEventListener('change', () => {
        if (jobRole.value === 'other') {
            showEl(otherJob, 'block');
            // otherJob.style.display = 'block';
        } else {
            hideEl(otherJob);
        }
    }); 
}
addOtherJob();

//this function removes color options based of tshirt choice
function setColorOptions () {
    const tshirtDesign = document.querySelector('#design');
    const colorLabel = document.querySelector('#colors-js-puns label');
    const colorSelection = document.querySelector('#color');
    const colorChoices = document.querySelectorAll('#color option');
    hideEl(colorLabel);
    hideEl(colorSelection);
    tshirtDesign.addEventListener('change', () => {
        if (tshirtDesign.value === 'js puns') {
            showEl(colorLabel, '');
            showEl(colorSelection, '');
            for (let i = 0; i < colorChoices.length; i++) {
                let color = colorChoices[i];
                colorValue = color.value;
                hideEl(colorChoices[i]);
                if (colorValue === 'cornflowerblue' || colorValue === 'darkslategrey' || colorValue === 'gold' ) {
                    showEl(colorChoices[i], '');
                }
            }
        }  else if (tshirtDesign.value === 'heart js') {
            colorLabel.style.display = '';
            colorSelection.style.display = '';
            for (let i = 0; i < colorChoices.length; i++) {
                let color = colorChoices[i];
                colorValue = color.value;
                hideEl(colorChoices[i]);
                if (colorValue === 'tomato' || colorValue === 'steelblue' || colorValue === 'dimgrey' ) {
                    showEl(colorChoices[i], '');
                }
            } 
        } else {
            hideEl(colorLabel);
            hideEl(colorSelection);
        }
    });
    
}
setColorOptions();

function setOptions () {
    const activities = document.querySelectorAll('.activities label input');
    // const jsFramework = document.querySelector('[name="js-frameworks"]');
    // const jsLibs = document.querySelector('[name="js-libs"]');
    // const express = document.querySelector('[name="express"]');
    // const node = document.querySelector('[name="node"]');
    // const buildTools = document.querySelector('[name="build-tools"]');
    // const npm = document.querySelector('[name="npm"]');
    for (let i = 0; i < activities.length; i++) {
        const inputEl = activities[i];
        inputEl.addEventListener('change', (e) => {
            if (activities[1].checked) {
                activities[3].parentElement.classList.add('notAvail');
                activities[3].disabled = true;
            } else if (activities[2].checked) {
                activities[4].parentElement.classList.add('notAvail');
                activities[4].disabled = true;
            } else if (!activities[1].checked || !activities[2].checked) {
                for (let i = 0; i <activities.length; i++) {
                    activities[i].parentElement.classList.remove('notAvail');
                    activities[i].disabled = false;
                }
                
            }
        });
    }
    
}
setOptions();