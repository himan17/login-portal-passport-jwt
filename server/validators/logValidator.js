const { model } = require('mongoose');
const validator = require('validator');

function logValidator(data){
    const errors = [];
    // full name
    if (data.email.length === 0 || validator.isEmail(data.email) === false) {
        errors.push("Enter a valid Email");
    }
    if (data.password.length < 8) {
        errors.push("Password length must be 8 characters");
    }
    return {
        errors,
        isValid: errors.length === 0 ? 1 : 0
    }
};

module.exports = logValidator;