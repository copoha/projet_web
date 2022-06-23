const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateTownInput(data) {
  let errors = {};
// Email checks
  if (Validator.isEmpty(data.userData.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.userData.email)) {
    errors.email = "Email is invalid";
  }
// Town checks
  if (Validator.isEmpty(data.town)) {
    errors.town = "Town is required";
}
return {
  errors,
  isValid: isEmpty(errors)
};
};
