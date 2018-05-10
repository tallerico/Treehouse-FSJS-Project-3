const nameInput = document.querySelector('#name');
const submitButton = document.querySelector('button[type="submit"]');
const jobRole = document.querySelector('#title');
const otherJob = document.querySelector('#other-title');
const emailField = document.querySelector('#mail');
const ccNumber = document.querySelector('#cc-num');
const ccZip = document.querySelector('#zip');
const ccCvv = document.querySelector('#cvv');


//setting focus to name field
document.addEventListener('load', setFocus(nameInput));

submitButton.addEventListener('click', (e) => {
    if(!checkValid()) {
        e.preventDefault();
        errorMessages(); 
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