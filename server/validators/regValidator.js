const validator = require('validator');

function regValidator(data){
    const errors = [];
    // full name
    if(data.fullName.length === 0){
        errors.push("Full name can't be empty");
    }
    if(data.email.length === 0 || validator.isEmail(data.email)===false){
        errors.push("Enter a valid Email");
    }
    if(data.password.length<8){
        errors.push("Password length must be 8 characters");
    }
    console.log(errors);

    return {
        errors, 
        isValid: errors.length === 0 ? 1: 0
    }
};

module.exports = regValidator;