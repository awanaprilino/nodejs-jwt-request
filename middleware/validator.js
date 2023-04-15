const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password is required").not().isEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
