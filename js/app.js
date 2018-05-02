const fieldset = document.querySelectorAll('fieldset');
const nameInput = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const label = document.createElement('label');
const input = document.createElement('input');
const p = document.createElement('p');

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





/* a function to make sure that conflicting actitives cannot be chosen 
as well as updates total price for all activivtes chosen by user*/ 
function chooseActivities() {
    const activities = document.querySelector('.activities');
    const eventsLabel = document.querySelectorAll('.activities label');
    const eventChecks = document.querySelectorAll('.activities label input');
    let total = 0;
    
    // this function disables any activity that has conflicting times.
    function toggleConflict(choice, listCheck) {
            const eventChecked = choice.checked;
            const parentChosen = choice.parentElement;
            const selectionTime = parentChosen.textContent.split(/[—,$]/)[1].trim();
            const selectionEvent = parentChosen.textContent.split(/[—,$]/)[0].trim();
            for (let i = 0; i < listCheck.length; i++) {
                let conflict = listCheck[i];
                const conflictParent = conflict.parentElement;
                const conflictTime = conflictParent.textContent.split(/[—,$]/)[1].trim();
                const conflictEvent =  conflictParent.textContent.split(/[—,$]/)[0].trim();
                if ((selectionTime === conflictTime) && (selectionEvent != conflictEvent) && eventChecked) {
                    conflictParent.classList.add('notAvail');
                    conflict.disabled = true;
                } else if ((selectionTime === conflictTime) && (selectionEvent != conflictEvent) && !eventChecked) {
                    conflictParent.classList.remove('notAvail');
                    conflict.disabled = false;
                }
            }

    }
    //updates total based on selections.
    function updatePrice(chosenActivitie) {
        const parentChosen = chosenActivitie.parentElement;
        const isChecked = chosenActivitie.checked;
        const price = parentChosen.textContent.split(/[$]/)[1].trim();
        if (isChecked) {
           total += Number(price);
        } else if (!isChecked) {
           total -= Number(price);
        }
        activities.appendChild(p).innerHTML = `Total: $${total}`;
    }
    //listening for change to check boxes
    activities.addEventListener('change', (e) => {
        const eventChosen = e.target;
        toggleConflict(eventChosen, eventChecks);
        updatePrice(eventChosen);
    }); 
}
chooseActivities();        

//displays proper fields based on payment method.
function paymentInfo() {
    const paymentMethod = document.querySelector('#payment');
    const submitButton = document.querySelector('button[type="submit"]');
    const creditCardInfo = document.querySelector('#credit-card');
    const paypalInfo = document.querySelector('#paypal');
    const bitcoinInfo = document.querySelector('#bitcoin');
    hideEl(creditCardInfo);
    hideEl(paypalInfo);
    hideEl(bitcoinInfo);
    submitButton.disabled = true;
    paymentMethod.addEventListener('change', (e) => {
        if (paymentMethod.value === 'select_method') {
            submitButton.disabled = true;
            hideEl(creditCardInfo);
            hideEl(paypalInfo);
            hideEl(bitcoinInfo);
        } else if (paymentMethod.value === 'credit card') {
            submitButton.disabled = false;
            showEl(creditCardInfo, 'block');
            hideEl(paypalInfo);
            hideEl(bitcoinInfo);
        } else if (paymentMethod.value === 'paypal') {
            submitButton.disabled = false;
            submitButton.removeAttribute('type');
            submitButton.href = "https:\\www.paypal.com";
            showEl(paypalInfo, 'block');
            hideEl(creditCardInfo);
            hideEl(bitcoinInfo);
        } else if (paymentMethod.value === 'bitcoin') {
            submitButton.disabled = false;
            showEl(bitcoinInfo, 'block');
            hideEl(creditCardInfo);
            hideEl(paypalInfo);
        }
    });
}
paymentInfo();
