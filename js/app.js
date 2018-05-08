const fieldset = document.querySelectorAll('fieldset');
const nameInput = document.querySelector('#name');
const emailField = document.querySelector('#mail');
const jobRole = document.querySelector('#title');
const otherJob = document.querySelector('#other-title');
const submitButton = document.querySelector('button[type="submit"]');
const tshirtDesign = document.querySelector('#design');
const colorLabel = document.querySelector('#colors-js-puns label');
const colorSelection = document.querySelector('#color');
const colorChoices = document.querySelectorAll('#color option');
const activities = document.querySelector('.activities');
const activitesLegend = document.querySelector('.activities legend');
const eventsLabel = document.querySelectorAll('.activities label');
const eventChecks = document.querySelectorAll('.activities label input');
const paymentMethod = document.querySelector('#payment');
const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
const creditCardOption = document.querySelector('#payment option[value="credit card"]');
const emailLabel = document.querySelector('label[for="mail"]');
const ccNumber = document.querySelector('#cc-num');
let ccInputs = [];
const ccElList = document.querySelectorAll('#credit-card input');
const ccZip = document.querySelector('#zip');
const ccCvv = document.querySelector('#cvv');
const label = document.createElement('label');
const input = document.createElement('input');
const p = document.createElement('p');
let total = 0;

//setting focus to name field
document.addEventListener('load', setFocus(nameInput));
// running validation check to show atleast one check needs to be checked before submit
document.addEventListener('load', validateChecks(eventChecks));

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


// initially hiding div containing field for user to add job title 
hideEl(otherJob);
// showing and hiding job field based on user choice
jobRole.addEventListener('change', () => {
    if (jobRole.value === 'other') {
        showEl(otherJob, 'block');
    } else {
        hideEl(otherJob);
    }
}); 

// hiding color section until user selects tshirt design
hideEl(colorLabel);
hideEl(colorSelection);
// giving tshirt color choices based on design chosen
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

// validating checks in realtime
function validateChecks(checkboxList) {
    let checkedArray = [];
    for (let i = 0; i < checkboxList.length; i++) {
        if (checkboxList[i].checked) {
            checkedArray.push(checkboxList[i]);
        }
    }
    if (checkedArray.length >= 1) {
        activitesLegend.removeAttribute('style');
        activitesLegend.innerHTML = 'Register for Activities';
    } else {
        activitesLegend.style.color = 'red';
        activitesLegend.innerHTML = 'Register for Activities:  Please choose a minimum of one.'
    }
}
    
    
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
            if ((selectionTime === conflictTime) && 
                (selectionEvent != conflictEvent) && 
                eventChecked) {
                conflictParent.classList.add('notAvail');
                conflict.disabled = true;
            } else if ((selectionTime === conflictTime) && 
                        (selectionEvent != conflictEvent) && 
                        !eventChecked) {
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
    validateChecks(eventChecks);
    toggleConflict(eventChosen, eventChecks);
    updatePrice(eventChosen);
}); 

// function to add node list to an array
function addListArray(list, arrayName) {;
    for(let i = 0; i < list.length; i++) {
        arrayName.push(list[i]);
    }
}


// displays proper fields based on payment method.
hideEl(paypalInfo);
hideEl(bitcoinInfo);
// setting credit card option as default choice
creditCardOption.setAttribute('selected', '');
paymentMethod.addEventListener('change', (e) => {
        if (paymentMethod.value === 'select_method') {
        submitButton.disabled = true;
        hideEl(creditCardInfo);
        hideEl(paypalInfo);
        hideEl(bitcoinInfo);
    } else if (paymentMethod.value === 'credit card') {
        ccInputs = [];
        submitButton.disabled = false;
        showEl(creditCardInfo, 'block');
        hideEl(paypalInfo);
        hideEl(bitcoinInfo);
        addListArray(ccElList, ccInputs);
// TODO finish conditional statements for validation of credit card info
        ccInputs.forEach( (element) => {
            element.addEventListener('input', (e) => {
               if (e.target.id === 'cc-num') {
                   console.log('credit card');
               }
            });
        });
    } else if (paymentMethod.value === 'paypal') {
        submitButton.disabled = false;
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




// realtime validation of email field.
emailField.addEventListener('input', (e) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(emailField.value)) {
        emailLabel.removeAttribute('style');
        emailLabel.textContent = 'Email:';
        emailField.setCustomValidity('');
    } else {
        emailLabel.style.color = 'red';                                    
        emailLabel.textContent = 'Email: (Please Enter Valid email: example@example.com';
        emailField.setCustomValidity('Please Enter A Valid Email');
    }
});




