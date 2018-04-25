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
    const activities = document.querySelector('.activities');
    const activitiesCheck = document.querySelectorAll('.activities label input');
    function totalCost() {
    
    }
    activities.addEventListener('change', (event) => {
        const inputChecked = event.target;
        const isChecked = inputChecked.checked;
        if (event.target.tagName === 'INPUT') {
            
            if (activitiesCheck[1].checked) {
                activitiesCheck[3].parentElement.classList.add('notAvail');
                activitiesCheck[3].disabled = true;
            } else if (activitiesCheck[3].checked) {
                activitiesCheck[1].parentElement.classList.add('notAvail');
                activitiesCheck[1].disabled = true;
            } else if (activitiesCheck[2].checked) {
                activitiesCheck[4].parentElement.classList.add('notAvail');
                activitiesCheck[4].disabled = true;
            } else if (activitiesCheck[4].checked) {
                activitiesCheck[2].parentElement.classList.add('notAvail');
                activitiesCheck[2].disabled = true;
            } else if ((inputChecked === activitiesCheck[1] && isChecked === false) || (inputChecked === activitiesCheck[3] && isChecked === false)) {
                activitiesCheck[1].parentElement.classList.remove('notAvail');
                activitiesCheck[1].disabled = false;
                activitiesCheck[3].parentElement.classList.remove('notAvail');
                activitiesCheck[3].disabled = false;
            } else if ((inputChecked === activitiesCheck[2] && isChecked === false) || (inputChecked === activitiesCheck[4] && isChecked === false)) {
                activitiesCheck[2].parentElement.classList.remove('notAvail');
                activitiesCheck[2].disabled = false;
                activitiesCheck[4].parentElement.classList.remove('notAvail');
                activitiesCheck[4].disabled = false;
            } 
        }
    });
}    
setOptions();

