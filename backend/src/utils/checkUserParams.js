const { body, validationResult } = require("express-validator");

const checkUserParams = [
  body("username")
    .notEmpty().withMessage("username no debe estar vacío.")
    .isLength({ max: 15 }).withMessage("username debe tener máximo 15 caracteres."),

  body("email")
    .notEmpty().withMessage("email no debe estar vacío.")
    .isEmail().withMessage("email debe tener formato válido.")
    .isLength({ max: 50 }).withMessage("email debe tener máximo 50 caracteres."),

  body("password")
    .notEmpty().withMessage("password no debe estar vacío.")
    .isLength({ min: 8 }).withMessage("password debe tener al menos 8 caracteres.")
    .isLength({ max: 50 }).withMessage("password debe tener máximo 50 caracteres.")
    .matches(/[A-Z]/).withMessage("password debe tener al menos una mayúscula.")
    .matches(/[a-z]/).withMessage("password debe tener al menos una minúscula.")
    .matches(/[0-9]/).withMessage("password debe tener al menos un número.")
    .matches(/[$#%&]/).withMessage("password debe tener al menos un carácter especial: $#%&."),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array()[0].msg });
    }

    next();
  }
];

module.exports = checkUserParams;
