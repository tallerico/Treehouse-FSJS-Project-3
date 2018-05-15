const nameInput = document.querySelector('#name');
const submitButton = document.querySelector('button[type="submit"]');
const jobRole = document.querySelector('#title');
const otherJob = document.querySelector('#other-title');
const emailLabel = document.querySelector('label[for="mail"]');
const emailField = document.querySelector('#mail');
const tshirtDesign = document.querySelector('#design');
const colorLabel = document.querySelector('#colors-js-puns label');
const colorSelection = document.querySelector('#color');
const colorChoices = document.querySelectorAll('#color option');
const activities = document.querySelector('.activities');
const activitesLegend = document.querySelector('.activities legend');
const eventsLabel = document.querySelectorAll('.activities label');
const eventChecks = document.querySelectorAll('.activities label input');
const ccNumber = document.querySelector('#cc-num');
const ccZip = document.querySelector('#zip');
const ccCvv = document.querySelector('#cvv');
const paymentMethod = document.querySelector('#payment');
const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
const creditCardOption = document.querySelector('#payment option[value="credit card"]');
const label = document.createElement('label');
const input = document.createElement('input');
const p = document.createElement('p');
let total = 0;



//setting focus to name field
document.addEventListener('load', setFocus(nameInput));

submitButton.addEventListener('click', (e) => {
    if (paymentMethod.value === 'credit card') {
        if(!checkValid()) {
            e.preventDefault();
            errorMessages();
        }
    }
});

// ---------- HELPER FUNCTIONS ----

// reusable function to simply add focus to an element.
function setFocus(element) {
    element.focus();
}
// function that hides an element  
function hideEl(el) {
    el.style.display = 'none'
}
// function that shows an element
function showEl(el, displayProp) {
    el.style.display = [displayProp];
}

// ---------- VALIDATION FUNCTIONS ----

// validating format of values in form fields. 
function validateFormValues(input) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    var creditCardFormat = /^[0-9]{13,16}$/;
    var zipFormat = /^[0-9]{5}$/;
    var cvvFormat = /^[0-9]{3}$/;
    if (input.id == 'mail' && input.value.match(emailFormat)) {
      return true;
    } else if (input.id == 'cc-num' && input.value.match(creditCardFormat)) {
      return true;
    } else if (input.id == 'zip' && input.value.match(zipFormat)) {
      return true;
    } else if (input.id == 'cvv' && input.value.match(cvvFormat)) {
      return true;
    }
    return false;
}

function checkValid() {
    if (validateFormValues(emailField) &&
    validateFormValues(ccNumber) &&
    validateFormValues(ccZip) &&
    validateFormValues(ccCvv) === true) {
        return true;
    } else {
        return false;
    }
    
}

function errorMessages() {
       if (!validateFormValues(ccNumber)){
           
       } 
}

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

// ---------- JOB ROLE ----

hideEl(otherJob);
// showing and hiding job field based on user choice
jobRole.addEventListener('change', () => {
    if (jobRole.value === 'other') {
        showEl(otherJob, 'block');
    } else {
        hideEl(otherJob);
    }
}); 

// ---------- T-Shirt Design ----
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

// ---------- Session Choices ----
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
    toggleConflict(eventChosen, eventChecks);
    updatePrice(eventChosen);
});


// ---------- Payment Method ----

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
        submitButton.disabled = false;
        showEl(creditCardInfo, 'block');
        hideEl(paypalInfo);
        hideEl(bitcoinInfo);
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