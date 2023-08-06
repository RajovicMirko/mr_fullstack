const { param } = require("express-validator");

const requestValidationMiddleware = require("../utils/requestValidationMiddleware");

// USERS
const getUsers = function (req, res, next) {
  const responseData = {
    test: "get users",
  };

  res.json(responseData);
};

// USER
const getUserValidator = requestValidationMiddleware([
  param("id")
    .notEmpty()
    .withMessage("Missing user id")
    .isNumeric()
    .withMessage("Id must be numbers only"),
]);

const getUser = function (req, res, next) {
  const { id } = req.params;

  const responseData = {
    test: `get user with id: ${id}`,
  };

  res.json(responseData);
};

module.exports = {
  getUsers: {
    method: "get",
    url: "/users",
    handler: getUsers,
  },
  getUser: {
    method: "get",
    url: "/users/:id",
    handler: getUser,
    middleware: getUserValidator,
  },
};
