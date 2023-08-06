const { validationResult } = require("express-validator");

const generateErrorResponse = (errors) => {
  return errors.array().reduce((acc, error) => {
    if (!acc[error.path]) {
      return {
        ...acc,
        [error.path]: {
          type: error.type,
          field: error.path,
          value: error.value,
          message: error.msg,
          messages: [error.msg],
        },
      };
    } else {
      return {
        ...acc,
        [error.path]: {
          ...acc[error.path],
          messages: [...acc[error.path].messages, error.msg],
        },
      };
    }
  }, {});
};

const requestValidationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsCustom = generateErrorResponse(errors);
      return res.status(400).json({ errors: errorsCustom });
    }

    next();
  };
};

module.exports = requestValidationMiddleware;
