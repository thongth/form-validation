const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// To show error message
function showError(input, errorMessage){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = errorMessage;
}

// To show success green-box
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// To validate the format of email
function checkEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.toLowerCase())){
        showSuccess(email);
    } else {
        showError(email, "Email is invalid");
    }
}

// Check if the inputs are empty
function checkRequired(inputArr){
    inputArr.forEach(function(item) {
        if(item.value === ""){
            showError(item, `${getFieldName(item)} is Required.`);
        }
    });
}

// Get fieldname
function getFieldName(item){
    return item.id.charAt(0).toUpperCase() + item.id.slice(1);
}

// Check length
function checkLength(item, min, max){
    if(item.value.length < min){
        showError(item, `${getFieldName(item)} must be longer than ${min-1}`);
    } else if(item.value.length > max){
        showError(item, `${getFieldName(item)} must be shorter than ${min+1}`);
    } else {
        showSuccess(item);
    }
}

// check if two passwords match
function checkPassword(password, password2){
    if(password.value !== password2.value || password2.value === ""){
        showError(password2, "Passwords don't match");
    } else {
        showSuccess(password2);
    }
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    checkLength(username, 3, 12);
    checkLength(password, 6, 12);
    checkEmail(email);
    checkPassword(password, password2);
    checkRequired([username, email, password]);
});